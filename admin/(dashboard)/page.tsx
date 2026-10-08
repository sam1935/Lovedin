"use client";

import { useEffect, useState } from "react";
import { Users, Heart, DollarSign, UserCheck, Loader2, RefreshCw, Activity } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { getAdminDashboardService, DashboardData } from "@/services/adminDashboardService";
import { ChartCard } from "../components/ChartCard";
import { AdminFilterBar, FilterState } from "../components/AdminFilterBar";
import { OnboardingFunnel } from "../components/OnboardingFunnel";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { handleApiError } from "@/lib/utils/errorHandler";
import Button from "@/app/components/ui/Button";

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<FilterState>({});

    const fetchData = async (currentFilters: FilterState = filters) => {
        try {
            setRefreshing(true);

            const service = getAdminDashboardService();
            const result = await service.getDashboardData({
                start_date: currentFilters.startDate,
                end_date: currentFilters.endDate,
                interval: currentFilters.interval,
                refresh: currentFilters.refresh
            });
            setData(result);
            setError(null);
        } catch (err: unknown) {
            const message = handleApiError(err, "Unable to load platform data. Please check your connection or retry.");
            setError(message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        fetchData(newFilters);
    };

    // Trigger initial fetch
    useEffect(() => {
        fetchData({ interval: "daily", refresh: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">
                        Welcome back! Here&apos;s what&apos;s happening with your platform.
                    </p>
                </div>
            </div>

            <AdminFilterBar
                onFilterChange={handleFilterChange}
                isLoading={loading || refreshing}
                defaultInterval="daily"
            />

            {error && !data && (
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl">
                    <div className="p-3 bg-red-50 rounded-full mb-4">
                        <Activity className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{error}</h3>
                    <p className="text-gray-500 mb-6">We encountered a problem while connecting to the analytics server.</p>
                    <Button 
                        variant="default" 
                        onClick={() => fetchData(filters)}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Retry Loading
                    </Button>
                </div>
            )}

            {data && (
                <div className="relative">
                    {/* Professional Localized Loading Overlay */}
                    {refreshing && !loading && (
                        <div className="absolute inset-0 z-50 flex items-start justify-center pt-32 bg-white/40 backdrop-blur-[1px] rounded-xl transition-all duration-300">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 shadow-lg rounded-full animate-in fade-in slide-in-from-top-4">
                                <Loader2 className="h-5 w-5 animate-spin text-pink-600" />
                                <span className="font-medium text-gray-700">Updating Dashboard...</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Metrics Grid */}
                    <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                        <MetricCard
                            title="Total Users"
                            value={data.total_users?.toLocaleString() || "0"}
                            icon={Users}
                            variant="primary"
                        />
                        <MetricCard
                            title="Active Users"
                            value={data.active_users?.toLocaleString() || "0"}
                            icon={UserCheck}
                        />
                        <MetricCard
                            title="New Users Today"
                            value={data.new_users_today?.toLocaleString() || "0"}
                            icon={Heart}
                            variant="success"
                        />
                        <MetricCard
                            title="Total Revenue"
                            value={`$${data.total_revenue?.toLocaleString() || "0"}`}
                            icon={DollarSign}
                            variant="warning"
                        />
                        <MetricCard
                            title="Total Refunds"
                            value={data.total_refunds?.toLocaleString() || "0"}
                            icon={RefreshCw}
                            variant="warning"
                        />
                    </div>

                    {/* Charts */}
                    <div className="mb-8 grid gap-6 lg:grid-cols-2">
                        {/* User Growth Chart */}
                        <ChartCard
                            title="User Growth"
                            subtitle="Total users over time"
                        >
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.user_growth ? [{ label: 'Start', value: 0 }, ...data.user_growth] : []}>
                                        <defs>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value / 1000}k`}
                                            domain={[0, 'auto']}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            name="Users"
                                            stroke="#ec4899"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorUsers)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        {/* Revenue Chart */}
                        <ChartCard
                            title="Revenue"
                            subtitle="Monthly recurring revenue"
                        >
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.revenue_chart ? [{ label: 'Start', value: 0 }, ...data.revenue_chart] : []}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            domain={[0, 'auto']}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            name="Revenue"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        {/* Weekly Engagement Chart */}
                        <ChartCard
                            title="Weekly Engagement"
                            subtitle="Activity overview"
                            className="lg:col-span-2"
                        >
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.weekly_engagement || []}>
                                        <defs>
                                            <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            padding={{ left: 30, right: 30 }}
                                        />
                                        <YAxis
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="likes"
                                            name="Likes"
                                            stroke="#ec4899"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorLikes)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="matches"
                                            name="Matches"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorMatches)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        {/* Onboarding Funnel */}
                        <div className="lg:col-span-2">
                            <OnboardingFunnel data={data.onboarding_funnel || []} isLoading={refreshing} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
