"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/admin/components/ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/admin/components/ui/Tabs";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { getAdminAuthService } from "@/services/adminAuthService";
import { useAdminAuthStore } from "@/stores/adminAuthStore";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

interface AdminProfileModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AdminProfileModal({ open, onOpenChange }: AdminProfileModalProps) {
    const adminUser = useAdminAuthStore((s) => s.adminUser);
    const setAdminAuth = useAdminAuthStore((s) => s.setAdminAuth);
    const { accessToken, refreshToken, tokenType, expiresAt } = useAdminAuthStore((s) => s);

    const [email, setEmail] = useState("");

    // Password states
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Reset states when modal opens
    useEffect(() => {
        if (open && adminUser) {
            setEmail(adminUser.email);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            setError(null);
            setSuccess(null);
        }
    }, [open, adminUser]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            const res = await getAdminAuthService().updateAdminProfile({ email });

            // Update store
            if (accessToken && refreshToken && tokenType && expiresAt && res.data) {
                setAdminAuth({
                    accessToken,
                    refreshToken,
                    tokenType,
                    expiresAt,
                    adminUser: {
                        ...adminUser!,
                        ...res.data
                    }
                });
            }

            setSuccess("Profile updated successfully");
        } catch (err: unknown) {
            setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            await getAdminAuthService().updateAdminPassword({
                old_password: oldPassword,
                new_password: newPassword
            });
            setSuccess("Password updated successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: unknown) {
            const errorResponse = err as { response?: { status?: number; data?: { message?: string } } };
            // Handle 422 validation errors specifically if needed, or generic
            if (errorResponse.response?.status === 422) {
                setError("Validation error. Please check your inputs.");
            } else {
                setError(errorResponse.response?.data?.message || "Failed to update password");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Admin Profile</DialogTitle>
                    <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
                        <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                        </button>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile" className="w-full">Profile Info</TabsTrigger>
                        <TabsTrigger value="password" className="w-full">Password</TabsTrigger>
                    </TabsList>

                    {/* Messages */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
                            {success}
                        </div>
                    )}

                    <TabsContent value="profile" className="mt-4 mb-3 space-y-4">
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="password" className="mt-4 space-y-4">
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Password</label>
                                <Input
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    required
                                    endAdornment={
                                        <button
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            className="focus:outline-none"
                                        >
                                            {showOldPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </button>
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">New Password</label>
                                <Input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    endAdornment={
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="focus:outline-none"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </button>
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Confirm New Password</label>
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                    endAdornment={
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="focus:outline-none"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </button>
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
