# Templatical OSS Landing Page

Static marketing site for the open-source Templatical SDK. Deployed to Cloudflare Pages at `templatical.com`.

## Stack

- **Vite + Vue 3 + vite-ssg** — static site generation
- **Tailwind CSS v4** — OKLch color tokens, dark mode via `.dark` class
- **vue-i18n** — en + de locales, all user-facing strings in locale files
- **VueUse** — composables for scroll reveal, focus trap, scroll lock
- **Shiki** — syntax highlighting for JS/HTML in code blocks (HeroSection terminal, Features feature snippets)
- **Geist** — font loaded via Bunny CDN

## Conventions

- `bun` for dependency management and scripts.
- `@/` alias maps to `src/`.
- Component naming: `The` prefix for singletons (TheNavbar, TheFooter), `Site` prefix for design system primitives (SiteButton, SiteHeading), descriptive names for content components (FeatureShowcase, ComparisonTable).
- External URLs centralized in `src/lib/urls.ts`.
- All user-facing text must go through i18n (`t('key')`) — no hardcoded strings in templates.
- Dark mode: `.dark` class on `<html>`, toggled via `useDarkMode` composable, persisted to localStorage.

### Syntax highlighting

- Shared singleton highlighter via `getHighlighter()` in `src/composables/useShikiHighlight.ts` — themed `github-dark`, langs `javascript` + `html`.
- Always pass the `stripPreBackground` transformer when calling `codeToHtml()` so the wrapper's bg shows through cleanly.
- Global shiki CSS lives in `app.css`: `.shiki { line-height: 0; overflow-x: auto }` + `.shiki .line { display: block; line-height: 1.75rem; min-height: 1.75rem }`. Don't override per-component unless adding per-line animation (see HeroSection `:deep(.line)` for the staggered terminal entrance).
- Render highlighted output via `v-html` inside a styled wrapper (rounded card, padding, shadow). Render the raw string in a `<pre><code>` fallback for SSR before client hydration completes.

### Scroll-triggered animations

- Wrap content in `<RevealOnScroll>` (in `src/components/`) for the standard fade-up-on-viewport-entry effect. Backed by `useScrollReveal()` composable with default `rootMargin: '0px 0px -10% 0px'` so the trigger fires before the element bottom-edges in.
- Always gate motion via `motion-safe:` Tailwind variants. Animations defined as keyframes in `app.css` (`fade-in`, `scale-in`, `slide-in-*`, `scroll-reveal`).

### i18n caveats

- vue-i18n message compiler treats `@` (linked messages) and `{...}` (interpolation/Liquid) as reserved syntax. Avoid both in translatable strings:
    - Don't write `@templatical/types` in i18n strings — describe descriptively (e.g. "TypeScript types") or move the package reference into Vue interpolation outside the locale file.
    - Don't paste Liquid examples like `{% if plan == "pro" %}` into i18n strings — paraphrase to `"Logic tags for branched content based on plan or role"`.
- `tm()` (returning array messages) does NOT process `{'@'}` literal-interpolation escape; the escape would render as visible text. `t()` does process it. Prefer rephrasing over escaping.
- Code snippets stay **English** regardless of locale. Dev convention, copy-paste fidelity, and matching how Stripe/Linear/Vercel/MDN/Anthropic docs do it. Localize the chrome around code (variant tabs, captions, aria-labels), not code content.

### Locale-aware external URLs

- The docs site (`docs.templatical.com`) mirrors our locale set with a `/{locale}` prefix (e.g. `/de/guide/...`) — except for `fallbackLocale`, which has no prefix.
- Build doc URLs dynamically via the i18n composable, not hardcoded:

```ts
const { locale, fallbackLocale } = useI18n();
function docsUrl(path: string) {
    const fallback = String(fallbackLocale.value);
    const prefix = locale.value === fallback ? '' : `/${locale.value}`;
    return `${URLS.docs}${prefix}${path}`;
}
```

This way new locales added later get the right URL without code edits. See `Features.vue` for the pattern.

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
- **Visual tone**: Clean and minimal with purposeful motion. Generous whitespace, subtle shadows, glass effects (navbar blur). Warm neutral palette (OKLch hue 55–60) avoids the cold/sterile feel of pure grays.
- **Atmospheric elements**: A WebGL aurora canvas (`HeroAurora.vue`) lives only in the home hero. Other hero bands use a CSS-only `.section-glow` utility (warm radial bloom from `var(--primary)` with `color-mix`, dark-mode aware). Don't sprinkle the WebGL aurora on additional pages — it's a one-off statement, not a brand pattern.
- **Color tokens**: OKLch palette plus semantic tokens — `--background`, `--foreground`, `--primary`, `--muted`, `--inverse` (dark-on-light surface used by `CtaSection`), and dark-mode swaps in the `.dark` rule. Never reach for raw hex values; pull from tokens.
- **Typography**: Geist provides a modern, geometric sans-serif that reinforces the precise, technical identity.
- **Motion**: Scroll reveals (via `<RevealOnScroll>`), staggered entrances (HeroSection terminal lines), spring easing — animations should feel polished and intentional, never gratuitous. Always respect `prefers-reduced-motion`.
- **Anti-references**: Avoid cluttered SaaS landing pages with excessive gradients, stock photos, or "enterprise" heaviness. No generic startup aesthetic.

### Emotional Goals
The site should simultaneously evoke:
1. **Confidence & trust** — "This is solid, well-maintained, I can rely on it"
2. **Excitement & freedom** — "Finally, a real open-source alternative I can own"
3. **Calm & clarity** — "Everything is clear, I know exactly what this does"
4. **Delight & surprise** — "This is polished and fun, not your typical OSS page"

### Design Principles
1. **Precision over decoration** — Every element earns its place. Prefer whitespace and typography over ornament.
2. **Show, don't tell** — Real, syntax-highlighted code examples and the `ComparisonTable` carry more weight than marketing copy. Each Features section pairs prose with the actual `init()` config that delivers it. Live in-page editor demos were considered and rejected (multi-instance SDK constraints, perf, complexity); the Playground at `play.templatical.com` is the live demo home.
3. **Dark mode is first-class** — Both themes must feel intentional, not an afterthought. Test both. All atmospheric elements (aurora, section-glow) ship with dark-mode token overrides.
4. **Motion with purpose** — Use `<RevealOnScroll>` for entry animations and the spring keyframes in `app.css` for state changes. Wrap everything in `motion-safe:`. Never animate layout properties — transform/opacity only.
5. **Accessible by default** — WCAG AA compliance, keyboard navigation, screen reader support, reduced motion respect. All `aria-label`s flow through i18n.

### Accessibility
- Target: WCAG 2.1 AA compliance
- All interactive elements must have visible focus indicators (ring-2 primary)
- Color contrast ratios must meet AA minimums (4.5:1 text, 3:1 large text/UI)
- All animations wrapped in `motion-safe:` for prefers-reduced-motion
- Semantic HTML, ARIA labels, skip-to-content link
