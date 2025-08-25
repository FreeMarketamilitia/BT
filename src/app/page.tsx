import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { CTA } from "./components/layout/CTA";
import { Hero } from "./components/sections/Hero";
import { ProblemSolution } from "./components/sections/ProblemSolution";
import { FeaturesGrid } from "./components/sections/FeaturesGrid";
import { DemoPreview } from "./components/sections/DemoPreview";
import { AnalyticsShowcase } from "./components/sections/AnalyticsShowcase";
import { SecurityCompliance } from "./components/sections/SecurityCompliance";
import { Testimonials } from "./components/sections/Testimonials";
import { PricingTable } from "./components/sections/PricingTable";
import { FAQ } from "./components/sections/FAQ";
import { CTASection } from "./components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSolution />
        <FeaturesGrid />
        <DemoPreview />
        <AnalyticsShowcase />
        <SecurityCompliance />
        <Testimonials />
        <PricingTable />
        <FAQ />
        <CTASection />
      </main>
      <SiteFooter />
      <CTA />
    </div>
  );
}
