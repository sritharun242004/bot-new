"use client";

import { useEffect, useRef, useState } from "react";

const COUNTRIES = [
  { name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { name: "Albania", dialCode: "+355", flag: "🇦🇱" },
  { name: "Algeria", dialCode: "+213", flag: "🇩🇿" },
  { name: "Andorra", dialCode: "+376", flag: "🇦🇩" },
  { name: "Angola", dialCode: "+244", flag: "🇦🇴" },
  { name: "Antigua and Barbuda", dialCode: "+1-268", flag: "🇦🇬" },
  { name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", dialCode: "+994", flag: "🇦🇿" },
  { name: "Bahamas", dialCode: "+1-242", flag: "🇧🇸" },
  { name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { name: "Barbados", dialCode: "+1-246", flag: "🇧🇧" },
  { name: "Belarus", dialCode: "+375", flag: "🇧🇾" },
  { name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { name: "Belize", dialCode: "+501", flag: "🇧🇿" },
  { name: "Benin", dialCode: "+229", flag: "🇧🇯" },
  { name: "Bhutan", dialCode: "+975", flag: "🇧🇹" },
  { name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", dialCode: "+387", flag: "🇧🇦" },
  { name: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { name: "Brunei", dialCode: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", dialCode: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
  { name: "Burundi", dialCode: "+257", flag: "🇧🇮" },
  { name: "Cambodia", dialCode: "+855", flag: "🇰🇭" },
  { name: "Cameroon", dialCode: "+237", flag: "🇨🇲" },
  { name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { name: "Cape Verde", dialCode: "+238", flag: "🇨🇻" },
  { name: "Central African Republic", dialCode: "+236", flag: "🇨🇫" },
  { name: "Chad", dialCode: "+235", flag: "🇹🇩" },
  { name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { name: "China", dialCode: "+86", flag: "🇨🇳" },
  { name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { name: "Comoros", dialCode: "+269", flag: "🇰🇲" },
  { name: "Congo", dialCode: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { name: "Croatia", dialCode: "+385", flag: "🇭🇷" },
  { name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { name: "Cyprus", dialCode: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { name: "Dominica", dialCode: "+1-767", flag: "🇩🇲" },
  { name: "Dominican Republic", dialCode: "+1-809", flag: "🇩🇴" },
  { name: "DR Congo", dialCode: "+243", flag: "🇨🇩" },
  { name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", dialCode: "+240", flag: "🇬🇶" },
  { name: "Eritrea", dialCode: "+291", flag: "🇪🇷" },
  { name: "Estonia", dialCode: "+372", flag: "🇪🇪" },
  { name: "Eswatini", dialCode: "+268", flag: "🇸🇿" },
  { name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { name: "Fiji", dialCode: "+679", flag: "🇫🇯" },
  { name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { name: "France", dialCode: "+33", flag: "🇫🇷" },
  { name: "Gabon", dialCode: "+241", flag: "🇬🇦" },
  { name: "Gambia", dialCode: "+220", flag: "🇬🇲" },
  { name: "Georgia", dialCode: "+995", flag: "🇬🇪" },
  { name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { name: "Grenada", dialCode: "+1-473", flag: "🇬🇩" },
  { name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { name: "Guinea", dialCode: "+224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", dialCode: "+245", flag: "🇬🇼" },
  { name: "Guyana", dialCode: "+592", flag: "🇬🇾" },
  { name: "Haiti", dialCode: "+509", flag: "🇭🇹" },
  { name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
  { name: "Iceland", dialCode: "+354", flag: "🇮🇸" },
  { name: "India", dialCode: "+91", flag: "🇮🇳" },
  { name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { name: "Iran", dialCode: "+98", flag: "🇮🇷" },
  { name: "Iraq", dialCode: "+964", flag: "🇮🇶" },
  { name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { name: "Jamaica", dialCode: "+1-876", flag: "🇯🇲" },
  { name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { name: "Jordan", dialCode: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", dialCode: "+7", flag: "🇰🇿" },
  { name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { name: "Kiribati", dialCode: "+686", flag: "🇰🇮" },
  { name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", dialCode: "+996", flag: "🇰🇬" },
  { name: "Laos", dialCode: "+856", flag: "🇱🇦" },
  { name: "Latvia", dialCode: "+371", flag: "🇱🇻" },
  { name: "Lebanon", dialCode: "+961", flag: "🇱🇧" },
  { name: "Lesotho", dialCode: "+266", flag: "🇱🇸" },
  { name: "Liberia", dialCode: "+231", flag: "🇱🇷" },
  { name: "Libya", dialCode: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", dialCode: "+423", flag: "🇱🇮" },
  { name: "Lithuania", dialCode: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", dialCode: "+352", flag: "🇱🇺" },
  { name: "Madagascar", dialCode: "+261", flag: "🇲🇬" },
  { name: "Malawi", dialCode: "+265", flag: "🇲🇼" },
  { name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { name: "Maldives", dialCode: "+960", flag: "🇲🇻" },
  { name: "Mali", dialCode: "+223", flag: "🇲🇱" },
  { name: "Malta", dialCode: "+356", flag: "🇲🇹" },
  { name: "Marshall Islands", dialCode: "+692", flag: "🇲🇭" },
  { name: "Mauritania", dialCode: "+222", flag: "🇲🇷" },
  { name: "Mauritius", dialCode: "+230", flag: "🇲🇺" },
  { name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { name: "Micronesia", dialCode: "+691", flag: "🇫🇲" },
  { name: "Moldova", dialCode: "+373", flag: "🇲🇩" },
  { name: "Monaco", dialCode: "+377", flag: "🇲🇨" },
  { name: "Mongolia", dialCode: "+976", flag: "🇲🇳" },
  { name: "Montenegro", dialCode: "+382", flag: "🇲🇪" },
  { name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { name: "Mozambique", dialCode: "+258", flag: "🇲🇿" },
  { name: "Myanmar", dialCode: "+95", flag: "🇲🇲" },
  { name: "Namibia", dialCode: "+264", flag: "🇳🇦" },
  { name: "Nauru", dialCode: "+674", flag: "🇳🇷" },
  { name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { name: "Niger", dialCode: "+227", flag: "🇳🇪" },
  { name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { name: "North Korea", dialCode: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", dialCode: "+389", flag: "🇲🇰" },
  { name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { name: "Palau", dialCode: "+680", flag: "🇵🇼" },
  { name: "Palestine", dialCode: "+970", flag: "🇵🇸" },
  { name: "Panama", dialCode: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", dialCode: "+675", flag: "🇵🇬" },
  { name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { name: "Peru", dialCode: "+51", flag: "🇵🇪" },
  { name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { name: "Romania", dialCode: "+40", flag: "🇷🇴" },
  { name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { name: "Saint Kitts and Nevis", dialCode: "+1-869", flag: "🇰🇳" },
  { name: "Saint Lucia", dialCode: "+1-758", flag: "🇱🇨" },
  { name: "Saint Vincent", dialCode: "+1-784", flag: "🇻🇨" },
  { name: "Samoa", dialCode: "+685", flag: "🇼🇸" },
  { name: "San Marino", dialCode: "+378", flag: "🇸🇲" },
  { name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { name: "Senegal", dialCode: "+221", flag: "🇸🇳" },
  { name: "Serbia", dialCode: "+381", flag: "🇷🇸" },
  { name: "Seychelles", dialCode: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", dialCode: "+232", flag: "🇸🇱" },
  { name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { name: "Slovakia", dialCode: "+421", flag: "🇸🇰" },
  { name: "Slovenia", dialCode: "+386", flag: "🇸🇮" },
  { name: "Solomon Islands", dialCode: "+677", flag: "🇸🇧" },
  { name: "Somalia", dialCode: "+252", flag: "🇸🇴" },
  { name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { name: "South Sudan", dialCode: "+211", flag: "🇸🇸" },
  { name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { name: "Sudan", dialCode: "+249", flag: "🇸🇩" },
  { name: "Suriname", dialCode: "+597", flag: "🇸🇷" },
  { name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { name: "Syria", dialCode: "+963", flag: "🇸🇾" },
  { name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { name: "Tajikistan", dialCode: "+992", flag: "🇹🇯" },
  { name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { name: "Timor-Leste", dialCode: "+670", flag: "🇹🇱" },
  { name: "Togo", dialCode: "+228", flag: "🇹🇬" },
  { name: "Tonga", dialCode: "+676", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", dialCode: "+1-868", flag: "🇹🇹" },
  { name: "Tunisia", dialCode: "+216", flag: "🇹🇳" },
  { name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", dialCode: "+993", flag: "🇹🇲" },
  { name: "Tuvalu", dialCode: "+688", flag: "🇹🇻" },
  { name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", dialCode: "+998", flag: "🇺🇿" },
  { name: "Vanuatu", dialCode: "+678", flag: "🇻🇺" },
  { name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { name: "Yemen", dialCode: "+967", flag: "🇾🇪" },
  { name: "Zambia", dialCode: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" },
];

type FormData = {
  fullName: string;
  email: string;
  age: string;
  phoneDialCode: string;
  phone: string;
  experience: string;
  skills: string;
  resumeLink: string;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  age: "",
  phoneDialCode: "+91",
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
  const [dialOpen, setDialOpen] = useState(false);
  const [dialSearch, setDialSearch] = useState("");
  const dialRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!dialOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialRef.current && !dialRef.current.contains(e.target as Node)) {
        setDialOpen(false);
        setDialSearch("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dialOpen]);

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
      if (formData.phone?.trim() && !/^\d{4,15}$/.test(formData.phone.trim()))
        newErrors.phone = "Enter a valid phone number (digits only, 4–15 digits)";
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

  const selectedCountry = COUNTRIES.find((c) => c.dialCode === formData.phoneDialCode) ?? COUNTRIES[77]; // India default

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(dialSearch.toLowerCase()) ||
    c.dialCode.includes(dialSearch)
  );

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

                    {/* Phone Number with country dial code */}
                    <div className={labelClass}>
                      Phone Number <span className="text-base-350 font-normal">(optional)</span>
                      <div
                        ref={dialRef}
                        className={`relative flex mt-3 rounded-2xl border ${
                          errors.phone ? "border-red-400" : dialOpen ? "border-base-200" : "border-base-400/50"
                        } bg-base-500 transition-colors overflow-visible`}
                      >
                        {/* Dial code trigger */}
                        <button
                          type="button"
                          onClick={() => {
                            setDialOpen((v) => !v);
                            setDialSearch("");
                          }}
                          className="flex items-center gap-2 px-4 py-4 border-r border-base-400/50 text-base-100 text-sm font-medium whitespace-nowrap hover:bg-base-400/20 transition-colors rounded-l-2xl shrink-0"
                        >
                          <span className="text-lg leading-none">{selectedCountry.flag}</span>
                          <span>{selectedCountry.dialCode}</span>
                          <svg
                            className={`w-3 h-3 text-base-350 transition-transform ${dialOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Number input */}
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                          placeholder="Phone number"
                          maxLength={15}
                          className="flex-1 bg-transparent px-4 py-4 text-base-100 placeholder:text-base-350 focus:outline-none text-base min-w-0"
                        />

                        {/* Dropdown */}
                        {dialOpen && (
                          <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-72 bg-base-450 border border-base-400/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
                            {/* Search */}
                            <div className="p-2 border-b border-base-400/30">
                              <input
                                type="text"
                                value={dialSearch}
                                onChange={(e) => setDialSearch(e.target.value)}
                                placeholder="Search country..."
                                autoFocus
                                className="w-full bg-base-500 rounded-xl px-3 py-2 text-sm text-base-100 placeholder:text-base-350 focus:outline-none"
                              />
                            </div>
                            {/* List */}
                            <ul className="overflow-y-auto max-h-56 py-1" data-lenis-prevent>
                              {filteredCountries.length === 0 ? (
                                <li className="px-4 py-3 text-sm text-base-350 text-center">No results</li>
                              ) : (
                                filteredCountries.map((c) => (
                                  <li key={c.name}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        update("phoneDialCode", c.dialCode);
                                        setDialOpen(false);
                                        setDialSearch("");
                                      }}
                                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-400/30 transition-colors text-left ${
                                        c.dialCode === formData.phoneDialCode ? "text-base-100 bg-base-400/20" : "text-base-250"
                                      }`}
                                    >
                                      <span className="text-base leading-none">{c.flag}</span>
                                      <span className="flex-1 truncate">{c.name}</span>
                                      <span className="text-base-350 shrink-0">{c.dialCode}</span>
                                    </button>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </div>
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
