"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/admin/components/ui/Dialog";
import Button from "@/app/components/ui/Button";
import { User, UpdateUserData } from "@/services/adminUserService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/admin/components/ui/Select";
// import { Label } from "@/app/components/ui/Label"; // Removed as it doesn't exist
import { Switch } from "@/app/admin/components/ui/Switch"; // Corrected import
import { Loader2 } from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";
import LookupService, { LookupBadge } from "@/services/lookupService";
import Image from "next/image";

interface EditUserDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (userId: string, data: UpdateUserData) => Promise<void>;
}

// Map badge names/codes to local icons
const BADGE_ICON_MAP: Record<string, string> = {
    "verified": "/icons/verified_user_badge.svg",
    "millionaire": "/icons/millionaire_badge_icon.svg",
    "vip": "/icons/diamond_icon.svg", // Example fallback
    // Add more mappings as needed based on exact badge names from API
};

export default function EditUserModal({ user, open, onOpenChange, onSave }: EditUserDialogProps) {
    const [role, setRole] = useState<string>("user");
    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    // Badge State
    const [availableBadges, setAvailableBadges] = useState<LookupBadge[]>([]);
    const [selectedBadgeIds, setSelectedBadgeIds] = useState<string[]>([]);
    const [isLoadingBadges, setIsLoadingBadges] = useState(false);

    useEffect(() => {
        if (open) {
            fetchBadges();
        }
    }, [open]);

    useEffect(() => {
        if (user) {
            setRole(user.role || "user");
            setIsPremium(user.subscription_type?.toLowerCase() === 'premium');
            setIsActive(user.is_active);
            setIsDeleted(!!user.is_deleted);

            // Sync existing badges
            // Assuming user.active_badges contains badge names or IDs
            // We need to wait for availableBadges to be loaded to map names to IDs if necessary
            if (availableBadges.length > 0 && user.active_badges) {
                const existingIds = user.active_badges.map(userBadge => {
                    // Try to find by ID first
                    const matchById = availableBadges.find(b => b.id === userBadge);
                    if (matchById) return matchById.id;

                    // Try to find by Name (case insensitive)
                    const matchByName = availableBadges.find(b => b.name?.toLowerCase() === userBadge.toLowerCase());
                    if (matchByName) return matchByName.id;

                    return null;
                }).filter(Boolean) as string[];

                setSelectedBadgeIds(existingIds);
            } else {
                setSelectedBadgeIds([]);
            }
        }
    }, [user, availableBadges]);

    const fetchBadges = async () => {
        setIsLoadingBadges(true);
        try {
            const response = await LookupService.getInstance().getBadges();
            setAvailableBadges(Array.isArray(response.data) ? response.data : []);
        } catch (error: unknown) {
            console.error("Failed to fetch badges", error);
            // Don't block the modal, just show empty badges
        } finally {
            setIsLoadingBadges(false);
        }
    };

    const toggleBadge = (badgeId: string) => {
        setSelectedBadgeIds(prev =>
            prev.includes(badgeId)
                ? prev.filter(id => id !== badgeId)
                : [...prev, badgeId]
        );
    };

    const handleSave = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            await onSave(user.id, {
                role,
                is_premium: isPremium,
                is_active: isActive,
                is_deleted: isDeleted,
                badge_ids: selectedBadgeIds,
            });
            showSuccessToast("User updated successfully");
            onOpenChange(false);
        } catch (error: unknown) {
            console.error("Failed to save user", error);
            showErrorToast("Failed to update user");
        } finally {
            setIsLoading(false);
        }
    };

    const getBadgeIcon = (badge: LookupBadge) => {
        if (badge.icon_url) return badge.icon_url;
        // Fallback to local map based on name
        const key = (badge.name || "").toLowerCase();
        // Check for partial matches or exact keys
        for (const [mapParams, path] of Object.entries(BADGE_ICON_MAP)) {
            if (key.includes(mapParams)) return path;
        }
        return "/icons/verified_user_badge.svg"; // Default fallback
    };

    if (!open) return null;

    return (
        <Dialog>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit User Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Role Selection */}
                    <div className="space-y-2">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            User Role
                        </label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-full border-gray-200 focus:ring-pink-100">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                            Determines the user&apos;s access level within the application.
                        </p>
                    </div>

                    <div className="border-t border-gray-50 my-4" />

                    {/* Account Settings Grid */}
                    <div className="space-y-3">
                        {/* Premium Status */}
                        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="space-y-1">
                                <label htmlFor="premium" className="text-sm font-medium text-gray-900 block cursor-pointer">
                                    Premium Subscription
                                </label>
                                <p className="text-xs text-gray-500">
                                    Enable to grant access to premium features.
                                </p>
                            </div>
                            <Switch
                                id="premium"
                                checked={isPremium}
                                onCheckedChange={setIsPremium}
                            />
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="space-y-1">
                                <label htmlFor="active" className="text-sm font-medium text-gray-900 block cursor-pointer">
                                    Account Status
                                </label>
                                <p className="text-xs text-gray-500">
                                    Disable to suspend user login access.
                                </p>
                            </div>
                            <Switch
                                id="active"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                            />
                        </div>

                        {/* Deleted Status */}
                        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="space-y-1">
                                <label htmlFor="deleted" className="text-sm font-medium text-gray-900 block cursor-pointer">
                                    Soft Delete
                                </label>
                                <p className="text-xs text-gray-500">
                                    Mark account as deleted (hidden from app).
                                </p>
                            </div>
                            <Switch
                                id="deleted"
                                checked={isDeleted}
                                onCheckedChange={setIsDeleted}
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-50 my-4" />

                    {/* Badges Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-900">
                                Assigned Badges
                            </label>
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                {selectedBadgeIds.length} selected
                            </span>
                        </div>

                        <div className="p-4 border border-gray-100 rounded-xl bg-slate-50/50 min-h-[100px]">
                            {isLoadingBadges ? (
                                <div className="flex items-center justify-center h-20 text-sm text-gray-500">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-pink-500" /> Loading available badges...
                                </div>
                            ) : availableBadges.length === 0 ? (
                                <div className="flex items-center justify-center h-20 text-sm text-gray-500 italic">
                                    No badges found in system.
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {availableBadges.map(badge => {
                                        const isSelected = selectedBadgeIds.includes(badge.id);
                                        return (
                                            <div
                                                key={badge.id}
                                                onClick={() => toggleBadge(badge.id)}
                                                className={`
                                                    cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border transition-all select-none text-sm group
                                                    ${isSelected
                                                        ? "bg-white border-pink-200 shadow-sm ring-1 ring-pink-100 text-pink-700"
                                                        : "bg-white border-gray-200 text-gray-600 hover:border-pink-200 hover:shadow-sm hover:text-gray-900"
                                                    }
                                                `}
                                            >
                                                <div className={`relative w-4 h-4 shrink-0 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                                    <Image
                                                        src={getBadgeIcon(badge)}
                                                        alt={badge.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="font-medium">
                                                    {badge.name}
                                                </span>
                                                {isSelected && (
                                                    <span className="ml-1 text-pink-500 text-xs">✓</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500">
                            Click on a badge to toggle its assignment for this user.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
