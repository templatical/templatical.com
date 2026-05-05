export default {
    a11y: {
        skipToContent: 'Skip to content',
        switchToLight: 'Switch to light mode',
        switchToDark: 'Switch to dark mode',
        switchToAuto: 'Switch to system theme',
        switchToLanguage: 'Switch language to {language}',
        mobileMenu: 'Navigation menu',
        mainNav: 'Main',
        footerNav: 'Footer',
        codeExample: 'Code example',
    },
    nav: {
        features: 'Features',
        faq: 'FAQ',
        docs: 'Docs',
        playground: 'Playground',
        getStarted: 'Get Started',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
    },
    github: {
        star: 'Star',
        starAction: 'Star Templatical on GitHub',
        starActionWithCount: 'Star Templatical on GitHub — {count} stars',
    },
    heroEditor: {
        error: {
            message: 'Live preview unavailable — open the {playground} instead.',
            playgroundLabel: 'playground',
        },
        previewAlt:
            'Templatical editor: drag-and-drop email builder with toolbar, canvas, and inspector panels',
        mergeTagModal: {
            title: 'Insert merge tag',
            description:
                'Wire the editor to your data via the onRequest callback. Pick one to insert.',
            cancel: 'Cancel',
            close: 'Close',
            demoNote: 'Demo list — your app supplies the real values.',
            consumerInfo:
                'This modal lives in your app, not the SDK. The editor calls onRequest — you fetch tags from your API, render any UI, and resolve with the chosen tag.',
            docsLink: 'Read the docs',
        },
        mergeTags: {
            firstName: { label: 'First name', description: 'Recipient first name' },
            lastName: { label: 'Last name', description: 'Recipient last name' },
            email: { label: 'Email address', description: 'Recipient email' },
            company: { label: 'Company', description: 'Workspace or company name' },
            unsubscribeUrl: {
                label: 'Unsubscribe URL',
                description: 'Generated per-recipient unsubscribe link',
            },
        },
    },
    footer: {
        features: 'Features',
        faq: 'FAQ',
        documentation: 'Documentation',
        playground: 'Playground',
        github: 'GitHub',
        copyright: '© {year} Templatical. Open source under FSL-1.1-MIT.',
    },
    home: {
        meta: {
            title: 'Templatical — Open-Source Email Editor SDK',
            description:
                'Embed an open-source drag-and-drop email editor in your app — MJML export, merge tags, custom blocks, full theming, and more.',
        },
        hero: {
            headline: 'An open-source drag-and-drop email editor SDK.',
            subheadline:
                'Custom blocks, full theming, merge tags, and display conditions — all built into the open-source SDK. Drop into any app with one init() call.',
            ctaPrimary: 'Open playground',
            ctaSecondary: 'Read the docs',
            frameworkNote: 'Works in React, Svelte, Angular, Vue, and vanilla JS — one init() call, zero peer dependencies.',
            badges: [
                'TypeScript-first',
                'Built on MJML',
                'FSL-1.1-MIT (auto-MIT)',
                'Framework-neutral',
                'Zero telemetry',
            ],
        },
        comparison: {
            eyebrow: 'Why Templatical',
            headline: 'Everything you need, nothing paywalled',
            subheadline:
                'Building from scratch takes a quarter of engineering. SaaS builders charge per seat and gate the features that matter. Templatical includes them — open source, self-hosted, ready to embed.',
            youBuildLabel: 'You’ll build yourself',
            paywalledLabel: 'Paywalled or restricted',
            sdkLabel: 'Included in the open-source SDK',
            cloudLabel: 'Coming with Templatical Cloud',
            cloudBadge: 'In development',
            cloudMore: 'More at cloud.templatical.com',
            recommendedLabel: 'Recommended',
            columns: {
                diy: {
                    title: 'Build it yourself',
                    description:
                        'Wire up an open-source web-builder framework with an MJML plugin, or compose React Email components yourself.',
                    tradeOffs: [
                        'The editor UX itself — drag-and-drop, nesting, column splits, undo/redo',
                        'Block-level merge tag scoping',
                        'Display conditions with live preview',
                        'Custom block SDK with API-backed data sources',
                        'Editor-to-media-library glue — picker, image-block hook, replace flow',
                        'Dark-mode preview parity with sent email',
                        'Theme tokens for brand consistency',
                        'MJML output you can render anywhere',
                        'Email-client compatibility — Outlook 2007–365, Gmail clipping, Apple Mail',
                        'Accessibility — keyboard nav, ARIA, screen readers',
                        'Ongoing maintenance — every email-client tweak is a regression risk',
                    ],
                },
                hosted: {
                    title: 'SaaS builders',
                    description:
                        'Drop in a hosted editor component pointing at a vendor’s rendering API.',
                    tradeOffs: [
                        'Custom blocks gated to higher paid tiers',
                        'Display conditions gated to higher paid tiers',
                        'Custom theming and design tokens on higher tiers',
                        'White-label and brand removal on enterprise tiers',
                        'Custom merge-tag syntax (Liquid, Handlebars) paywalled',
                        'Template and block defaults gated to paid tiers',
                        'Pluggable media library — locked to vendor’s storage',
                        'Per-seat or per-end-user pricing scales with you',
                        'Closed source — cannot audit, fork, or extend',
                        'Output coupled to the vendor’s render API',
                    ],
                },
                templatical: {
                    title: 'Templatical',
                    description:
                        'A purpose-built, open-source email editor SDK. Own the experience, ship in days not quarters, never hit a paywall on core features.',
                    sdk: [
                        'Custom blocks with API-backed data sources',
                        'Block-level merge tags with scoping',
                        'Display conditions for dynamic content',
                        'Pluggable media library — bring your own storage (S3, Cloudinary, your CMS)',
                        'Full theming via design tokens, dark mode included',
                        'White-label by default — your UI, your brand',
                        'MJML output — render in browser, on your server, anywhere',
                        'Built-in WCAG accessibility linting with auto-fixes',
                    ],
                    cloud: [
                        'AI rewrite, AI chat, MCP integration',
                        'Real-time collaboration with block-level locking',
                        'Snapshots and version history',
                        'Multi-tenancy and API access',
                    ],
                },
            },
        },
        cta: {
            headline: 'Start building email templates today',
            subheadline:
                'Open source. Free forever. Self-host today, opt into the managed tier later.',
            ctaPrimary: 'Get Started',
            ctaSecondary: 'View on GitHub',
            ctaTertiary: 'Sponsor',
        },
        migration: {
            text: 'Already on a hosted email builder or shipping raw HTML? Free importers for your existing templates.',
            sourcesLabel: 'Migration guides',
            fromBeefree: 'From BeeFree',
            fromUnlayer: 'From Unlayer',
            fromHtml: 'From HTML',
        },
        homeFaq: {
            eyebrow: 'Common questions',
            headline: 'Things developers ask first',
            items: [
                {
                    question: 'What does FSL-1.1-MIT mean for commercial use?',
                    answer:
                        'You can use Templatical commercially, embed it in your product, charge customers for your product, and self-host it — all today, free. The only restriction is you can’t resell Templatical as a competing email-editor product. After two years, every release auto-converts to plain MIT.',
                },
                {
                    question: 'How does this compare to a hosted SaaS email builder?',
                    answer:
                        'Hosted builders give you a turnkey editor and a stocked template catalog, but lock the editor behind their UI and pricing — custom blocks, white-label, advanced theming, and custom merge-tag syntax usually sit behind upgrade screens. Templatical is the embedded, self-hostable opposite: your customers see your brand, you pay nothing per seat, and you ship MJML you can render anywhere. If your product needs an editor that feels like part of your app, Templatical fits. If you mainly want a hosted editor with a large pre-built template library, a SaaS builder will be faster.',
                },
                {
                    question: 'What does Templatical Cloud include vs the open-source SDK?',
                    answer:
                        'The open-source SDK has every editor feature — custom blocks, merge tags, display conditions, theming, MJML output — included and free to self-host. Templatical Cloud is a separate, paid managed subscription for infrastructure-dependent capabilities: real-time collaboration, AI rewrite and chat, snapshots, comments, multi-tenancy, hosted media. Those need backend services we run, so they ship as a managed tier rather than self-hostable code.',
                },
            ],
            seeAll: 'See all questions',
        },
        close: {
            headline: 'Ship an email editor this week',
            subheadline:
                'One npm install. One init() call. JSON in, MJML out — render anywhere, free.',
            copyLabel: 'Copy',
            copiedLabel: 'Copied',
            ctaPrimary: 'Open playground',
            ctaSecondary: 'Star on GitHub',
        },
    },
    features: {
        meta: {
            title: 'Features — Templatical',
            description:
                'Open-source drag-and-drop email editor SDK. Custom blocks, full theming, MJML output. Self-host free. MIT licensed.',
        },
        hero: {
            eyebrow: 'Open-source SDK',
            headline: 'The features other editors gate. In your repo. MIT-licensed.',
            subheadline:
                'Six power features and a clean set of essentials — all included, all open. Portable JSON in, MJML out, no usage tier in the way.',
            pricingPill: 'Open source · MIT · Free to self-host',
        },
        examplesLabel: '{title} examples',
        variants: {
            static: 'Static',
            apiBacked: 'API-backed',
            predefined: 'Predefined',
            customPicker: 'Custom picker',
        },
        customBlocks: {
            eyebrow: 'Extensibility',
            title: 'Custom blocks with API-backed data',
            description:
                'Register your own block types — static templates or live data fetched from your API at preview time. Built in, not bolted on.',
            outcome: 'Ship CRM-aware blocks your team drops in without engineering tickets.',
            features: [
                'Per-field config: text, image, color, select, repeatable arrays',
                'Static template or live API fetch at preview time',
                'Liquid templates with conditionals and built-in filters',
                'Type-safe block factories with full TypeScript types',
            ],
            docsLabel: 'See the block API',
        },
        mergeTags: {
            eyebrow: 'Personalization',
            title: 'Merge tags with pluggable syntax',
            description:
                'Handlebars, Liquid, JS template literals, or your own — with human-readable labels rendered directly on the canvas. No vendor-locked syntax.',
            outcome: 'Build a CRM-aware tag picker in an afternoon, not a sprint.',
            features: [
                'Built-in syntaxes plus a hook for your own',
                'Human-readable labels rendered directly on the canvas',
                'Inline autocomplete — type the syntax opener to surface matching tags',
                'Optional onRequest hook to swap the picker for your CRM UI',
                'Round-trip safe — JSON stores the canonical token',
            ],
            docsLabel: 'Merge-tag reference',
        },
        displayConditions: {
            eyebrow: 'Targeting',
            title: 'Display conditions',
            description:
                'Show or hide blocks based on recipient attributes, with live preview in the editor. Built in, not a paid add-on.',
            outcome: 'Personalize without bolting on a separate targeting service.',
            features: [
                'Per-block show/hide rules from recipient attributes',
                'Live preview while editing',
                'allowCustom: true lets editors add conditions inline',
                'Custom wrappers — your ESP evaluates Liquid at send time',
            ],
            docsLabel: 'Conditions guide',
        },
        theming: {
            eyebrow: 'Branding',
            title: 'Full theming via design tokens',
            description:
                '27 OKLch tokens, custom fonts, dark mode, complete theme overrides. Every surface tokenized — not just the ones in the marketing screenshot.',
            outcome: 'The editor looks like your product on day one.',
            features: [
                '27 OKLch design tokens covering every surface',
                'Light + dark theme overrides via the same theme.dark key',
                'Custom fonts via --tpl-font-sans and --tpl-font-mono',
                'Tailwind 4 with `tpl:` prefix — no preflight, no style leaks',
            ],
            docsLabel: 'Theming reference',
        },
        accessibility: {
            eyebrow: 'Quality',
            title: 'Built-in accessibility linting',
            description:
                'Live WCAG checks while authoring — surfaced in a dedicated sidebar tab and as inline badges on the canvas. Deterministic rules, configurable severity, no AI guesswork.',
            outcome: 'Catch alt-text, contrast, and structure issues before send — not after.',
            features: [
                'Live checks: errors, warnings, and info — grouped in the sidebar',
                'Inline canvas badges with one-click jump and auto-fix where safe',
                'Per-rule severity overrides and configurable thresholds (contrast, font size, touch targets)',
                'Locale-aware vague-text dictionaries',
                'Same engine runs standalone — validate templates in CI, on save, or in pre-send pipelines',
            ],
            docsLabel: 'Accessibility reference',
        },
        mediaLibrary: {
            eyebrow: 'Assets',
            title: 'Pluggable media library',
            description:
                'A single onRequestMedia hook lets the editor open your media browser — S3, Cloudinary, your own CMS, anything. No vendor storage, no asset egress fees, no lock-in.',
            outcome: 'Reuse the asset pipeline you already run, end-to-end.',
            features: [
                'One async hook returns { url, alt } — bring any backend',
                'Triggered from image blocks, image fields, and the toolbar',
                'Context-aware accept hint — the editor tells you what it wants',
                'No upload happens through Templatical — your storage, your auth',
                'Cloud build adds a managed media browser when you opt in',
            ],
            docsLabel: 'Media-library reference',
        },
        defaults: {
            eyebrow: 'Defaults',
            title: 'Template & block defaults',
            description:
                'Define your brand once. New templates and blocks pick up your defaults automatically — colors, fonts, padding, layout.',
            outcome: 'Brand consistency without the copy-paste tax.',
            features: [
                'Brand defaults set once at init() time',
                'Per-block-type defaults: button, divider, spacer, image, social',
                'Template-level defaults: width, background, font family',
                'Override per-template via the templateDefaults field',
            ],
            docsLabel: 'Defaults reference',
        },
        supporting: {
            eyebrow: 'The essentials',
            headline: 'Everything else you expect — done right.',
            subheadline:
                'Drop-in mount, portable JSON, MJML output, framework-agnostic. Plus the polish — dark mode, i18n, undo/redo.',
        },
        supportingItems: {
            framework: {
                title: 'Drop-in framework integration',
                description: 'One init() call to mount, one to unmount. First-class examples for React, Vue, Svelte, Angular, and vanilla JS.',
            },
            output: {
                title: 'JSON in, MJML out',
                description: 'Templates are portable JSON. Output is MJML — render in the browser or on your server, send through any provider. No hosted render service required.',
            },
            darkMode: {
                title: 'Dark mode',
                description: 'First-class dark mode with auto-detect or manual toggle. Both themes are designed, not an afterthought.',
            },
            i18n: {
                title: 'Internationalization',
                description: 'English and German built in. Load custom translations for any language.',
            },
            undoRedo: {
                title: 'Undo / Redo',
                description: 'Full history stack. Debounced to group rapid changes into sensible undo steps.',
            },
            responsivePreview: {
                title: 'Responsive preview',
                description: 'Toggle desktop, tablet, and mobile viewports to see how every email renders on every device.',
            },
        },
        migration: {
            eyebrow: 'Painless migration',
            title: 'Already in another editor? Bring your templates with you.',
            description:
                'Import existing templates from major hosted editors — or any HTML email you already have. Free, open-source migration tools, no manual rebuilding, no vendor lock-in.',
            features: [
                'Import legacy JSON templates directly',
                'Convert raw HTML emails — MJML, Mailchimp, SendGrid, hand-coded',
                'Automatic block mapping and style preservation',
                'Free and open-source migration tools',
            ],
            guideCtaBeefree: 'Migrate from BeeFree',
            guideCtaUnlayer: 'Migrate from Unlayer',
            guideCtaHtml: 'Migrate from HTML',
        },
        cta: {
            eyebrow: 'Get started',
            headline: 'Pick your starting point.',
            install: {
                title: 'Install the SDK',
                description:
                    'Add the package, mount with one init() call, ship. First-class examples for every major framework.',
                cta: 'Read the install guide',
            },
            migrate: {
                title: 'Migrate your templates',
                description:
                    'Already in a hosted editor — or sitting on a folder of HTML emails? Import them with automatic block mapping, no manual rebuild.',
                ctaBeefree: 'From BeeFree',
                ctaUnlayer: 'From Unlayer',
                ctaHtml: 'From HTML',
            },
        },
    },
    faq: {
        meta: {
            title: 'FAQ — Templatical',
            description:
                'Answers about licensing, commercial use, framework support, migration paths, and the Cloud tier.',
        },
        hero: {
            eyebrow: 'FAQ',
            headline: 'Frequently asked questions',
            subheadline:
                'Licensing, commercial use, framework support, migration paths, and the Cloud tier.',
        },
        items: {
            free: {
                question: 'Is Templatical really free?',
                answer: 'Yes. The editor SDK is licensed under FSL-1.1-MIT (Functional Source License) — free to use in any project with no usage caps or per-seat fees. Every release automatically converts to MIT two years after it ships, with no action required.',
            },
            commercial: {
                question: 'Can I use it in commercial products?',
                answer: 'Yes — paid SaaS, internal tools, on-premise software, agency builds, anything. The only restriction: you can\'t rebrand Templatical and sell it as a competing hosted email-editor SaaS. Embedding it in a CRM, transactional email API, newsletter tool, or any product where the editor is one feature among many is fully allowed.',
            },
            packages: {
                question: 'Which packages are MIT vs FSL?',
                answer: 'Four of the seven packages are pure MIT today: types, renderer, and the BeeFree and Unlayer importers. The editor, core, and media-library packages are FSL-1.1-MIT. The split means anything you\'d build into a backend or codegen pipeline is fully permissive from day one.',
            },
            branding: {
                question: 'Do I need to display "Powered by Templatical"?',
                answer: 'No. The editor renders a small footer credit by default, but it\'s opt-out — pass branding: false to init() to hide it. There is no forced header logo or other attribution surface in the editor UI.',
            },
            frameworks: {
                question: 'What frameworks are supported?',
                answer: 'Templatical works in React, Svelte, Angular, Vue, and vanilla JS. The published package is fully self-contained — Vue is bundled inside, so consumers install one package with zero peer dependencies and mount the editor with a single init() call into any DOM element.',
            },
            migrate: {
                question: 'How do I migrate from another editor?',
                answer: 'We provide free, MIT-licensed migration tools for BeeFree, Unlayer, raw HTML, and MJML. They import your existing templates directly and handle block mapping, style preservation, and merge tag conversion automatically. See the migration guides in the docs for each source format.',
            },
            data: {
                question: 'Where does my template data go?',
                answer: 'Nowhere. The SDK runs entirely in the browser — no telemetry, no remote calls, no analytics. Your templates never leave your app unless you save them to your own backend.',
            },
            paid: {
                question: 'Is there a paid version, and is it required?',
                answer: 'No, paid is not required. The open-source SDK is fully standalone — every editor feature (custom blocks, merge tags, display conditions, theming, MJML output) is included and free to self-host. Templatical Cloud is a separate, optional managed subscription that adds infrastructure-dependent capabilities — real-time collaboration, AI rewrite and chat, snapshots, comments, hosted media, multi-tenancy, API access. Those rely on backend services we run, so they ship as a paid managed tier rather than self-hostable code.',
            },
        },
        stillAsking: {
            eyebrow: 'Still curious?',
            headline: 'Didn\'t find your answer?',
            description:
                'Ask the community on GitHub Discussions, or dive into the docs for the deeper API reference.',
            discussionsCta: 'Ask on GitHub Discussions',
            docsCta: 'Read the docs',
        },
    },
};
