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
import { OnboardingFunnelStep } from "@/services/adminDashboardService";

interface FunnelProps {
    data: OnboardingFunnelStep[];
    isLoading?: boolean;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: OnboardingFunnelStep }[] }) => {
    if (active && payload && payload.length) {
        const stepData = payload[0].payload;
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                <p className="mb-2 font-semibold text-gray-900">{stepData.step}</p>
                <div className="flex flex-col gap-1 text-sm">
                    <span className="text-gray-600">
                        Completed: <strong className="text-gray-900">{stepData.count.toLocaleString()}</strong> ({stepData.percentage}%)
                    </span>
                    {stepData.drop_off_count !== undefined && stepData.drop_off_count > 0 && (
                        <span className="text-red-500">
                            Dropped Off: <strong>{stepData.drop_off_count.toLocaleString()}</strong> ({stepData.drop_off_percentage}%)
                        </span>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

const getBarColor = (index: number) => {
    const colors = ["#ec4899", "#f472b6", "#fbcfe8", "#fce7f3", "#fdf2f8"];
    return colors[index % colors.length];
};

export function OnboardingFunnel({ data, isLoading }: FunnelProps) {
    if (!data || data.length === 0) {
        return (
            <ChartCard title="Onboarding Funnel" subtitle="User progression through signup" className="h-full">
                <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                    {isLoading ? "Loading funnel data..." : "No data available for this period."}
                </div>
            </ChartCard>
        );
    }

    return (
        <ChartCard title="Onboarding Funnel" subtitle="Conversions from visit to completion" className="h-full">
            <div className={`h-72 transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="step"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                            width={100}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.02)" }} />
                        <Bar
                            dataKey="count"
                            radius={[0, 4, 4, 0]}
                            barSize={32}
                            animationDuration={1000}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    );
}
