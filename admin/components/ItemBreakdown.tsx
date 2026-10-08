"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { ChartCard } from "./ChartCard";
import { ItemBreakdownData } from "@/services/adminPaymentService";

interface BreakdownProps {
    data: ItemBreakdownData[];
    isLoading?: boolean;
}

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316"];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; payload: ItemBreakdownData }[] }) => {
    if (active && payload && payload.length) {
        const val = payload[0].value;
        const name = payload[0].payload.item_name;
        return (
            <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm text-sm z-50">
                <p className="font-medium text-gray-900">{name}</p>
                <p className="text-gray-600">${val.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">{payload[0].payload.transaction_count} transactions</p>
            </div>
        );
    }
    return null;
};

export function ItemBreakdown({ data, isLoading }: BreakdownProps) {
    if (!data || data.length === 0) {
        return (
            <ChartCard title="Item Breakdown" subtitle="Revenue by specific item" className="h-full">
                <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                    {isLoading ? "Loading items..." : "No data available."}
                </div>
            </ChartCard>
        );
    }

    return (
        <ChartCard title="Item Breakdown" subtitle="Revenue by specific product/service" className="h-full">
            <div className={`h-72 w-full transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ left: 40, right: 30, top: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="item_name" 
                            type="category" 
                            width={100} 
                            axisLine={false} 
                            tickLine={false}
                            fontSize={11}
                            tick={{ fill: '#6b7280' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                        <Bar 
                            dataKey="total_revenue" 
                            radius={[0, 4, 4, 0]} 
                            barSize={24}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    );
}
