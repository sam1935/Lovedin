"use client";

import { useState } from "react";
import {
    Sliders,
    CreditCard,
    Mail,
    Bell,
    Save,
    Plus,
    Trash2,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
// import { Label } from "@/app/components/ui/Input"; // Assuming label in Input is not exported, might need to fix
import { Switch } from "@/app/admin/components/ui/Switch";
import { Slider } from "@/app/admin/components/ui/Slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/admin/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/admin/components/ui/Tabs";
import { Badge } from "@/app/admin/components/ui/Badge";



const subscriptionPlans = [
    { id: 1, name: "Premium Monthly", price: 14.99, duration: "1 month", features: ["Unlimited likes", "See who liked you", "5 Super Likes/day"] },
    { id: 2, name: "Premium Annual", price: 119.99, duration: "12 months", features: ["All monthly features", "Priority matching", "Profile boost/month"] },
    { id: 3, name: "Platinum", price: 29.99, duration: "1 month", features: ["All Premium features", "Message before matching", "Advanced filters"] },
];

function SettingLabel({ children }: { children: React.ReactNode }) {
    return <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{children}</label>;
}

export default function SettingsPage() {
    const [matchingRadius, setMatchingRadius] = useState([50]);
    const [ageRange, setAgeRange] = useState([18, 45]);

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings & Configuration</h1>
                <p className="text-gray-600">
                    Configure platform settings, subscriptions, and notifications
                </p>
            </div>

            <Tabs defaultValue="algorithm" className="space-y-6">
                <TabsList className="bg-white">
                    <TabsTrigger value="algorithm" className="gap-2">
                        <Sliders className="h-4 w-4" />
                        Algorithm
                    </TabsTrigger>
                    <TabsTrigger value="subscriptions" className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        Subscriptions
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="email" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Email Templates
                    </TabsTrigger>
                </TabsList>

                {/* Algorithm Settings */}
                <TabsContent value="algorithm">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Matching Algorithm Parameters</CardTitle>
                            <CardDescription>
                                Configure the default matching preferences for new users
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <SettingLabel>Default Matching Radius</SettingLabel>
                                        <span className="text-sm font-medium text-pink-600">{matchingRadius[0]} km</span>
                                    </div>
                                    <Slider
                                        value={matchingRadius}
                                        onValueChange={setMatchingRadius}
                                        max={200}
                                        min={5}
                                        step={5}
                                        className="mt-4"
                                    />
                                </div>

                                <div className="h-px bg-gray-100 my-4" />

                                <div>
                                    <div className="flex items-center justify-between">
                                        <SettingLabel>Default Age Range</SettingLabel>
                                        <span className="text-sm font-medium text-pink-600">
                                            {ageRange[0]} - {ageRange[1]} years
                                        </span>
                                    </div>
                                    {/* Note: Standard HTML range input only supports single value. 
                            For double range, custom component needed or 2 sliders. 
                            Using single slider for simplifying this demo if needed or adapting 
                            local slider to support range visual if capable, but simplistic here. 
                            Let's just show one slider for now or assume slider handles array.
                            Our simple slider handles array[0].
                        */}
                                    <Slider
                                        value={ageRange}
                                        onValueChange={setAgeRange}
                                        max={65}
                                        min={18}
                                        step={1}
                                        className="mt-4"
                                    />
                                </div>

                                <div className="h-px bg-gray-100 my-4" />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <SettingLabel>Interest-Based Matching</SettingLabel>
                                        <p className="text-sm text-gray-500">
                                            Prioritize users with similar interests
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <SettingLabel>Activity Score Weighting</SettingLabel>
                                        <p className="text-sm text-gray-500">
                                            Boost active users in recommendations
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <SettingLabel>Mutual Friends Priority</SettingLabel>
                                        <p className="text-sm text-gray-500">
                                            Show users with mutual connections first
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>

                            <Button className="gap-2 bg-pink-600 text-white hover:bg-pink-700 h-10 px-4 border-none">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Subscription Settings */}
                <TabsContent value="subscriptions">
                    <div className="space-y-4">
                        {subscriptionPlans.map((plan) => (
                            <Card key={plan.id} className="shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                                                <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                                                    ${plan.price}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">{plan.duration}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {plan.features.map((feature) => (
                                                    <Badge key={feature} variant="outline" className="bg-gray-100 text-gray-600 border-none font-normal">
                                                        {feature}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="h-8 text-xs">
                                                Edit
                                            </Button>
                                            <Button variant="outline" className="h-8 w-8 p-0 text-red-600 border-none hover:bg-red-50">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Button variant="outline" className="w-full gap-2 border-dashed h-12">
                            <Plus className="h-4 w-4" />
                            Add New Plan
                        </Button>
                    </div>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Push Notification Settings</CardTitle>
                            <CardDescription>
                                Configure which notifications are sent to users
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "New Match Notifications", description: "Notify users when they get a new match", enabled: true },
                                { label: "Message Notifications", description: "Notify users when they receive a new message", enabled: true },
                                { label: "Like Notifications", description: "Notify users when someone likes their profile", enabled: true },
                                { label: "Super Like Notifications", description: "Notify users when they receive a Super Like", enabled: true },
                                { label: "Profile View Notifications", description: "Notify users when someone views their profile", enabled: false },
                                { label: "Promotional Notifications", description: "Send promotional and marketing notifications", enabled: false },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                                    <div>
                                        <SettingLabel>{item.label}</SettingLabel>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <Switch defaultChecked={item.enabled} />
                                </div>
                            ))}

                            <Button className="gap-2 bg-pink-600 text-white hover:bg-pink-700 h-10 px-4 border-none">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Email Templates */}
                <TabsContent value="email">
                    <div className="grid gap-4 lg:grid-cols-2">
                        {[
                            { name: "Welcome Email", description: "Sent when a new user signs up" },
                            { name: "Email Verification", description: "Sent to verify user email address" },
                            { name: "Payment Confirmation", description: "Sent after successful payment" },
                            { name: "Account Suspension", description: "Sent when account is suspended" },
                            { name: "Password Reset", description: "Sent for password reset requests" },
                            { name: "Match Notification", description: "Sent when users match (if enabled)" },
                        ].map((template) => (
                            <Card key={template.name} className="shadow-sm cursor-pointer transition-all hover:shadow-md">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{template.name}</h3>
                                            <p className="text-sm text-gray-500">{template.description}</p>
                                        </div>
                                        <Button variant="outline" className="h-8 text-xs">
                                            Edit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
