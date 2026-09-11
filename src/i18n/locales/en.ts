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
        changelog: 'Changelog',
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
        user: {
            you: 'You',
        },
        demo: {
            templateName: 'Welcome email',
            eyebrow: 'Wired to a backend',
            description:
                'Some of what you see here — saving, version history, comments, saved blocks and test sends — runs on a backend you implement. This demo uses your browser’s session storage, so nothing leaves the page.',
            docsLink: 'How the providers work',
            reset: 'Reset demo',
            resetting: 'Resetting…',
        },
        mjml: {
            show: 'Show the MJML',
            hide: 'Hide the MJML',
            heading: 'Rendered output',
            note:
                'Rendering to MJML needs no provider at all — it runs in the browser. A render provider is what you add for HTML output, or to move the conversion to your backend.',
            error: 'Could not render the template just now.',
        },
        providerError: {
            dismiss: 'Dismiss',
        },
        seed: {
            reviewerName: 'Sam Okafor',
            threadBody:
                'This button is doing the work of the whole email — can it be more direct?',
            replyBody: 'Agreed. Something imperative, and give it the brand colour.',
        },
    },
    footer: {
        groups: {
            product: 'Product',
            resources: 'Resources',
            compare: 'Compare',
        },
        features: 'Features',
        faq: 'FAQ',
        changelog: 'Changelog',
        comparisonBeefree: 'vs Beefree SDK',
        comparisonUnlayer: 'vs Unlayer',
        comparisonStripo: 'vs Stripo Plugin',
        comparisonTopol: 'vs Topol Plugin',
        comparisonChamaileon: 'vs Chamaileon SDK',
        comparisonGrapesjs: 'vs GrapesJS',
        comparison: 'vs Easy Email Pro',
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
            frameworkNote: 'Works in React, Svelte, Angular, Vue, and vanilla JS — one init() call, zero runtime dependencies.',
            badges: [
                'TypeScript-first',
                'Built on MJML',
                'FSL-1.1-MIT (auto-MIT)',
                'Framework-neutral',
                'Shadow DOM',
                'No license key',
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
            compareLink: 'Compared with Easy Email Pro',
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
                        'A saved-block library — pick, name, preview, insert at position',
                        'A test-send dialog — recipient picker, preview, sending and error states',
                        'Preview resolution — real data in place of merge tags, without touching stored content',
                        'Dark-mode preview parity with sent email',
                        'Theme tokens for brand consistency',
                        'MJML output you can render anywhere',
                        'Email-client compatibility — Outlook 2007–365, Gmail clipping, Apple Mail',
                        'Accessibility — keyboard nav, ARIA, screen readers',
                        'Style isolation — host CSS resets and design-system globals bleed into the editor',
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
                        'Reusable saved blocks gated to paid tiers — even self-hosted',
                        'Per-seat or per-end-user pricing scales with you',
                        'Closed source — cannot audit, fork, or extend',
                        'Output coupled to the vendor’s render API',
                        'License key validated against the vendor’s servers — features enabled remotely by plan',
                        'No CSS isolation — host styles can cascade into the embedded editor',
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
                        'Saved blocks — users save block groups and reuse them, backed by your storage',
                        'Saving and loading against your own storage — autosave, save status, Cmd/Ctrl+S',
                        'Version history — browse, preview and restore, backed by your storage',
                        'Threaded review comments anchored to blocks, on your storage and identities',
                        'Test sends from the editor, delivered by your own ESP and your domain',
                        'Previews resolved by your backend — real data, logic branches evaluated',
                        'Full theming via design tokens, dark mode included',
                        'White-label by default — your UI, your brand',
                        'MJML output — render in browser, on your server, anywhere',
                        'Built-in WCAG accessibility linting with auto-fixes',
                        'Style-isolated — Shadow DOM mount keeps host CSS out',
                        'No license key, no activation call — nothing we can switch off remotely',
                    ],
                    cloud: [
                        'AI rewrite, AI chat, MCP integration',
                        'Real-time collaboration with block-level locking',
                        'Multi-tenancy and API access',
                    ],
                },
            },
        },
        independence: {
            eyebrow: 'Runtime independence',
            headline: 'Nothing to activate. Nothing to revoke.',
            subheadline:
                'No license key, no client ID, no activation call. The open-source SDK never asks a server which features you are allowed to use — install it once and it keeps working, unchanged, including if this project disappears tomorrow.',
            claims: [
                'No license key or client ID anywhere in the API',
                'No entitlement check — features are never enabled or revoked remotely',
                'No telemetry, no analytics, no usage reporting',
                'Your templates stay in your app until you send them to your own backend',
            ],
        },
        aiSkill: {
            eyebrow: 'New · Open source',
            headline: 'Design an email by describing it',
            subheadline:
                'Bring Templatical’s open-source skill to Claude Code, Cursor, or any AI coding agent. Describe the campaign you want — it builds a complete email you preview and hand-edit in the real editor, then export as send-ready MJML or HTML for any provider. No backend, no API key, nothing sent to us.',
            examplePrompt:
                '“A product-launch email for an outdoors brand — hero image, a short intro, and a Shop now button in forest green.”',
            commandCaption: 'Add it to Claude Code',
            copyLabel: 'Copy',
            copiedLabel: 'Copied',
            altInstall:
                'Or copy the skill folder into any agent — Cursor, Claude Desktop, and more.',
            ctaPrimary: 'Read the skill guide',
            ctaSecondary: 'View the skill on GitHub',
            cloudNote:
                'Prefer managed AI? Templatical Cloud adds in-editor AI chat and a hosted MCP server.',
            cloudNoteLink: 'Explore Cloud',
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
                'Open-source drag-and-drop email editor SDK. Custom blocks, full theming, MJML output. Self-host free. FSL-1.1-MIT, becoming MIT two years after each release.',
        },
        hero: {
            eyebrow: 'Open-source SDK',
            headline: 'The features other editors gate. In your repo. Open source.',
            subheadline:
                'The power features, and a clean set of essentials — all included, all open. Portable JSON in, MJML out, no usage tier in the way.',
            pricingPill: 'Open source · FSL-1.1-MIT · Free to self-host',
        },
        examplesLabel: '{title} examples',
        variants: {
            static: 'Static',
            apiBacked: 'API-backed',
            predefined: 'Predefined',
            customPicker: 'Custom picker',
            browserLocal: 'Browser-local',
            tokens: 'Theme tokens',
            brandDefaults: 'Brand defaults',
            fromEditor: 'From the editor',
            headless: 'Headless',
            perRecipient: 'Per recipient',
            audiencePicker: 'Audience picker',
            yourEndpoint: 'Your endpoint',
            restrictedRecipients: 'Restricted recipients',
            yourApi: 'Your API',
            readOnly: 'Read-only',
            composedRestore: 'No atomic restore',
        },
        backend: {
            eyebrow: 'Connect your backend',
            headline: 'Six keys. The same shape. Absent until you pass one.',
            subheadline:
                'Saving, version history, comments, saved blocks, test sends and rendering are each one config key holding methods you implement. Omit a key and the feature is gone — not disabled, and its UI is never downloaded. Pass false instead of a method and the editor hides that control rather than greying it out.',
        },
        templates: {
            eyebrow: 'Persistence',
            title: 'Saving and loading, against your own storage',
            description:
                'Give the editor somewhere to save and it grows the chrome that goes with it: an inline-editable name, a save button, a status indicator, Cmd/Ctrl+S, optional autosave, and a warning before the tab closes with unsaved work.',
            outcome: 'The whole save lifecycle, with your API as the only storage.',
            features: [
                'Three methods are the entire integration — load, create, save',
                'Debounced autosave that pauses during undo, so a redo never races a write',
                'The template id is yours — a database key, a slug, a document id',
                'That id is the join key: version history and comments attach to it',
                'onSaved carries the trigger — manual, autosave, rename, restore or api',
                'A failed save leaves editor state untouched; nothing is marked saved that wasn’t',
                'Omit the key and persist from onChange yourself instead',
            ],
            docsLabel: 'Saving & loading reference',
        },
        versionHistory: {
            eyebrow: 'History',
            title: 'Browse, preview and restore past versions',
            description:
                'A history control in the header steps back through past states, previews one on the canvas with its own banner, and restores it behind a confirmation. Four methods against your own storage.',
            outcome: 'Undo that outlives the session, without building the UI for it.',
            features: [
                'Four-method provider — list, get, create, restore',
                'Content on a listed version is a per-entry hint: hydrate the recent ones, make the rest a round-trip',
                'No atomic restore endpoint? Compose it from get plus save',
                'The confirmation before a restore discards unsaved work is the editor’s job, not yours',
                'Automatic versions belong to whoever implements save — the side that knows what storage costs',
                'Pass create: false and the control disappears rather than greying out',
            ],
            docsLabel: 'Version-history reference',
        },
        comments: {
            eyebrow: 'Review',
            title: 'Threaded review, anchored to blocks',
            description:
                'A review panel with threads and replies, a count badge on every commented block, and resolve/reopen. Five methods, plus a top-level user — because without an author the feature reports itself unavailable rather than writing an anonymous comment.',
            outcome: 'Stakeholder review inside the editor, on your storage and your identities.',
            features: [
                'Five-method provider — list, create, update, delete, setResolved',
                'user.id decides what a session may edit or delete',
                'setResolved takes the target state, not a toggle, so two clicks can’t invert it',
                'Comments anchor to a block, or to the template as a whole',
                'An optional subscribe carries a realtime transport if you have one — and everything works without it',
                'Pass create: false for a read-only review pass',
            ],
            docsLabel: 'Comments reference',
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
                'Optional sample values render in previews instead of the label',
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
                'Wrappers are opaque strings — any syntax your ESP evaluates at send time',
            ],
            docsLabel: 'Conditions guide',
        },
        theming: {
            eyebrow: 'Branding',
            title: 'Theming and brand defaults',
            description:
                '27 OKLch tokens, custom fonts, dark mode, complete theme overrides. Every surface tokenized — and the same init() call sets the defaults every new template and block starts from.',
            outcome: 'The editor looks like your product, and every new block starts on-brand.',
            features: [
                '27 OKLch design tokens covering every surface',
                'Light + dark theme overrides via the same theme.dark key',
                'Custom fonts via --tpl-font-sans and --tpl-font-mono',
                'Tailwind 4 with `tpl:` prefix — no preflight, no style leaks',
                'Per-block-type defaults: button, divider, spacer, image, social',
                'Template defaults: width, background, font family',
            ],
            docsLabel: 'Theming & defaults reference',
        },
        cssIsolation: {
            eyebrow: 'Integration',
            title: 'Drop into any page — host CSS can\'t interfere',
            description:
                'The editor mounts inside a Shadow DOM by default. Your app\'s stylesheets, design system preflight, and CMS template resets stop at the boundary — they never cascade into the toolbar, sidebar, or canvas.',
            outcome: 'Embed in any framework, CMS, or legacy app — no resets, no !important wars, no surprises after a design-system bump.',
            features: [
                'Shadow DOM mount by default — no host CSS leaks in',
                'Editor styles can\'t leak out either (tpl: Tailwind prefix in light-DOM mode)',
                'Project your brand across the shadow boundary via --tpl-user-* CSS variables',
                'Opt out with shadowDom: false for light-DOM mount when you need it',
                'Multi-instance safe — each editor gets its own shadow root',
            ],
            docsLabel: 'Style-isolation guide',
        },
        accessibility: {
            eyebrow: 'Quality',
            title: 'Built-in template linting',
            description:
                '30 deterministic rules run while authoring — surfaced in a dedicated sidebar tab and as inline badges on the canvas. Accessibility, structure, and links, with configurable severity and no AI guesswork.',
            outcome: 'Catch alt text, contrast, broken links, and malformed structure before send — not after.',
            features: [
                'Live checks: errors, warnings, and info — grouped in the sidebar',
                'Inline canvas badges with one-click jump and auto-fix where safe',
                '20 accessibility rules: alt text, contrast, heading order, touch targets',
                '5 link rules: javascript: URLs, malformed mailto and tel, staging hosts',
                '5 structure rules: duplicate ids, empty sections, column mismatches',
                'Per-rule severity overrides and configurable thresholds',
                'Locale-aware vague-text dictionaries',
                'Same engine runs standalone — validate templates in CI, on save, or in pre-send pipelines',
            ],
            docsLabel: 'Linting reference',
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
        savedBlocks: {
            eyebrow: 'Reuse',
            title: 'Saved blocks, in your storage',
            description:
                'Users pick a group of blocks, name it, and drop it into any other template. The editor ships the whole experience — pick session, searchable library, live preview, insert at position. You implement four methods against your own API.',
            outcome: 'A block library your users fill themselves, on your backend.',
            features: [
                'Four-method provider — list, create, update, delete',
                'Pass false instead of a function and the editor hides the control',
                'Per-entry flags lock individual entries as read-only',
                'Free-text categories, derived from whatever the entries carry',
                'Search and category filters run in the editor, not your API',
                'Bundled browser-local provider for demos — one line, no backend',
            ],
            docsLabel: 'Saved-blocks reference',
        },
        agentSkill: {
            eyebrow: 'AI',
            title: 'Describe the email, get the template',
            description:
                'An open-source Agent Skill teaches Claude Code, Cursor, or any AI coding agent to build Templatical templates from a prompt — validated against the block schema before you ever see them. No backend, no API key, nothing sent to us.',
            outcome: 'A first draft in one sentence, then edit it like any other template.',
            features: [
                'Runs on the agent you already use — the model is the inference',
                'Every generated template is schema-validated and quality-linted',
                'Live mode previews and hand-edits in the real editor, then reconciles',
                'Imports existing Unlayer, BeeFree, or HTML templates',
                'Zero install — dependencies are vendored, so a bare copy works offline',
            ],
            docsLabel: 'Agent Skill guide',
            prompts: [
                {
                    label: 'From scratch',
                    text: '“A product-launch email for our new Pro tier — hero, three feature callouts, and a button to the changelog.”',
                },
                {
                    label: 'Migrate',
                    text: '“Import this Unlayer export and rebuild the image-only header as real text.”',
                },
                {
                    label: 'Refine live',
                    text: '“Show it live. The CTA is too quiet — make it the accent colour and move it above the fold.”',
                },
                {
                    label: 'Polish',
                    text: '“Fix the accessibility warnings and shorten the preheader to 90 characters.”',
                },
            ],
        },
        logicTags: {
            eyebrow: 'Dynamic content',
            title: 'Loops and conditionals inside the copy',
            description:
                'Register your template language’s control flow — Liquid, Handlebars, whatever you already send — and authors insert it from a picker. Tags render as styled pills in the rich text and pass through to the output untouched.',
            outcome: 'Authors write conditional copy without learning your syntax.',
            features: [
                'Wraps a phrase mid-sentence, where display conditions wrap a whole block',
                'Standalone tags and open/close pairs, grouped in the picker',
                'A pair wraps the current selection — no manual closing tag',
                'Also available in inputs: button text, URLs, alt text',
                'Passes through to the rendered MJML unchanged',
                'Or hand off to your own picker with a single onRequest hook',
            ],
            docsLabel: 'Logic tags reference',
        },
        previewResolution: {
            eyebrow: 'Preview',
            title: 'Previews with real data, resolved by your backend',
            description:
                'The editor recognises merge tags and logic tags — it never evaluates them. Hand it a resolvePreview callback and whatever already renders your sends renders your previews too, with branches taken and data filled in.',
            outcome: 'A preview that agrees with the delivered email by construction, not by approximation.',
            features: [
                'Your engine, your data, your template language — nothing to reimplement in the browser',
                'Evaluates logic that sample values structurally cannot — conditional branches collapse to the one that applies',
                'Resolves for the selected recipient in the test-email dialog',
                'Display-only — resolved content never reaches getContent(), export, or a send',
                'A resolver outage degrades to the unresolved template and says so, never a blank preview',
                'Never runs while editing — the canvas always shows the tag you inserted',
            ],
            docsLabel: 'Preview-rendering guide',
        },
        testEmail: {
            eyebrow: 'Delivery',
            title: 'Test sends through your own infrastructure',
            description:
                'A user mails themselves the template they are editing — and it leaves from your ESP, your domain, your reputation. The editor owns the trigger, the dialog, the preview, and the sending states. You implement one method.',
            outcome: 'A real inbox check before anything reaches a campaign, with no vendor in the path.',
            features: [
                'One send method is the entire integration',
                'Omit the key and the feature is absent — no button, none of its code downloaded',
                'The dialog previews exactly what is being sent, desktop or mobile',
                'Display conditions are honoured, so the preview never shows content the recipient won’t get',
                'Restrict the recipient list to reshape the field — free text, read-only, or a picker',
                'Throw with a message and it shows inline; the dialog stays open to retry',
            ],
            docsLabel: 'Test-email reference',
        },
        mjmlOutput: {
            eyebrow: 'Output',
            title: 'JSON in, MJML out',
            description:
                'Templates are portable JSON you store wherever you like. Output is MJML, rendered by a package you install — in the browser, on your server, in a queue worker. No hosted render service sits in the path.',
            outcome: 'Own the output. Send through any provider, for as long as you like.',
            features: [
                'MJML is an open standard with implementations in several languages',
                'Render in the browser, on your server, or in a background job',
                'Custom blocks resolve through a callback you supply',
                'Nothing calls home — no render API, no per-render pricing',
                'The renderer is MIT-licensed and installed separately',
                'No `render` key needed for `toMjml()` — add one for `toHtml()`, or to move the conversion to your backend',
            ],
            docsLabel: 'How rendering works',
        },
        programmaticTemplates: {
            eyebrow: 'Headless',
            title: 'Build templates without the editor',
            description:
                'Every block type has a factory function in the types package — MIT, no editor, no DOM. Compose a template in a script, seed a starter library, or generate one per customer from your own data.',
            outcome: 'Templates as data, produced by code as easily as by hand.',
            features: [
                'A factory per block type, each with sensible defaults',
                'Factories generate the ids, so content is valid by construction',
                'Runs anywhere — build script, server, queue worker, test',
                'Produces the same JSON the editor reads and writes',
                'MIT-licensed with no runtime dependencies',
            ],
            docsLabel: 'Programmatic templates guide',
        },
        supporting: {
            eyebrow: 'The essentials',
            headline: 'Everything else you expect — done right.',
            subheadline:
                'Drop-in mount, framework-agnostic, every locale you need. Plus the polish — dark mode, undo/redo, responsive preview.',
        },
        supportingItems: {
            blocks: {
                title: 'Blocks out of the box',
                description: 'Twelve block types ready to drag in — title, paragraph, image, button, section, divider, spacer, social icons, menu, table, video, and raw HTML — plus any custom types you register.',
            },
            framework: {
                title: 'Drop-in framework integration',
                description: 'One init() call to mount, one to unmount. First-class examples for React, Vue, Svelte, Angular, and vanilla JS.',
            },
            darkMode: {
                title: 'Dark mode',
                description: 'First-class dark mode with auto-detect or manual toggle. Both themes are designed, not an afterthought.',
            },
            i18n: {
                title: 'Internationalization',
                description: 'Seven locales built in — English, German, Portuguese (BR), Spanish, Catalan, French, and Dutch — across the editor and the media library. Drop in a file for any other language.',
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
    alternatives: {
        topol: {
            meta: {
                title: 'An open-source Topol Plugin alternative — Templatical',
                description:
                    'A sourced side-by-side comparison: per-user pricing, domain-bound API keys, who runs the editor, and what the output is tied to.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'An open-source alternative to Topol Plugin',
                subheadline:
                    'Both put a drag-and-drop email editor inside your product. Topol is the most generous of the hosted builders on what it includes per plan — the differences that remain are who runs the editor, whether your bill grows with your users, and who owns the output. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs Topol Plugin',
                colFeature: 'Feature',
                colThem: 'Topol Plugin',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    pricing: {
                        label: 'Pricing',
                        us: 'No fee, on any tier',
                        them: '14-day trial, then $70, $140 or $300 per month',
                    },
                    users: {
                        label: 'End-user limits',
                        us: 'None. The editor does not know or count your users.',
                        them: '50, 100 or 500 users included; beyond that $1.60, $1.40 or $0.70 per extra user per month',
                    },
                    domains: {
                        label: 'Domain binding',
                        us: 'None. Run it anywhere.',
                        them: 'The API key is tied to given domains and will not work on another',
                    },
                    hosting: {
                        label: 'Who runs the editor',
                        us: 'You. The editor ships in your bundle and runs in your page',
                        them: 'Topol. The npm package injects their loader script at runtime',
                    },
                    activation: {
                        label: 'Runtime activation',
                        us: 'None. No API key, no domain binding, no call to us.',
                        them: 'An API key, bound to your registered domains',
                    },
                    whiteLabel: {
                        label: 'White-labelling',
                        us: 'Default. No branding to remove.',
                        them: 'Included on every plan',
                    },
                    customBlocks: {
                        label: 'Custom blocks',
                        us: 'Unlimited, defined in your own code',
                        them: 'Included on every plan',
                    },
                    storage: {
                        label: 'Image storage',
                        us: 'Yours. The editor calls your onRequestMedia hook.',
                        them: 'Unlimited, hosted by them; your own cloud storage on higher plans',
                    },
                    frameworks: {
                        label: 'Framework support',
                        us: 'One init() call — React, Vue, Svelte, Angular and vanilla JS',
                        them: 'Official React, Vue and Svelte packages',
                    },
                    source: {
                        label: 'Source access',
                        us: 'Full source in a public repository',
                        them: 'The loader package is Apache-2.0; the editor it loads is not published',
                    },
                    licence: {
                        label: 'Licence',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release',
                        them: 'Commercial subscription',
                    },
                    output: {
                        label: 'Output format',
                        us: 'MJML and JSON',
                        them: 'HTML and their own JSON. MJML is their internal renderer, not something you receive',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'The table is the detail; this is the decision. If a reason in the right column is a requirement for you, buy their product — it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose Topol Plugin if',
                us: {
                    cost: 'You do not want the editor billed per end user. Templatical does not meter them.',
                    domains: 'You run the editor on more than one domain, or on domains you cannot register in advance.',
                    ownership: 'You want the editor running in your own bundle rather than injected from a vendor loader at runtime.',
                    output: 'You want to own the artifact you export. Templatical hands you MJML, an open standard with an MIT implementation you can run yourself; Topol compiles through MJML internally but hands you HTML and its own JSON.',
                    source: 'You want the full source, and a licence that becomes MIT two years after each release.',
                },
                them: {
                    operated: 'You would rather someone else operated the editor, with hosting and uptime handled for you.',
                    storage: 'You want image storage bundled in. Topol hosts it for you; Templatical has none and expects you to supply it.',
                    comments: 'You want commenting on templates inside the editor with nothing to build. Topol includes it from the Business plan ($300/mo) up; Templatical ships comments as an open-source provider you implement against your own storage and identities — more setup than a plan feature you switch on.',
                    templates: 'You want a ready-made template library your users can start from on day one.',
                    support: 'You want a commercial vendor behind the editor, with email support during business hours, rather than an open-source project.',
                },
            },
            close: {
                headline: 'Try it before you weigh any of this',
                body: 'The playground runs the real editor with no signup. If it does not fit your product, none of the rest matters.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            footnote: {
                verified:
                    'Verified on 8 August 2026 against {\'@\'}topol.io/editor 0.3.0 as published on npm, and the plans listed at topol.io on that date. Pricing and features change — check their site for current terms.',
                notDocumented:
                    '“Not documented” means we found no mention of the capability in their public documentation or marketing on the verification date, not that it is impossible to build.',
                trademark:
                    'Topol is a trademark of its respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say Topol Plugin does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
            },
        },
        grapesjs: {
            meta: {
                title: 'Templatical vs GrapesJS — email editor or web builder framework',
                description:
                    'A sourced comparison of two open-source projects: a purpose-built email editor SDK against a general web builder framework with email plugins.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'Templatical and GrapesJS are both open source',
                subheadline:
                    'So this is not a comparison about licences or cost — both are free, both run in your own bundle, and both can output MJML. The real question is whether you want an email editor or a framework to build one on. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs GrapesJS',
                colFeature: 'Feature',
                colThem: 'GrapesJS',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    cost: {
                        label: 'Cost',
                        us: 'Free',
                        them: 'Free — the same',
                    },
                    licence: {
                        label: 'Licence',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release',
                        them: 'BSD-3-Clause — more permissive than ours today, with no restriction and no waiting period',
                    },
                    runs: {
                        label: 'Who runs the editor',
                        us: 'You, in your own bundle',
                        them: 'You, in your own bundle — the same',
                    },
                    source: {
                        label: 'Source access',
                        us: 'Full source in a public repository',
                        them: 'Full source in a public repository — the same',
                    },
                    builtFor: {
                        label: 'Built for',
                        us: 'Email, and nothing else',
                        them: 'General web building — pages, apps, any HTML document; newsletters are one of its advertised uses',
                    },
                    emailSupport: {
                        label: 'Email support',
                        us: 'Native. The block model is the email model.',
                        them: 'Through grapesjs-mjml — an official plugin from the GrapesJS org, covering 20 MJML components',
                    },
                    output: {
                        label: 'MJML output',
                        us: 'Built in, via the MIT renderer',
                        them: 'Available through the grapesjs-mjml plugin',
                    },
                    mergeTags: {
                        label: 'Merge tags',
                        us: 'Built in — picker, live labels, pluggable syntax',
                        them: 'Yours to build',
                    },
                    conditions: {
                        label: 'Display conditions',
                        us: 'Built in, with live preview',
                        them: 'Yours to build',
                    },
                    savedBlocks: {
                        label: 'Reusable saved blocks',
                        us: 'Built in, over a storage provider you supply',
                        them: 'The Block Manager is a developer-defined palette; end users saving their own groups is yours to build',
                    },
                    testSend: {
                        label: 'Test sending',
                        us: 'Built in, over a provider you supply',
                        them: 'Yours to build',
                    },
                    linting: {
                        label: 'Template quality linting',
                        us: '30 accessibility, structure and link rules, MIT',
                        them: 'Yours to build',
                    },
                    clientCompat: {
                        label: 'Email-client compatibility',
                        us: 'Carried by MJML — Outlook, Gmail clipping, Apple Mail',
                        them: 'The same, through grapesjs-mjml — it compiles with MJML too',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'Neither of these is the cheap option — they are both free. This is a question of what you want to spend engineering time on. If a reason in the right column is a requirement for you, use GrapesJS; it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose GrapesJS if',
                us: {
                    purpose: 'You are building an email editor specifically, and want the email-shaped features to already exist.',
                    features: 'You want merge tags, display conditions, saved blocks, test sending and accessibility linting without building each one.',
                    previews: 'You want email-shaped previews — mobile and desktop, dark mode, merge tags resolved to sample values — rather than a generic canvas preview.',
                    dropIn: 'You want a drop-in init() call rather than a canvas to assemble an editor around.',
                    defaults: 'You want email-sensible defaults out of the box rather than a blank framework to configure.',
                },
                them: {
                    scope: 'You need more than email — landing pages, app screens, any HTML document. Templatical does email and nothing else.',
                    freedom: 'You want layout freedom beyond what MJML allows — accepting that you then own email-client compatibility yourself, since the MJML plugin is what provides it.',
                    licence: 'You need a more permissive licence. BSD-3-Clause has no non-compete restriction and no two-year wait; ours does.',
                    control: 'You want to control the editor framework itself, not consume a finished product.',
                    reuse: 'You already run GrapesJS elsewhere and would rather have one editor across every surface.',
                },
            },
            close: {
                headline: 'On grapesjs-mjml? Bring your templates',
                body: 'If your GrapesJS setup already outputs MJML, that is the format Templatical works in natively — so an evaluation can start from your real designs.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            migration: {
                label: 'Read the MJML migration guide',
            },
            footnote: {
                verified:
                    'Verified on 8 August 2026 against grapesjs 0.23.4 and grapesjs-mjml 1.0.8 as published on npm. This page compares the open-source framework; GrapesJS also sells Studio SDK, a commercial embedded editor whose pricing is quote-only and therefore not compared here.',
                notDocumented:
                    '“Yours to build” means the capability is not provided out of the box, not that it is hard or unsupported — GrapesJS is a framework, and building on it is the point.',
                trademark:
                    'GrapesJS is a trademark of its respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say GrapesJS does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
            },
        },
        chamaileon: {
            meta: {
                title: 'An open-source Chamaileon SDK alternative — Templatical',
                description:
                    'A sourced side-by-side comparison: double metering on users and exports, an iframe-hosted editor, mandatory tokens, and what the output is tied to.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'An open-source alternative to Chamaileon SDK',
                subheadline:
                    'Both put a drag-and-drop email editor inside your product. Chamaileon runs its editor in an iframe it serves, meters both your users and your exports, and needs a token to start. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs Chamaileon SDK',
                colFeature: 'Feature',
                colThem: 'Chamaileon SDK',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    pricing: {
                        label: 'Pricing',
                        us: 'No fee, on any tier',
                        them: 'Free Starter, then $200 or $600 per month, plus Enterprise',
                    },
                    metering: {
                        label: 'What is metered',
                        us: 'Nothing. No counter on users, templates or exports.',
                        them: 'Two counters at once — monthly active users and generator calls',
                    },
                    users: {
                        label: 'Monthly active users',
                        us: 'Unlimited',
                        them: '10 on Starter, 200 on Standard, 1,000 on Scale',
                    },
                    exports: {
                        label: 'Export limits',
                        us: 'None. Render as often as you like.',
                        them: 'Generator calls: 100, 500 or 15,000 per month. Each HTML export counts as one, and they budget 2–3 per campaign for review and QA',
                    },
                    mount: {
                        label: 'How it mounts',
                        us: 'In your page, in a shadow root you control',
                        them: 'In an iframe they serve, after fetching config from their servers',
                    },
                    activation: {
                        label: 'Runtime activation',
                        us: 'None. No token, no config fetch, no call to us.',
                        them: 'An access token you mint, refreshed roughly every 24 hours',
                    },
                    whiteLabel: {
                        label: 'White-labelling',
                        us: 'Default. No branding to remove.',
                        them: 'Included on every plan',
                    },
                    headless: {
                        label: 'Headless rendering',
                        us: 'The MIT renderer runs anywhere, with no service and no limit',
                        them: 'Available via their API; each export counts against generator calls',
                    },
                    source: {
                        label: 'Source access',
                        us: 'Full source in a public repository',
                        them: 'The npm shim ships under their own terms; the editor it loads is not published',
                    },
                    licence: {
                        label: 'Licence',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release',
                        them: 'Commercial subscription',
                    },
                    output: {
                        label: 'Output format',
                        us: 'MJML and JSON',
                        them: 'HTML and their own JSON',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'The table is the detail; this is the decision. If a reason in the right column is a requirement for you, buy their product — it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose Chamaileon SDK if',
                us: {
                    metering: 'You do not want two meters running — one on how many people open the editor, another on how many times you export.',
                    mount: 'You want the editor in your own page and stylable with your own tokens, rather than inside an iframe served by someone else.',
                    ownership: 'You need the editor to start without a token and a config fetch from a third party.',
                    output: 'You want portable output. Templatical exports MJML, an open standard with an MIT implementation you can run yourself.',
                    source: 'You want the full source, and a licence that becomes MIT two years after each release.',
                },
                them: {
                    modular: 'You want to embed the pieces separately — editor, preview, gallery, variable editor — rather than one editor component.',
                    brand: 'You manage many brands and want a brand design system enforcing fonts, colours and logos across them.',
                    operated: 'You would rather someone else operated the editor, with hosting and uptime handled for you.',
                    gallery: 'You want an asset gallery shipped as part of the SDK. Chamaileon has one; Templatical expects you to supply the picker.',
                    support: 'You want a commercial vendor with a named technical contact on their Enterprise tier rather than an open-source project.',
                },
            },
            close: {
                headline: 'Try it before you weigh any of this',
                body: 'The playground runs the real editor with no signup. If it does not fit your product, none of the rest matters.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            footnote: {
                verified:
                    'Verified on 8 August 2026 against {\'@\'}chamaileon-sdk/plugins 1.1.5 as published on npm, and the plans listed at chamaileon.io on that date. Pricing and features change — check their site for current terms.',
                notDocumented:
                    '“Not documented” means we found no mention of the capability in their public documentation or marketing on the verification date, not that it is impossible to build.',
                trademark:
                    'Chamaileon is a trademark of its respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say Chamaileon SDK does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
            },
        },
        stripo: {
            meta: {
                title: 'An open-source Stripo Plugin alternative — Templatical',
                description:
                    'A sourced side-by-side comparison: how Stripo meters usage, what is gated to which plan, who runs the editor, and what the output is tied to.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'An open-source alternative to Stripo Plugin',
                subheadline:
                    'Both put a drag-and-drop email editor inside your product. They differ on who runs the editor, and on what your bill is counted against — Stripo meters the emails your users design. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs Stripo Plugin',
                colFeature: 'Feature',
                colThem: 'Stripo Plugin',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    pricing: {
                        label: 'Pricing',
                        us: 'No fee, on any tier',
                        them: 'Free, then $100 or $550 per month, plus Enterprise',
                    },
                    metering: {
                        label: 'What is metered',
                        us: 'Nothing. No counter on templates, users or exports.',
                        them: 'Unique emails designed per month: 100 free, 400 on Startup, 15,000 on Business',
                    },
                    overage: {
                        label: 'Going over',
                        us: 'Not applicable',
                        them: '$0.50 per extra unique email on Startup, $0.10 on Business',
                    },
                    branding: {
                        label: 'Branding removal',
                        us: 'Default. No branding to remove.',
                        them: 'From Startup ($100/mo) up; the free plan carries Stripo branding',
                    },
                    customBlocks: {
                        label: 'Custom blocks',
                        us: 'Unlimited, defined in your own code',
                        them: 'From Business ($550/mo) up',
                    },
                    storage: {
                        label: 'Image storage',
                        us: 'Yours. The editor calls your onRequestMedia hook.',
                        them: '30 GB free, 200 GB on Startup, unlimited from Business',
                    },
                    hosting: {
                        label: 'Who runs the editor',
                        us: 'You. The editor ships in your bundle and runs in your page',
                        them: 'Stripo. Server components run on their infrastructure; self-hosting is an Enterprise option',
                    },
                    source: {
                        label: 'Source access',
                        us: 'Full source in a public repository',
                        them: 'Not published',
                    },
                    licence: {
                        label: 'Licence',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release',
                        them: 'Commercial subscription',
                    },
                    support: {
                        label: 'Dedicated support',
                        us: 'Community, via GitHub',
                        them: 'Dedicated Slack channel on Enterprise',
                    },
                    output: {
                        label: 'Output format',
                        us: 'MJML and JSON',
                        them: 'HTML and CSS, exchanged with your platform',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'The table is the detail; this is the decision. If a reason in the right column is a requirement for you, buy their product — it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose Stripo Plugin if',
                us: {
                    metering: 'You do not want a monthly counter on how many emails your users are allowed to design.',
                    cost: 'You want custom blocks and unbranded output without those sitting behind separate paid tiers.',
                    ownership: 'You want the editor running in your own bundle without an Enterprise contract to get it there.',
                    output: 'You want portable output. Templatical exports MJML, an open standard with an MIT implementation you can run yourself.',
                    source: 'You want the full source, and a licence that becomes MIT two years after each release.',
                },
                them: {
                    templates: 'You want a large ready-made template library and premium designs your users can start from.',
                    operated: 'You would rather someone else operated the editor, with hosting and storage handled for you.',
                    modules: 'You want AMP and interactive modules maintained by a vendor rather than built in-house.',
                    tooling: 'You want built-in image editing and stock content bundled with the editor.',
                    support: 'You want a commercial vendor with a dedicated support channel rather than an open-source project.',
                },
            },
            close: {
                headline: 'Try it before you weigh any of this',
                body: 'The playground runs the real editor with no signup. If it does not fit your product, none of the rest matters.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            footnote: {
                verified:
                    'Verified on 8 August 2026 against the plans published at stripo.email and the plan comparison in their support centre. Pricing and features change — check their site for current terms.',
                notDocumented:
                    '“Not documented” means we found no mention of the capability in their public documentation or marketing on the verification date, not that it is impossible to build.',
                trademark:
                    'Stripo is a trademark of its respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say Stripo Plugin does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
            },
        },
        unlayer: {
            meta: {
                title: 'An open-source Unlayer alternative — Templatical',
                description:
                    'A sourced side-by-side comparison: hosting model, per-domain and per-tier caps, output portability, and how to migrate existing Unlayer templates.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'An open-source alternative to Unlayer',
                subheadline:
                    'Both put a drag-and-drop email editor inside your product. They differ on who runs the editor, how far you can extend it before hitting a cap, and whether the output is yours to render. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs Unlayer',
                colFeature: 'Feature',
                colThem: 'Unlayer',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    pricing: {
                        label: 'Pricing',
                        us: 'No fee, on any tier',
                        them: 'Free tier, then $250, $750 or $2,000 per month, plus Enterprise',
                    },
                    domains: {
                        label: 'Domain limits',
                        us: 'None. Run it on as many domains as you like.',
                        them: '1 domain on Free and Launch, 3 on Scale and Optimize',
                    },
                    customTools: {
                        label: 'Custom block types',
                        us: 'Unlimited, defined in your own code',
                        them: 'Capped custom tools: 1 on Launch, 3 on Scale, 5 on Optimize',
                    },
                    savedBlocks: {
                        label: 'Reusable saved blocks',
                        us: 'Unlimited, stored wherever you choose',
                        them: 'Custom blocks from Scale ($750/mo) up',
                    },
                    whiteLabel: {
                        label: 'White-labelling',
                        us: 'Default. No branding to remove.',
                        them: 'From Launch ($250/mo) up',
                    },
                    hosting: {
                        label: 'Who runs the editor',
                        us: 'You. The editor ships in your bundle and runs in your page',
                        them: 'Unlayer. The embed loads the editor from their CDN; self-hosting is an Enterprise option',
                    },
                    activation: {
                        label: 'Runtime activation',
                        us: 'None. No project ID, no domain allowlist, no call to us.',
                        them: 'A project ID with allowlisted domains for production use',
                    },
                    source: {
                        label: 'Source access',
                        us: 'Full source in a public repository',
                        them: 'The React wrapper is MIT; the editor it loads is not published',
                    },
                    licence: {
                        label: 'Licence',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release',
                        them: 'Commercial subscription',
                    },
                    scope: {
                        label: 'Scope',
                        us: 'Email only',
                        them: 'Email, pages, popups and documents',
                    },
                    amp: {
                        label: 'AMP email',
                        us: 'Not supported, and not planned',
                        them: 'From Optimize ($2,000/mo) up',
                    },
                    output: {
                        label: 'Output format',
                        us: 'MJML and JSON',
                        them: 'HTML and their own design JSON',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'The table is the detail; this is the decision. If a reason in the right column is a requirement for you, buy their product — it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose Unlayer if',
                us: {
                    cost: 'You do not want the editor billed by tier or limited by how many domains you run it on.',
                    extensibility: 'You expect to add more than a handful of custom block types. Templatical does not cap them; Unlayer allows 1 to 5 depending on plan.',
                    ownership: 'You want the editor running in your own bundle without an Enterprise contract to get it there.',
                    output: 'You want portable output. Templatical exports MJML, an open standard with an MIT implementation you can run yourself; an Unlayer template is their design JSON, rendered by their engine.',
                    source: 'You want the full source, and a licence that becomes MIT two years after each release.',
                },
                them: {
                    scope: 'You need pages, popups and documents as well as email. Templatical is email-only and intends to stay that way.',
                    operated: 'You would rather someone else operated the editor, with hosting and uptime handled for you.',
                    amp: 'You send AMP email. Templatical has no AMP support and no plans to add it.',
                    tooling: 'You want a built-in image editor and stock images. Unlayer includes stock images on every plan and the image editor from Launch ($250/mo) up.',
                    support: 'You want a commercial vendor behind the editor, with a dedicated customer success manager on their Enterprise tier.',
                },
            },
            close: {
                headline: 'Already on Unlayer? Bring your templates',
                body: 'Templatical ships an MIT-licensed converter for Unlayer templates, so an evaluation starts from your real designs rather than a blank canvas.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            migration: {
                label: 'Read the Unlayer migration guide',
            },
            footnote: {
                verified:
                    'Verified on 8 August 2026 against react-email-editor 2.0.0 as published on npm, and the plans listed at unlayer.com on that date. Pricing and features change — check their site for current terms.',
                notDocumented:
                    '“Not documented” means we found no mention of the capability in their public documentation or marketing on the verification date, not that it is impossible to build.',
                trademark:
                    'Unlayer is a trademark of its respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say Unlayer does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
            },
        },
        beefree: {
            meta: {
                title: 'An open-source Beefree SDK alternative — Templatical',
                description:
                    'A sourced side-by-side comparison: hosting model, per-user pricing, what the editor needs at runtime, and how to migrate existing BeeFree templates.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'An open-source alternative to Beefree SDK',
                subheadline:
                    'Both put a drag-and-drop email editor inside your product. They differ on who runs the editor, what it needs to start, and whether your bill grows with your users. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs Beefree SDK',
                colFeature: 'Feature',
                colThem: 'Beefree SDK',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    pricing: {
                        label: 'Pricing',
                        them: 'Free tier, then $400 to $6,000 per month',
                        us: 'No fee, on any tier',
                    },
                    users: {
                        label: 'End-user limits',
                        them: 'Metered: 10 users on Free, 100 on Essentials, 800 on Core, unlimited above',
                        us: 'None. The editor does not know or count your users.',
                    },
                    hosting: {
                        label: 'Who runs the editor',
                        them: 'Beefree. The npm package loads the editor from their CDN at runtime; self-hosting is an Enterprise option',
                        us: 'You. The editor ships in your bundle and runs in your page',
                    },
                    activation: {
                        label: 'Runtime activation',
                        them: 'Required. Your backend exchanges a client ID and secret for a token that expires in 5 minutes; without it the editor does not start',
                        us: 'None. No credentials, no token, no call to us.',
                    },
                    savedBlocks: {
                        label: 'Reusable saved blocks',
                        them: 'Metered “hosted rows”, absent below Core: 100, 250, then 1,000',
                        us: 'Unlimited, stored wherever you choose',
                    },
                    htmlImport: {
                        label: 'HTML import',
                        them: '$2 per import, or $2,000 per year for unlimited, below the top tiers',
                        us: 'Included, unlimited, MIT-licensed',
                    },
                    source: {
                        label: 'Source access',
                        them: 'The loader package is Apache-2.0; the editor it fetches is not published',
                        us: 'Full source in a public repository',
                    },
                    licence: {
                        label: 'Licence',
                        them: 'Commercial subscription',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release',
                    },
                    assets: {
                        label: 'Asset management',
                        them: 'Hosted file manager on every plan; your own storage behind it on paid plans; replacing the picker with your own UI needs the $3,000/mo tier',
                        us: 'No file manager at all — the editor calls your onRequestMedia hook, so any picker and any storage, at no tier',
                    },
                    scope: {
                        label: 'Scope',
                        them: 'Email, landing pages and popups',
                        us: 'Email only',
                    },
                    output: {
                        label: 'Output format',
                        them: 'HTML and JSON',
                        us: 'MJML and JSON',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'The table is the detail; this is the decision. If a reason in the right column is a requirement for you, buy their product — it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose Beefree SDK if',
                us: {
                    cost: 'You do not want the editor to cost more as you add users. Templatical does not meter them.',
                    runtime: 'You need the editor to start without a token from a third party — offline, air-gapped, or simply not dependent on someone else being up.',
                    ownership: 'You want the editor running in your own bundle without an Enterprise contract to get it there.',
                    source: 'You want the full source, and a licence that becomes MIT two years after each release.',
                    output: 'You want portable output. Templatical exports MJML, an open standard with an MIT implementation you can run yourself; a Beefree template is their JSON, rendered by their engine.',
                },
                them: {
                    scope: 'You need landing pages and popups as well as email. Templatical is email-only and intends to stay that way.',
                    operated: 'You would rather someone else operated the editor — hosted, auto-scaling, with an uptime commitment behind it.',
                    catalog: 'You want a large ready-made template catalog to offer your users on day one.',
                    support: 'You want a commercial vendor with a paid support contract rather than an open-source project.',
                    files: 'You want a file manager out of the box. Beefree ships one on every plan; Templatical has none and expects you to supply the picker.',
                },
            },
            close: {
                headline: 'Already on BeeFree? Bring your templates',
                body: 'Templatical ships an MIT-licensed converter for BeeFree templates, so an evaluation starts from your real designs rather than a blank canvas.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            migration: {
                label: 'Read the BeeFree migration guide',
            },
            footnote: {
                verified:
                    'Verified on 8 August 2026 against {\'@\'}beefree.io/sdk 11.6.1 as published on npm, and the plans listed at developers.beefree.io on that date. Pricing and features change — check their site for current terms.',
                notDocumented:
                    '“Not documented” means we found no mention of the capability in their public documentation or marketing on the verification date, not that it is impossible to build.',
                trademark:
                    'BeeFree and Beefree SDK are trademarks of their respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say Beefree SDK does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
            },
        },
        easyEmailPro: {
            meta: {
                title: 'An open-source Easy Email Pro alternative — Templatical',
                description:
                    'A sourced side-by-side comparison: licensing, framework support, install footprint, and what each editor does at runtime.',
            },
            hero: {
                eyebrow: 'Comparison',
                headline: 'An open-source alternative to Easy Email Pro',
                subheadline:
                    'Both embed a drag-and-drop email editor in your product, and both output MJML. They differ on licensing, framework lock-in, and what the editor does at runtime. Everything below is checkable against public sources.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            table: {
                heading: 'Templatical vs Easy Email Pro',
                colFeature: 'Feature',
                colThem: 'Easy Email Pro',
                colUs: 'Templatical',
                notDocumented: 'Not documented',
                rows: {
                    licensing: {
                        label: 'Licensing',
                        them: 'Commercial subscription, $99–$499 per month',
                        us: 'FSL-1.1-MIT, converting to MIT two years after each release. No fee.',
                    },
                    source: {
                        label: 'Source access',
                        them: 'UI code repository on the Enterprise tier',
                        us: 'Full source in a public repository',
                    },
                    framework: {
                        label: 'Framework',
                        them: 'React only',
                        us: 'React, Vue, Svelte, Angular and vanilla JS',
                    },
                    uiFramework: {
                        label: 'UI framework required',
                        them: 'Peer dependency on {\'@\'}arco-design/web-react',
                        us: 'None',
                    },
                    footprint: {
                        label: 'Install footprint',
                        them: 'About 62 MB unpacked across four packages',
                        us: '10.3 MB, zero runtime dependencies',
                    },
                    activation: {
                        label: 'Runtime activation',
                        them: 'A client ID gates the feature set, checked at startup and carrying an expiry; features outside your plan raise an error',
                        us: 'None. No license key, no client ID, no activation call.',
                    },
                    agents: {
                        label: 'AI agent support',
                        them: 'Developer MCP Service on the Enterprise tier',
                        us: 'MCP server and Agent Skill, MIT, included',
                    },
                    linting: {
                        label: 'Template quality linting',
                        them: 'Not documented',
                        us: '30 accessibility, structure and link rules, MIT',
                    },
                    importers: {
                        label: 'Migration importers',
                        them: 'Not documented',
                        us: 'BeeFree, Unlayer and HTML converters, MIT',
                    },
                    isolation: {
                        label: 'Style isolation',
                        them: 'Not documented',
                        us: 'Shadow DOM by default, both directions',
                    },
                    output: {
                        label: 'Output format',
                        them: 'MJML',
                        us: 'MJML',
                    },
                },
            },
            bestFit: {
                eyebrow: 'Best fit',
                headline: 'Which one you should pick',
                subheadline:
                    'The table is the detail; this is the decision. If a reason in the right column is a requirement for you, buy their product — it is the better fit and we would rather you knew.',
                usTitle: 'Choose Templatical if',
                themTitle: 'Choose Easy Email Pro if',
                us: {
                    framework: 'Your app is not React, or you want one integration that survives changing framework later.',
                    cost: 'You want the editor to cost nothing, with no per-seat or per-end-user metering as you grow.',
                    runtime: 'You need the editor to run with no license key and no call to a vendor at startup — offline, air-gapped, or simply not dependent on us being around.',
                    source: 'You want the full source, and a licence that becomes MIT two years after each release.',
                },
                them: {
                    react: 'Your product is React, portability is not a concern, and you prefer an idiomatic hooks API to an imperative init() call.',
                    blockStudio: 'Your users need to assemble their own blocks visually, without a developer writing code.',
                    amp: 'You send AMP email. Templatical has no AMP support and no plans to add it.',
                    support: 'You want a commercial vendor with a paid support contract behind the editor rather than an open-source project.',
                },
            },
            close: {
                headline: 'Try it before you weigh any of this',
                body: 'The playground runs the real editor with no signup. If it does not fit your product, none of the rest matters.',
                ctaPrimary: 'Open playground',
                ctaSecondary: 'Read the docs',
            },
            footnote: {
                verified:
                    'Verified on 7 August 2026 against easy-email-pro-core 1.59.9 as published on npm, and the pricing listed at easyemail.pro on that date. Pricing and features change — check their site for current terms.',
                notDocumented:
                    '“Not documented” means we found no mention of the capability in their public documentation or marketing on the verification date, not that it is impossible to build.',
                trademark:
                    'Easy Email Pro is a trademark of its respective owner. This page is maintained by Templatical and is neither affiliated with nor endorsed by them.',
                sourcesLabel: 'Sources',
                stale: 'This page is a snapshot, not a standing claim — including what we say Easy Email Pro does better. If anything here is out of date or wrong,',
                staleCta: 'open an issue',
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
                answer: 'Yes — paid SaaS, internal tools, on-premise software, agency builds, anything. The only restriction: you can\'t rebrand Templatical and sell it as a competing hosted email-editor SaaS. Embedding it in a CRM, transactional email API, newsletter tool, or any product where the editor is one feature among many is fully allowed. And the restriction expires: every release converts to plain MIT two years after it ships.',
            },
            packages: {
                question: 'Which packages are MIT vs FSL?',
                answer: 'Six of the nine packages are pure MIT today: types, renderer, quality, and the BeeFree, Unlayer and HTML importers. The editor, core, and media-library packages are FSL-1.1-MIT. The split means anything you\'d build into a backend or codegen pipeline is fully permissive from day one.',
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
            cssIsolation: {
                question: 'Will the editor inherit my app\'s CSS?',
                answer: 'No. The editor mounts inside a Shadow DOM by default, so host stylesheets stop at the boundary. Your body font-family, your design system\'s box-sizing reset, your framework\'s preflight — none of them reach the editor. If you want your theme to apply, set --tpl-user-* CSS variables on the container; they inherit across the shadow boundary. You can opt out with shadowDom: false if you need a light-DOM mount.',
            },
            hosted: {
                question: 'How does this compare to a hosted SaaS email builder?',
                answer:
                    'Hosted builders give you a turnkey editor and a stocked template catalog, but the editor sits behind their pricing — custom blocks, white-label, advanced theming and custom merge-tag syntax usually need a higher tier, and most meter your end users or your exports. Templatical is the embedded, self-hostable opposite: your customers see your brand, nothing is billed per seat, and you ship MJML you can render anywhere. If you mainly want a hosted editor with a large pre-built template library, a SaaS builder will be faster. Sourced side-by-side comparisons with Beefree SDK, Unlayer, Stripo, Topol, Chamaileon, Easy Email Pro and GrapesJS are linked in the footer.',
            },
            paid: {
                question: 'Is there a paid version, and is it required?',
                answer: 'No, paid is not required. The open-source SDK is fully standalone — every editor feature (custom blocks, merge tags, display conditions, theming, MJML output) is included and free to self-host. Templatical Cloud is a separate, optional managed subscription that adds infrastructure-dependent capabilities — real-time collaboration, AI rewrite and chat, hosted media, multi-tenancy, API access. Those rely on backend services we run, so they ship as a paid managed tier rather than self-hostable code.',
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
    changelog: {
        meta: {
            title: 'Changelog — Templatical',
            description:
                'Every Templatical release: new features, fixes, and breaking changes, with the packages each one touched.',
        },
        hero: {
            eyebrow: 'Changelog',
            headline: 'What shipped, and when',
            subheadline:
                'Templatical ships often. Every release is listed here with the packages it changed — all packages share one version number.',
        },
        levels: {
            major: 'Breaking',
            minor: 'Feature',
            patch: 'Fix',
        },
        emptyVersion: 'No user-facing changes — released to keep the packages in step.',
        versionNotes: 'Read the full notes for {version}',
        showingLatest: 'Showing the {count} most recent releases.',
        fullHistory: {
            eyebrow: 'Every release',
            headline: 'Looking for an older version?',
            description:
                'The docs changelog carries the full history back to the first release, with the complete notes for every entry.',
            docsCta: 'Full changelog',
            releasesCta: 'GitHub Releases',
        },
        unavailable: {
            headline: 'Changelog temporarily unavailable',
            description:
                'The release data could not be loaded when this page was built. The full changelog is always available in the docs.',
            cta: 'Open the docs changelog',
        },
    },
};
