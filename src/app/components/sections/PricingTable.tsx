import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Check, X } from "lucide-react";

const pricingPlans = [
  {
    name: "Teacher",
    price: "$9",
    period: "month",
    description: "Individual teacher access",
    features: [
      "Unlimited passes",
      "Real-time dashboard",
      "Basic analytics"
    ],
    limitations: [],
    cta: "Start Free Trial",
    ctaLink: "/signup?plan=teacher",
    popular: false
  },
  {
    name: "School",
    price: "$149",
    period: "month",
    description: "School-wide solution",
    features: [
      "All Teacher features",
      "Admin controls & audit logs",
      "School-wide policies & limits",
      "Email notifications"
    ],
    limitations: [],
    cta: "Start Free Trial",
    ctaLink: "/signup?plan=school",
    popular: true
  },
  {
    name: "District",
    price: "Custom",
    period: "",
    description: "Multi-school districts",
    features: [
      "All School features",
      "SSO & provisioning",
      "District analytics & exports",
      "Priority support & onboarding"
    ],
    limitations: [],
    cta: "Talk to Sales",
    ctaLink: "/contact?plan=district",
    popular: false
  }
];

export function PricingTable() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <Container size="lg">
        <SectionTitle
          subtitle="Pricing"
          title="Simple Plans for Any Campus"
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-xl' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <ul className="space-y-2 pt-4 border-t">
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <Button
                  className="w-full mt-6"
                  variant={plan.name === "District" ? "outline" : "default"}
                  asChild
                >
                  <Link href={plan.ctaLink}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footnote */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Educational pricing available. Cancel anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
