"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Overdue Pass",
    message: "Student John Smith has been out for over 30 minutes",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "info",
    title: "Pass Approved",
    message: "Teacher approved pass for Mary Johnson",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    title: "System Update",
    message: "Dashboard has been updated successfully",
    time: "1 hour ago",
    unread: false,
  },
];

const unreadCount = notifications.filter(n => n.unread).length;

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b last:border-b-0 hover:bg-muted/50 ${
                notification.unread ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {notification.type === "alert" && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  {notification.type === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {notification.type === "info" && (
                    <Clock className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <Button variant="ghost" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
