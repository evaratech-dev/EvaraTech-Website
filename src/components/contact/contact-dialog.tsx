"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";

/**
 * One demo-request modal for the whole site. A provider high in the tree holds
 * the open state and exposes `open()`; any button anywhere — even inside a
 * Server Component — triggers it through {@link ContactButton} /
 * {@link ContactTrigger}, which read the context at the client boundary.
 */
type ContactCtx = { open: () => void; close: () => void };

const Ctx = createContext<ContactCtx | null>(null);

export function useContactDialog(): ContactCtx {
  return useContext(Ctx) ?? { open: () => {}, close: () => {} };
}

export function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-evara-navy-950/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[100] max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/70 bg-white p-5 shadow-[0_40px_120px_-40px_rgba(15,33,56,0.6)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-6">
            <div className="mb-5 pr-9">
              <Dialog.Title className="font-heading text-xl font-semibold text-evara-ink">
                Request a demo
              </Dialog.Title>
              <Dialog.Description className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                Tell us what you&rsquo;d like to monitor and the EvaraTech team
                will be in touch.
              </Dialog.Description>
            </div>

            <ContactForm onSuccess={() => {}} />

            <Dialog.Close
              aria-label="Close"
              className="absolute top-3.5 right-3.5 flex size-9 items-center justify-center rounded-full text-evara-slate transition-colors hover:bg-evara-fog hover:text-evara-ink focus-visible:ring-2 focus-visible:ring-evara-water focus-visible:outline-none"
            >
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}

/** Styled shadcn button that opens the demo modal. Drop-in for the old CTAs. */
export function ContactButton({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { open } = useContactDialog();
  return (
    <Button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        open();
      }}
    />
  );
}

/** Unstyled trigger for text/link-style CTAs (footer, inline). */
export function ContactTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { open } = useContactDialog();
  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
