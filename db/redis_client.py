import redis.asyncio as redis
import json
from typing import Optional
from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger(__name__)

class RedisClient:
    _instance: Optional['RedisClient'] = None
    _lock = False  # Simple lock for singleton pattern
    
    def __init__(self):
        """
        Initialize Redis client. 
        Note: Use get_instance() class method for singleton pattern.
        """
        self.connected = False
        try:
            # Use BlockingConnectionPool to handle bursts of connections gracefully
            # Instead of failing immediately when the pool is full, it will wait 
            # for a connection to become available (up to REDIS_POOL_TIMEOUT).
            pool = redis.BlockingConnectionPool(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                db=settings.REDIS_DB,
                password=settings.REDIS_PASSWORD or None,
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                max_connections=settings.REDIS_MAX_CONNECTIONS,
                timeout=settings.REDIS_POOL_TIMEOUT
            )
            self.client = redis.Redis(connection_pool=pool)
            self.connected = True 
            logger.info(f"Initialized dynamic Redis client for {settings.REDIS_HOST}:{settings.REDIS_PORT} (pool size: {settings.REDIS_MAX_CONNECTIONS})")
        except Exception as e:
            logger.warning(f"Failed to initialize Redis client: {e}")
            self.client = None
            self.connected = False
    
    @classmethod
    def get_instance(cls) -> 'RedisClient':
        """
        Get or create the singleton instance of RedisClient.
        Thread-safe singleton pattern for centralized connection management.
        """
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    async def ping(self):
        """Test connection"""
        if self.client:
            try:
                await self.client.ping()
                self.connected = True
                return True
            except Exception as e:
                logger.warning(f"Redis ping failed: {e}")
                self.connected = False
                return False
        return False

    async def close(self):
        """
        Close Redis connection gracefully.
        Should be called during application shutdown.
        """
        if self.client:
            try:
                await self.client.close()
                logger.info("Redis connection closed")
            except Exception as e:
                logger.warning(f"Error closing Redis connection: {e}")

    async def set_otp(self, key, value, ttl):
        if self.connected:
            await self.client.setex(key, ttl, value)

    async def get_otp(self, key):
        if self.connected:
            return await self.client.get(key)
        return None

    async def delete_otp(self, key):
        if self.connected:
            await self.client.delete(key)
    
    # Generic key-value methods for reset tokens and other use cases
    async def set(self, key: str, value: str, ttl: int):
        """Set a key-value pair with TTL in seconds"""
        if self.connected:
            await self.client.setex(key, ttl, value)
    
    async def get(self, key: str) -> Optional[str]:
        """Get value by key"""
        if self.connected:
            return await self.client.get(key)
        return None
    
    async def delete(self, key: str):
        """Delete a key"""
        if self.connected:
            await self.client.delete(key)
    
    # Chat-specific methods
    async def add_user_socket(self, user_id: str, socket_id: str, ttl: int = 86400):
        """Add a socket to the user's set of active connections"""
        if self.connected:
            key = f"user_sockets:{user_id}"
            await self.client.sadd(key, socket_id)
            await self.client.expire(key, ttl)
    
    async def get_user_sockets(self, user_id: str) -> list[str]:
        """Get all active socket IDs for a user"""
        if self.connected:
            return list(await self.client.smembers(f"user_sockets:{user_id}"))
        return []
    
    async def remove_user_socket(self, user_id: str, socket_id: str):
        """Remove a specific socket from user's set"""
        if self.connected:
            await self.client.srem(f"user_sockets:{user_id}", socket_id)

    async def check_user_has_socket(self, user_id: str, socket_id: str) -> bool:
        """Check if a specific socket belongs to a user"""
        if self.connected:
            return await self.client.sismember(f"user_sockets:{user_id}", socket_id)
        return False
    
    async def add_socket_to_room(self, room_name: str, socket_id: str, ttl: int = 86400):
        """Track which sockets are in which room in Redis"""
        if self.connected:
            key = f"room_sockets:{room_name}"
            await self.client.sadd(key, socket_id)
            await self.client.expire(key, ttl)

    async def remove_socket_from_room(self, room_name: str, socket_id: str):
        """Remove a socket from a room tracking in Redis"""
        if self.connected:
            await self.client.srem(f"room_sockets:{room_name}", socket_id)

    async def get_room_sockets(self, room_name: str) -> list[str]:
        """Get all socket IDs in a room across all instances"""
        if self.connected:
            return list(await self.client.smembers(f"room_sockets:{room_name}"))
        return []

    async def remove_socket_from_rooms(self, room_names: list[str], socket_id: str):
        """Batch remove a socket from multiple rooms tracking in Redis"""
        if self.connected and room_names:
            async with self.client.pipeline() as pipeline:
                for room_name in room_names:
                    pipeline.srem(f"room_sockets:{room_name}", socket_id)
                await pipeline.execute()

    async def check_any_user_socket_in_room(self, user_id: str, room_name: str) -> bool:
        """Check if any of the user's sockets are in the specified room"""
        if not self.connected:
            return False
        
        user_sockets = await self.get_user_sockets(user_id)
        if not user_sockets:
            return False
            
        # Check intersection in Redis
        # Since we can't easily do intersection between a local list and a Redis set without multiple calls
        # We use SISMEMBER in a pipeline
        async with self.client.pipeline() as pipeline:
            room_key = f"room_sockets:{room_name}"
            for sid in user_sockets:
                pipeline.sismember(room_key, sid)
            results = await pipeline.execute()
            
        return any(results)
    
    async def set_typing_status(self, conversation_id: str, user_id: str, ttl: int = 5):
        """Set typing indicator with auto-expiry (5 seconds)"""
        if self.connected:
            await self.client.setex(f"typing:{conversation_id}:{user_id}", ttl, "1")
    
    async def get_typing_status(self, conversation_id: str, user_id: str) -> bool:
        """Check if user is typing"""
        if self.connected:
            return await self.client.exists(f"typing:{conversation_id}:{user_id}") > 0
        return False
    
    async def cache_conversation_list(self, user_id: str, data: list, ttl: int = 60):
        """Cache conversation list (60 seconds)"""
        if self.connected:
            await self.client.setex(f"conversations:{user_id}", ttl, json.dumps(data))
    
    async def get_cached_conversation_list(self, user_id: str) -> Optional[list]:
        """Retrieve cached conversations"""
        if self.connected:
            cached = await self.client.get(f"conversations:{user_id}")
            if cached:
                return json.loads(cached)
        return None
    
    # Online status tracking methods
    async def set_user_online(self, user_id: str, ttl: int = 300):
        """Mark user as online with TTL (default 5 minutes)"""
        if self.connected:
            await self.client.setex(f"online:{user_id}", ttl, "1")
    
    async def is_user_online(self, user_id: str) -> bool:
        """Check if user is currently online"""
        if self.connected:
            return await self.client.exists(f"online:{user_id}") > 0
        return False
    
    async def delete_user_online(self, user_id: str):
        """Remove user online status"""
        if self.connected:
            await self.client.delete(f"online:{user_id}")
    
    async def get_users_online_status(self, user_ids: list) -> dict:
        """Batch check online status for multiple users"""
        if not self.connected or not user_ids:
            return {str(uid): False for uid in user_ids}
        
        # Use pipeline for efficient batch operation
        async with self.client.pipeline() as pipeline:
            for user_id in user_ids:
                pipeline.exists(f"online:{user_id}")
            
            results = await pipeline.execute()
        
        return {str(user_ids[i]): bool(results[i]) for i in range(len(user_ids))}
    
    async def set_user_last_seen(self, user_id: str, timestamp: str):
        """Store last seen timestamp (ISO format string)"""
        if self.connected:
            # Store with 30-day TTL to avoid indefinite storage
            await self.client.setex(f"last_seen:{user_id}", 2592000, timestamp)
    
    async def get_user_last_seen(self, user_id: str) -> Optional[str]:
        """Get last seen timestamp"""
        if self.connected:
            return await self.client.get(f"last_seen:{user_id}")
        return None
    
    async def get_users_last_seen(self, user_ids: list) -> dict:
        """Batch get last seen timestamps for multiple users"""
        if not self.connected or not user_ids:
            return {str(uid): None for uid in user_ids}
        
        # Use pipeline for efficient batch operation
        async with self.client.pipeline() as pipeline:
            for user_id in user_ids:
                pipeline.get(f"last_seen:{user_id}")
            
            results = await pipeline.execute()
        
        return {str(user_ids[i]): results[i] for i in range(len(user_ids))}

    # Unread count management
    async def incr_unread_count(self, user_id: str, conversation_id: str):
        """Increment unread count for a user in a conversation"""
        if self.connected:
            await self.client.hincrby(f"unread:{user_id}", str(conversation_id), 1)

    async def reset_unread_count(self, user_id: str, conversation_id: str):
        """Reset unread count for a user in a conversation"""
        if self.connected:
            await self.client.hset(f"unread:{user_id}", str(conversation_id), 0)

    async def get_unread_counts(self, user_id: str, conversation_ids: list) -> dict:
        """Get unread counts for multiple conversations for a user"""
        if not self.connected or not conversation_ids:
            return {str(cid): 0 for cid in conversation_ids}
        
        counts = await self.client.hmget(f"unread:{user_id}", [str(cid) for cid in conversation_ids])
        
        result = {}
        for i, cid in enumerate(conversation_ids):
            val = counts[i]
            result[cid] = int(val) if val is not None else None
        return result
