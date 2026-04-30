"use client";
import { useState } from "react";
export function CTASection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-base-500 px-4 py-4">
      <div className="relative min-h-[calc(100vh-2rem)] w-full rounded-[2rem] bg-base-450 flex items-center px-6 md:px-12 py-24 overflow-hidden">

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black leading-none text-base-400/20">BOTS</span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col md:flex-row items-center gap-16 md:gap-24">

          {/* Left column */}
          <div className="w-full md:w-1/2 flex flex-col items-start gap-8">
            <p className="text-xs uppercase tracking-[0.4em] text-base-350 font-mono">The Bot Company</p>
            <h2 className="text-[clamp(3rem,7vw,7rem)] font-black tracking-[-4px] leading-[0.9] text-base-100">
              Your AI<br />partner
            </h2>
            <p className="text-xl text-base-250 leading-relaxed max-w-md">
              Tell us what's slowing your team down. We'll automate the boring and build the bold.
            </p>
          </div>

          {/* Right column — contact form */}
          <div className="w-full md:w-1/2">
            <div className="rounded-3xl bg-base-500 p-8 border border-base-400/20">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center">
                    <span className="text-green-400 text-2xl">✓</span>
                  </div>
                  <p className="text-xl font-semibold text-base-100">Message sent!</p>
                  <p className="text-base-350 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-base-250">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full rounded-2xl bg-base-500 border border-base-400/40 px-4 py-3 text-base-100 placeholder:text-base-400 focus:outline-none focus:border-base-200 transition-colors text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-base-250">Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-2xl bg-base-500 border border-base-400/40 px-4 py-3 text-base-100 placeholder:text-base-400 focus:outline-none focus:border-base-200 transition-colors text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-base-250">Message</label>
                    <textarea
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full rounded-2xl bg-base-500 border border-base-400/40 px-4 py-3 text-base-100 placeholder:text-base-400 focus:outline-none focus:border-base-200 transition-colors text-base resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-base-100 text-base-500 font-bold py-4 text-base hover:opacity-90 transition-opacity mt-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
