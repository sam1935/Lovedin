"use client";

import { useState, useEffect } from "react";
import {
    MoreHorizontal,
    Edit,
    Trash2,
    Crown,
    CheckCircle,
    XCircle,
    Clock,
    Loader2
} from "lucide-react";
import { showErrorToast } from "@/lib/utils/toast";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/admin/components/ui/Avatar";
import { Badge } from "@/app/admin/components/ui/Badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/admin/components/ui/DropdownMenu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/admin/components/ui/Select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/admin/components/ui/Table";
import { getAdminUserService, User, UpdateUserData, GetUsersParams } from "@/services/adminUserService";
import EditUserModal from "./components/EditUserModal";
import DeleteUserModal from "./components/DeleteUserModal";


const statusConfig = {
    active: { label: "Active", icon: CheckCircle, className: "bg-green-50 text-green-600 border-green-200" },
    pending: { label: "Pending", icon: Clock, className: "bg-yellow-50 text-yellow-600 border-yellow-200" },
    suspended: { label: "Suspended", icon: XCircle, className: "bg-red-50 text-red-600 border-red-200" },
    deleted: { label: "Deleted", icon: Trash2, className: "bg-gray-100 text-gray-500 border-gray-200" },
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [subscriptionFilter, setSubscriptionFilter] = useState("all");

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true); // Since API provides skip/limit but not always total count in simple list, we might guess or check length

    // Actions
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const skip = (page - 1) * limit;
            const params: GetUsersParams = { skip, limit };
            if (searchQuery) params.search = searchQuery;
            if (subscriptionFilter !== "all") params.subscription_type = subscriptionFilter;

            const fetchedUsers = await getAdminUserService().getUsers(params);

            // Deduplicate users in case API returns duplicates (e.g. bad joins)
            const uniqueUsers = Array.from(new Map(fetchedUsers.map(u => [u.id, u])).values());

            setUsers(uniqueUsers);
            setHasMore(fetchedUsers.length >= limit);

        } catch (error: unknown) {
            console.error("Error fetching users:", error);
            showErrorToast("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const timeoutId = setTimeout(() => {
            setPage(1); // Reset to first page on filter change
            fetchData();
        }, 500);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, subscriptionFilter]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Trigger on page change

    const handleDelete = async (userId: string, hard: boolean) => {
        try {
            await getAdminUserService().deleteUser(userId, hard);
            // Refresh list
            fetchData();
            setUserToDelete(null);
        } catch (error: unknown) {
            console.error("Error deleting user:", error);
            showErrorToast("Failed to delete user");
        }
    };

    const handleUpdateUser = async (userId: string, data: UpdateUserData) => {
        try {
            await getAdminUserService().updateUser(userId, data);
            fetchData();
        } catch (error: unknown) {
            console.error("Error updating user:", error);
            showErrorToast("Failed to update user");
            throw error;
        }
    };

    const getUserStatus = (user: User) => {
        if (user.is_deleted) return "deleted";
        if (!user.is_active) return "suspended"; // or inactive
        // if (!user.is_profile_verified) return "pending"; // Maybe? Or just active but unverified
        return "active";
    };

    const getStatusObject = (statusKey: string) => {
        return statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.active;
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">
                    Manage and monitor all platform users
                </p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}

                    />
                </div>
                <div className="flex gap-3">
                    <div className="w-36">
                        <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Plans</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="free">Free</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[280px]">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Badges</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    <div className="flex justify-center items-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                                        <span className="ml-2 text-gray-500">Loading users...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => {
                                const statusKey = getUserStatus(user);
                                const status = getStatusObject(statusKey);
                                const StatusIcon = status.icon;
                                const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Unknown Name";

                                return (
                                    <TableRow key={user.id} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10">
                                                        {user.photo_url ? (
                                                            <AvatarImage src={user.photo_url} className="object-cover" />
                                                        ) : (
                                                            <AvatarFallback className="bg-pink-100 text-pink-600">
                                                                {fullName.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        )}
                                                    </Avatar>
                                                    {user.is_profile_verified && (
                                                        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                                                            <CheckCircle className="h-3 w-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-gray-900">{fullName}</p>
                                                        {user.subscription_type?.toLowerCase() === "premium" && (
                                                            <Crown className="h-3.5 w-3.5 text-yellow-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {user.email || user.phone || "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`capitalize ${user.role === 'admin'
                                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                    : 'bg-gray-50 text-gray-600 border-gray-200'
                                                    }`}
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={status.className}>
                                                <StatusIcon className="mr-1 h-3 w-3" />
                                                {status.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    user.subscription_type?.toLowerCase() === "premium"
                                                        ? "bg-pink-50 text-pink-600 border-pink-200"
                                                        : "bg-gray-100 text-gray-600"
                                                }
                                            >
                                                {user.subscription_type || "Free"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.active_badges && user.active_badges.length > 0 ? (
                                                    user.active_badges.map((badge, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="bg-purple-50 text-purple-700 border-purple-200 text-xs px-2 py-0.5 whitespace-nowrap"
                                                        >
                                                            {badge.split(" ")[0]}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-400">No Badge</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => {
                                                        setUserToEdit(user);
                                                        setIsEditOpen(true);
                                                    }}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => {
                                                            setUserToDelete(user);
                                                            setIsDeleteOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Account
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <p>Page {page}</p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="px-3"
                        disabled={page === 1 || isLoading}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        className="px-3"
                        disabled={!hasMore || isLoading}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Modals */}
            <DeleteUserModal
                user={userToDelete}
                open={isDeleteOpen}
                onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) setUserToDelete(null);
                }}
                onConfirm={handleDelete}
            />

            <EditUserModal
                user={userToEdit}
                open={isEditOpen}
                onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) setUserToEdit(null);
                }}
                onSave={handleUpdateUser}
            />
        </div>
    );
}
