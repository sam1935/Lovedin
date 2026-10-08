"use client";

import { InputHTMLAttributes } from "react";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    onCheckedChange?: (checked: boolean) => void;
}

export function Switch({ className = "", checked, onCheckedChange, ...props }: SwitchProps) {
    return (
        <label className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${checked ? "bg-pink-600" : "bg-gray-200"} ${className}`}>
            <input
                type="checkbox"
                className="peer sr-only"
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                {...props}
            />
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </label>
    );
}
