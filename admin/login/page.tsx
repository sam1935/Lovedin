"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { getAdminAuthService } from "@/services/adminAuthService";
import { useAdminAuthStore } from "@/stores/adminAuthStore";
import Image from "next/image";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const setAdminAuth = useAdminAuthStore((s) => s.setAdminAuth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const authService = getAdminAuthService();
            const response = await authService.loginAdmin(email, password);

            if (response && response.access_token) {
                console.log("Login successful, handling tokens...", response);
                const { access_token, refresh_token, token_type, expires_in, user } = response;
                const expiryDuration = expires_in && expires_in > 0 ? expires_in : 86400;
                const expiresAt = Date.now() + expiryDuration * 1000;

                setAdminAuth({
                    accessToken: access_token,
                    refreshToken: refresh_token || "", // Handle missing refresh token if any
                    tokenType: token_type || "Bearer",
                    expiresAt,
                    adminUser: user,
                });

                router.push("/admin");
            } else {
                console.error("Unexpected response structure:", response);
                setError("Login failed: Invalid server response");
            }
        } catch (err: unknown) {
            console.error("Login error:", err);
            const errorResponse = err as { 
                response?: { 
                    data?: { 
                        detail?: string | { msg?: string }[];
                        message?: string;
                    } 
                };
                message?: string;
            };

            // Handle specific backend error structure
            const detail = errorResponse.response?.data?.detail;
            if (detail) {
                if (Array.isArray(detail)) {
                    // Handle validation errors array
                    // e.g. [{ loc: [..], msg: "Password too short", type: ".." }]
                    const messages = detail.map((d) => d?.msg || JSON.stringify(d)).join(", ");
                    setError(messages || "Validation error occurred");
                } else if (typeof detail === "string") {
                    // Handle simple error message string
                    setError(detail);
                } else {
                    setError("Login failed. Please check your credentials.");
                }
            } else if (errorResponse.response?.data?.message) {
                setError(errorResponse.response.data.message);
            } else {
                setError(errorResponse.message || "Invalid email or password");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-8 pb-0 text-center space-y-2">
                    {/* <div className="mx-auto w-16 h-16 bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 duration-300"> */}
                    <Image
                        src="/logo/lovedin_logo.svg"
                        alt="Logo"
                        width={200}
                        height={66}
                        className="mx-auto"
                    />
                    {/* </div> */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Enter your credentials to access the admin panel
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg text-center animate-fade-in wrap-break-word">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full"
                            />

                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full"
                                endAdornment={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                }
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 text-base shadow-md hover:shadow-lg transform transition-all active:scale-95"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">
                            Secure Admin Access Area
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
