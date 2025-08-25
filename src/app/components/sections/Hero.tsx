import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";

export function Hero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Container size="lg">
        <div className="text-center space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
            <span className="text-muted-foreground">Secure • Real-time • K-12 Ready</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Track Hall Passes
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent block">
              with Confidence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ditch paper passes. Give teachers simple workflows, give admins real-time visibility, and give schools the data to improve safety.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">
                See Live Demo
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Built for FERPA/COPPA environments. Works with iPad, Chromebooks, and desktop.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
