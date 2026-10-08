"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    CreditCard,
    ChevronLeft,
    LogOut,
    LucideIcon,
} from "lucide-react";
import { useAdminAuthStore } from "@/stores/adminAuthStore";
import Image from "next/image";
import AdminProfileModal from "./AdminProfileModal";

const navItems: { icon: LucideIcon; label: string; path: string }[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: CreditCard, label: "Payments", path: "/admin/payments" },
];

interface AdminSidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const logoutAdmin = useAdminAuthStore((s) => s.logoutAdmin);
    const adminUser = useAdminAuthStore((s) => s.adminUser);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening profile modal when clicking logout
        logoutAdmin();
        router.push("/admin/login");
    };

    return (
        <>
            <aside
                className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out ${collapsed ? "w-[90px]" : "w-64"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                    <div className="flex items-center gap-3 ml-2">
                        <div className="flex h-9 w-9 items-center justify-center">
                            <Image
                                src={"/logo/lovedin_icon.svg"}
                                alt="Logo"
                                width={37}
                                height={32}
                            />
                        </div>
                        {!collapsed && (
                            <span className="font-semibold text-gray-900">AdminPanel</span>
                        )}
                    </div>
                    <button
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 ml-2"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <ChevronLeft
                            className={`h-4 w-4 transition-transform duration-300 ${collapsed && "rotate-180"
                                }`}
                        />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-pink-50 text-pink-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    } ${collapsed ? "justify-center" : "justify-start px-4"}`}
                            >
                                <item.icon className={`h-5 w-5 shrink-0 ${isActive && "text-pink-600"}`} />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-3 bg-white">
                    <div className="flex items-center gap-2">
                        {/* Profile Trigger */}
                        <div
                            className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-gray-50 transition-all duration-200 group ${collapsed ? "justify-center w-full" : "flex-1 min-w-0"}`}
                            onClick={() => setIsProfileOpen(true)}
                            title="View Profile"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-semibold text-sm ring-2 ring-transparent group-hover:ring-pink-100 transition-all">
                                {adminUser?.email?.charAt(0).toUpperCase() || "A"}
                            </div>
                            {!collapsed && (
                                <div className="flex-1 truncate">
                                    <p className="truncate text-xs font-medium text-gray-700 group-hover:text-gray-900">
                                        {adminUser?.email || "Admin User"}
                                    </p>
                                    <p className="text-[10px] text-gray-400">View Profile</p>
                                </div>
                            )}
                        </div>

                        {/* Logout Section - only shown when expanded */}
                        {!collapsed && (
                            <>
                                <div className="h-8 w-px bg-gray-200" />
                                <button
                                    onClick={handleLogout}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </aside>
            <AdminProfileModal open={isProfileOpen} onOpenChange={setIsProfileOpen} />
        </>
    );
}
