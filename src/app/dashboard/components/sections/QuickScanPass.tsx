"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Camera, Scan, CheckCircle, AlertCircle, QrCode, Calendar } from "lucide-react";
import { PeriodNumber } from "@/types/theme";

// Mock student database for scanning
const mockStudents = [
  { id: "123456", name: "John Smith", grade: "10th", avatar: "JS" },
  { id: "234567", name: "Mary Johnson", grade: "9th", avatar: "MJ" },
  { id: "345678", name: "Alex Brown", grade: "11th", avatar: "AB" },
  { id: "456789", name: "Sarah Wilson", grade: "12th", avatar: "SW" },
  { id: "567890", name: "Michael Chen", grade: "10th", avatar: "MC" }
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

export function QuickScanPass() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedStudent, setScannedStudent] = useState<any>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  const startScanning = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    setScannedStudent(null);

    // Simulate scanning delay
    setTimeout(() => {
      // Randomly select a student for demo
      const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
      setScannedStudent(randomStudent);
      setScanStatus('success');
      setIsScanning(false);
    }, 2000);
  };

  const resetScan = () => {
    setScanStatus('idle');
    setScannedStudent(null);
    setIsScanning(false);
  };

  const handleIssueScannedPass = () => {
    if (!scannedStudent) return;

    const currentPeriod = getCurrentPeriod();
    const periodInfo = teacherSchedule.find(p => p.periodNumber === currentPeriod);

    // In a real app, this would make an API call
    console.log("Issuing scanned pass for:", {
      ...scannedStudent,
      period: currentPeriod,
      periodInfo: periodInfo,
      issuedByScan: true,
      issuedAt: new Date().toLocaleTimeString()
    });

    // Reset after issuing
    resetScan();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <QrCode className="h-4 w-4" />
          <span>Quick Scan Pass</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scan Button/Interface */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={startScanning}
              disabled={isScanning}
              className="w-full"
              variant={scanStatus === 'success' ? 'default' : 'outline'}
            >
              {isScanning ? (
                <>
                  <Scan className="h-4 w-4 mr-2 animate-pulse" />
                  Scanning...
                </>
              ) : scanStatus === 'success' ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Student Detected
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Student ID
                </>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80" side="top">
            <div className="space-y-4">
              {/* Camera Interface Mock */}
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="text-center">
                    <Scan className="h-12 w-12 mx-auto mb-2 animate-pulse text-blue-500" />
                    <p className="text-sm text-gray-600">Position barcode in frame...</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full animate-pulse w-3/4"></div>
                    </div>
                  </div>
                ) : scanStatus === 'success' && scannedStudent ? (
                  <div className="text-center p-4">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <p className="font-medium">{scannedStudent.name}</p>
                    <p className="text-sm text-gray-600">ID: {scannedStudent.id}</p>
                    <Badge variant="secondary" className="mt-2">
                      {scannedStudent.grade}
                    </Badge>
                  </div>
                ) : scanStatus === 'error' ? (
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-2 text-red-500" />
                    <p className="text-sm text-gray-600">Scan failed. Try again.</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Camera className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Click to start scanning</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {scanStatus === 'success' && scannedStudent && (
                  <Button
                    onClick={handleIssueScannedPass}
                    className="flex-1"
                    size="sm"
                  >
                    Issue Pass
                  </Button>
                )}
                <Button
                  onClick={resetScan}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Scanned Student Info */}
        {scannedStudent && scanStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-green-700 text-sm">
                  {scannedStudent.avatar}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-900">{scannedStudent.name}</p>
                <p className="text-sm text-green-700">Grade {scannedStudent.grade}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    Period {getCurrentPeriod()}
                  </Badge>
                  <span className="text-xs text-green-600">
                    Auto-detected: {teacherSchedule.find(p => p.periodNumber === getCurrentPeriod())?.className}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Scanned
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Ready to Issue
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Position student ID card or barcode in camera frame</p>
          <p>• Ensure good lighting for best results</p>
          <p>• Or use keyboard input for manual entry</p>
        </div>

        {/* Alternative: Manual Entry */}
        <div className="pt-4 border-t">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Manual Student Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
