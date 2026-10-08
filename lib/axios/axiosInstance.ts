/**
 * Centralized Axios Instance with Token Refresh
 * 
 * Professional implementation of JWT token refresh flow:
 * - Automatically refreshes token on 401 errors
 * - Queues failed requests and retries after refresh
 * - Proactively refreshes token before expiration
 * - Single source of truth for all API calls
 * 
 * Best Practices:
 * - Request queuing prevents multiple refresh calls
 * - Failed requests automatically retry with new token
 * - Token expiration check on every request
 * - Clean separation of concerns
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/authStore";
import { getTokenRefreshNotifier } from "@/lib/utils/tokenRefreshNotifier";
import { handleLogout } from "@/services/_serviceUtils";

// ============================================================================
// TYPES
// ============================================================================

interface QueuedRequest {
  resolve: (value: InternalAxiosRequestConfig) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig;
}

// ============================================================================
// TOKEN REFRESH STATE
// ============================================================================

let isRefreshing = false;
let failedRequestsQueue: QueuedRequest[] = [];
let sessionExpiredHandled = false;

/**
 * Clear auth and send user to login once when the session can no longer be refreshed.
 */
function forceSessionExpiry(reason: string) {
  if (sessionExpiredHandled) return;
  sessionExpiredHandled = true;
  isRefreshing = false;
  failedRequestsQueue = [];
  void handleLogout(reason);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if token is expired or will expire soon (within 20 seconds)
 * This provides a buffer to refresh the token before it actually expires
 */
function isTokenExpiringSoon(): boolean {
  const { expiresAt } = useAuthStore.getState();

  if (!expiresAt) return false;

  const expirationTime = expiresAt; // Already in milliseconds timestamp
  const currentTime = Date.now();
  const twentySeconds = 20 * 1000; // 20 seconds in milliseconds

  return (expirationTime - currentTime) < twentySeconds;
}

/**
 * Refresh the access token using refresh token
 */
export async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken, setAuth } = useAuthStore.getState();

  if (!refreshToken) {
    console.error("❌ No refresh token available");
    forceSessionExpiry("No refresh token available");
    return null;
  }

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Call refresh token API with current refresh token
    const response = await axios.post(`${baseURL}/api/auth/refresh`, {
      refresh_token: refreshToken, // Send the refresh token from store
    });

    // Handle refresh API response format: { access_token, token_type, expires_in }
    const { access_token, token_type, expires_in } = response.data;

    if (!access_token) {
      throw new Error("No access_token in refresh response");
    }

    // Calculate expiration timestamp (current time + expires_in seconds)
    const expiresAt = Date.now() + (expires_in * 1000);

    const { user } = useAuthStore.getState();

    // Update auth store with new access token
    // Note: Keep the same refresh token (API doesn't return a new one)
    setAuth({
      accessToken: access_token,
      refreshToken: refreshToken, // Keep existing refresh token
      tokenType: token_type,
      expiresAt: expiresAt,
      user: user, // Preserve existing user data
    });

    // Notify all services about token refresh
    if (typeof window !== "undefined") {
      try {
        const notifier = getTokenRefreshNotifier();
        notifier.notify(access_token);
      } catch (error) {
        console.warn("Could not notify token refresh:", error);
      }
    }

    return access_token;
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    console.error("❌ Token refresh failed:", {
      message: (error as Error).message,
      response: axiosError.response?.data,
      status,
    });

    // Invalid/expired refresh token — force re-login
    if (status === 401 || status === 403) {
      forceSessionExpiry("Refresh token expired or invalid");
      return null;
    }

    // Network / unknown error: only kick out if access token is already unusable
    const { accessToken, expiresAt } = useAuthStore.getState();
    const accessUnusable =
      !accessToken || (expiresAt != null && Date.now() >= expiresAt);
    if (accessUnusable) {
      forceSessionExpiry("Token refresh failed and access token is unusable");
    }

    return null;
  }
}

/**
 * Process queued requests after token refresh
 */
function processQueue(error: AxiosError | null, token: string | null = null) {
  failedRequestsQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.config.headers.Authorization = `Bearer ${token}`;
      request.resolve(request.config);
    }
  });

  failedRequestsQueue = [];
}

// ============================================================================
// AXIOS INSTANCE CREATION
// ============================================================================

/**
 * Create authenticated axios instance with interceptors
 */
function createAxiosInstance(): AxiosInstance {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;



  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  // ============================================================================
  // REQUEST INTERCEPTOR
  // ============================================================================

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {


      // Public endpoints that NEVER need a token
      const publicPaths = [
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/forgot-password",
        "/api/auth/reset-password",
        "/api/auth/verify-email",
        "/api/auth/refresh", // Refresh handles its own token
        "/api/auth/mfa/verify-login",
        "/api/auth/mfa/recovery/verify"
      ];

      const isPublicEndpoint = publicPaths.some(path => config.url?.includes(path));

      if (isPublicEndpoint) {
        return config;
      }

      // Get access token from store
      const { accessToken } = useAuthStore.getState();



      // Attach token if available
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;

        // Proactively refresh token if expiring soon (within 20 seconds)
        if (isTokenExpiringSoon() && !isRefreshing) {
          isRefreshing = true;
          const newToken = await refreshAccessToken();
          isRefreshing = false;

          if (newToken) {
            config.headers.Authorization = `Bearer ${newToken}`;
          } else if (sessionExpiredHandled) {
            // Session cleared — don't send the request with a dead token
            return Promise.reject(new Error("Session expired"));
          }
        }
      } else {
        console.warn("⚠️  No access token found in store");
      }

      return config;
    },
    (error) => {
      console.error("❌ Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // ============================================================================
  // RESPONSE INTERCEPTOR
  // ============================================================================

  instance.interceptors.response.use(
    (response) => {
      // Handle cases where the API returns success: false with a 200 OK status
      if (response.data && response.data.success === false) {
        // We reject with the response so catch blocks have access to the data
        return Promise.reject({
          response,
          message: response.data.message || "An error occurred.",
          isBusinessError: true
        });
      }
      return response;
    },
    async (error: AxiosError) => {
      console.error("❌ Response error:", error.response?.status, error.config?.url, error.message);

      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized errors
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {

        // If already refreshing, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve,
              reject,
              config: originalRequest,
            });
          })
            .then((config) => instance(config as InternalAxiosRequestConfig))
            .catch((err) => Promise.reject(err));
        }

        // Mark request as retried to prevent infinite loop
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();

          if (newToken) {
            // Update authorization header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Process queued requests
            processQueue(null, newToken);

            // Retry original request with new token
            return instance(originalRequest);
          }

          // refreshAccessToken already forces logout on 401/403
          processQueue(error, null);
          return Promise.reject(error);
        } catch (refreshError) {
          processQueue(error, null);
          forceSessionExpiry("Token refresh threw an error");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other errors
      return Promise.reject(error);
    }
  );

  return instance;
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

let axiosInstance: AxiosInstance | null = null;

/**
 * Get or create the singleton axios instance
 */
export function getAxiosInstance(): AxiosInstance {
  if (!axiosInstance) {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


    if (!baseURL) {
      console.error("❌ NEXT_PUBLIC_API_BASE_URL is not defined!");
      throw new Error("API base URL is not configured");
    }

    axiosInstance = createAxiosInstance();

  }
  return axiosInstance;
}

/**
 * Reset the axios instance (useful for testing or logout)
 */
export function resetAxiosInstance(): void {
  axiosInstance = null;
  isRefreshing = false;
  failedRequestsQueue = [];
  sessionExpiredHandled = false;
}

// Default export
export default getAxiosInstance();
