"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, Calendar } from "lucide-react";
import { PeriodNumber } from "@/types/theme";

// Mock destinations - in a real app, this would come from API
const destinations = [
  "Library",
  "Bathroom",
  "Nurse",
  "Office",
  "Counselor",
  "Cafeteria",
  "Gym",
  "Auditorium"
];

// Mock teacher schedule - in a real app, this would come from API
const teacherSchedule = [
  { periodNumber: 1 as PeriodNumber, startTime: "8:00 AM", endTime: "9:00 AM", className: "Math 101" },
  { periodNumber: 2 as PeriodNumber, startTime: "9:05 AM", endTime: "10:05 AM", className: "English 201" },
  { periodNumber: 3 as PeriodNumber, startTime: "10:10 AM", endTime: "11:10 AM", className: "Science 301" },
  { periodNumber: 4 as PeriodNumber, startTime: "11:15 AM", endTime: "12:15 PM", className: "History 401" },
  { periodNumber: 5 as PeriodNumber, startTime: "1:00 PM", endTime: "2:00 PM", className: "Art 501" },
  { periodNumber: 6 as PeriodNumber, startTime: "2:05 PM", endTime: "3:05 PM", className: "PE 601" },
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

export function QuickIssuePass() {
  const [studentName, setStudentName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("10");
  const [reason, setReason] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodNumber>(getCurrentPeriod());

  const handleIssuePass = () => {
    if (!studentName || !destination) {
      return;
    }

    // In a real app, this would make an API call
    console.log("Issuing pass:", {
      studentName,
      destination,
      duration: parseInt(duration),
      reason,
      period: selectedPeriod
    });

    // Reset form
    setStudentName("");
    setDestination("");
    setDuration("10");
    setReason("");
    // Keep period as current period
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Quick Issue Pass</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student-name">Student Name</Label>
          <Input
            id="student-name"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="period" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Period</span>
            <span className="text-xs text-muted-foreground">
              (Current: {getCurrentPeriod()})
            </span>
          </Label>
          <Select
            value={selectedPeriod.toString()}
            onValueChange={(value) => setSelectedPeriod(parseInt(value) as PeriodNumber)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teacherSchedule.map((period) => (
                <SelectItem key={period.periodNumber} value={period.periodNumber.toString()}>
                  Period {period.periodNumber} - {period.className}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({period.startTime} - {period.endTime})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 minutes</SelectItem>
              <SelectItem value="10">10 minutes</SelectItem>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="20">20 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason (optional)</Label>
          <Textarea
            id="reason"
            placeholder="Enter reason for pass"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
          />
        </div>

        <Button
          onClick={handleIssuePass}
          disabled={!studentName || !destination}
          className="w-full"
        >
          <Clock className="h-4 w-4 mr-2" />
          Issue Pass
        </Button>

        {/* Quick destination buttons */}
        <div className="pt-4 border-t">
          <Label className="text-sm font-medium">Quick Actions</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Bathroom", "Library", "Nurse"].map((dest) => (
              <Button
                key={dest}
                variant="outline"
                size="sm"
                onClick={() => setDestination(dest)}
                className="text-xs"
              >
                {dest}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
