"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const TabsContext = createContext<{
    activeTab: string;
    setActiveTab: (value: string) => void;
} | null>(null);

interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    className?: string;
    onValueChange?: (value: string) => void;
}

export function Tabs({ defaultValue, children, className = "", onValueChange }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        onValueChange?.(value);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({ value, children, className = "" }: { value: string; children: ReactNode; className?: string }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
        <button
            onClick={() => context.setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive
                    ? "bg-white text-gray-950 shadow-sm"
                    : "hover:bg-gray-200/50 hover:text-gray-900"
                } ${className}`}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children, className = "" }: { value: string; children: ReactNode; className?: string }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
        <div
            className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 animate-in fade-in-0 zoom-in-95 ${className}`}
        >
            {children}
        </div>
    );
}
