/**
 * Fixed, viewport-pinned field of soft colour behind the entire site. Glass
 * surfaces need something underneath them to actually refract — without
 * this, `backdrop-blur` on a flat white page just looks like a grey card.
 *
 * Fixed rather than absolute so it never scrolls away: every glass panel on
 * every section blurs the same ambient field, which is what keeps the
 * "liquid glass" language coherent from the hero down to the footer.
 *
 * Pure CSS, no motion — this is atmosphere, not a thing to notice.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7f9fc]"
    >
      <div className="absolute -top-24 right-[-6%] size-[560px] rounded-full bg-evara-water/18 blur-[120px]" />
      <div className="absolute top-[38%] left-[-10%] size-[520px] rounded-full bg-evara-teal/14 blur-[130px]" />
      <div className="absolute right-[18%] bottom-[-14%] size-[480px] rounded-full bg-[#cfc9f2]/40 blur-[120px]" />
      <div className="absolute top-[68%] right-[30%] size-[360px] rounded-full bg-evara-leaf/10 blur-[110px]" />
      {/* Faint grid, the "measured surface" motif, very low contrast */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f2138 1px, transparent 1px), linear-gradient(to bottom, #0f2138 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
