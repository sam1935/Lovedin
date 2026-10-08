from typing import Optional
from app.core.logger import get_logger
logger = get_logger(__name__)
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session_utils import get_db as get_async_session
from app.models.user import User, UserRole
from app.models.onboarding_progress import OnboardingProgress
from app.utils.auth import (
    create_access_token,
    create_refresh_token
)
from jose import JWTError, jwt
from jose.exceptions import ExpiredSignatureError
from app.core.auth_config import AuthConfig

# Security scheme for Bearer token
oauth2_scheme = HTTPBearer(auto_error=False)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_async_session)
) -> User:
    """
    Dependency to get current authenticated user from JWT token
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    
    try:
        # Verify and decode token
        try:
            payload = jwt.decode(
                token,
                AuthConfig.SECRET_KEY,
                algorithms=[AuthConfig.JWT_ALGORITHM]
            )
            
            # Validate token type
            if payload.get("type") != "access":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token type",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        except ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Get user from database
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Query the database for the user
        from uuid import UUID
        try:
            # Ensure user_id is a valid UUID string
            user_uuid = UUID(str(user_id))
            logger.info(f"Extracted user_id from token: {user_id}")

            result = await db.execute(
                select(User).where(User.id == user_uuid)
            )
            user = result.scalars().first()

            if user:
                if user.is_deleted:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Account has been deleted",
                        headers={"WWW-Authenticate": "Bearer"},
                    )
                if not user.is_active:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Account is inactive",
                        headers={"WWW-Authenticate": "Bearer"},
                    )
            # logger.info(f"User found in DB: {user is not None}")


        except (ValueError, AttributeError) as e:
            # Handle case where user_id is not a valid UUID
            logger.info(e)
            user = None
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found or inactive"
            )
            
        return user
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency to ensure user is active
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    return current_user

async def get_current_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency to ensure user has admin role
    """
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

async def get_current_superuser(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency to ensure user has superuser role
    """
    if current_user.role != UserRole.SUPERUSER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

# Optional authentication (no error if not authenticated)
async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_async_session)
) -> Optional[User]:
    """
    Optional authentication - returns None if not authenticated
    """
    if not credentials:
        return None
    
    try:
        return await get_current_user(credentials, db)
    except HTTPException:
        return None

async def get_verified_user(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_async_session)
) -> User:
    """
    Dependency to ensure user has completed onboarding and photo verification
    """
    # Check onboarding progress
    result = await db.execute(
        select(OnboardingProgress).where(OnboardingProgress.user_id == current_user.id)
    )
    progress = result.scalars().first()
    
    if not progress:
        # Should not happen for active users normally, but safe to handle
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Onboarding not started"
        )
        
    if not progress.completed_at:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Onboarding not completed"
        )
        
    if not progress.photo_verification_completed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Photo verification required"
        )
        
    return current_user

