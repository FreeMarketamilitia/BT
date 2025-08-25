"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, AlertCircle, Search } from "lucide-react";
import { useState } from "react";

// Mock school-wide pass data
const schoolPasses = [
  {
    id: 1,
    studentName: "John Smith",
    studentGrade: "10th",
    teacher: "Mrs. Johnson",
    room: "201",
    destination: "Library",
    issuedTime: "9:15 AM",
    expectedReturn: "9:45 AM",
    status: "active",
    avatar: "JS"
  },
  {
    id: 2,
    studentName: "Mary Johnson",
    studentGrade: "9th",
    teacher: "Mr. Davis",
    room: "105",
    destination: "Nurse",
    issuedTime: "9:20 AM",
    expectedReturn: "9:35 AM",
    status: "active",
    avatar: "MJ"
  },
  {
    id: 3,
    studentName: "Alex Brown",
    studentGrade: "11th",
    teacher: "Ms. Wilson",
    room: "312",
    destination: "Bathroom",
    issuedTime: "9:25 AM",
    expectedReturn: "9:30 AM",
    status: "overdue",
    avatar: "AB"
  },
  {
    id: 4,
    studentName: "Sarah Wilson",
    studentGrade: "12th",
    teacher: "Mr. Chen",
    room: "401",
    destination: "Counselor",
    issuedTime: "9:30 AM",
    expectedReturn: "10:00 AM",
    status: "active",
    avatar: "SW"
  },
  {
    id: 5,
    studentName: "Michael Chen",
    studentGrade: "10th",
    teacher: "Mrs. Rodriguez",
    room: "205",
    destination: "Office",
    issuedTime: "9:35 AM",
    expectedReturn: "9:50 AM",
    status: "active",
    avatar: "MC"
  }
];

export function AdminActive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPasses = schoolPasses.filter(pass => {
    const matchesSearch = pass.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pass.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pass.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pass.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = schoolPasses.filter(p => p.status === "active").length;
  const overdueCount = schoolPasses.filter(p => p.status === "overdue").length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">School-Wide Active Passes</CardTitle>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="bg-green-500">
                {activeCount} Active
              </Badge>
              <Badge variant="destructive">
                {overdueCount} Overdue
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Export Report
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students, teachers, or destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="overdue">Overdue Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Teacher/Room</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPasses.map((pass) => (
                <TableRow key={pass.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                          {pass.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{pass.studentName}</div>
                        <div className="text-xs text-muted-foreground">{pass.studentGrade}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{pass.teacher}</div>
                      <div className="text-xs text-muted-foreground">Room {pass.room}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{pass.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{pass.issuedTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{pass.expectedReturn}</span>
                  </TableCell>
                  <TableCell>
                    {pass.status === "overdue" ? (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Overdue
                      </Badge>
                    ) : (
                      <Badge variant="default" className="bg-green-500 text-xs">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPasses.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No passes match your search criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
