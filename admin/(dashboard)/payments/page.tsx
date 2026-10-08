"use client";

import { useState, useEffect, useCallback } from "react";
import {
    DollarSign,
    CreditCard,
    TrendingUp,
    RefreshCcw,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Copy,
    Check,
    Loader2,
    Activity,
    MoreHorizontal
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import ConfirmationModal from "@/app/components/ui/ConfirmationModal";
import Input from "@/app/components/ui/Input";
import { Badge } from "@/app/admin/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/admin/components/ui/Avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/admin/components/ui/Table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/admin/components/ui/Select";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/app/admin/components/ui/DropdownMenu";
import { MetricCard } from "@/app/admin/components/MetricCard";
import { ChartCard } from "@/app/admin/components/ChartCard";
import { AdminFilterBar, FilterState } from "@/app/admin/components/AdminFilterBar";
import { CategoryBreakdown } from "@/app/admin/components/CategoryBreakdown";
import { ItemBreakdown } from "../../components/ItemBreakdown";
import { handleApiError } from "@/lib/utils/errorHandler";
import { showSuccessToast } from "@/lib/utils/toast";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    adminPaymentService,
    PaymentAnalyticsKpis,
    PaymentRevenueTrend,
    PaymentTransaction,
    CategoryBreakdownData,
    ItemBreakdownData,
} from "@/services/adminPaymentService";

const statusStyles = {
    completed: "bg-green-50 text-green-600 border-green-200",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    refunded: "bg-gray-100 text-gray-500 border-gray-200",
    failed: "bg-red-50 text-red-600 border-red-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function PaymentsPage() {
    // State for filters and pagination
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [limit] = useState(20);

    // State for data
    const [analyticsKpis, setAnalyticsKpis] = useState<PaymentAnalyticsKpis | null>(null);
    const [revenueTrends, setRevenueTrends] = useState<PaymentRevenueTrend[]>([]);
    const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdownData[]>([]);
    const [itemBreakdown, setItemBreakdown] = useState<ItemBreakdownData[]>([]);
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>({});

    // Refund state
    const [transactionToRefund, setTransactionToRefund] = useState<PaymentTransaction | null>(null);
    const [isRefunding, setIsRefunding] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Loading states
    const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1); // Reset to first page on search change
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Fetch Analytics
    const fetchAnalytics = useCallback(async (currentFilters: FilterState = filters) => {
        setRefreshing(true);
        try {
            const data = await adminPaymentService.getPaymentAnalytics({
                start_date: currentFilters.startDate,
                end_date: currentFilters.endDate,
                interval: currentFilters.interval,
                refresh: currentFilters.refresh
            });
            setAnalyticsKpis(data.kpis);
            setRevenueTrends(data.revenue_trends);
            setCategoryBreakdown(data.category_breakdown || []);
            setItemBreakdown(data.breakdown || []);
            setError(null);
        } catch (err: unknown) {
            const message = handleApiError(err, "Failed to fetch payment analytics");
            setError(message);
        } finally {
            setIsLoadingAnalytics(false);
            setRefreshing(false);
        }
    }, [filters]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        fetchAnalytics(newFilters);
    };

    // Fetch Transactions
    const fetchTransactions = useCallback(async () => {
        setIsLoadingTransactions(true);
        try {
            const skip = (page - 1) * limit;
            const data = await adminPaymentService.getPaymentTransactions({
                skip,
                limit,
                status: statusFilter === "all" ? undefined : statusFilter,
                search: debouncedSearch || undefined,
            });
            setTransactions(data.transactions);
            setTotalTransactions(data.total);
        } catch (error: unknown) {
            console.error("Failed to fetch transactions:", error);
        } finally {
            setIsLoadingTransactions(false);
        }
    }, [page, limit, statusFilter, debouncedSearch]);

    // Initial load
    useEffect(() => {
        fetchAnalytics({ interval: "daily", refresh: false });
    }, [fetchAnalytics]);

    // Load transactions on filter/page change
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const totalPages = Math.ceil(totalTransactions / limit);

    const executeRefund = async () => {
        if (!transactionToRefund) return;
        setIsRefunding(true);
        try {
            await adminPaymentService.refundTransaction(transactionToRefund.id);
            showSuccessToast("Transaction refunded successfully.");
            setTransactionToRefund(null);
            fetchTransactions(); // Refresh table
            fetchAnalytics({ ...filters, refresh: true }); // Refresh metrics
        } catch (error: unknown) {
            handleApiError(error, "Failed to refund transaction");
        } finally {
            setIsRefunding(false);
        }
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
                    <p className="text-gray-600">
                        Track revenue, transactions, and subscriptions
                    </p>
                </div>
            </div>

            <AdminFilterBar
                onFilterChange={handleFilterChange}
                isLoading={isLoadingAnalytics}
                defaultInterval="daily"
            />

            {error && !analyticsKpis && (
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl mb-8">
                    <div className="p-3 bg-red-50 rounded-full mb-4">
                        <Activity className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{error}</h3>
                    <p className="text-gray-500 mb-6">Unable to load payment insights at this time.</p>
                    <Button
                        variant="default"
                        onClick={() => fetchAnalytics(filters)}
                        className="flex items-center gap-2"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Retry Insights
                    </Button>
                </div>
            )}

            {analyticsKpis && (
                <div className="relative">
                    {/* Professional Localized Loading Overlay */}
                    {refreshing && !isLoadingAnalytics && (
                        <div className="absolute inset-0 z-50 flex items-start justify-center pt-32 bg-white/40 backdrop-blur-[1px] rounded-xl transition-all duration-300">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 shadow-lg rounded-full animate-in fade-in slide-in-from-top-4">
                                <Loader2 className="h-5 w-5 animate-spin text-pink-600" />
                                <span className="font-medium text-gray-700">Updating Payment Insights...</span>
                            </div>
                        </div>
                    )}

                    {/* Metrics */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            title="Monthly Revenue"
                            value={analyticsKpis ? `$${analyticsKpis.monthly_revenue.toLocaleString()}` : "..."}
                            change={{
                                value: analyticsKpis?.revenue_growth_percentage || 0,
                                type: (analyticsKpis?.revenue_growth_percentage || 0) >= 0 ? "increase" : "decrease",
                            }}
                            icon={DollarSign}
                            variant="primary"
                        />
                        <MetricCard
                            title="Active Subscriptions"
                            value={analyticsKpis ? analyticsKpis.active_subscriptions.toLocaleString() : "..."}
                            change={{
                                value: analyticsKpis?.subscription_growth_percentage || 0,
                                type: (analyticsKpis?.subscription_growth_percentage || 0) >= 0 ? "increase" : "decrease",
                            }}
                            icon={CreditCard}
                            variant="success"
                        />
                        <MetricCard
                            title="Conversion Rate"
                            value={analyticsKpis ? `${analyticsKpis.conversion_rate}%` : "..."}
                            change={{
                                value: analyticsKpis?.conversion_growth_percentage || 0,
                                type: (analyticsKpis?.conversion_growth_percentage || 0) >= 0 ? "increase" : "decrease",
                            }}
                            icon={TrendingUp}
                        />
                        <MetricCard
                            title="Refund Rate"
                            value={analyticsKpis ? `${analyticsKpis.refund_rate}%` : "..."}
                            change={{
                                value: analyticsKpis?.refund_growth_percentage || 0,
                                type: (analyticsKpis?.refund_growth_percentage || 0) >= 0 ? "increase" : "decrease", // Assuming decrease is "good" for refunds but visually we usually want green for good. MetricCard likely handles 'decrease' as red/down arrow. Ideally refund rate going down is good (green). MetricCard logic might need checking but 'decrease' usually means negative change.
                                // If 'decrease' is red, and we want green for refund reduction, we might need to trick it or update MetricCard. For now standard behavior.
                            }}
                            icon={RefreshCcw}
                            variant="warning"
                        />
                    </div>

                    {/* Row 1: Full-width Revenue Chart */}
                    <div className="mb-8">
                        <ChartCard
                            title="Revenue Overview"
                            subtitle="Daily revenue and subscriptions trend"
                            isLoading={refreshing}
                        >
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueTrends}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="label"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            padding={{ left: 20, right: 20 }}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(val) => `$${val.toLocaleString()}`}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="revenue"
                                            name="Revenue"
                                            stroke="#ec4899"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#ec4899', strokeWidth: 0 }}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="subscriptions"
                                            name="Subscriptions"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>
                    </div>

                    {/* Row 2: Breakdowns Side-by-Side */}
                    <div className="mb-8 grid gap-6 lg:grid-cols-2">
                        <ItemBreakdown data={itemBreakdown} isLoading={refreshing} />
                        <CategoryBreakdown data={categoryBreakdown} isLoading={refreshing} />
                    </div>

                    {/* Transactions */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 p-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto">
                                    <div className="relative flex-1 sm:w-64 lg:w-72">
                                        <Input
                                            placeholder="Search transactions..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <div className="w-full sm:w-40">
                                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="refunded">Refunded</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Plan</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoadingTransactions ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="h-64 text-center">
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
                                                    <p className="text-sm font-medium text-gray-500">Loading transactions...</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : transactions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="h-64 text-center">
                                                <div className="flex flex-col items-center justify-center py-12">
                                                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                                                        <CreditCard className="h-10 w-10 text-gray-300" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900">No transactions found</h3>
                                                    <p className="text-gray-500 max-w-xs mx-auto">
                                                        We couldn&apos;t find any transaction records matching your current filters.
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        transactions.map((txn) => (
                                            <TableRow key={txn.id} className="group">
                                                <TableCell className="font-mono text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span title={txn.id}>
                                                            {txn.id.substring(0, 25)}...
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(txn.id)}
                                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                                            title="Copy Transaction ID"
                                                        >
                                                            {copiedId === txn.id ? (
                                                                <Check className="h-3 w-3 text-green-500" />
                                                            ) : (
                                                                <Copy className="h-3 w-3" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            {txn.user_avatar ? (
                                                                <AvatarImage src={txn.user_avatar} />
                                                            ) : (
                                                                <AvatarFallback>{txn.user_name.charAt(0)}</AvatarFallback>
                                                            )}
                                                        </Avatar>
                                                        <span className="font-medium">{txn.user_name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{txn.type}</TableCell>
                                                <TableCell className="text-gray-500">{txn.plan}</TableCell>
                                                <TableCell
                                                    className={
                                                        txn.amount < 0
                                                            ? "font-medium text-red-600"
                                                            : "font-medium text-gray-900"
                                                    }
                                                >
                                                    {txn.amount < 0 ? "-" : ""}${Math.abs(txn.amount).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={statusStyles[txn.status as keyof typeof statusStyles] || "bg-gray-100"}
                                                    >
                                                        {txn.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-gray-500">
                                                    {new Date(txn.date).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {txn.status === "completed" && (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200">
                                                                    <MoreHorizontal className="h-5 w-5 text-gray-700" />
                                                                </div>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-36">
                                                                <DropdownMenuItem
                                                                    onClick={() => setTransactionToRefund(txn)}
                                                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                                                                >
                                                                    <RotateCcw className="mr-2 h-4 w-4" />
                                                                    Refund
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing {transactions.length > 0 ? (page - 1) * limit + 1 : 0} to{" "}
                                {Math.min(page * limit, totalTransactions)} of {totalTransactions} entries
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="h-9 px-4 flex items-center gap-2"
                                    disabled={page === 1}
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-9 px-4 flex items-center gap-2"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Refund Confirmation Modal */}
                    <ConfirmationModal
                        open={!!transactionToRefund}
                        title="Refund Transaction"
                        description={
                            transactionToRefund ? (
                                <>
                                    Are you sure you want to refund transaction{" "}
                                    <span className="font-mono font-bold text-gray-900">{transactionToRefund.id.substring(0, 8)}...</span> for{" "}
                                    <span className="font-bold text-gray-900">${transactionToRefund.amount.toFixed(2)}</span>?
                                    This action cannot be undone.
                                </>
                            ) : ""
                        }
                        confirmText="Refund"
                        cancelText="Cancel"
                        variant="danger"
                        isLoading={isRefunding}
                        onConfirm={executeRefund}
                        onCancel={() => setTransactionToRefund(null)}
                    />
                </div>
            )}
        </div>
    );
}
