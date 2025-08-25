import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";

export function ProblemSolution() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <Container size="lg">
        <div className="space-y-16">
          {/* Problem Section */}
          <div className="text-center space-y-8">
            <SectionTitle
              title="Paper Passes Don't Scale. Accountability Does."
            />

            {/* Problem Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">📝</div>
                  <h3 className="font-semibold mb-2">No audit trail for incidents</h3>
                  <p className="text-sm text-muted-foreground">
                    Lost documentation when things go wrong during passes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">⏱️</div>
                  <h3 className="font-semibold mb-2">Lost passes, no time limits</h3>
                  <p className="text-sm text-muted-foreground">
                    Students disappear for hours with no oversight or accountability
                  </p>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">📊</div>
                  <h3 className="font-semibold mb-2">No data to shape policy</h3>
                  <p className="text-sm text-muted-foreground">
                    Can't identify patterns or make informed decisions about hall traffic
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Inline reassurance badge */}
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/5 border-primary/20">
              <span className="text-primary font-medium">Fast setup — no SIS required to start</span>
            </div>
          </div>

          {/* Solution Section */}
          <div className="text-center space-y-8">
            <SectionTitle
              subtitle="Our Solution"
              title="Digital Accountability That Works"
            />

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">📱</div>
                  <h3 className="font-semibold mb-2">Digital passes with timeboxing & approvals</h3>
                  <p className="text-sm text-muted-foreground">
                    Structured workflows that prevent hallway chaos while giving teachers control
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">👀</div>
                  <h3 className="font-semibold mb-2">Real-time monitoring and alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Live dashboard showing where every student is and when they'll be back
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">📈</div>
                  <h3 className="font-semibold mb-2">Analytics to understand patterns & intervene</h3>
                  <p className="text-sm text-muted-foreground">
                    Data-driven insights to identify issues before they become problems
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Button variant="ghost" size="lg" asChild>
                <Link href="/docs/get-started">How it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
