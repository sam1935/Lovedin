"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "../components/AdminSidebar";
import AdminAuthGuard from "@/lib/auth/AdminAuthGuard";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-gray-50">
                <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <main
                    className={`min-h-screen transition-all duration-300 ${collapsed ? "ml-[90px]" : "ml-64"
                        }`}
                >
                    {children}
                </main>
            </div>
        </AdminAuthGuard>
    );
}
