# templatical.com

Marketing site for **Templatical** — the open-source, drag-and-drop email editor SDK. Positioned as the open-source alternative to hosted email-editor SaaS like BeeFree and Unlayer, with free migration tools.

Deployed to Cloudflare Pages at [templatical.com](https://templatical.com).

## Stack

- **Vite + Vue 3 + [vite-ssg](https://github.com/antfu-collective/vite-ssg)** — static site generation
- **Tailwind CSS v4** — OKLch color tokens, dark mode via `.dark` class
- **vue-i18n** — English and German locales
- **VueUse** — composables for scroll reveal, focus trap, scroll lock
- **Geist** font via Bunny CDN

## Getting Started

Requires Node 22+ and [pnpm](https://pnpm.io). Easiest setup:

```bash
corepack enable        # ships with Node, locks the pnpm version from package.json
pnpm install
pnpm run dev
```

## Scripts

| Command            | Description                            |
| ------------------ | -------------------------------------- |
| `pnpm run dev`     | Start dev server                       |
| `pnpm run build`   | Generate static HTML via vite-ssg      |
| `pnpm run preview` | Preview the built site                 |

## Project Structure

```
src/
├── components/      # UI components (The* singletons, Site* primitives, content sections)
│   └── icons/       # Inline SVG icon components
├── composables/     # useDarkMode, useLocale, useScrollReveal
├── i18n/            # vue-i18n setup + en/de locale files
├── lib/             # urls.ts (external links), utils.ts
├── pages/           # Home, Features, Community
├── styles/          # Tailwind entry + theme tokens
├── App.vue
├── main.ts
└── router.ts
```

The `@/` alias maps to `src/`.

## Conventions

- All user-facing strings go through i18n (`t('key')`). No hardcoded text in templates.
- External URLs live in `src/lib/urls.ts`.
- Component naming: `The*` for singletons (`TheNavbar`, `TheFooter`), `Site*` for design-system primitives (`SiteButton`, `SiteHeading`), descriptive names for content components (`HeroSection`, `ComparisonTable`).
- Dark mode: `.dark` class on `<html>`, toggled via `useDarkMode`, persisted to localStorage.
- Animations wrapped in `motion-safe:` to respect `prefers-reduced-motion`.
- Target WCAG 2.1 AA: visible focus rings, semantic HTML, ARIA labels, skip-to-content link.

## Related Repositories

- [templatical/sdk](https://github.com/templatical/sdk) — the open-source editor SDK itself

## License

MIT
