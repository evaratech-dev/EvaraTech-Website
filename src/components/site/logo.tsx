import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  wordmarkClassName,
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 focus-visible:outline-none",
        className
      )}
      aria-label="EvaraTech home"
    >
      <span className="relative block size-8 shrink-0">
        <Image
          src="/images/brand/evaratech-logo.png"
          alt=""
          fill
          sizes="32px"
          priority
          className="object-contain"
        />
      </span>
      <span
        className={cn(
          "font-heading text-lg font-semibold tracking-tight",
          wordmarkClassName
        )}
      >
        Evara<span className="text-evara-water">Tech</span>
      </span>
    </Link>
  );
}
