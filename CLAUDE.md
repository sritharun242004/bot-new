# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

**Next.js 16 App Router** with Tailwind CSS v4 and TypeScript. Marketing site for an AI/automation consultancy.

### Routes
- `/` — Homepage (`src/app/page.tsx`) assembles components: Hero → ClientMarquee → Stats → WhatWeDo → FeaturedWork → Process (or HowWeWork) → CalEmbed → LocationSection → CTASection → Footer
- `/about`, `/services`, `/work`, `/faq`, `/careers`, `/contact` — Each has a `page.tsx` (Server Component) that imports a `*Content.tsx` (Client Component) with the actual JSX
- `/work/[slug]` — Dynamic case study pages; slugs come from `src/data/projects.ts`

### Data Layer
All project/case study content lives in `src/data/projects.ts`. The `Project` interface includes `slug`, `tag`, `featured`, `experimental`, and a `caseStudy` object with `challenge`, `approach`, `solution`, `results[]`, `techStack[]`, and optional `testimonial`. Helper functions (`getFeaturedProjects`, `getMainProjects`, `getExperimentalProjects`, `getProjectBySlug`) are the only way content is consumed.

### Theming
CSS custom properties drive the entire light/dark theme. Variables are defined in `src/app/globals.css` under `:root` (dark, default) and `[data-theme="light"]`. The scale runs `--base-100` (white/text) → `--base-500` (black/bg). `ThemeToggle.tsx` writes to `localStorage` and sets `data-theme` on `document.documentElement`. Tailwind v4 maps these via `@theme inline` — no `tailwind.config.js` exists.

### Animation Patterns
- **Text reveals**: Wrap headings in `<RevealText>` (splits by `\n` into `line-mask`/`line-inner` spans). The `useReveal` hook (`src/hooks/useReveal.ts`) attaches an IntersectionObserver that adds `.revealed` to trigger CSS transitions.
- **Fade-up**: Add `reveal-up` class + optional `data-delay="1-4"` to any element inside a `useReveal`-watched container.
- **Page transitions**: `src/components/PageTransition.tsx` wraps the app. On route change it shows two layered SVG iris masks (white z-9999, grey z-9998) that open from centre using animated `<circle r>`.
- **Smooth scroll**: `LenisProvider` wraps the entire app in `layout.tsx`.

### Key Components
- `RevealText` — accepts `text` (split by `\n`) or `lines` (array, supports JSX nodes for inline spans)
- `CTAButton` — animated pill button; circle expands on hover via `.btn-cta` CSS class
- `MenuToggle` — full-screen overlay menu with clip-path reveal and focus trap
- `FeaturedWork` — horizontal scroll driven by a tall sticky section; each panel has an inline SVG visual
- `CustomCursor` — framer-motion trailing ring; currently toggled on/off via layout import

### Contact Form
`src/app/contact/actions.ts` is a `"use server"` action. Requires `RESEND_API_KEY` env var. Sends to `CONTACT_EMAIL` env var (defaults to `official@thebotcompany.in`).
