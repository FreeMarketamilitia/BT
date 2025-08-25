import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IconWrapper } from "../ui/IconWrapper";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const complianceBadges = [
  { name: "FERPA/COPPA aware", color: "bg-green-100 text-green-800" },
  { name: "Encryption in transit & at rest", color: "bg-blue-100 text-blue-800" },
  { name: "Role-based access control", color: "bg-purple-100 text-purple-800" }
];

const securityFeatures = [
  "SSO options: Google Workspace for Education, Microsoft Entra ID",
  "Granular permissions for teachers, admins, counselors",
  "Configurable data retention windows",
  "Comprehensive audit logs for all actions",
  "No student behavioral profiling; analytics are school-controlled"
];

export function SecurityCompliance() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <Container size="lg">
        <SectionTitle
          subtitle="Security & Compliance"
          title="Security & Student Privacy by Default"
          className="mb-16"
        />

        {/* Compliance Badges */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-6">
            Certified and compliant with industry standards
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {complianceBadges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${badge.color} border-0 font-medium px-4 py-2`}
              >
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Security Features List */}
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {securityFeatures.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" asChild>
            <Link href="/security">Read our Security Overview</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
