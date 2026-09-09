"use client";

import { TankEcho } from "@/components/illustrations/tank-echo";
import { BorewellSection } from "@/components/illustrations/borewell-section";
import { MeterScan } from "@/components/illustrations/meter-scan";
import { ValveControl } from "@/components/illustrations/valve-control";
import { PumpControl } from "@/components/illustrations/pump-control";
import { CurrentClamp } from "@/components/illustrations/current-clamp";
import { TdsInline } from "@/components/illustrations/tds-inline";
import { TippingBucket } from "@/components/illustrations/tipping-bucket";

/**
 * Each device gets a drawing of its own operating principle. The mechanism is
 * the differentiator in every case, and no product photograph can show it.
 */
const REGISTRY: Record<
  string,
  { Visual: () => React.JSX.Element; caption: string }
> = {
  evaratank: {
    Visual: TankEcho,
    caption:
      "An ultrasonic pulse leaves the lid, reflects off the water surface and returns. The air gap is deliberate — nothing corrodes, nothing contaminates.",
  },
  evaradeep: {
    Visual: BorewellSection,
    caption:
      "A motor lowers a floating bob until the string goes slack. A tension switch catches that instant and the encoder reports the payout — the depth. Only string and bob ever enter the well.",
  },
  evaraflow: {
    Visual: MeterScan,
    caption:
      "A camera photographs the dial of the meter already installed, and on-device AI resolves the digits at 97% accuracy. The meter itself is never touched.",
  },
  evaravalve: {
    Visual: ValveControl,
    caption:
      "Flow is metered as it passes, and each zone can be opened, throttled or closed on a schedule — without anyone travelling to the site.",
  },
  evaraphase: {
    Visual: PumpControl,
    caption:
      "The pump starts from a phone, while every phase feeding the motor is watched. Phase failure, low voltage, overload or dry run cuts supply before the winding is damaged.",
  },
  evaraamp: {
    Visual: CurrentClamp,
    caption:
      "A split-core transformer closes around the existing supply cable, so current is read without breaking the circuit. A dry run has a signature long before the pump dies.",
  },
  evaratds: {
    Visual: TdsInline,
    caption:
      "An inline probe samples continuously at the RO outlet, corrects for temperature, and takes a median across readings so one noisy sample never raises a false alarm.",
  },
  evararain: {
    Visual: TippingBucket,
    caption:
      "Rain fills one side of a pivoting bucket until it tips. Each tip is one fixed volume, so counting them gives both total depth and intensity over time.",
  },
};

export function ProductIllustration({ slug }: { slug: string }) {
  const entry = REGISTRY[slug];
  if (!entry) return null;
  const { Visual, caption } = entry;

  return (
    <figure className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
      <div className="rounded-2xl border border-white/70 bg-white/45 p-6 backdrop-blur-xl sm:p-10">
        <div className="mx-auto max-w-md">
          <Visual />
        </div>
      </div>
      <figcaption className="text-base leading-relaxed text-evara-slate">
        {caption}
      </figcaption>
    </figure>
  );
}

