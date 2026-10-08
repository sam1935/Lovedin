"use client";

import { useState } from "react";
import { User } from "@/services/adminUserService";
import ConfirmationModal from "@/app/components/ui/ConfirmationModal";
import { Switch } from "@/app/admin/components/ui/Switch";
import { showSuccessToast, showErrorToast } from "@/lib/utils/toast";

interface DeleteUserModalProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (userId: string, hard: boolean) => Promise<void>;
}

export default function DeleteUserModal({ user, open, onOpenChange, onConfirm }: DeleteUserModalProps) {
    const [isHardDelete, setIsHardDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            await onConfirm(user.id, isHardDelete);
            showSuccessToast("User deleted successfully");
            onOpenChange(false);
        } catch (error: unknown) {
            console.error("Failed to delete user", error);
            showErrorToast("Failed to delete user");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <ConfirmationModal
            open={open}
            title={isHardDelete ? "Permanently Delete User" : "Delete User"}
            description={
                <div className="space-y-4">
                    <p>
                        Are you sure you want to delete <strong>{user.email}</strong>?
                        {isHardDelete
                            ? " This action CANNOT be undone. All data will be permanently removed."
                            : " This will perform a soft delete. The user can be restored later (if implemented)."}
                    </p>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="hard-delete"
                            checked={isHardDelete}
                            onCheckedChange={setIsHardDelete}
                        />
                        <label htmlFor="hard-delete" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Perform Hard Delete (Permanent)
                        </label>
                    </div>
                </div>
            }
            onConfirm={handleConfirm}
            onCancel={() => onOpenChange(false)}
            confirmText={isHardDelete ? "Permanently Delete" : "Delete"}
            variant="danger"
            isLoading={isLoading}
        />
    );
}
