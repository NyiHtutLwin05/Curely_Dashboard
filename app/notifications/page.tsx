"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Calendar,
  Clock,
  Filter,
  AlertCircle,
  Pill,
  FileText,
  MessageCircle,
  Settings,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Mail,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

// Mock data
const notifications = [
  {
    id: 1,
    title: "Upcoming Appointment",
    message: "Appointment with Dr. Sarah Johnson tomorrow at 10:00 AM",
    type: "appointment",
    priority: "high",
    time: "2 hours ago",
    unread: true,
    actionable: true,
    action: "Confirm appointment",
  },
  {
    id: 2,
    title: "Prescription Refill Reminder",
    message: "Your prescription for Metformin needs to be refilled in 3 days",
    type: "prescription",
    priority: "medium",
    time: "5 hours ago",
    unread: true,
    actionable: true,
    action: "Order refill",
  },
  {
    id: 3,
    title: "Test Results Available",
    message: "Your recent blood test results are now available",
    type: "results",
    priority: "high",
    time: "1 day ago",
    unread: false,
    actionable: true,
    action: "View results",
  },
  {
    id: 4,
    title: "Health Checkup Due",
    message: "It's time for your annual health checkup",
    type: "reminder",
    priority: "medium",
    time: "2 days ago",
    unread: false,
    actionable: true,
    action: "Schedule now",
  },
  {
    id: 5,
    title: "New Message from Doctor",
    message: "Dr. Michael Chen sent you a message regarding your last visit",
    type: "message",
    priority: "medium",
    time: "3 days ago",
    unread: false,
    actionable: true,
    action: "Read message",
  },
];

const notificationPreferences = [
  {
    category: "Appointments",
    email: true,
    push: true,
    sms: false,
  },
  {
    category: "Prescription Reminders",
    email: true,
    push: true,
    sms: true,
  },
  {
    category: "Test Results",
    email: true,
    push: true,
    sms: false,
  },
  {
    category: "Health Reminders",
    email: true,
    push: false,
    sms: false,
  },
  {
    category: "Messages",
    email: true,
    push: true,
    sms: false,
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [preferences, setPreferences] = useState(notificationPreferences);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5" />;
      case "prescription":
        return <Pill className="h-5 w-5" />;
      case "results":
        return <FileText className="h-5 w-5" />;
      case "reminder":
        return <Bell className="h-5 w-5" />;
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your health notifications and reminders
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Notification Preferences</DialogTitle>
                  <DialogDescription>
                    Customize how you receive notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-4">Category</th>
                        <th className="pb-4">Email</th>
                        <th className="pb-4">Push</th>
                        <th className="pb-4">SMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preferences.map((pref, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-4">{pref.category}</td>
                          <td className="py-4">
                            <Switch checked={pref.email} />
                          </td>
                          <td className="py-4">
                            <Switch checked={pref.push} />
                          </td>
                          <td className="py-4">
                            <Switch checked={pref.sms} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Email</h3>
                </div>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive detailed notifications via email
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Push Notifications</h3>
                </div>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-muted-foreground">
                Get instant alerts on your device
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">SMS</h3>
                </div>
                <Switch checked={false} />
              </div>
              <p className="text-sm text-muted-foreground">
                Get text messages for urgent updates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Unread
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={notification.unread ? "bg-muted/40" : ""}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`text-${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">
                              {notification.title}
                            </h3>
                            {notification.unread && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            {notification.actionable && (
                              <Button
                                variant="link"
                                className="h-auto p-0 text-xs"
                              >
                                {notification.action}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-4">
              {notifications
                .filter((n) => n.unread)
                .map((notification) => (
                  <Card key={notification.id} className="bg-muted/40">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`text-${getPriorityColor(
                              notification.priority
                            )}`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">
                                {notification.title}
                              </h3>
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              {notification.actionable && (
                                <Button
                                  variant="link"
                                  className="h-auto p-0 text-xs"
                                >
                                  {notification.action}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
