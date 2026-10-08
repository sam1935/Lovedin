import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        type: "increase" | "decrease" | "neutral";
    };
    icon: LucideIcon;
    variant?: "default" | "primary" | "success" | "warning" | "info" | "accent";
}

export function MetricCard({
    title,
    value,
    change,
    icon: Icon,
    variant = "default",
}: MetricCardProps) {
    const variantStyles = {
        default: "bg-white",
        primary: "bg-linear-to-br from-pink-50 to-pink-100 border-pink-200",
        success: "bg-linear-to-br from-emerald-50 to-emerald-100 border-emerald-200",
        warning: "bg-linear-to-br from-amber-50 to-amber-100 border-amber-200",
        info: "bg-linear-to-br from-blue-50 to-blue-100 border-blue-200",
        accent: "bg-linear-to-br from-violet-50 to-violet-100 border-violet-200",
    };

    const iconVariantStyles = {
        default: "bg-gray-100 text-gray-600",
        primary: "bg-pink-100 text-pink-600",
        success: "bg-emerald-100 text-emerald-600",
        warning: "bg-amber-100 text-amber-600",
        info: "bg-blue-100 text-blue-600",
        accent: "bg-violet-100 text-violet-600",
    };

    const getChangeColor = (type: "increase" | "decrease" | "neutral") => {
        if (type === "increase") return "text-green-600";
        if (type === "decrease") return "text-red-600";
        return "text-gray-500";
    };

    const getChangeIcon = (type: "increase" | "decrease" | "neutral") => {
        if (type === "increase") return "↑";
        if (type === "decrease") return "↓";
        return "-";
    };

    return (
        <div
            className={`rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md ${variantStyles[variant]}`}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <p
                            className={`flex items-center gap-1 text-xs font-medium ${getChangeColor(change.type)}`}
                        >
                            <span>{getChangeIcon(change.type)}</span>
                            <span>{Math.abs(change.value)}% from last period</span>
                        </p>
                    )}
                </div>
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconVariantStyles[variant]}`}
                >
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}
