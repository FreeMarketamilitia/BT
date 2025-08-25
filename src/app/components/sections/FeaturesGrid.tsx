import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IconWrapper } from "../ui/IconWrapper";
import { Shield, Users, BarChart3, Code, TrendingUp, Eye } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Digital Passes",
    description: "Issue passes in seconds with time limits and reasons."
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description: "See who's out, where they're going, and when they're due back."
  },
  {
    icon: TrendingUp,
    title: "Analytics & Trends",
    description: "Spot patterns by time, class, and student groups."
  },
  {
    icon: Users,
    title: "Approvals & Limits",
    description: "Prevent overlaps, set cooldowns, and configure per-teacher rules."
  },
  {
    icon: Code,
    title: "Admin Controls",
    description: "School-wide settings, audit logs, and policy templates."
  },
  {
    icon: Eye,
    title: "Parent & Staff Visibility",
    description: "Optional notifications and read-only access where appropriate."
  }
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <Container size="lg">
        <SectionTitle
          subtitle="Features"
          title="Everything You Need to Manage Hall Traffic"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconWrapper icon={feature.icon} size="lg" variant="primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
