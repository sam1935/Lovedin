/**
 * Centralized Authentication Utilities
 * 
 * Single source of truth for authentication validation logic.
 * Used across the application to maintain consistency and reduce code duplication.
 * 
 * @module lib/utils/auth
 */

/**
 * Check if a token is valid and not expired
 * 
 * @param token - The access token to validate
 * @param expiresAt - Token expiration timestamp in milliseconds
 * @returns true if token exists and hasn't expired, false otherwise
 */
export function isTokenValid(
    token: string | null,
    expiresAt: number | null
): boolean {
    if (!token) return false;
    if (!expiresAt) return false;

    // Check if token has expired
    return Date.now() < expiresAt;
}

/**
 * Check if user has valid authentication state
 * 
 * Validates that both access and refresh tokens exist and the access token is not expired.
 * This is the primary method to check authentication status across the application.
 * 
 * @param accessToken - The access token
 * @param refreshToken - The refresh token
 * @param expiresAt - Access token expiration timestamp in milliseconds
 * @returns true if user is authenticated with valid tokens, false otherwise
 */
export function isAuthenticated(
    accessToken: string | null,
    refreshToken: string | null,
    expiresAt: number | null
): boolean {
    // Must have both tokens
    const hasTokens = !!(accessToken && refreshToken);

    // Access token must be valid and not expired
    const tokenValid = isTokenValid(accessToken, expiresAt);

    return hasTokens && tokenValid;
}
