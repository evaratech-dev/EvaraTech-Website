/**
 * Fixed, viewport-pinned field of soft colour behind the entire site. Glass
 * surfaces need something underneath them to actually refract; without
 * this, `backdrop-blur` on a flat white page just looks like a grey card.
 *
 * Fixed rather than absolute so it never scrolls away: every glass panel on
 * every section blurs the same ambient field, which is what keeps the
 * "liquid glass" language coherent from the hero down to the footer.
 *
 * Sized in viewport units so the light scales with the screen. A 480px blob
 * that fills a laptop is a coin on a television. Pure CSS, no motion: this is
 * atmosphere, not a thing to notice.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7f9fc]"
    >
      <div className="absolute top-[-12vh] right-[-8vw] size-[46vw] min-w-[420px] rounded-full bg-evara-water/[0.17] blur-[9vw]" />
      <div className="absolute top-[34%] left-[-14vw] size-[44vw] min-w-[400px] rounded-full bg-evara-teal/[0.13] blur-[10vw]" />
      <div className="absolute right-[14vw] bottom-[-18vh] size-[40vw] min-w-[380px] rounded-full bg-[#cfc9f2]/40 blur-[9vw]" />
      <div className="absolute top-[66%] right-[28vw] size-[30vw] min-w-[300px] rounded-full bg-evara-leaf/[0.09] blur-[8vw]" />
    </div>
  );
}
