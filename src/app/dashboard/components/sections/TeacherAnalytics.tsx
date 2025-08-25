"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Target } from "lucide-react";

// Mock analytics data - in a real app, this would come from API
const analyticsData = {
  todayStats: {
    passesIssued: 24,
    averageDuration: "8.5 min",
    onTimeRate: 94,
    totalStudents: 28
  },
  weeklyGoals: {
    passesTarget: 150,
    passesCurrent: 127,
    onTimeTarget: 95,
    onTimeCurrent: 92
  },
  topDestinations: [
    { name: "Library", count: 45, percentage: 32 },
    { name: "Bathroom", count: 38, percentage: 27 },
    { name: "Nurse", count: 28, percentage: 20 },
    { name: "Counselor", count: 18, percentage: 13 },
    { name: "Office", count: 11, percentage: 8 }
  ]
};

export function TeacherAnalytics() {
  const passesProgress = (analyticsData.weeklyGoals.passesCurrent / analyticsData.weeklyGoals.passesTarget) * 100;
  const onTimeProgress = (analyticsData.weeklyGoals.onTimeCurrent / analyticsData.weeklyGoals.onTimeTarget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{analyticsData.todayStats.passesIssued}</div>
            <div className="text-xs text-muted-foreground">Passes Today</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{analyticsData.todayStats.averageDuration}</div>
            <div className="text-xs text-muted-foreground">Avg Duration</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{analyticsData.todayStats.onTimeRate}%</div>
            <div className="text-xs text-muted-foreground">On-Time Rate</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{analyticsData.todayStats.totalStudents}</div>
            <div className="text-xs text-muted-foreground">Total Students</div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="space-y-4">
          <h4 className="font-medium">Weekly Goals</h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Passes Issued</span>
                <span className="text-sm font-medium">
                  {analyticsData.weeklyGoals.passesCurrent}/{analyticsData.weeklyGoals.passesTarget}
                </span>
              </div>
              <Progress value={passesProgress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">On-Time Rate</span>
                <span className="text-sm font-medium">
                  {analyticsData.weeklyGoals.onTimeCurrent}%/{analyticsData.weeklyGoals.onTimeTarget}%
                </span>
              </div>
              <Progress value={onTimeProgress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="space-y-3">
          <h4 className="font-medium">Top Destinations</h4>
          <div className="space-y-2">
            {analyticsData.topDestinations.map((dest) => (
              <div key={dest.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{dest.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {dest.count}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={dest.percentage} className="w-16 h-1" />
                  <span className="text-xs text-muted-foreground w-8">
                    {dest.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
