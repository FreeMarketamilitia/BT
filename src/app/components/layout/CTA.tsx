import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";

interface CTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTA({
  title = "Ready to make hallways calmer and safer?",
  description = "Start a free trial or book a live demo with our team.",
  primaryButtonText = "Start Free Trial",
  primaryButtonHref = "/signup",
  secondaryButtonText = "Book a Demo",
  secondaryButtonHref = "/demo"
}: CTAProps) {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <Container size="md">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={primaryButtonHref}>
                {primaryButtonText}
              </Link>
            </Button>
            {secondaryButtonText && (
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href={secondaryButtonHref}>
                  {secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
