import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";

import { Loader2 } from "lucide-react";

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    action?: ReactNode;
    isLoading?: boolean;
}

export function ChartCard({ 
    title, 
    subtitle, 
    children, 
    className = "", 
    action,
    isLoading = false 
}: ChartCardProps) {
    return (
        <Card className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                    <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
                </div>
            )}
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <CardTitle>{title}</CardTitle>
                    {subtitle && <CardDescription>{subtitle}</CardDescription>}
                </div>
                {action && <div>{action}</div>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
