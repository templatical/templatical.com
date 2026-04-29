export default {
    a11y: {
        skipToContent: 'Skip to content',
        switchToLight: 'Switch to light mode',
        switchToDark: 'Switch to dark mode',
        switchToLanguage: 'Switch language to {language}',
        mobileMenu: 'Navigation menu',
        mainNav: 'Main',
        footerNav: 'Footer',
        terminal: 'terminal',
        yes: 'Yes',
        no: 'No',
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
    },
    footer: {
        product: 'Product',
        resources: 'Resources',
        legal: 'Legal',
        features: 'Features',
        faq: 'FAQ',
        documentation: 'Documentation',
        playground: 'Playground',
        github: 'GitHub',
        privacy: 'Privacy',
        terms: 'Terms',
        copyright: '© {year} Templatical. Open source under FSL-1.1-MIT.',
    },
    home: {
        meta: {
            title: 'Templatical — Open-Source Email Editor SDK',
            description:
                'The open-source BeeFree alternative. Embed a drag-and-drop email editor in your app with MJML export, merge tags, custom blocks, and more.',
        },
        hero: {
            badge: 'Now open source',
            badgeCta: 'View on GitHub',
            headline: 'An open-source email editor with the features other editors paywall.',
            subheadline:
                'Custom blocks, full theming, advanced merge tags, and display conditions — open-source in Templatical, paid tier elsewhere. Drop into any app with one init() call. JSON in, MJML out.',
            ctaPrimary: 'Try live',
            ctaSecondary: 'Compare',
        },
        trustedBy: {
            eyebrow: 'Trusted by developers',
            headline: 'Used by teams building better email experiences',
        },
        features: {
            eyebrow: 'Power features',
            headline: 'Paid tier elsewhere. Open source here.',
            subheadline:
                'The features developers reach for first — and the ones that usually live behind a paywall — ship in the open-source SDK.',
            supportingEyebrow: 'And the table-stakes',
            supportingHeadline: 'Everything else you expect',
        },
        bentoItems: {
            customBlocks: {
                title: 'Custom blocks with API-backed data',
                description:
                    'Register your own block types — static templates or live data fetched from your API at preview time. Paid tier elsewhere, open-source here.',
            },
            mergeTags: {
                title: 'Merge tags with pluggable syntax',
                description:
                    'Handlebars, Liquid, JS template literals, or your own — with human-readable label replacement directly in the editor canvas. Build a CRM-aware tag picker in minutes.',
            },
            displayConditions: {
                title: 'Display conditions',
                description:
                    'Show or hide blocks based on recipient attributes, with live preview in the editor. Built in, no extra service.',
            },
            theming: {
                title: 'Full theming via design tokens',
                description:
                    '27 OKLch tokens, custom fonts, dark mode, complete theme overrides. No CSS hacking, no paid tier — your brand becomes the editor’s default.',
            },
            defaults: {
                title: 'Template & block defaults',
                description:
                    'Define your brand once. New templates and new blocks pick up your defaults automatically — colors, fonts, padding, layout. Consistent without copy-paste.',
            },
            framework: {
                title: 'Drop-in framework integration',
                description:
                    'One init() call to mount, one to unmount. First-class examples for React, Vue, Svelte, Angular, and vanilla JS. No framework lock-in.',
            },
            output: {
                title: 'JSON in, MJML out',
                description:
                    'Templates are portable JSON. Output is MJML — render in the browser or on your server, send through any provider. No vendor render API.',
            },
            cloud: {
                title: 'Cloud (in development)',
                description:
                    'Real-time collaboration with block locking, AI rewrite, AI chat, comments, and snapshots — coming as the Templatical Cloud tier. The implementation is open code; you’ll be able to use the managed tier or self-host.',
            },
        },
        steps: {
            eyebrow: 'How it works',
            headline: 'Three steps to a production email editor',
            subheadline:
                'Get from zero to a fully functional email editor in minutes, not months.',
            install: {
                title: 'Install the SDK',
                description:
                    'Add Templatical to your project with a single package install. Works with any JavaScript framework.',
            },
            configure: {
                title: 'Mount the Editor',
                description:
                    'Initialize the editor with your configuration. Set up blocks, merge tags, theming, and event handlers.',
            },
            build: {
                title: 'Export & Send',
                description:
                    'Your users build templates visually. Export as HTML or MJML and send via your preferred email service.',
            },
        },
        comparison: {
            eyebrow: 'Compare',
            headline: 'Templatical vs. the alternatives',
            subheadline:
                'An honest, side-by-side look at how Templatical compares to Beefree, Unlayer, and GrapesJS — including where each one is the better pick.',
            tabsLabel: 'Compare against',
            factsLabels: {
                license: 'License',
                pricing: 'Pricing',
                selfHost: 'Self-hostable',
            },
            templaticalWinsLabel: 'Where Templatical wins',
            competitorWinsLabel: 'Where {name} wins',
            pickCompetitorLabel: 'When to pick {name}',
            pickUsLabel: 'When to pick Templatical',
            migrationCta: 'Already on {name}?',
            migrationLink: 'See migration guide',
            seeFullComparison: 'See the full comparison',
            cloudSectionLabel: 'More with Templatical Cloud',
            cloudSectionStatus: 'In development',
            cloudIntro:
                'These capabilities are coming as the Templatical Cloud tier. The feature code is open-source under FSL-1.1-MIT today — use the managed Cloud when it ships, or self-host the same code.',
            cloudFeatures: [
                'AI rewrite and AI chat',
                'Real-time collaboration with block-level locking',
                'Comments and review threads',
                'Snapshots and version history',
                'Saved modules across templates',
                'Hosted media library',
                'Design-to-template conversion',
                'Test email sending',
                'MCP integration',
                'API access and multi-tenancy',
            ],
            cloudVsLabel: 'How {name} handles these',
            cloudLearnMore: 'Learn more about Templatical Cloud',
            trademarkNote:
                'Comparisons reflect publicly available information at the time of writing and may change. Product names and trademarks belong to their respective owners.',
            tabs: {
                beefree: {
                    name: 'Beefree SDK',
                    positioning:
                        'Mature hosted editor with a broad feature set, positioned for funded startups and enterprises.',
                    facts: {
                        license: 'Closed source',
                        pricing: 'Free tier + paid plans',
                        selfHost: 'Hosted only',
                    },
                    templaticalWins: [
                        'Fully self-hostable — Beefree is delivered as a hosted editor.',
                        'MJML output you can render anywhere — no dependency on a hosted render API.',
                        'Open API for custom blocks at every tier — Beefree reserves custom blocks for higher paid plans.',
                        'Free and stays free; FSL-1.1-MIT licensed (auto-MIT after 2 years).',
                        'End-to-end TypeScript types, not just SDK type defs.',
                    ],
                    competitorWins: [
                        'Large pre-built template catalog available as an add-on.',
                        'Email, page, popup, and document builders in one product.',
                        'Multi-language editor UI out of the box.',
                        'Established commercial product with a long track record in the email-editor space.',
                    ],
                    cloudVsCompetitor:
                        'Beefree reserves these for higher paid plans — real-time collaboration, AI writing, image generation, and alt-text are spread across paid tiers.',
                    verdict: {
                        competitor:
                            'Pick Beefree if you need a turnkey hosted editor, multi-product builders, and an extensive template library.',
                        us: 'Pick Templatical if you want to own your editor — open code, MJML output, and the premium features without paywalls.',
                    },
                },
                unlayer: {
                    name: 'Unlayer',
                    positioning:
                        'Easy React drop-in around a hosted editor. A fast path to an embedded editor in a React app.',
                    facts: {
                        license: 'Wrapper MIT, editor closed',
                        pricing: 'Free tier + paid plans',
                        selfHost: 'Hosted only',
                    },
                    templaticalWins: [
                        'Fully self-hostable — Unlayer’s editor runs as a hosted component.',
                        'MJML output you can render anywhere — no dependency on a hosted render API.',
                        'Custom blocks, custom CSS, and themes in the OSS SDK — Unlayer reserves these for higher paid plans.',
                        'Mountable from any framework, not React-coupled.',
                        'Bilingual i18n out of the box; Unlayer reserves localization for higher paid plans.',
                    ],
                    competitorWins: [
                        'Quick React drop-in — single component, no infra to manage.',
                        'Email, page, popup, and document builders in one product.',
                        'Lower entry pricing than Beefree.',
                        'Established commercial product with a substantial customer base.',
                    ],
                    cloudVsCompetitor:
                        'Unlayer’s collaboration is team-level rather than block-level, and AI-assisted writing is reserved for higher paid plans.',
                    verdict: {
                        competitor:
                            'Pick Unlayer if you want a fast embedded editor in React and are happy with a hosted setup.',
                        us: 'Pick Templatical if you want true ownership — self-hostable, MJML output, and framework-neutral.',
                    },
                },
                grapesjs: {
                    name: 'GrapesJS + MJML',
                    positioning:
                        'Open-source web-builder framework you can pair with the MJML plugin to build an email editor on top.',
                    facts: {
                        license: 'BSD-3-Clause',
                        pricing: 'Free',
                        selfHost: 'Yes',
                    },
                    templaticalWins: [
                        'Email-first product, designed for email from the ground up.',
                        'Built-in merge tags, display conditions, dark mode, and theming — these are typically wired up yourself in GrapesJS.',
                        'Open API for custom blocks with API-backed data sources — your domain entities become first-class drag-and-drop blocks.',
                        'Bundled, opinionated feature set rather than a build-your-own setup.',
                    ],
                    competitorWins: [
                        'Fully BSD-3-Clause — no FSL caveat at all.',
                        'Large plugin ecosystem and active community.',
                        'General-purpose enough to build pages, popups, and documents on the same engine.',
                        'Vanilla JavaScript core — no Vue runtime dependency, useful when policy forbids it.',
                        'Free forever, no managed-tier path planned.',
                    ],
                    cloudVsCompetitor:
                        'GrapesJS core does not include these. You would source them from third-party plugins or build them yourself.',
                    verdict: {
                        competitor:
                            'Pick GrapesJS if you want a general-purpose web-builder framework and are happy to build your own email feature set on top.',
                        us: 'Pick Templatical if you want a focused email editor with merge tags, display conditions, and theming ready out of the box.',
                    },
                },
            },
        },
        cloud: {
            headline: 'Need managed hosting?',
            description:
                'Templatical Cloud offers team collaboration, API access, multi-tenancy, and managed infrastructure — so you can focus on your product.',
            cta: 'Try Templatical Cloud',
        },
        cta: {
            headline: 'Start building email templates today',
            subheadline:
                'Open source, free forever. Get started with the docs, star the repo, or sponsor development.',
            ctaPrimary: 'Get Started',
            ctaSecondary: 'View on GitHub',
            ctaTertiary: 'Sponsor',
        },
    },
    features: {
        meta: {
            title: 'Features — Templatical',
            description:
                'Custom blocks, pluggable merge tags, display conditions, full theming, template defaults — open-source. Plus framework integration, MJML output, and the Cloud tier in development.',
        },
        hero: {
            eyebrow: 'Power features',
            headline: 'The features other editors paywall — open-source here.',
            subheadline:
                'Five power features and a clean set of table-stakes. No tier, no paywall, no vendor render API.',
        },
        docsLink: 'Read the docs',
        examplesLabel: '{title} examples',
        variants: {
            static: 'Static',
            apiBacked: 'API-backed',
            predefined: 'Predefined',
            customPicker: 'Custom picker',
        },
        customBlocks: {
            eyebrow: 'Power feature · 1',
            title: 'Custom blocks with API-backed data',
            description:
                'Register your own block types — static templates or live data fetched from your API at preview time. Paid tier elsewhere, open-source here.',
            features: [
                'Per-field configuration: text, image, color, select, repeatable',
                'Static template or live API fetch at preview time',
                'Required fields with validation; optional read-only fields',
                'Liquid templates with conditionals and built-in filters',
                'Repeatable field arrays for collections like product grids',
                'Custom SVG icon per block in the editor sidebar',
                'Type-safe block factories with TypeScript types',
            ],
        },
        mergeTags: {
            eyebrow: 'Power feature · 2',
            title: 'Merge tags with pluggable syntax',
            description:
                'Handlebars, Liquid, JS template literals, or your own — with human-readable label replacement directly in the editor canvas. Build a CRM-aware tag picker in minutes.',
            features: [
                'Built-in syntaxes plus a hook for your own',
                'Human-readable labels rendered in the editor canvas',
                'Type-ahead picker driven by your data shape',
                'Optional onRequest hook to swap the picker for your CRM UI',
                'Logic tags for branched content based on plan or role',
                'Built-in Liquid filters: default, upcase, escape',
                'Round-trip safe — JSON stores the canonical token',
            ],
        },
        displayConditions: {
            eyebrow: 'Power feature · 3',
            title: 'Display conditions',
            description:
                'Show or hide blocks based on recipient attributes, with live preview in the editor. Built in, no extra service.',
            features: [
                'Per-block show/hide rules from recipient attributes',
                'Group conditions by audience, segment, or role',
                'Live preview while editing',
                'allowCustom: true lets editors add conditions inline',
                'Custom before/after wrappers for provider-specific syntax',
                'Wrappers emit Liquid — your ESP evaluates at send time',
                'No external service or paid add-on required',
            ],
        },
        theming: {
            eyebrow: 'Power feature · 4',
            title: 'Full theming via design tokens',
            description:
                '27 OKLch tokens, custom fonts, dark mode, complete theme overrides. No CSS hacking, no paid tier — your brand becomes the editor’s default.',
            features: [
                '27 OKLch design tokens covering every surface',
                'Light + dark theme overrides via the same theme.dark key',
                'Custom fonts via --tpl-font-sans and --tpl-font-mono',
                'Radius, shadows, spacing — every surface tokenized',
                'uiTheme: auto, light, or dark with system preference detection',
                'Dark mode first-class with auto-detect or manual toggle',
                'Tailwind 4 with `tpl:` prefix — no preflight, no style leaks',
            ],
        },
        defaults: {
            eyebrow: 'Power feature · 5',
            title: 'Template & block defaults',
            description:
                'Define your brand once. New templates and new blocks pick up your defaults automatically — colors, fonts, padding, layout. Consistent without copy-paste.',
            features: [
                'Set brand defaults once at init() time',
                'Per-block-type defaults: button, divider, spacer, image, social',
                'Template-level defaults: width, background, font family',
                'New templates inherit colors, fonts, padding, layout',
                'New blocks pick up the same defaults automatically',
                'Mix and match presets — corporate, playful, minimal',
                'Override per-template via the templateDefaults field',
            ],
        },
        supporting: {
            eyebrow: 'And the table-stakes',
            headline: 'Everything else you expect',
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
                description: 'Templates are portable JSON. Output is MJML — render in the browser or on your server, send through any provider. No vendor render API.',
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
            eyebrow: 'Easy migration',
            title: 'Switch from BeeFree in minutes',
            description:
                'Already using BeeFree? Our free migration tools import your existing templates and configurations. No manual recreation needed.',
            features: [
                'Import BeeFree JSON templates directly',
                'Automatic block mapping and conversion',
                'Preserve styles, layouts, and merge tags',
                'Free and open-source migration tools',
            ],
        },
    },
    faq: {
        meta: {
            title: 'FAQ — Templatical',
            description:
                'Answers about licensing, commercial use, framework support, BeeFree migration, and the Cloud tier.',
        },
        hero: {
            eyebrow: 'FAQ',
            headline: 'Frequently asked questions',
            subheadline:
                'Licensing, commercial use, framework support, and how Templatical compares to other email editors.',
        },
        headline: 'Frequently asked questions',
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
                answer: 'Three of the six packages are pure MIT today: types, renderer, and the BeeFree importer. The editor, core, and media-library packages are FSL-1.1-MIT. The split means anything you\'d build into a backend or codegen pipeline is fully permissive from day one.',
            },
            branding: {
                question: 'Do I need to display "Powered by Templatical"?',
                answer: 'No. The editor renders a small footer credit by default, but it\'s opt-out — pass branding: false to init() to hide it. There is no forced header logo or other attribution surface in the editor UI.',
            },
            beefree: {
                question: 'How does it compare to BeeFree?',
                answer: 'Templatical offers similar drag-and-drop editing capabilities with full source code access. There are no usage-based pricing surprises, and your template data never leaves your infrastructure. Plus, we offer free migration tools to import your existing BeeFree templates.',
            },
            frameworks: {
                question: 'What frameworks are supported?',
                answer: 'Templatical works with any framework. While built with Vue internally, it provides a framework-agnostic JavaScript API via npm or a standalone script tag. Use it with React, Angular, Svelte, or plain HTML.',
            },
            migrate: {
                question: 'How do I migrate from another editor?',
                answer: 'We provide free, MIT-licensed migration tools for BeeFree, Unlayer, and MJML. They import your existing templates directly and handle block mapping, style preservation, and merge tag conversion automatically. See the migration guides in the docs for each source format.',
            },
            paid: {
                question: 'Is there a paid version, and is it required?',
                answer: 'The OSS SDK is fully standalone — no backend required, and it remains free. Templatical Cloud is an optional managed tier that adds AI rewrite, real-time collaboration, comments, snapshots, saved modules, API access, and multi-tenancy. The Cloud feature code is also open under FSL-1.1-MIT, so you can self-host it instead of using the managed service.',
            },
        },
    },
};
