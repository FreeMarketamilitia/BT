"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, MapPin, Shield, Plus } from "lucide-react";

export function AdminControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Admin Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Destinations Management */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Destinations</span>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Manage school destinations and locations
            </p>
            <Badge variant="secondary">8 active</Badge>
          </div>

          {/* Rules Management */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="font-medium">Pass Rules</span>
              </div>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Set time limits and approval requirements
            </p>
            <Badge variant="secondary">12 rules</Badge>
          </div>

          {/* User Management */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="font-medium">User Management</span>
              </div>
              <Button size="sm" variant="outline">
                Manage
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Add teachers and set permissions
            </p>
            <Badge variant="secondary">24 teachers</Badge>
          </div>

          {/* System Settings */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-orange-500" />
                <span className="font-medium">System Settings</span>
              </div>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Global system configuration
            </p>
            <Badge variant="secondary">Active</Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Bulk Import Users
            </Button>
            <Button variant="outline" className="justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              Export Location Data
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              System Backup
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
