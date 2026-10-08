"use client";

import { useEffect, useState } from "react";
import {
    Users,
    TrendingUp,
    TrendingDown,
    Globe,
    Loader2,
    Activity
} from "lucide-react";
import { AdminFilterBar, FilterState } from "@/app/admin/components/AdminFilterBar";
import { ChartCard } from "@/app/admin/components/ChartCard";
import { MetricCard } from "@/app/admin/components/MetricCard";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/admin/components/ui/Card";
import { getAdminAnalyticsService, AnalyticsResponse } from "@/services/adminAnalyticsService";
import { handleApiError } from "@/lib/utils/errorHandler";
import Button from "@/app/components/ui/Button";

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>({});

    const fetchAnalytics = async (currentFilters: FilterState = filters) => {
        try {
            setRefreshing(true);
            const service = getAdminAnalyticsService();
            const response = await service.getAnalytics({
                start_date: currentFilters.startDate,
                end_date: currentFilters.endDate,
                interval: currentFilters.interval,
                refresh: currentFilters.refresh
            });
            setData(response);
            setError(null);
        } catch (err: unknown) {
            const message = handleApiError(err, "Failed to fetch analytics data");
            setError(message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        fetchAnalytics(newFilters);
    };

    useEffect(() => {
        fetchAnalytics({ interval: "daily", refresh: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="p-6 h-[80vh] flex flex-col items-center justify-center">
                <div className="p-3 bg-red-50 rounded-full mb-4">
                    <Activity className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{error}</h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">We couldn&apos;t retrieve the analytics data. Please try again or check back later.</p>
                <Button 
                    variant="default" 
                    onClick={() => fetchAnalytics(filters)}
                    className="flex items-center gap-2"
                >
                    <Activity className="h-4 w-4" />
                    Retry Analytics
                </Button>
            </div>
        );
    }

    if (!data) return null;

    // Color Palette for charts (Lighter/Pastel variants - ~400 scale)
    const CHART_COLORS = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f87171', '#22d3ee', '#f472b6'];

    // Process data for charts
    const genderData = data.gender_distribution.map((item) => {
        let color = "#cbd5e1"; // default slate-300
        if (item.label.toLowerCase() === "female") color = "#f472b6"; // pink-400
        else if (item.label.toLowerCase() === "male") color = "#60a5fa"; // blue-400
        else if (item.label.toLowerCase() === "other") color = "#a78bfa"; // violet-400

        return {
            name: item.label,
            value: item.value,
            color
        };
    });

    const ageData = data.age_distribution.map((item, index) => ({
        age: item.label,
        users: item.value,
        fill: CHART_COLORS[index % CHART_COLORS.length]
    }));

    // Calculate percentages for locations with ranked colors
    const totalLocationUsers = data.top_locations.reduce((acc, curr) => acc + curr.count, 0);
    const locationData = data.top_locations.map((item, index) => {
        // Ranked colors: 1=Blue, 2=Violet, 3=Emerald, 4=Amber, 5+=Slate/Gray
        let colorClass = "bg-gray-400";
        let bgClass = "bg-gray-100";
        let textClass = "text-gray-500";
        let badgeBg = "bg-gray-50";

        if (index === 0) { // Rank 1
            colorClass = "bg-blue-400";
            bgClass = "bg-blue-50";
            textClass = "text-blue-500";
            badgeBg = "bg-blue-50";
        } else if (index === 1) { // Rank 2
            colorClass = "bg-violet-400";
            bgClass = "bg-violet-50";
            textClass = "text-violet-500";
            badgeBg = "bg-violet-50";
        } else if (index === 2) { // Rank 3
            colorClass = "bg-emerald-400";
            bgClass = "bg-emerald-50";
            textClass = "text-emerald-500";
            badgeBg = "bg-emerald-50";
        } else if (index === 3) { // Rank 4
            colorClass = "bg-amber-400";
            bgClass = "bg-amber-50";
            textClass = "text-amber-500";
            badgeBg = "bg-amber-50";
        }

        return {
            city: item.name,
            users: item.count,
            percentage: totalLocationUsers > 0 ? (item.count / totalLocationUsers) * 100 : 0,
            colorClass,
            bgClass,
            textClass,
            badgeBg
        };
    });

    // Calculate trends (simple change detection from last 2 points if available)
    const trends = data.activity_trends;
    const prevDay = trends.length > 1 ? trends[trends.length - 2] : null;

    const calculateChange = (current: number, prev: number | undefined) => {
        if (!prev) return { value: 0, type: "neutral" as const };
        const diff = current - prev;
        const percent = prev !== 0 ? (diff / prev) * 100 : 0;
        return {
            value: Math.abs(parseFloat(percent.toFixed(1))),
            type: diff >= 0 ? ("increase" as const) : ("decrease" as const)
        };
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                    <p className="text-gray-600">
                        Deep dive into platform performance and user behavior
                    </p>
                </div>
            </div>

            <AdminFilterBar
                onFilterChange={handleFilterChange}
                isLoading={loading || refreshing}
                defaultPreset="30d"
                defaultInterval="daily"
            />

            {data && (
                <div className="relative">
                    {/* Professional Localized Loading Overlay */}
                    {refreshing && !loading && (
                        <div className="absolute inset-0 z-50 flex items-start justify-center pt-32 bg-white/40 backdrop-blur-[1px] rounded-xl transition-all duration-300">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 shadow-lg rounded-full animate-in fade-in slide-in-from-top-4">
                                <Loader2 className="h-5 w-5 animate-spin text-pink-600" />
                                <span className="font-medium text-gray-700">Updating Analytics...</span>
                            </div>
                        </div>
                    )}

                    {/* Key Metrics */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Daily Active Users"
                    value={data.dau.toLocaleString()}
                    change={calculateChange(data.dau, prevDay?.dau)}
                    icon={Users}
                    variant="info"
                />
                <MetricCard
                    title="Weekly Active Users"
                    value={data.wau.toLocaleString()}
                    change={calculateChange(data.wau, prevDay?.wau)}
                    icon={TrendingUp}
                    variant="accent"
                />
                <MetricCard
                    title="Monthly Active Users"
                    value={data.mau.toLocaleString()}
                    change={calculateChange(data.mau, prevDay?.mau)}
                    icon={Globe}
                    variant="success"
                />
                <MetricCard
                    title="Retention Rate"
                    value={`${data.retention_rate}%`}
                    change={{ value: 0, type: "neutral" }} // API doesn't provide historical retention to calc change
                    icon={TrendingDown}
                    variant="warning"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="mb-6 grid gap-6 lg:grid-cols-3">
                <ChartCard
                    title="User Activity Trends"
                    subtitle="DAU, WAU, MAU over time"
                    className="lg:col-span-2"
                >
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.activity_trends}>
                                <defs>
                                    <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorWau" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMau" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        color: "#374151"
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="mau"
                                    stroke="#34d399"
                                    strokeWidth={3}
                                    fill="url(#colorMau)"
                                    name="MAU"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="wau"
                                    stroke="#a78bfa"
                                    strokeWidth={3}
                                    fill="url(#colorWau)"
                                    name="WAU"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="dau"
                                    stroke="#60a5fa"
                                    strokeWidth={3}
                                    fill="url(#colorDau)"
                                    name="DAU"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Gender Distribution" subtitle="User demographics">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 -mt-4 flex-wrap">
                            {genderData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-gray-500">
                                        {item.name} ({item.value}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChartCard>
            </div>

            {/* Charts Row 2 */}
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
                <ChartCard title="Age Distribution" subtitle="Users by age group">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                                <YAxis dataKey="age" type="category" stroke="#6b7280" fontSize={12} width={50} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        color: "#374151"
                                    }}
                                />
                                <Bar dataKey="users" radius={[0, 4, 4, 0]}>
                                    {ageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Top Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {locationData.map((location, index) => (
                                <div key={location.city} className="flex items-center gap-4">
                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${location.badgeBg} ${location.textClass}`}>
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900">{location.city}</span>
                                            <span className="text-sm text-gray-500">
                                                {location.users.toLocaleString()} users
                                            </span>
                                        </div>
                                        <div className={`mt-1.5 h-2 w-full overflow-hidden rounded-full ${location.bgClass === "bg-gray-100" ? "bg-gray-200" : "bg-gray-100"}`}>
                                            <div
                                                className={`h-full rounded-full transition-all ${location.colorClass}`}
                                                style={{ width: `${location.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )}
</div>
    );
}
