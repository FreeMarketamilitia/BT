"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, User, AlertCircle, QrCode, Calendar } from "lucide-react";
import { PeriodNumber, PassData } from "@/types/theme";

// Mock teacher schedule - in a real app, this would come from API
const teacherSchedule = [
  { periodNumber: 1 as PeriodNumber, startTime: "8:00 AM", endTime: "9:00 AM", className: "Math 101" },
  { periodNumber: 2 as PeriodNumber, startTime: "9:05 AM", endTime: "10:05 AM", className: "English 201" },
  { periodNumber: 3 as PeriodNumber, startTime: "10:10 AM", endTime: "11:10 AM", className: "Science 301" },
  { periodNumber: 4 as PeriodNumber, startTime: "11:15 AM", endTime: "12:15 PM", className: "History 401" },
  { periodNumber: 5 as PeriodNumber, startTime: "1:00 PM", endTime: "2:00 PM", className: "Art 501" },
  { periodNumber: 6 as PeriodNumber, startTime: "2:05 PM", endTime: "3:05 PM", className: "PE 601" },
];

// Mock data with period information
const activePasses: PassData[] = [
  {
    id: 1,
    studentId: "12345",
    studentName: "John Smith",
    studentGrade: "10th",
    destination: "Library",
    issuedAt: "9:15 AM",
    expectedReturn: "9:45 AM",
    duration: "15 min",
    status: "active",
    location: "Room 201",
    avatar: "JS",
    issuedByScan: true,
    period: 1,
    teacherId: "teacher1",
    reason: "Research project"
  },
  {
    id: 2,
    studentId: "12346",
    studentName: "Mary Johnson",
    studentGrade: "9th",
    destination: "Nurse",
    issuedAt: "9:20 AM",
    expectedReturn: "9:35 AM",
    duration: "10 min",
    status: "active",
    location: "Room 105",
    avatar: "MJ",
    issuedByScan: false,
    period: 1,
    teacherId: "teacher1"
  },
  {
    id: 3,
    studentId: "12347",
    studentName: "Alex Brown",
    studentGrade: "11th",
    destination: "Bathroom",
    issuedAt: "9:25 AM",
    expectedReturn: "9:30 AM",
    duration: "5 min",
    status: "overdue",
    location: "Hallway A",
    avatar: "AB",
    issuedByScan: true,
    period: 2,
    teacherId: "teacher1"
  },
  {
    id: 4,
    studentId: "12348",
    studentName: "Sarah Wilson",
    studentGrade: "12th",
    destination: "Counselor",
    issuedAt: "9:30 AM",
    expectedReturn: "10:00 AM",
    duration: "25 min",
    status: "active",
    location: "Room 312",
    avatar: "SW",
    issuedByScan: false,
    period: 2,
    teacherId: "teacher1"
  },
  {
    id: 5,
    studentId: "12349",
    studentName: "Mike Davis",
    studentGrade: "10th",
    destination: "Office",
    issuedAt: "11:20 AM",
    expectedReturn: "11:35 AM",
    duration: "10 min",
    status: "active",
    location: "Room 401",
    avatar: "MD",
    issuedByScan: true,
    period: 4,
    teacherId: "teacher1"
  },
  {
    id: 6,
    studentId: "12350",
    studentName: "Emma Rodriguez",
    studentGrade: "9th",
    destination: "Cafeteria",
    issuedAt: "1:15 PM",
    expectedReturn: "1:30 PM",
    duration: "15 min",
    status: "active",
    location: "Room 501",
    avatar: "ER",
    issuedByScan: false,
    period: 5,
    teacherId: "teacher1"
  }
];

// Utility function to get current period based on time
const getCurrentPeriod = (): PeriodNumber => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight

  for (const period of teacherSchedule) {
    const [startHour, startMin] = period.startTime.split(/[:\s]/);
    const [endHour, endMin] = period.endTime.split(/[:\s]/);

    const startMinutes = parseInt(startHour) * 60 + parseInt(startMin);
    const endMinutes = parseInt(endHour) * 60 + parseInt(endMin);

    if (currentTime >= startMinutes && currentTime <= endMinutes) {
      return period.periodNumber;
    }
  }

  return 1; // Default to period 1 if no match
};

export function ActivePasses() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodNumber | 'all'>(getCurrentPeriod());
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'overdue' | 'all'>('all');

  // Filter passes based on selected period and status
  const filteredPasses = activePasses.filter(pass => {
    const periodMatch = selectedPeriod === 'all' || pass.period === selectedPeriod;
    const statusMatch = selectedStatus === 'all' || pass.status === selectedStatus;
    return periodMatch && statusMatch;
  });

  // Calculate period statistics
  const periodStats = teacherSchedule.map(period => {
    const periodPasses = activePasses.filter(pass => pass.period === period.periodNumber);
    const active = periodPasses.filter(pass => pass.status === 'active').length;
    const overdue = periodPasses.filter(pass => pass.status === 'overdue').length;

    return {
      period: period.periodNumber,
      activePasses: active,
      overduePasses: overdue,
      totalPasses: periodPasses.length,
      className: period.className,
      timeRange: `${period.startTime} - ${period.endTime}`
    };
  });

  const renderPassCard = (pass: PassData) => (
    <div
      key={pass.id}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {pass.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">{pass.studentName}</h4>
            <Badge variant="secondary" className="text-xs">
              {pass.studentGrade}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Period {pass.period}
            </Badge>
            {pass.issuedByScan && (
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                <QrCode className="h-3 w-3 mr-1" />
                Scanned
              </Badge>
            )}
            {pass.status === "overdue" && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Overdue
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{pass.destination}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{pass.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{pass.issuedAt}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right space-y-1">
        <div className="text-sm font-medium">{pass.duration}</div>
        <div className="text-xs text-muted-foreground">
          Return: {pass.expectedReturn}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Active Passes</CardTitle>
        <div className="flex items-center space-x-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'active' | 'overdue' | 'all')}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
          </select>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Period Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {periodStats.map((stat) => (
            <div
              key={stat.period}
              className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                selectedPeriod === stat.period
                  ? 'bg-primary/10 border-primary'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => setSelectedPeriod(stat.period)}
            >
              <div className="text-sm font-medium">Period {stat.period}</div>
              <div className="text-xs text-muted-foreground">{stat.className}</div>
              <div className="flex justify-center space-x-2 mt-1">
                <Badge variant={stat.activePasses > 0 ? "default" : "secondary"} className="text-xs">
                  {stat.activePasses}
                </Badge>
                {stat.overduePasses > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {stat.overduePasses}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Period Tabs */}
        <Tabs value={selectedPeriod.toString()} onValueChange={(value) =>
          setSelectedPeriod(value === 'all' ? 'all' : parseInt(value) as PeriodNumber)
        }>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            {teacherSchedule.map((period) => (
              <TabsTrigger key={period.periodNumber} value={period.periodNumber.toString()}>
                {period.periodNumber}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredPasses.length > 0 ? (
              filteredPasses.map(renderPassCard)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active passes found</p>
              </div>
            )}
          </TabsContent>

          {teacherSchedule.map((period) => (
            <TabsContent key={period.periodNumber} value={period.periodNumber.toString()} className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-medium">{period.className}</h3>
                  <p className="text-sm text-muted-foreground">{period.startTime} - {period.endTime}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {activePasses.filter(p => p.period === period.periodNumber).length} passes
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activePasses.filter(p => p.period === period.periodNumber && p.status === 'active').length} active
                  </div>
                </div>
              </div>

              {filteredPasses.filter(pass => pass.period === period.periodNumber).length > 0 ? (
                filteredPasses
                  .filter(pass => pass.period === period.periodNumber)
                  .map(renderPassCard)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active passes in Period {period.periodNumber}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
