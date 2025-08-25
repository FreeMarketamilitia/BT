"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Clock, ArrowRight, CheckCircle, AlertTriangle, ChevronDown, Calendar } from "lucide-react";
import { PeriodNumber } from "@/types/theme";

// Mock teacher schedule - in a real app, this would come from API
const teacherSchedule = [
  { periodNumber: 1 as PeriodNumber, startTime: "8:00 AM", endTime: "9:00 AM", className: "Math 101" },
  { periodNumber: 2 as PeriodNumber, startTime: "9:05 AM", endTime: "10:05 AM", className: "English 201" },
  { periodNumber: 3 as PeriodNumber, startTime: "10:10 AM", endTime: "11:10 AM", className: "Science 301" },
  { periodNumber: 4 as PeriodNumber, startTime: "11:15 AM", endTime: "12:15 PM", className: "History 401" },
  { periodNumber: 5 as PeriodNumber, startTime: "1:00 PM", endTime: "2:00 PM", className: "Art 501" },
  { periodNumber: 6 as PeriodNumber, startTime: "2:05 PM", endTime: "3:05 PM", className: "PE 601" },
];

// Mock feed data with period information - in a real app, this would come from API
const feedItems = [
  {
    id: 1,
    type: "pass_issued",
    studentName: "Emma Davis",
    studentGrade: "10th",
    action: "issued pass to",
    destination: "Library",
    time: "2 minutes ago",
    avatar: "ED",
    status: "active",
    period: 1 as PeriodNumber,
    issuedByScan: false
  },
  {
    id: 2,
    type: "pass_returned",
    studentName: "Michael Chen",
    studentGrade: "9th",
    action: "returned from",
    destination: "Bathroom",
    time: "5 minutes ago",
    avatar: "MC",
    status: "completed",
    period: 1 as PeriodNumber,
    issuedByScan: true
  },
  {
    id: 3,
    type: "pass_overdue",
    studentName: "Sophia Rodriguez",
    studentGrade: "11th",
    action: "is overdue from",
    destination: "Counselor",
    time: "12 minutes ago",
    avatar: "SR",
    status: "overdue",
    period: 2 as PeriodNumber,
    issuedByScan: false
  },
  {
    id: 4,
    type: "pass_issued",
    studentName: "James Wilson",
    studentGrade: "12th",
    action: "issued pass to",
    destination: "Nurse",
    time: "8 minutes ago",
    avatar: "JW",
    status: "active",
    period: 2 as PeriodNumber,
    issuedByScan: false
  },
  {
    id: 5,
    type: "pass_returned",
    studentName: "Olivia Brown",
    studentGrade: "10th",
    action: "returned from",
    destination: "Office",
    time: "15 minutes ago",
    avatar: "OB",
    status: "completed",
    period: 4 as PeriodNumber,
    issuedByScan: true
  },
  {
    id: 6,
    type: "pass_issued",
    studentName: "Alex Thompson",
    studentGrade: "11th",
    action: "issued pass to",
    destination: "Cafeteria",
    time: "3 minutes ago",
    avatar: "AT",
    status: "active",
    period: 4 as PeriodNumber,
    issuedByScan: false
  }
];

export function ClassFeed() {
  const [expandedPeriods, setExpandedPeriods] = useState<Set<PeriodNumber>>(new Set([1, 2])); // Default expand current periods

  // Group feed items by period
  const itemsByPeriod = feedItems.reduce((acc, item) => {
    if (!acc[item.period]) {
      acc[item.period] = [];
    }
    acc[item.period].push(item);
    return acc;
  }, {} as Record<PeriodNumber, typeof feedItems>);

  // Sort periods by period number
  const sortedPeriods = Object.keys(itemsByPeriod)
    .map(p => parseInt(p) as PeriodNumber)
    .sort((a, b) => a - b);

  const togglePeriod = (period: PeriodNumber) => {
    const newExpanded = new Set(expandedPeriods);
    if (newExpanded.has(period)) {
      newExpanded.delete(period);
    } else {
      newExpanded.add(period);
    }
    setExpandedPeriods(newExpanded);
  };

  const renderFeedItem = (item: typeof feedItems[0]) => (
    <div
      key={item.id}
      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
            {item.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">{item.studentName}</span>
            <Badge variant="secondary" className="text-xs">
              {item.studentGrade}
            </Badge>
            {item.issuedByScan && (
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                Scanned
              </Badge>
            )}
            {item.status === "overdue" && (
              <AlertTriangle className="h-3 w-3 text-red-500" />
            )}
            {item.status === "completed" && (
              <CheckCircle className="h-3 w-3 text-green-500" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {item.action} {item.destination}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground">{item.time}</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Recent Activity</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPeriods.map((period) => {
            const periodItems = itemsByPeriod[period];
            const periodInfo = teacherSchedule.find(p => p.periodNumber === period);
            const isExpanded = expandedPeriods.has(period);

            return (
              <Collapsible key={period} open={isExpanded} onOpenChange={() => togglePeriod(period)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        Period {period}
                      </Badge>
                      <div className="text-left">
                        <div className="font-medium text-sm">{periodInfo?.className}</div>
                        <div className="text-xs text-muted-foreground">
                          {periodInfo?.startTime} - {periodInfo?.endTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{periodItems.length} activities</div>
                        <div className="text-xs text-muted-foreground">
                          {periodItems.filter(item => item.status === 'active').length} active
                        </div>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 mt-2">
                  {periodItems.map(renderFeedItem)}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>

        {feedItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
