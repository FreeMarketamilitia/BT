import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IconWrapper } from "../ui/IconWrapper";
import { TrendingUp, Users, Eye, Clock } from "lucide-react";

export function AnalyticsShowcase() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <Container size="lg">
        <SectionTitle
          subtitle="Analytics & Insights"
          title="Turn Movement into Meaningful Insights"
          description="Measure trends by time, location, and grade level to act early."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Analytics Chart Placeholder */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconWrapper icon={TrendingUp} variant="primary" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">
                    Interactive Chart Area
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Install recharts for live charts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Cards */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Avg. Pass Duration</p>
                    <p className="text-2xl font-bold">6m 42s</p>
                    <p className="text-sm text-muted-foreground">last 30 days</p>
                  </div>
                  <IconWrapper icon={Clock} size="lg" variant="primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">On-Time Return Rate</p>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-sm text-green-600">+5% from last month</p>
                  </div>
                  <IconWrapper icon={TrendingUp} size="lg" variant="primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Overdue Alerts</p>
                    <p className="text-2xl font-bold">Down 38%</p>
                    <p className="text-sm text-green-600">from last month</p>
                  </div>
                  <IconWrapper icon={Eye} size="lg" variant="primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sample Chart Data */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Weekly Passes</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Mon: 128</div>
                <div>Tue: 141</div>
                <div>Wed: 150</div>
                <div>Thu: 162</div>
                <div>Fri: 171</div>
                <div>Sat: 96</div>
                <div>Sun: 52</div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Overdue Incidents</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Mon: 9</div>
                <div>Tue: 8</div>
                <div>Wed: 7</div>
                <div>Thu: 6</div>
                <div>Fri: 6</div>
                <div>Sat: 3</div>
                <div>Sun: 1</div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Peak Times</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>09:00–10:00: High</div>
                <div>10:00–11:00: High</div>
                <div>11:00–12:00: Medium</div>
                <div>12:00–13:00: High</div>
                <div>13:00–14:00: Medium</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">Data shown is illustrative.</p>
        </div>
      </Container>
    </section>
  );
}
