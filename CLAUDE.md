# Templatical OSS Landing Page

Static marketing site for the open-source Templatical SDK. Deployed to Cloudflare Pages at `templatical.com`.

## Stack

- **Vite + Vue 3 + vite-ssg** — static site generation
- **Tailwind CSS v4** — OKLch color tokens, dark mode via `.dark` class
- **vue-i18n** — en + de locales, all user-facing strings in locale files
- **VueUse** — composables for scroll reveal, focus trap, scroll lock
- **Geist** — font loaded via Bunny CDN

## Conventions

- `bun` for dependency management and scripts.
- `@/` alias maps to `src/`.
- `<style scoped>` for component-specific styles.
- Component naming: `The` prefix for singletons (TheNavbar, TheFooter), `Site` prefix for design system primitives (SiteButton, SiteHeading), descriptive names for content components (FeatureShowcase, ComparisonTable).
- External URLs centralized in `src/lib/urls.ts`.
- All user-facing text must go through i18n (`t('key')`) — no hardcoded strings in templates.
- Dark mode: `.dark` class on `<html>`, toggled via `useDarkMode` composable, persisted to localStorage.

## Commands

- `bun run dev` — start dev server
- `bun run build` — generate static HTML via vite-ssg
- `bun run preview` — preview built site

## Positioning

This site markets the open-source SDK as **the open-source BeeFree alternative** with free migration tools. The cloud version (team collaboration, API, managed hosting) lives at `cloud.templatical.com` and is only subtly referenced.

## Design Context

### Users
Developers and technical decision-makers evaluating email editor SDKs. They arrive comparing options (often from BeeFree), want to quickly understand capabilities, and need confidence that this open-source tool is production-ready. They value clarity, code examples, and honest feature comparisons over marketing fluff.

### Brand Personality
**Open, Modern, Precise.** The voice is confident without being aggressive — a well-maintained tool that speaks for itself. Copy is direct, technically accurate, and respects the reader's time. The open-source identity is central, not an afterthought.

### Aesthetic Direction
- **Reference**: Linear / Vercel — sleek, dark-friendly, developer-tool aesthetic with refined animations and meticulous attention to detail.
- **Visual tone**: Clean and minimal with purposeful motion. Generous whitespace, subtle shadows, glass effects (navbar blur). Warm neutral palette (OKLch hue 55-60) avoids the cold/sterile feel of pure grays.
- **Typography**: Geist provides a modern, geometric sans-serif that reinforces the precise, technical identity.
- **Motion**: Scroll reveals, staggered entrances, spring easing — animations should feel polished and intentional, never gratuitous. Always respect `prefers-reduced-motion`.
- **Anti-references**: Avoid cluttered SaaS landing pages with excessive gradients, stock photos, or "enterprise" heaviness. No generic startup aesthetic.

### Emotional Goals
The site should simultaneously evoke:
1. **Confidence & trust** — "This is solid, well-maintained, I can rely on it"
2. **Excitement & freedom** — "Finally, a real open-source alternative I can own"
3. **Calm & clarity** — "Everything is clear, I know exactly what this does"
4. **Delight & surprise** — "This is polished and fun, not your typical OSS page"

### Design Principles
1. **Precision over decoration** — Every element earns its place. Prefer whitespace and typography over ornament.
2. **Show, don't tell** — Code examples, feature comparisons, and live demos over marketing claims.
3. **Dark mode is first-class** — Both themes must feel intentional, not an afterthought. Test both.
4. **Motion with purpose** — Animations guide attention and create delight, but never block or distract.
5. **Accessible by default** — WCAG AA compliance, keyboard navigation, screen reader support, reduced motion respect.

### Accessibility
- Target: WCAG 2.1 AA compliance
- All interactive elements must have visible focus indicators (ring-2 primary)
- Color contrast ratios must meet AA minimums (4.5:1 text, 3:1 large text/UI)
- All animations wrapped in `motion-safe:` for prefers-reduced-motion
- Semantic HTML, ARIA labels, skip-to-content link
