"use client";
import { useAuthStore } from "@/stores/authStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";


export default function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const pathname = usePathname();

  // Profile setup state
  const { completed, fetchStatus } = useOnboardingStore();
  const [profileChecked, setProfileChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Handle hydration - check if we have data from localStorage
  useEffect(() => {
    // Zustand persist loads synchronously in most cases
    // We just need to wait one tick for the store to populate
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 0); // Use 0 to wait for next tick

    return () => clearTimeout(timer);
  }, []);

  // Main authentication and profile check
  useEffect(() => {
    // Wait for hydration
    if (!hasHydrated) {
      return;
    }

    let isMounted = true;

    async function checkAuthAndProfile() {
      try {
        // Case 1: No tokens at all - redirect to login
        if (!refreshToken && !isAuthenticated) {
          if (isMounted) router.replace("/login");
          return;
        }

        // Case 2: Token expired - axios interceptor will handle refresh automatically
        // We don't need to refresh here, just check if we have tokens
        if (!isAuthenticated && !refreshToken) {
          if (isMounted) {
            logout();
            router.replace("/login");
          }
          return;
        }

        // Case 3: Check profile completion (only if authenticated and not already on profile-setup)
        if (
          isAuthenticated &&
          accessToken &&
          !pathname?.startsWith("/profile-setup") &&
          !profileChecked
        ) {
          try {

            await fetchStatus();
            const isCompleted = useOnboardingStore.getState().completed;

            if (isMounted) {
              setProfileChecked(true);

              if (!isCompleted) {

                router.replace("/profile-setup");
                return;
              }
            }
          } catch (error) {
            if (isMounted) {
              setProfileChecked(true);
            }
          }
        }

        // Only set loading to false if we didn't redirect
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        // Safety catch
        console.error("[AuthGuard] Error checking auth:", error);
        if (isMounted) {
          // If error, likely safer to logout or let error boundary handle, 
          // but for now we stop loading to avoid infinite spinner if something weird happens
          setIsLoading(false);
        }
      }
    }

    checkAuthAndProfile();

    return () => {
      isMounted = false;
    };
  }, [
    hasHydrated,
    isAuthenticated,
    refreshToken,
    accessToken,
    pathname,
    profileChecked,
    router,
    logout,
    fetchStatus,
  ]);

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

  // Render children - auth and profile checks complete
  return <>{children}</>;
}
