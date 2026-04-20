export default {
    a11y: {
        skipToContent: 'Skip to content',
        switchToLight: 'Switch to light mode',
        switchToDark: 'Switch to dark mode',
        switchToLanguage: 'Switch language to {language}',
        mobileMenu: 'Navigation menu',
        terminal: 'terminal',
    },
    nav: {
        features: 'Features',
        community: 'Community',
        docs: 'Docs',
        playground: 'Playground',
        getStarted: 'Get Started',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
    },
    footer: {
        product: 'Product',
        resources: 'Resources',
        legal: 'Legal',
        features: 'Features',
        community: 'Community',
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
            badgeCta: 'Star us on GitHub',
            headline: 'The open-source email editor for your app',
            subheadline:
                'A drop-in drag-and-drop email editor SDK. Build, customize, and export production-ready email templates. The open-source alternative to BeeFree.',
            ctaPrimary: 'Try the Playground',
            ctaSecondary: 'Read the Docs',
        },
        trustedBy: {
            eyebrow: 'Trusted by developers',
            headline: 'Used by teams building better email experiences',
        },
        features: {
            eyebrow: 'Everything you need',
            headline: 'A complete email editor SDK',
            subheadline:
                'Everything you need to embed a professional email editor in your application — no vendor lock-in, no per-seat pricing.',
        },
        bentoItems: {
            editor: {
                title: 'Drag-and-Drop Editor',
                description:
                    '13 block types including text, images, buttons, and multi-column sections with 5 layout options. Your users build emails without touching code.',
            },
            export: {
                title: 'MJML Export',
                description:
                    'Export templates as MJML — the industry standard for responsive email markup. Convert to HTML on your server with any MJML library.',
            },
            mergeTags: {
                title: 'Merge Tags',
                description:
                    '5 syntax presets out of the box: Liquid, Handlebars, Mailchimp, AMPscript, and Django. Or define your own custom syntax.',
            },
            customBlocks: {
                title: 'Custom Blocks',
                description:
                    'Define your own block types with custom fields (text, image, color, select, repeatable) and HTML templates. Fetch field data from your API.',
            },
            theming: {
                title: 'Theming & Dark Mode',
                description:
                    '27 semantic color tokens to match your brand. Built-in dark mode with auto-detection. Full i18n support with English and German.',
            },
            displayConditions: {
                title: 'Display Conditions',
                description:
                    'Conditional content blocks that show or hide based on rules. Wrap blocks with custom before/after code for dynamic email personalization.',
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
            eyebrow: 'Why Templatical?',
            headline: 'The open-source alternative to BeeFree',
            subheadline:
                'Already using BeeFree? Switch to Templatical and own your email editor. No vendor lock-in, no usage caps, no surprises.',
            migrationNote:
                'Already on BeeFree? Migrate in minutes with our free import tools.',
            featureColumn: 'Feature',
            rows: {
                openSource: 'Open Source',
                yourData: 'Your Data, Your Servers',
                pricing: 'Pricing',
                dragAndDrop: 'Drag-and-Drop Editor',
                customBlocks: 'Custom Blocks',
                mjmlSupport: 'MJML Support',
                mergeTags: 'Merge Tags',
                displayConditions: 'Display Conditions',
                darkMode: 'Dark Mode',
                undoRedo: 'Undo / Redo',
                responsivePreview: 'Responsive Preview',
                migrationTools: 'Free Migration Tools',
                vendorLockIn: 'No Vendor Lock-In',
                landingPageBuilder: 'Landing Page Builder',
                communityDriven: 'Community Driven',
            },
            templaticalValues: {
                pricing: 'Free & open source',
            },
            beefreeValues: {
                pricing: 'Paid per usage',
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
                'Open source, free forever. Get started with the docs or explore the code on GitHub.',
            ctaPrimary: 'Get Started',
            ctaSecondary: 'View on GitHub',
        },
    },
    features: {
        meta: {
            title: 'Features — Templatical',
            description:
                'Drag-and-drop editor, MJML export, merge tags, custom blocks, display conditions, theming, dark mode, and BeeFree import. Everything in the open-source SDK.',
        },
        hero: {
            eyebrow: 'Features',
            headline: 'Everything you need to build emails',
            subheadline:
                'A fully-featured email editor SDK that your developers will love and your users will find intuitive.',
        },
        editor: {
            eyebrow: 'Visual Editor',
            title: 'Drag-and-drop email building',
            description:
                'An intuitive block-based editor that lets your users create beautiful, responsive emails without any coding knowledge.',
            features: [
                'Block-based editing with drag-and-drop',
                'Responsive desktop and mobile preview',
                'Undo/redo with full history',
                '13 block types including multi-column sections',
            ],
        },
        dx: {
            eyebrow: 'Developer Experience',
            title: 'Built for developers, by developers',
            description:
                'First-class TypeScript support, comprehensive events API, and deep customization options. Integrate in minutes, customize for months.',
            features: [
                'Full TypeScript support with detailed type definitions',
                'Rich events API for editor lifecycle and user actions',
                'Framework-agnostic — use via npm or a script tag in any app',
                'IIFE and ES module builds for flexible integration',
            ],
        },
        output: {
            eyebrow: 'Output & Export',
            title: 'MJML-powered email output',
            description:
                'Export templates as MJML — the industry standard for responsive email markup. Convert to HTML server-side with the included renderer package.',
            features: [
                'MJML export for reliable cross-client rendering',
                'Server-side HTML conversion via @templatical/renderer',
                'Automatic responsive layouts built into every template',
                'Clean, optimized output with no unnecessary markup',
            ],
        },
        extensibility: {
            eyebrow: 'Extensibility',
            title: 'Make it yours',
            description:
                'Extend the editor with custom blocks, dynamic merge tags, pluggable media handling, and display conditions.',
            features: [
                'Custom block types with your own UI',
                'Configurable merge tags for dynamic content',
                'Pluggable media integration via onRequestMedia callback',
                'Display conditions for conditional email content',
            ],
        },
        moreFeatures: {
            eyebrow: 'And more',
            headline: 'Additional capabilities',
            subheadline:
                'Every feature you need to ship a production email editor.',
        },
        moreItems: {
            themeCustomization: {
                title: 'Theme Customization',
                description: '27 semantic color tokens to style every surface. Match the editor to your product\'s look and feel.',
            },
            darkMode: {
                title: 'Dark Mode',
                description: 'Built-in dark mode with automatic system preference detection or manual toggle.',
            },
            i18n: {
                title: 'Internationalization',
                description: 'Multi-language editor UI with built-in translations. Load custom translations for any language.',
            },
            undoRedo: {
                title: 'Undo / Redo',
                description: 'Full history stack with up to 50 snapshots. Debounced to group rapid changes.',
            },
            responsivePreview: {
                title: 'Responsive Preview',
                description: 'Toggle between desktop, tablet, and mobile viewports to see how emails render on every device.',
            },
            beefreeImport: {
                title: 'BeeFree Import',
                description: 'Import BeeFree JSON templates directly. Automatic block mapping with a detailed conversion report.',
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
        faq: {
            headline: 'Frequently asked questions',
            items: {
                free: {
                    question: 'Is Templatical really free?',
                    answer: 'Yes. The editor SDK is licensed under FSL-1.1-MIT (Functional Source License) — free to use in any project with no usage caps or per-seat fees. The license converts to MIT after two years. Supporting packages like the renderer and BeeFree importer are MIT-licensed.',
                },
                commercial: {
                    question: 'Can I use it in commercial products?',
                    answer: 'Yes. The FSL-1.1-MIT license allows commercial use. You can embed Templatical in your SaaS product for your customers to build email templates.',
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
                    question: 'How do I migrate from BeeFree?',
                    answer: 'We provide free, MIT-licensed migration tools that import your BeeFree JSON templates directly. The tools handle block mapping, style preservation, and merge tag conversion automatically.',
                },
                paid: {
                    question: 'Is there a paid version?',
                    answer: 'Templatical Cloud offers team collaboration, AI features, API access, and multi-tenancy for teams that want a managed solution. The open-source SDK remains free.',
                },
            },
        },
    },
    community: {
        meta: {
            title: 'Community — Templatical',
            description:
                'Join the Templatical community. Contribute on GitHub and help shape the future of open-source email tooling.',
        },
        hero: {
            eyebrow: 'Community',
            headline: 'Join the Templatical community',
            subheadline:
                'Connect with other developers, contribute to the project, and help shape the future of open-source email tooling.',
        },
        github: {
            title: 'GitHub',
            description:
                'Star the repo, report issues, submit pull requests, and explore the source code. All development happens in the open.',
            cta: 'View on GitHub',
        },
        contributing: {
            eyebrow: 'Open source',
            headline: 'Contribute to Templatical',
            subheadline:
                'Templatical is built by the community. Whether you\'re fixing a typo, adding a feature, or improving docs — every contribution matters.',
            cta: 'Read the Contributing Guide',
        },
    },
};
