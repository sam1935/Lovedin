"use client";

import { ReactNode, useState, useRef, useEffect, useCallback, createContext, useContext, cloneElement, ReactElement } from "react";
import { createPortal } from "react-dom";

interface DropdownContextValue {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    triggerRef: React.MutableRefObject<HTMLElement | null>;
    contentRef: React.MutableRefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function DropdownMenu({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isOutsideTrigger = dropdownRef.current && !dropdownRef.current.contains(target);
            const isOutsideContent = contentRef.current && !contentRef.current.contains(target);

            if (isOutsideTrigger && isOutsideContent) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef, contentRef }}>
            <div ref={dropdownRef} className="relative inline-block text-left">
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

export function DropdownMenuTrigger({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
    }

    const { isOpen, setIsOpen, triggerRef } = context;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    // Use useCallback to memoize the ref callback
    const setTriggerElement = useCallback((element: HTMLElement | null) => {
        triggerRef.current = element;
    }, [triggerRef]);

    if (asChild && children) {
        return cloneElement(children as ReactElement<any>, { // eslint-disable-line @typescript-eslint/no-explicit-any, react-hooks/refs
            ref: setTriggerElement,
            onClick: handleClick
        });
    }

    return (
        <button ref={setTriggerElement} onClick={handleClick} type="button">
            {children}
        </button>
    );
}

export function DropdownMenuContent({ children, align = "end", className = "" }: { children: ReactNode; align?: "start" | "end"; className?: string }) {
    const context = useContext(DropdownContext);
    const [position, setPosition] = useState({ top: 0, left: 0, placement: "bottom" as "bottom" | "top" });

    if (!context) {
        throw new Error("DropdownMenuContent must be used within DropdownMenu");
    }

    const { isOpen, triggerRef, contentRef } = context;

    useEffect(() => {
        // Use the context ref
        const contentEl = contentRef.current;

        if (isOpen && triggerRef.current && contentEl) {
            const updatePosition = () => {
                if (!triggerRef.current || !contentEl) return;

                const triggerRect = triggerRef.current.getBoundingClientRect();
                const contentRect = contentEl.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;

                // Calculate space above and below
                const spaceBelow = viewportHeight - triggerRect.bottom;
                const spaceAbove = triggerRect.top;

                // Determine vertical placement
                const shouldOpenUpward = spaceBelow < contentRect.height + 8 && spaceAbove > spaceBelow;

                let top: number;
                if (shouldOpenUpward) {
                    top = triggerRect.top - contentRect.height - 8;
                } else {
                    top = triggerRect.bottom + 8;
                }

                // Calculate horizontal position based on alignment
                let left: number;
                if (align === "end") {
                    left = triggerRect.right - contentRect.width;
                    // Ensure it doesn't go off the left edge
                    if (left < 8) left = 8;
                } else {
                    left = triggerRect.left;
                    // Ensure it doesn't go off the right edge
                    if (left + contentRect.width > viewportWidth - 8) {
                        left = viewportWidth - contentRect.width - 8;
                    }
                }

                setPosition({
                    top,
                    left,
                    placement: shouldOpenUpward ? "top" : "bottom"
                });
            };

            // Initial position calculation, force a small delay or double check ref availability
            // Sometimes ref is not ready immediately if running concurrently with render
            // But createPortal renders synchronously in same commit usually.

            // We use requestAnimationFrame to ensure layout is computed
            requestAnimationFrame(() => updatePosition());

            // Update position on scroll or resize
            window.addEventListener("scroll", updatePosition, true);
            window.addEventListener("resize", updatePosition);

            return () => {
                window.removeEventListener("scroll", updatePosition, true);
                window.removeEventListener("resize", updatePosition);
            };
        }
    }, [isOpen, align, triggerRef, contentRef]);

    if (!isOpen) return null;

    // Use portal to render outside the table to prevent layout shifts
    return createPortal(
        <div
            ref={contentRef}
            style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50
            }}
            className={`min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md ${className}`}
        >
            {children}
        </div>,
        document.body
    );
}

export function DropdownMenuItem({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
    const context = useContext(DropdownContext);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        // Close dropdown after clicking an item
        if (context) {
            context.setIsOpen(false);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
        >
            {children}
        </div>
    );
}

export function DropdownMenuSeparator({ className = "" }: { className?: string }) {
    return <div className={`-mx-1 my-1 h-px bg-gray-100 ${className}`} />;
}
