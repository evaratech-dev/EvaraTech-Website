import { ProblemHero } from "@/components/sections/problem-hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { Ideology } from "@/components/sections/ideology";
import { LossCauses } from "@/components/sections/loss-causes";
import { HorizontalProducts } from "@/components/sections/horizontal-products";
import { Architecture } from "@/components/sections/architecture";
import { Platform } from "@/components/sections/platform";
import { Proof } from "@/components/sections/proof";
import { TeamResearch } from "@/components/sections/team-research";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      {/* Who we are, before what we sell */}
      <ProblemHero />
      <TrustMarquee />
      <Ideology />

      {/* The problem, then the instruments that answer it */}
      <LossCauses />
      <HorizontalProducts />

      {/* The platform they report into */}
      <Architecture />
      <Platform />

      {/* The case */}
      <Proof />
      <TeamResearch />
      <Cta />
    </>
  );
}
