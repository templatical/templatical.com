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
                'Embed an open-source drag-and-drop email editor in your app — MJML export, merge tags, custom blocks, full theming, and more.',
        },
        hero: {
            badge: 'Now open source',
            badgeCta: 'View on GitHub',
            headline: 'An open-source drag-and-drop email editor SDK.',
            subheadline:
                'Custom blocks, full theming, advanced merge tags, and display conditions — all built into the open-source SDK. Drop into any app with one init() call.',
            ctaPrimary: 'Open playground',
            ctaSecondary: 'Read the docs',
            badges: [
                'TypeScript-first',
                'Built on MJML',
                'FSL-1.1-MIT (auto-MIT)',
                'Framework-neutral',
                'Render anywhere',
            ],
        },
        trustedBy: {
            eyebrow: 'Trusted by developers',
            headline: 'Used by teams building better email experiences',
        },
        features: {
            eyebrow: 'Power features',
            headline: 'Power features, built into the open-source SDK.',
            subheadline:
                'The features developers reach for first — custom blocks, merge tags, display conditions, theming, and defaults — all included in the SDK.',
            supportingEyebrow: 'And the table-stakes',
            supportingHeadline: 'Everything else you expect',
        },
        bentoItems: {
            customBlocks: {
                title: 'Custom blocks with API-backed data',
                description:
                    'Register your own block types — static templates or live data fetched from your API at preview time. Built into the open-source SDK.',
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
                    '27 OKLch tokens, custom fonts, dark mode, complete theme overrides. No CSS hacking — your brand becomes the editor’s default.',
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
                    'Templates are portable JSON. Output is MJML — render in the browser or on your server, send through any provider. No hosted render service required.',
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
                        'Full theming via design tokens, dark mode included',
                        'White-label by default — your UI, your brand',
                        'MJML output — render in browser, on your server, anywhere',
                    ],
                    cloud: [
                        'AI rewrite, AI chat, MCP integration',
                        'Real-time collaboration with block-level locking',
                        'Snapshots and version history',
                        'Multi-tenancy and API access',
                    ],
                },
            },
            note: 'Open source. Self-hosted. No paywalls on core features.',
        },
        cta: {
            headline: 'Start building email templates today',
            subheadline:
                'Open source, free forever. Get started with the docs, star the repo, or sponsor development.',
            ctaPrimary: 'Get Started',
            ctaSecondary: 'View on GitHub',
            ctaTertiary: 'Sponsor',
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
                    question: 'How is this different from <a href="https://mjml.io" target="_blank" rel="noopener" class="font-medium text-primary underline">MJML</a> or component-based email libraries?',
                    answer:
                        'MJML is a markup language; component libraries give developers a way to write emails. Templatical is the editor end-users actually use — drag-and-drop, merge tags, display conditions, theming — and it outputs MJML, which you can render with any MJML toolchain. You bring the editor; the rendering stack underneath is still standard.',
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
                'One npm install. One init() call. JSON in, MJML out — render anywhere, render free.',
            installLabel: 'Install',
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
                'Custom blocks, pluggable merge tags, display conditions, full theming, template defaults — open-source. Plus framework integration, MJML output, and the Cloud tier in development.',
        },
        hero: {
            eyebrow: 'Power features',
            headline: 'Power features, built into the open-source SDK.',
            subheadline:
                'Five power features plus a clean set of table-stakes — all included in the SDK, with portable JSON in and MJML out.',
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
                'Register your own block types — static templates or live data fetched from your API at preview time. Built into the open-source SDK.',
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
                'Licensing, commercial use, framework support, migration paths, and the Cloud tier.',
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
                answer: 'No, paid is not required. The open-source SDK is fully standalone — every editor feature (custom blocks, merge tags, display conditions, theming, MJML output) is included and free to self-host. Templatical Cloud is a separate, optional managed subscription that adds infrastructure-dependent capabilities — real-time collaboration, AI rewrite and chat, snapshots, comments, hosted media, multi-tenancy, API access. Those rely on backend services we run, so they ship as a paid managed tier rather than self-hostable code.',
            },
        },
    },
};
