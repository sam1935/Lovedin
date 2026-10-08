/**
 * Centralized Axios Instance for Admin with Token Refresh
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

// ============================================================================
// TYPES
// ============================================================================

interface QueuedRequest {
    resolve: (value?: unknown) => void;
    reject: (error?: unknown) => void;
    config: InternalAxiosRequestConfig;
}

// ============================================================================
// TOKEN REFRESH STATE
// ============================================================================

let isRefreshing = false;
let failedRequestsQueue: QueuedRequest[] = [];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function isTokenExpiringSoon(): boolean {
    const { expiresAt } = useAdminAuthStore.getState();

    if (!expiresAt) return false;

    const expirationTime = expiresAt;
    const currentTime = Date.now();
    const twentySeconds = 20 * 1000;

    return (expirationTime - currentTime) < twentySeconds;
}

async function refreshAccessToken(): Promise<string | null> {
    const { refreshToken, setAdminAuth, logoutAdmin } = useAdminAuthStore.getState();

    if (!refreshToken) {
        console.warn("⚠️ No admin refresh token available - cannot refresh access token");
        // Don't logout immediately here, just return null so the interceptor can decide
        // But if we are in this function, it means we WANTED to refresh. 
        // If we can't, the subsequent request will likely fail with 401, triggering logout then.
        // However, for safety and to avoid loops, returning null is correct.
        return null;
    }

    try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

        // Correct endpoint per user spec
        const response = await axios.post(`${baseURL}/api/admin/auth/refresh`, {
            refresh_token: refreshToken,
        });

        const { access_token, refresh_token: new_refresh_token, token_type, expires_in, user } = response.data;

        if (!access_token) {
            throw new Error("No access_token in refresh response");
        }

        // Default to 24h if 0 is returned
        const expiryDuration = expires_in && expires_in > 0 ? expires_in : 86400;
        const expiresAt = Date.now() + (expiryDuration * 1000);

        // Update admin auth store
        const currentState = useAdminAuthStore.getState();

        setAdminAuth({
            accessToken: access_token,
            refreshToken: new_refresh_token || refreshToken, // Use new refresh token if provided, else keep old
            tokenType: token_type || "Bearer",
            expiresAt: expiresAt,
            adminUser: user || currentState.adminUser, // Update user if provided
        });

        return access_token;
    } catch (error: unknown) {
        const err = error as { response?: { data?: unknown; status?: number }; message?: string };
        console.error("❌ Admin token refresh failed:", err.response?.data || err.message);
        // We only logout if the refresh actually FAILED at the server level (e.g. invalid token)
        // or network error. 
        if (err.response?.status === 401 || err.response?.status === 403) {
            logoutAdmin();
            redirectToAdminLogin();
        }
        return null;
    }
}

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

function redirectToAdminLogin() {
    if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (!currentPath.includes("/admin/login")) {
            window.location.href = "/admin/login";
        }
    }
}

// ============================================================================
// AXIOS INSTANCE CREATION
// ============================================================================

function createAdminAxiosInstance(): AxiosInstance {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseURL) {
        console.error("❌ NEXT_PUBLIC_API_BASE_URL is not defined!");
    }

    const instance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000,
    });

    // Request Interceptor
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Skip token for auth endpoints (login/refresh)
            // Login: /api/admin/login
            // Refresh: /api/admin/auth/refresh
            const isAuthEndpoint = config.url?.includes("/api/admin/login") || config.url?.includes("/api/admin/auth/refresh");

            if (isAuthEndpoint) {
                return config;
            }

            const { accessToken } = useAdminAuthStore.getState();

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;

                if (isTokenExpiringSoon() && !isRefreshing) {
                    isRefreshing = true;
                    const newToken = await refreshAccessToken();
                    isRefreshing = false;

                    if (newToken) {
                        config.headers.Authorization = `Bearer ${newToken}`;
                    }
                }
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response Interceptor
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
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

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = await refreshAccessToken();

                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        processQueue(null, newToken);
                        return instance(originalRequest);
                    } else {
                        processQueue(error, null);
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    processQueue(error, null);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

let adminAxiosInstance: AxiosInstance | null = null;

export function getAdminAxiosInstance(): AxiosInstance {
    if (!adminAxiosInstance) {
        adminAxiosInstance = createAdminAxiosInstance();
    }
    return adminAxiosInstance;
}

export default getAdminAxiosInstance();
