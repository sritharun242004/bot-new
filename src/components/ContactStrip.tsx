"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { useReveal } from "@/hooks/useReveal";
import { RevealText } from "./RevealText";

const initialState: ContactFormState = { success: false, message: "" };

export function ContactStrip() {
  const ref = useReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <section className="bg-base-500 px-6 md:px-12 py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">

        {/* Left */}
        <div className="flex-1" ref={ref}>
          <RevealText
            text={"The Bot\nCompany"}
            as="h2"
            className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[1.0] tracking-[-3px] md:tracking-[-4px] text-base-100"
          />
          <p className="reveal-up mt-6 max-w-sm text-lg font-medium leading-relaxed text-base-200" data-delay="1">
            Tell us what&apos;s slowing your team down. We&apos;ll automate the
            boring and build the bold.
          </p>
          <p className="reveal-up mt-8 text-sm font-medium uppercase tracking-wider text-base-350" data-delay="2">
            Your AI partner
          </p>
        </div>

        {/* Right — form box */}
        <div className="w-full max-w-lg rounded-[2rem] bg-base-450 p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-base-350">Get in touch</p>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          </div>

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

          <form ref={formRef} action={formAction} className="flex flex-col gap-5">
            <div>
              <label htmlFor="strip-name" className="mb-2 block text-sm font-medium text-base-200">
                Name
              </label>
              <input
                id="strip-name"
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
              <label htmlFor="strip-email" className="mb-2 block text-sm font-medium text-base-200">
                Email
              </label>
              <input
                id="strip-email"
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
              <label htmlFor="strip-message" className="mb-2 block text-sm font-medium text-base-200">
                Message
              </label>
              <textarea
                id="strip-message"
                name="message"
                placeholder="Tell us about your project..."
                rows={4}
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
    </section>
  );
}
