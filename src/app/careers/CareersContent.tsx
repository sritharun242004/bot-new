"use client";

import { useEffect, useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  age: string;
  phone: string;
  experience: string;
  skills: string;
  resumeLink: string;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  age: "",
  phone: "",
  experience: "",
  skills: "",
  resumeLink: "",
};

const stepMeta = [
  { title: "Let's get to know you", subtitle: "Start with the basics." },
  { title: "A bit more about you", subtitle: "Just a couple more details." },
  { title: "Your experience", subtitle: "Tell us what you bring to the table." },
  { title: "Share your resume", subtitle: "Last step — drop a link to your resume." },
];

const experienceOptions = [
  { value: "0-1", label: "0–1 yrs", desc: "Fresh start" },
  { value: "1-3", label: "1–3 yrs", desc: "Getting going" },
  { value: "3-5", label: "3–5 yrs", desc: "Mid level" },
  { value: "5-10", label: "5–10 yrs", desc: "Senior" },
  { value: "10+", label: "10+ yrs", desc: "Veteran" },
];

export function CareersContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName?.trim())
        newErrors.fullName = "Full name is required";
      else if (!/^[a-zA-ZÀ-ɏ][a-zA-ZÀ-ɏ\s'.\-]{1,}$/.test(formData.fullName.trim()))
        newErrors.fullName = "Enter a valid name — letters only, no symbols or numbers";
      else if (formData.fullName.trim().length < 3)
        newErrors.fullName = "Name must be at least 3 characters";
      else if (!/[aeiouAEIOU]/.test(formData.fullName.trim()))
        newErrors.fullName = "Please enter your real full name";
      else if (!formData.fullName.trim().includes(" "))
        newErrors.fullName = "Please enter both your first and last name";
      if (!formData.email?.trim())
        newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Please enter a valid email address";
    }

    if (currentStep === 2) {
      if (!formData.age?.trim())
        newErrors.age = "Age is required";
      else if (isNaN(Number(formData.age)) || Number(formData.age) < 16 || Number(formData.age) > 80)
        newErrors.age = "Please enter a valid age between 16 and 80";
      if (formData.phone?.trim() && !/^[6-9]\d{9}$/.test(formData.phone.trim()))
        newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (currentStep === 3) {
      if (!formData.experience?.trim())
        newErrors.experience = "Please select experience level";
      if (!formData.skills?.trim())
        newErrors.skills = "Please list your current skills";
      else if (!/^[a-zA-Z0-9\s,.\-_#+\/&()]+$/.test(formData.skills.trim()))
        newErrors.skills = "Use only letters, numbers and common punctuation (commas, +, #, /)";
      else if (formData.skills.trim().length < 3)
        newErrors.skills = "Please be more specific about your skills";
      else {
        const gibberishWord = formData.skills.trim()
          .split(/[\s,]+/)
          .filter(w => w.length > 4)
          .some(w => !/[aeiouAEIOU0-9]/.test(w));
        if (gibberishWord)
          newErrors.skills = "Please enter real skill names (e.g. React, Python, Node.js)";
      }
    }

    if (currentStep === 4) {
      if (!formData.resumeLink?.trim())
        newErrors.resumeLink = "Resume link is required";
      else if (!/^https?:\/\/.+/.test(formData.resumeLink))
        newErrors.resumeLink = "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrev = () => setCurrentStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    try {
      await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      console.log("Careers submission:", formData);
    }
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormData) =>
    `bg-base-500 border ${
      errors[field] ? "border-red-400" : "border-base-400/50"
    } rounded-2xl px-5 py-4 text-base-100 placeholder:text-base-350 focus:border-base-200 focus:outline-none w-full mt-3 text-base transition-colors`;

  const labelClass = "text-sm font-medium text-base-300 mt-6 block";

  const meta = stepMeta[currentStep - 1];

  return (
    <div className="relative bg-base-500">
      {/* Floating "Now Hiring" tag */}
      <div className="fixed top-32 right-8 rotate-90 text-xs uppercase tracking-widest text-base-350 origin-right z-10">
        Now Hiring
      </div>

      <main className="relative flex min-h-screen pt-32 px-6 md:px-12 flex-col md:flex-row gap-16 items-start max-w-7xl mx-auto pb-24">
        {/* Left column */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col justify-between h-full min-h-[80vh]">

            {/* Top section */}
            <div>
              <p className="text-xs uppercase tracking-widest text-base-350 mb-8">
                — Careers at TBC
              </p>
              <h1 className="text-[clamp(3.5rem,6vw,6rem)] font-bold tracking-[-4px] leading-[0.95] text-base-100">
                Join <span className="text-base-300">Us.</span>
              </h1>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Real AI. Real clients. Real impact.",
                  "Small team. High ownership.",
                  "Build at the edge of what's possible.",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-base-400/30 px-6 py-4 hover:border-base-200 hover:bg-base-450/30 transition-all duration-300 cursor-default group"
                  >
                    <span className="text-xs text-base-400 group-hover:text-base-350 transition-colors mr-3">
                      0{i + 1}
                    </span>
                    <span className="text-lg text-base-250 group-hover:text-base-100 transition-colors duration-300">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle — open roles as large list */}
            <div className="mt-16">
              <p className="text-xs uppercase tracking-widest text-base-350 mb-6">
                Open roles
              </p>
              {[
                { role: "AI Engineer", type: "Full-time" },
                { role: "Full Stack Dev", type: "Full-time" },
                { role: "Sales & Growth", type: "Part-time" },
              ].map((item) => (
                <div
                  key={item.role}
                  className="flex items-center justify-between py-5 border-b border-base-400/20 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-medium text-base-100 group-hover:translate-x-2 transition-transform duration-300">
                      {item.role}
                    </span>
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-base-400/40 text-base-350 group-hover:border-base-200 group-hover:text-base-200 transition-all duration-300">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom — meta info in a row */}
            <div className="mt-16 pt-8 border-t border-base-400/20 grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-base-400 mb-3">
                  Based in
                </p>
                <p className="text-base-100 font-medium leading-relaxed">
                  Chennai, India<br />
                  <span className="text-base-350 text-sm">Remote friendly</span>
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-base-400 mb-3">
                  Contact
                </p>
                <p className="text-base-100 font-medium text-sm leading-relaxed">
                  official@<br />thebotcompany.in
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-base-400 mb-3">
                  Local time
                </p>
                <p className="text-base-100 font-mono text-2xl font-medium">
                  {time}
                </p>
              </div>
            </div>

          </div>
        </div>

      {/* Right column — form card */}
      <div className="w-full md:w-1/2">
        <div className="bg-base-450 rounded-3xl p-10 shadow-[0_0_60px_rgba(0,0,0,0.1)]">
          {submitted ? (
            <p className="text-xl font-medium text-base-100 text-center py-12">
              Application submitted! We&apos;ll be in touch soon.
            </p>
          ) : (
            <>
              {/* Top gradient line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-base-300 to-transparent mb-8" />

              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((step, i) => {
                  const isCompleted = step < currentStep;
                  const isActive = step === currentStep;
                  return (
                    <div key={step} className="flex flex-1 items-center gap-2 last:flex-none">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          isCompleted
                            ? "bg-base-100 text-base-500"
                            : isActive
                              ? "bg-base-100 text-base-500 ring-4 ring-base-100/20 animate-pulse"
                              : "bg-base-400 text-base-200"
                        }`}
                      >
                        {isCompleted ? "✓" : step}
                      </div>
                      {i < 3 && (
                        <div
                          className={`h-px flex-1 transition-colors ${
                            step < currentStep ? "bg-base-100" : "bg-base-400"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step header */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-base-100">{meta.title}</h2>
                <p className="mt-2 text-sm text-base-350">{meta.subtitle}</p>
              </div>

              {/* Step body */}
              <div className="mt-4">
                {currentStep === 1 && (
                  <>
                    <label className={labelClass}>
                      Full Name
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Jane Doe"
                        className={inputClass("fullName")}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                      )}
                    </label>
                    <label className={labelClass}>
                      Email Address
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="jane@example.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </label>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <label className={labelClass}>
                      Age
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => update("age", e.target.value)}
                        placeholder="24"
                        className={inputClass("age")}
                      />
                      {errors.age && (
                        <p className="mt-1 text-sm text-red-400">{errors.age}</p>
                      )}
                    </label>
                    <label className={labelClass}>
                      Phone Number <span className="text-base-350 font-normal">(optional)</span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="98765 43210"
                        maxLength={10}
                        className={inputClass("phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </label>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className={labelClass}>
                      Years of Experience
                      <div className="flex flex-wrap gap-3 mt-3">
                        {experienceOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, experience: opt.value });
                              if (errors.experience) setErrors({ ...errors, experience: "" });
                            }}
                            className={`flex flex-col items-center px-6 py-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                              formData.experience === opt.value
                                ? "border-base-100 bg-base-100/10 text-base-100"
                                : "border-base-400/50 text-base-350 hover:border-base-200 hover:text-base-200"
                            }`}
                          >
                            <span className="text-lg font-semibold">{opt.label}</span>
                            <span className="text-xs mt-1 opacity-70">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                      {errors.experience && (
                        <p className="mt-2 text-sm text-red-400">{errors.experience}</p>
                      )}
                    </div>
                    <label className={labelClass}>
                      Current Skills
                      <textarea
                        value={formData.skills}
                        onChange={(e) => update("skills", e.target.value)}
                        placeholder="React, Node.js, Python, prompt engineering..."
                        rows={4}
                        className={inputClass("skills")}
                      />
                      {errors.skills && (
                        <p className="mt-1 text-sm text-red-400">{errors.skills}</p>
                      )}
                    </label>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <label className={labelClass}>
                      Resume Link
                      <input
                        type="url"
                        value={formData.resumeLink}
                        onChange={(e) => update("resumeLink", e.target.value)}
                        placeholder="https://drive.google.com/file/d/..."
                        className={inputClass("resumeLink")}
                      />
                      {errors.resumeLink && (
                        <p className="mt-1 text-sm text-red-400">{errors.resumeLink}</p>
                      )}
                    </label>
                    <p className="mt-3 text-xs text-base-350">
                      Make sure the link has public or viewer access enabled
                    </p>
                  </>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-base-350 hover:text-base-100 text-sm uppercase tracking-widest transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <span />
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep()) {
                        setErrors({});
                        setCurrentStep((prev) => prev + 1);
                      }
                    }}
                    className="bg-base-100 text-base-500 rounded-full px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-base-100 text-base-500 rounded-full px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      </main>
    </div>
  );
}
