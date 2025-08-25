"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Clock, Users } from "lucide-react";

export function AlertsAndTrends() {
  const alerts = [
    {
      type: "overdue",
      title: "Multiple Overdue Passes",
      description: "3 students have been out for more than 15 minutes",
      time: "2 min ago",
      severity: "high"
    },
    {
      type: "pattern",
      title: "Unusual Activity",
      description: "Higher than normal pass volume in Library",
      time: "15 min ago",
      severity: "medium"
    },
    {
      type: "system",
      title: "System Alert",
      description: "Backup completed successfully",
      time: "1 hour ago",
      severity: "low"
    }
  ];

  const trends = [
    { label: "Peak Hours", value: "9:00-10:00 AM", change: "+12%" },
    { label: "Popular Route", value: "Library → Bathroom", change: "+8%" },
    { label: "Average Duration", value: "9.2 minutes", change: "-2%" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Alerts & Trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium">Active Alerts</h4>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg ${
                  alert.severity === "high"
                    ? "border-red-200 bg-red-50/50"
                    : alert.severity === "medium"
                    ? "border-yellow-200 bg-yellow-50/50"
                    : "border-green-200 bg-green-50/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-sm">{alert.title}</h5>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  {alert.severity === "high" && (
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Today&apos;s Trends</span>
          </h4>
          <div className="space-y-3">
            {trends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">{trend.label}</div>
                  <div className="text-sm text-muted-foreground">{trend.value}</div>
                </div>
                <Badge
                  variant={trend.change.startsWith("+") ? "default" : "secondary"}
                  className={
                    trend.change.startsWith("+")
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }
                >
                  {trend.change}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Alert
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
