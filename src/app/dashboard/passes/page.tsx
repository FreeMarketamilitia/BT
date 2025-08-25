"use client";

import { DashboardHeader } from "../components/layout/DashboardHeader";
import { DashboardFooter } from "../components/layout/DashboardFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye } from "lucide-react";
import { useState } from "react";

// Mock pass history data
const passHistory = [
  {
    id: 1,
    studentName: "John Smith",
    studentGrade: "10th",
    teacher: "Mrs. Johnson",
    destination: "Library",
    issuedTime: "9:15 AM",
    returnedTime: "9:35 AM",
    duration: "20 min",
    status: "completed",
    date: "2025-01-15"
  },
  {
    id: 2,
    studentName: "Mary Johnson",
    studentGrade: "9th",
    teacher: "Mr. Davis",
    destination: "Nurse",
    issuedTime: "10:30 AM",
    returnedTime: "10:45 AM",
    duration: "15 min",
    status: "completed",
    date: "2025-01-15"
  },
  {
    id: 3,
    studentName: "Alex Brown",
    studentGrade: "11th",
    teacher: "Ms. Wilson",
    destination: "Bathroom",
    issuedTime: "11:20 AM",
    returnedTime: null,
    duration: null,
    status: "active",
    date: "2025-01-15"
  }
];

export default function PassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

  const filteredPasses = passHistory.filter(pass => {
    const matchesSearch = pass.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pass.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pass.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Pass History</h1>
              <p className="text-muted-foreground">View and manage all pass records</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                View Active
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students or destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="completed">Completed Only</SelectItem>
                    <SelectItem value="overdue">Overdue Only</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pass History Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Returned</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPasses.map((pass) => (
                    <TableRow key={pass.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pass.studentName}</div>
                          <div className="text-sm text-muted-foreground">{pass.studentGrade}</div>
                        </div>
                      </TableCell>
                      <TableCell>{pass.teacher}</TableCell>
                      <TableCell>{pass.destination}</TableCell>
                      <TableCell>{pass.issuedTime}</TableCell>
                      <TableCell>{pass.returnedTime || "—"}</TableCell>
                      <TableCell>{pass.duration || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            pass.status === "completed"
                              ? "default"
                              : pass.status === "active"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {pass.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredPasses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No passes match your search criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <DashboardFooter />
    </div>
  );
}
