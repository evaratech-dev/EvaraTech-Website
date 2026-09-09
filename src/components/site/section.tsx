import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "paper" | "mist" | "lab" | "dark";
  id?: string;
};

/**
 * All light tones are transparent (or near it) so the fixed AmbientBackground
 * shows through continuously from the hero to the footer — one atmosphere
 * for every glass panel to refract, rather than alternating solid section
 * backgrounds. Only "dark" stays opaque, as the deliberate bookend.
 */
const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-transparent text-evara-ink",
  mist: "bg-white/25 text-evara-ink",
  lab: "bg-white/10 text-evara-ink",
  dark: "dark bg-evara-navy-950 text-foreground",
};

export function Section({
  tone = "paper",
  className,
  children,
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("container-evara", className)} {...props}>
      {children}
    </div>
  );
}
