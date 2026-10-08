import { ReactNode } from "react";
import Image from "next/image";

interface AvatarProps {
    className?: string;
    children: ReactNode;
}

export function Avatar({ className = "", children }: AvatarProps) {
    return (
        <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
            {children}
        </div>
    );
}

export function AvatarImage({ src, className = "" }: { src: string; className?: string }) {
    return (
        <div className={`relative h-full w-full ${className}`}>
            <Image
                src={src}
                alt="Avatar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}

export function AvatarFallback({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 ${className}`}>
            {children}
        </div>
    );
}
