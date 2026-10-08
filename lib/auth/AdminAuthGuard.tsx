"use client";

import { useAdminAuthStore } from "@/stores/adminAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export default function AdminAuthGuard({ children }: { children: ReactNode }) {
    const isAdminAuthenticated = useAdminAuthStore((s) => s.isAdminAuthenticated());
    const refreshToken = useAdminAuthStore((s) => s.refreshToken);
    const logoutAdmin = useAdminAuthStore((s) => s.logoutAdmin);
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const [hasHydrated, setHasHydrated] = useState(false);

    // Handle hydration
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasHydrated(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Main authentication check
    useEffect(() => {
        if (!hasHydrated) return;

        let isMounted = true;

        async function checkAuth() {
            // No tokens - redirect to login
            if (!refreshToken && !isAdminAuthenticated) {
                if (isMounted) router.replace("/admin/login");
                // Do NOT set isLoading to false here
                return;
            }

            // Token expired
            if (!isAdminAuthenticated && !refreshToken) {
                if (isMounted) {
                    logoutAdmin();
                    router.replace("/admin/login");
                }
                // Do NOT set isLoading to false here
                return;
            }

            // If we get here, we are authenticated (or have a token to refresh, handled by other logic/axios interceptors usually)
            // But for this guard, if we have tokens, we let them through.
            // If the token is invalid, the API calls will fail 401 and the interceptor should handle logout.
            // OR if we want strict checking here we'd verify the token. 
            // Based on existing code, we just check existence/expiry state from store.

            // The issue was finally block running even on redirect.
            // We only want to stop loading if we are NOT redirecting.
            if (isMounted) {
                setIsLoading(false);
            }
        }

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [hasHydrated, isAdminAuthenticated, refreshToken, pathname, router, logoutAdmin]);

    // Show loading state
    if (!hasHydrated || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-purple-50">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
