"use client";

import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "John Doe",
  role: "teacher", // or "admin"
  avatar: "/avatar.jpg"
};

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DP</span>
              </div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>

            {/* Navigation Links - Role-based */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm">
                Overview
              </Button>
              {user.role === "admin" && (
                <>
                  <Button variant="ghost" size="sm">
                    Analytics
                  </Button>
                  <Button variant="ghost" size="sm">
                    Settings
                  </Button>
                </>
              )}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Notifications />

            {/* User Menu */}
            <UserMenu />

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
