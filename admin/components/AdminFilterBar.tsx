"use client";

import { useState, useEffect } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import Button from "@/app/components/ui/Button";

export type IntervalOption = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export interface FilterState {
    startDate?: string;
    endDate?: string;
    interval?: IntervalOption;
    refresh?: boolean;
}

interface AdminFilterBarProps {
    onFilterChange: (filters: FilterState) => void;
    isLoading?: boolean;
    defaultPreset?: string; // Kept for backwards compatibility
    defaultInterval?: IntervalOption;
}

const INTERVALS: { label: string; value: IntervalOption }[] = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
];

export function AdminFilterBar({
    onFilterChange,
    isLoading = false,
    defaultInterval = "monthly"
}: AdminFilterBarProps) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [interval, setInterval] = useState<IntervalOption>(defaultInterval);
    const [isInitialMount, setIsInitialMount] = useState(true);

    useEffect(() => {
        if (isInitialMount) {
            setIsInitialMount(false);
            return;
        }
        applyFilters(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, interval]);

    const applyFilters = (isRefresh: boolean) => {
        onFilterChange({
            startDate: startDate ? new Date(startDate).toISOString() : undefined,
            endDate: endDate ? new Date(endDate + "T23:59:59.999Z").toISOString() : undefined,
            interval,
            refresh: isRefresh
        });
    };

    return (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-lg shadow-gray-100/50 backdrop-blur-sm relative z-10 transition-all hover:shadow-gray-200/50">
            <div className="flex flex-wrap items-center gap-6">
                {/* Date Range Group */}
                <div className="flex items-center gap-3 bg-gray-50/50 rounded-xl p-2 border border-gray-100/50">
                    <Calendar className="h-5 w-5 text-pink-500 shrink-0" />
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest px-1">Start Date</span>
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-10 w-32 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 font-medium focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none transition-all"
                            />
                        </div>
                        <span className="text-gray-300 pt-5">-</span>
                        <div className="flex flex-col gap-1 mt-0">
                            <span className="text-[9px] uppercase text-gray-400 font-bold tracking-widest px-1">End Date</span>
                            <input 
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-10 w-32 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 font-medium focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="h-10 w-px bg-gray-100 hidden md:block"></div>

                {/* Interval Group */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase text-gray-400 font-bold tracking-widest px-1">Group Interval</span>
                    <div className="flex flex-wrap items-center rounded-xl border border-gray-100 bg-gray-50/50 p-1 gap-1 shadow-inner">
                        {INTERVALS.map((i) => (
                            <button
                                key={i.value}
                                onClick={() => setInterval(i.value)}
                                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                                    interval === i.value
                                        ? "bg-white text-pink-600 shadow-sm ring-1 ring-pink-50"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                                }`}
                            >
                                {i.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Button
                variant="outline"
                onClick={() => applyFilters(true)}
                disabled={isLoading}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border-pink-200 bg-white hover:bg-pink-50 text-pink-600 font-bold px-5 whitespace-nowrap shadow-sm transition-all duration-300 hover:shadow-md active:scale-95"
            >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : "text-pink-500"}`} />
                <span className="text-sm tracking-wide">{isLoading ? "Refreshing..." : "Refresh"}</span>
            </Button>
        </div>
    );
}
