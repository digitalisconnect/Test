import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/marketing/Hero";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Testimonials } from "@/components/marketing/Testimonials";
import { CallToAction } from "@/components/marketing/CallToAction";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
