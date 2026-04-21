"use client";

import { useActionState, useRef, useEffect } from "react";
import { RevealText } from "@/components/RevealText";
import { useReveal } from "@/hooks/useReveal";
import { CalEmbed } from "@/components/CalEmbed";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactContent() {
  const ref = useReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="min-h-screen bg-base-500 px-6 pt-32 pb-24 md:px-12">
      {/* Top section — heading + info + form */}
      <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row">
        {/* Left side */}
        <div className="flex-1">
          <RevealText
            text={"Let's figure out\nyour AI\nopportunity"}
            as="h1"
            className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
          />
          <div ref={ref}>
            <p className="reveal-up mt-8 max-w-md text-base font-medium leading-relaxed text-base-200">
              Tell us what&apos;s slowing your team down or where you think AI might
              help. We&apos;ll be honest about what&apos;s worth building.
            </p>

            <div className="reveal-up mt-12" data-delay="1">
              <p className="text-sm font-medium uppercase tracking-wider text-base-350">
                Email
              </p>
              <p className="mt-2 text-base font-medium text-base-100">
                official@thebotcompany.in
              </p>
            </div>

            <div className="reveal-up mt-8" data-delay="2">
              <p className="text-sm font-medium uppercase tracking-wider text-base-350">
                Availability
              </p>
              <p className="mt-2 text-base font-medium text-base-100">
                Taking new partners
              </p>
              <p className="text-base font-medium text-base-100">
                Working worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right side — form */}
        <div className="w-full max-w-lg rounded-[2rem] bg-base-450 p-8">
          {state.message && (
            <div
              role="alert"
              aria-live="polite"
              className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium ${
                state.success
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {state.message}
            </div>
          )}
          <form ref={formRef} action={formAction} className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-base-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-xl bg-base-500 px-4 py-4 text-base font-medium text-base-100 placeholder-base-350 outline-none focus:ring-1 focus:ring-base-400"
              />
              {state.errors?.name && (
                <p className="mt-1 text-sm text-red-400">{state.errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-base-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                className="w-full rounded-xl bg-base-500 px-4 py-4 text-base font-medium text-base-100 placeholder-base-350 outline-none focus:ring-1 focus:ring-base-400"
              />
              {state.errors?.email && (
                <p className="mt-1 text-sm text-red-400">{state.errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-base-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                rows={6}
                required
                className="w-full resize-none rounded-xl bg-base-500 px-4 py-4 text-base font-medium text-base-100 placeholder-base-350 outline-none focus:ring-1 focus:ring-base-400"
              />
              {state.errors?.messageField && (
                <p className="mt-1 text-sm text-red-400">{state.errors.messageField}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-base-100 px-5 py-4 text-base font-bold text-base-500 transition-colors hover:bg-base-200 disabled:opacity-60"
            >
              {pending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Cal.com scheduling embed */}
      <CalEmbed />
    </section>
  );
}
