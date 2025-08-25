"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Clock, Target, BarChart3 } from "lucide-react";

// Mock school-wide analytics data
const schoolAnalytics = {
  overview: {
    totalPassesToday: 247,
    activePasses: 34,
    averageDuration: "9.2 min",
    onTimeRate: 91
  },
  trends: {
    passesThisWeek: 1247,
    passesLastWeek: 1189,
    growthPercentage: 4.9
  },
  teacherPerformance: [
    { name: "Mrs. Johnson", passes: 45, onTimeRate: 98, efficiency: 95 },
    { name: "Mr. Davis", passes: 38, onTimeRate: 96, efficiency: 92 },
    { name: "Ms. Wilson", passes: 52, onTimeRate: 94, efficiency: 88 },
    { name: "Mr. Chen", passes: 41, onTimeRate: 97, efficiency: 90 }
  ],
  destinations: [
    { name: "Library", count: 89, percentage: 36 },
    { name: "Bathroom", count: 67, percentage: 27 },
    { name: "Nurse", count: 45, percentage: 18 },
    { name: "Counselor", count: 32, percentage: 13 },
    { name: "Office", count: 14, percentage: 6 }
  ]
};

export function AdminAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>School Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{schoolAnalytics.overview.totalPassesToday}</div>
            <div className="text-sm text-muted-foreground">Total Today</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">{schoolAnalytics.overview.activePasses}</div>
            <div className="text-sm text-muted-foreground">Active Now</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">{schoolAnalytics.overview.onTimeRate}%</div>
            <div className="text-sm text-muted-foreground">On-Time Rate</div>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-orange-600">{schoolAnalytics.overview.averageDuration}</div>
            <div className="text-sm text-muted-foreground">Avg Duration</div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="space-y-3">
          <h4 className="font-medium">Weekly Trend</h4>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Pass Volume</span>
              <Badge variant="default" className="bg-green-500">
                +{schoolAnalytics.trends.growthPercentage}%
              </Badge>
            </div>
            <div className="text-2xl font-bold">{schoolAnalytics.trends.passesThisWeek}</div>
            <div className="text-sm text-muted-foreground">
              vs {schoolAnalytics.trends.passesLastWeek} last week
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="space-y-3">
          <h4 className="font-medium">Popular Destinations</h4>
          <div className="space-y-3">
            {schoolAnalytics.destinations.map((dest) => (
              <div key={dest.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{dest.name}</span>
                  <Badge variant="secondary">{dest.count} passes</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={dest.percentage} className="w-20 h-2" />
                  <span className="text-sm text-muted-foreground w-10">
                    {dest.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Performance Preview */}
        <div className="space-y-3">
          <h4 className="font-medium">Teacher Performance</h4>
          <div className="space-y-2">
            {schoolAnalytics.teacherPerformance.slice(0, 3).map((teacher) => (
              <div key={teacher.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{teacher.name}</div>
                  <div className="text-sm text-muted-foreground">{teacher.passes} passes today</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{teacher.onTimeRate}% on-time</div>
                  <div className="text-xs text-muted-foreground">{teacher.efficiency}% efficient</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
