"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Users, Clock, TrendingUp } from "lucide-react";

// Mock data - in a real app, this would come from API
const stats = {
  activePasses: 12,
  studentsToday: 156,
  avgPassDuration: "8.5 min",
  onTimeRate: "94%"
};

export function HeroWelcome() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          {/* Welcome message */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Good morning!</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Teacher!</h1>
            <p className="text-lg text-gray-600">
              {currentDate} • {currentTime}
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Active Passes</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.activePasses}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Students Today</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.studentsToday}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Avg Duration</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgPassDuration}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">On-Time Rate</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.onTimeRate}</div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50">
            View All Passes
          </Button>
          <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50">
            Generate Report
          </Button>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            All Systems Operational
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
