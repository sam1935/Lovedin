"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { ChartCard } from "./ChartCard";
import { CategoryBreakdownData } from "@/services/adminPaymentService";

interface BreakdownProps {
    data: CategoryBreakdownData[];
    isLoading?: boolean;
}

const COLORS = ["#ec4899", "#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (active && payload && payload.length) {
        const val = payload[0].value;
        const name = payload[0].name;
        return (
            <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm text-sm z-50">
                <span className="font-medium text-gray-900">{name}:</span>{" "}
                <span className="text-gray-600">${val.toFixed(2)}</span>
            </div>
        );
    }
    return null;
};

export function CategoryBreakdown({ data, isLoading }: BreakdownProps) {
    if (!data || data.length === 0) {
        return (
            <ChartCard title="Revenue Breakdown" subtitle="Distribution by category" className="h-full">
                <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                    {isLoading ? "Loading categories..." : "No data available."}
                </div>
            </ChartCard>
        );
    }

    return (
        <ChartCard title="Revenue Breakdown" subtitle="Distribution by source category" className="h-full px-2">
            <div className={`flex flex-col h-72 w-full transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}>
                <div className="h-[80%] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="total_revenue"
                                nameKey="category"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend to fit design */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2 h-[20%] w-full">
                    {data.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center gap-2 text-xs text-gray-600">
                            <span
                                className="block h-3 w-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {entry.category}
                        </div>
                    ))}
                </div>
            </div>
        </ChartCard>
    );
}
