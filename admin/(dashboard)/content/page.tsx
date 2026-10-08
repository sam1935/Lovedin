"use client";

import { useState } from "react";
import {
    FileText,
    Flag,
    CheckCircle,
    XCircle,
    Eye,
    Trash2,
    AlertTriangle,
    Bell,
    Send,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/admin/components/ui/Tabs";
import { Badge } from "@/app/admin/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/admin/components/ui/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/admin/components/ui/Card";
import { Textarea } from "@/app/admin/components/ui/Textarea";


const flaggedContent = [
    {
        id: 1,
        type: "photo",
        user: { name: "Alex Turner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
        reason: "Inappropriate content",
        reportedBy: 3,
        timestamp: "2 hours ago",
        preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
        id: 2,
        type: "bio",
        user: { name: "Sarah Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahm" },
        reason: "Spam/advertising",
        reportedBy: 5,
        timestamp: "4 hours ago",
        content: "Buy followers now! Visit my website for amazing deals...",
    },
    {
        id: 3,
        type: "photo",
        user: { name: "John Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
        reason: "Fake profile",
        reportedBy: 2,
        timestamp: "6 hours ago",
        preview: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
];

const pendingVerifications = [
    {
        id: 1,
        user: { name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma2" },
        type: "ID Verification",
        submittedAt: "1 hour ago",
    },
    {
        id: 2,
        user: { name: "David Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=davidlee" },
        type: "Photo Verification",
        submittedAt: "3 hours ago",
    },
    {
        id: 3,
        user: { name: "Maria Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
        type: "ID Verification",
        submittedAt: "5 hours ago",
    },
];

export default function ContentPage() {
    const [notificationMessage, setNotificationMessage] = useState("");

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
                <p className="text-gray-600">
                    Review and moderate user-generated content
                </p>
            </div>

            <Tabs defaultValue="flagged" className="space-y-6">
                <TabsList className="bg-white">
                    <TabsTrigger value="flagged" className="gap-2">
                        <Flag className="h-4 w-4" />
                        Flagged Content
                        <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs">
                            {flaggedContent.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="verification" className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Verifications
                        <Badge className="ml-1 h-5 bg-yellow-100 text-yellow-600 px-1.5 text-xs">
                            {pendingVerifications.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Flagged Content Tab */}
                <TabsContent value="flagged" className="space-y-4">
                    {flaggedContent.map((item) => (
                        <Card key={item.id} className="shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    {/* Preview */}
                                    <div className="shrink-0">
                                        {item.type === "photo" ? (
                                            <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={item.preview}
                                                    alt="Flagged content"
                                                    className="h-full w-full object-cover blur-sm"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                    <Eye className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100">
                                                <FileText className="h-8 w-8 text-gray-500" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={item.user.avatar} />
                                                <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.user.name}</p>
                                                <p className="text-xs text-gray-500">{item.timestamp}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                                <AlertTriangle className="mr-1 h-3 w-3" />
                                                {item.reason}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                Reported by {item.reportedBy} users
                                            </span>
                                        </div>
                                        {item.content && (
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                {item.content}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" className="h-8 text-xs gap-1">
                                            <Eye className="h-3.5 w-3.5" />
                                            Review
                                        </Button>
                                        <Button className="h-8 text-xs gap-1 bg-green-600 hover:bg-green-700 text-white border-none">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            Approve
                                        </Button>
                                        <Button variant="outline" className="h-8 text-xs gap-1 text-red-600 border-red-200 hover:bg-red-50">
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* Verifications Tab */}
                <TabsContent value="verification" className="space-y-4">
                    {pendingVerifications.map((item) => (
                        <Card key={item.id} className="shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={item.user.avatar} />
                                            <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.user.name}</p>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                                                    {item.type}
                                                </Badge>
                                                <span className="text-xs text-gray-500">
                                                    Submitted {item.submittedAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="h-8 text-xs gap-1">
                                            <Eye className="h-3.5 w-3.5" />
                                            View Documents
                                        </Button>
                                        <Button className="h-8 text-xs gap-1 bg-green-600 hover:bg-green-700 text-white border-none">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            Approve
                                        </Button>
                                        <Button variant="outline" className="h-8 text-xs gap-1 text-red-600 border-red-200 hover:bg-red-50">
                                            <XCircle className="h-3.5 w-3.5" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Send Broadcast Notification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder="Write your notification message..."
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                                className="min-h-[120px] resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    This will be sent to all active users
                                </p>
                                <Button className="gap-2 h-10 px-4">
                                    <Send className="h-4 w-4" />
                                    Send Notification
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
