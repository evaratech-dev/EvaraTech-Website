import { ProblemHero } from "@/components/sections/problem-hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { LossCauses } from "@/components/sections/loss-causes";
import { HorizontalProducts } from "@/components/sections/horizontal-products";
import { Architecture } from "@/components/sections/architecture";
import { Proof } from "@/components/sections/proof";
import { Platform } from "@/components/sections/platform";
import { Ideology } from "@/components/sections/ideology";
import { TeamResearch } from "@/components/sections/team-research";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      {/* The problem, at national scale */}
      <ProblemHero />
      <TrustMarquee />
      <LossCauses />

      {/* The instruments */}
      <HorizontalProducts />

      {/* The platform they report into, then how they connect */}
      <Architecture />
      <Platform />

      {/* What it is all for */}
      <Ideology />

      {/* The case */}
      <Proof />
      <TeamResearch />
      <Cta />
    </>
  );
}
