"use client";

import { ReactNode } from "react";

export function Dialog({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export function DialogTrigger({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
    return <>{children}</>;
}

export function DialogContent({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`w-full max-w-lg rounded-lg bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95 ${className}`}>
                {children}
            </div>
        </div>
    );
}

export function DialogHeader({ children }: { children: ReactNode }) {
    return <div className="mb-4 space-y-1.5 text-center sm:text-left">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-lg font-semibold leading-none tracking-tight">{children}</h2>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
    return <p className="text-sm text-gray-500">{children}</p>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
    return <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">{children}</div>;
}
