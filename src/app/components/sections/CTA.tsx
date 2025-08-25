import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
      </div>

      <Container size="md">
        <div className="relative text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Ready to transform hallway management?</span>
          </div>

          <SectionTitle
            title="Start tracking today"
            description="Join schools across the U.S. who have already improved their hallway safety and efficiency."
            align="center"
            className="text-center"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="/demo">
                Book a Demo
              </Link>
            </Button>
          </div>

          <div className="pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>99.9% uptime</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>24/7 support</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Enterprise security</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
