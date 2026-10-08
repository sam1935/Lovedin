"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    defaultValue?: string;
}

export const SelectContext = React.createContext<{
    value?: string;
    onValueChange?: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
} | null>(null);

import * as React from "react";

export function Select({ children, value, onValueChange, defaultValue }: SelectProps) {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [open, setOpen] = useState(false);

    const handleValueChange = (newValue: string) => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
        setOpen(false);
    };

    const controlledValue = value !== undefined ? value : internalValue;

    return (
        <SelectContext.Provider value={{ value: controlledValue, onValueChange: handleValueChange, open, setOpen }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
}

export function SelectTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
    const context = React.useContext(SelectContext);
    return (
        <button
            onClick={() => context?.setOpen(!context.open)}
            className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
    const context = React.useContext(SelectContext);
    return <span className="block truncate">{context?.value || placeholder}</span>;
}

export function SelectContent({ children }: { children: ReactNode }) {
    const context = React.useContext(SelectContext);
    if (!context?.open) return null;

    return (
        <div className="absolute z-50 top-full mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-md">
            <div className="p-1">{children}</div>
        </div>
    );
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
    const context = React.useContext(SelectContext);
    return (
        <div
            onClick={() => context?.onValueChange?.(value)}
            className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${context?.value === value ? "bg-gray-100 font-medium" : ""
                }`}
        >
            {children}
        </div>
    );
}
