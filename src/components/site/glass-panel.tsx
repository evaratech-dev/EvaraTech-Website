import { cn } from "@/lib/utils";

type GlassPanelProps = React.ComponentProps<"div"> & {
  /** Which ambient field the panel sits on. */
  tone?: "light" | "dark";
  /** Adds hover lift + border glow — for clickable cards. */
  interactive?: boolean;
  /** Skip the specular sheen line along the top edge. */
  noSheen?: boolean;
};

/**
 * The one frosted-glass surface every card, panel and chip on the site is
 * built from. Three layers do the work: a translucent tinted fill, a bright
 * hairline border standing in for a refracted edge, and a specular sheen
 * across the top that sells the "sheet of glass" read under any light
 * background. `tone="dark"` swaps the tint for use on the navy CTA/footer.
 */
export function GlassPanel({
  tone = "light",
  interactive = false,
  noSheen = false,
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border backdrop-blur-xl",
        tone === "light"
          ? "border-white/70 bg-white/55 shadow-[0_20px_50px_-28px_rgba(15,33,56,0.35)]"
          : "border-white/12 bg-white/[0.06] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)]",
        interactive &&
          (tone === "light"
            ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-evara-water-300 hover:bg-white/70 hover:shadow-[0_28px_60px_-30px_rgba(15,33,56,0.45)]"
            : "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"),
        className
      )}
      {...props}
    >
      {!noSheen && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-5 top-0 h-px",
            tone === "light"
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-white/40 to-transparent"
          )}
        />
      )}
      {children}
    </div>
  );
}
