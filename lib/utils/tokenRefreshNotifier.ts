/**
 * Token Refresh Notifier
 * 
 * Centralized mechanism to notify services when token is refreshed
 * Avoids circular dependencies between axios and WebSocket service
 */

type TokenRefreshCallback = (newToken: string) => void;

class TokenRefreshNotifier {
  private static instance: TokenRefreshNotifier | null = null;
  private callbacks: Set<TokenRefreshCallback> = new Set();

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): TokenRefreshNotifier {
    if (!TokenRefreshNotifier.instance) {
      TokenRefreshNotifier.instance = new TokenRefreshNotifier();
    }
    return TokenRefreshNotifier.instance;
  }

  /**
   * Subscribe to token refresh events
   */
  subscribe(callback: TokenRefreshCallback): () => void {
    this.callbacks.add(callback);

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Notify all subscribers that token was refreshed
   */
  notify(newToken: string): void {

    this.callbacks.forEach((callback) => {
      try {
        callback(newToken);
      } catch (error) {
        console.error("Error in token refresh callback:", error);
      }
    });
  }

  /**
   * Clear all subscriptions
   */
  clear(): void {
    this.callbacks.clear();
  }
}

// Export singleton getter
export const getTokenRefreshNotifier = (): TokenRefreshNotifier =>
  TokenRefreshNotifier.getInstance();

export default TokenRefreshNotifier;
