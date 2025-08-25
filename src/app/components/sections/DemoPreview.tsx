import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Play } from "lucide-react";

export function DemoPreview() {
  return (
    <section id="demo" className="py-20 md:py-32 bg-background">
      <Container size="lg">
        <div className="space-y-16">
          <SectionTitle
            title="See It in Action"
            description="A clean, teacher-first workflow with guardrails for safety."
            align="center"
          />

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  {/* Demo video/image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Interactive Demo</h3>
                        <p className="text-sm text-muted-foreground">
                          Click to watch a 3-minute overview
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Overlay gradient for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </CardContent>
            </Card>

            {/* Callouts under the preview */}
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold text-primary">Issue pass → timer starts</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold text-primary">Auto alerts on overdue</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold text-primary">One-click return logging</div>
              </div>
            </div>

            {/* Demo actions */}
            <div className="flex justify-center mt-8">
              <Button size="lg" className="gap-2">
                Try the Interactive Demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
