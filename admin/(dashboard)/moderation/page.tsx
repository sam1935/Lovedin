"use client";

import { useState } from "react";
import {
    AlertTriangle,
    Shield,
    Ban,
    Eye,
    MessageSquare,
    Clock,
    CheckCircle,
    XCircle,
    FileWarning,
} from "lucide-react";
import { MetricCard } from "@/app/admin/components/MetricCard";
import Button from "@/app/components/ui/Button";
import { Badge } from "@/app/admin/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/admin/components/ui/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/admin/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/admin/components/ui/Tabs";
import { Textarea } from "@/app/admin/components/ui/Textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/admin/components/ui/Dialog";


const reportedUsers = [
    {
        id: 1,
        user: { name: "Alex Turner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
        reportCount: 5,
        reasons: ["Harassment", "Fake profile"],
        severity: "high",
        lastReport: "1 hour ago",
        warnings: 2,
        status: "under_review",
    },
    {
        id: 2,
        user: { name: "Jessica Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica" },
        reportCount: 3,
        reasons: ["Spam"],
        severity: "medium",
        lastReport: "3 hours ago",
        warnings: 1,
        status: "under_review",
    },
    {
        id: 3,
        user: { name: "Tom Harris", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom" },
        reportCount: 8,
        reasons: ["Inappropriate content", "Scam"],
        severity: "critical",
        lastReport: "30 min ago",
        warnings: 3,
        status: "pending_ban",
    },
];

const moderationHistory = [
    {
        id: 1,
        action: "Account suspended",
        user: "John Doe",
        moderator: "Admin",
        reason: "Multiple harassment reports",
        timestamp: "2 hours ago",
    },
    {
        id: 2,
        action: "Warning issued",
        user: "Sarah Miller",
        moderator: "Admin",
        reason: "Spam content",
        timestamp: "5 hours ago",
    },
    {
        id: 3,
        action: "Content removed",
        user: "Mike Johnson",
        moderator: "Admin",
        reason: "Inappropriate photos",
        timestamp: "1 day ago",
    },
    {
        id: 4,
        action: "Account banned",
        user: "Emily White",
        moderator: "Admin",
        reason: "Scam activity confirmed",
        timestamp: "2 days ago",
    },
];

const severityStyles = {
    low: "bg-gray-100 text-gray-500",
    medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
    high: "bg-red-50 text-red-600 border-red-200",
    critical: "bg-red-600 text-white",
};

export default function ModerationPage() {
    const [actionNote, setActionNote] = useState("");

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Moderation Tools</h1>
                <p className="text-gray-600">
                    Review reports, manage violations, and keep the platform safe
                </p>
            </div>

            {/* Metrics */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Pending Reports"
                    value="24"
                    change={{ value: 8, type: "increase" }}
                    icon={AlertTriangle}
                    variant="warning"
                />
                <MetricCard
                    title="Actions Today"
                    value="12"
                    icon={Shield}
                />
                <MetricCard
                    title="Suspended Accounts"
                    value="156"
                    change={{ value: 3, type: "increase" }}
                    icon={Ban}
                    variant="primary"
                />
                <MetricCard
                    title="Resolution Rate"
                    value="94.2%"
                    change={{ value: 1.5, type: "increase" }}
                    icon={CheckCircle}
                    variant="success"
                />
            </div>

            <Tabs defaultValue="reports" className="space-y-6">
                <TabsList className="bg-white">
                    <TabsTrigger value="reports" className="gap-2">
                        <FileWarning className="h-4 w-4" />
                        Reported Users
                        <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs">
                            {reportedUsers.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="history" className="gap-2">
                        <Clock className="h-4 w-4" />
                        Moderation History
                    </TabsTrigger>
                </TabsList>

                {/* Reported Users Tab */}
                <TabsContent value="reports" className="space-y-4">
                    {reportedUsers.map((report) => (
                        <Card key={report.id} className="shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={report.user.avatar} />
                                            <AvatarFallback>{report.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900">{report.user.name}</p>
                                                <Badge
                                                    variant="outline"
                                                    className={severityStyles[report.severity as keyof typeof severityStyles]}
                                                >
                                                    {report.severity}
                                                </Badge>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {report.reasons.map((reason) => (
                                                    <Badge key={reason} variant="outline" className="bg-gray-100 text-gray-600 border-none">
                                                        {reason}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                    {report.reportCount} reports
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <AlertTriangle className="h-3.5 w-3.5" />
                                                    {report.warnings} warnings
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {report.lastReport}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" className="h-8 text-xs gap-1">
                                            <Eye className="h-3.5 w-3.5" />
                                            View Evidence
                                        </Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="h-8 text-xs gap-1 text-yellow-600 border-yellow-200 hover:bg-yellow-50">
                                                    <AlertTriangle className="h-3.5 w-3.5" />
                                                    Warn
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Issue Warning</DialogTitle>
                                                    <DialogDescription>
                                                        Send a warning to {report.user.name}. This will be recorded in their account.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Textarea
                                                    placeholder="Enter warning message..."
                                                    value={actionNote}
                                                    onChange={(e) => setActionNote(e.target.value)}
                                                    className="min-h-[100px] mt-4"
                                                />
                                                <DialogFooter>
                                                    <Button variant="outline">Cancel</Button>
                                                    <Button className="bg-yellow-500 text-white hover:bg-yellow-600 border-none">
                                                        Send Warning
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="h-8 text-xs gap-1 bg-red-600 hover:bg-red-700 text-white border-none">
                                                    <Ban className="h-3.5 w-3.5" />
                                                    Ban
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Ban User</DialogTitle>
                                                    <DialogDescription>
                                                        This will permanently ban {report.user.name} from the platform.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Textarea
                                                    placeholder="Enter ban reason..."
                                                    value={actionNote}
                                                    onChange={(e) => setActionNote(e.target.value)}
                                                    className="min-h-[100px] mt-4"
                                                />
                                                <DialogFooter>
                                                    <Button variant="outline">Cancel</Button>
                                                    <Button className="bg-red-600 text-white hover:bg-red-700 border-none">Confirm Ban</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* Moderation History Tab */}
                <TabsContent value="history">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {moderationHistory.map((action) => (
                                    <div
                                        key={action.id}
                                        className="flex items-start gap-4 rounded-lg border border-gray-200 p-4"
                                    >
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full ${action.action.includes("banned")
                                                ? "bg-red-100"
                                                : action.action.includes("suspended")
                                                    ? "bg-yellow-100"
                                                    : "bg-gray-100"
                                                }`}
                                        >
                                            {action.action.includes("banned") ? (
                                                <Ban className="h-5 w-5 text-red-600" />
                                            ) : action.action.includes("suspended") ? (
                                                <XCircle className="h-5 w-5 text-yellow-600" />
                                            ) : action.action.includes("Warning") ? (
                                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                            ) : (
                                                <Shield className="h-5 w-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-gray-900">{action.action}</p>
                                                <span className="text-xs text-gray-500">{action.timestamp}</span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                <span className="font-medium text-gray-900">{action.user}</span> — {action.reason}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">by {action.moderator}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
