import { DashboardHeader } from "@/app/dashboard/components/layout/DashboardHeader";
import { DashboardFooter } from "@/app/dashboard/components/layout/DashboardFooter";
import { HeroWelcome } from "@/app/dashboard/components/sections/HeroWelcome";
import { ActivePasses } from "@/app/dashboard/components/sections/ActivePasses";
import { QuickIssuePass } from "@/app/dashboard/components/sections/QuickIssuePass";
import { QuickScanPass } from "@/app/dashboard/components/sections/QuickScanPass";
import { ClassFeed } from "@/app/dashboard/components/sections/ClassFeed";
import { TeacherAnalytics } from "@/app/dashboard/components/sections/TeacherAnalytics";
import { AdminActive } from "@/app/dashboard/components/sections/AdminActive";
import { MapView } from "@/app/dashboard/components/sections/MapView";
import { AlertsAndTrends } from "@/app/dashboard/components/sections/AlertsAndTrends";
import { AdminAnalytics } from "@/app/dashboard/components/sections/AdminAnalytics";
import { AdminControls } from "@/app/dashboard/components/sections/AdminControls";

// Mock user role - in a real app, this would come from authentication
const userRole = "teacher"; // or "admin"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Role-based content rendering */}
        {userRole === "teacher" ? (
          <div className="space-y-8">
            <HeroWelcome />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ActivePasses />
              </div>
              <div className="space-y-6">
                <QuickScanPass />
                <QuickIssuePass />
              </div>
            </div>
            <ClassFeed />
            <TeacherAnalytics />
          </div>
        ) : (
          <div className="space-y-8">
            <AdminActive />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MapView />
              <AlertsAndTrends />
            </div>
            <AdminAnalytics />
            <AdminControls />
          </div>
        )}
      </main>
      <DashboardFooter />
    </div>
  );
}
