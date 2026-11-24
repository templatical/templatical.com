export const URLS = {
    docs: 'https://docs.templatical.com',
    playground: 'https://play.templatical.com',
    // Provider privacy policies linked from /privacy.
    cloudflarePrivacy: 'https://www.cloudflare.com/privacypolicy/',
    bunnyPrivacy: 'https://bunny.net/privacy/',
    githubPrivacy:
        'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
    github: 'https://github.com/templatical/sdk',
    discussions: 'https://github.com/templatical/sdk/discussions',
    // Corrections to /alternatives/* pages are site-copy issues, not SDK bugs — they
    // belong in this repo's tracker rather than the SDK's, which real bug reports use.
    siteIssues: 'https://github.com/templatical/templatical.com/issues',
    siteRepo: 'https://github.com/templatical/templatical.com',
    skillRepo: 'https://github.com/templatical/sdk/tree/main/skills/templatical',
    licenseFaq: 'https://docs.templatical.com/license-faq',
    showcase: 'https://docs.templatical.com/showcase',
    changelog: 'https://docs.templatical.com/changelog',
    releases: 'https://github.com/templatical/sdk/releases',
    sponsor: 'https://github.com/sponsors/orkhanahmadov',
    // Comparison sources. Linked from /alternatives/* so every competitor claim
    // on those pages resolves to the material it was taken from.
    easyEmailPro: 'https://www.easyemail.pro/',
    easyEmailProQuickStart: 'https://docs.easyemail.pro/docs/tutorial/quick-start',
    easyEmailProNpm: 'https://www.npmjs.com/package/easy-email-pro-core',
    // Backs the importers row: Unlayer, Beefree and Klaviyo converters.
    easyEmailProMigrationsNpm: 'https://www.npmjs.com/package/easy-email-pro-migrations',
    beefreePricing: 'https://developers.beefree.io/pricing-plans',
    beefreeAuthDocs:
        'https://docs.beefree.io/beefree-sdk/getting-started/readme/installation/authorization-process-in-detail',
    beefreeNpm: 'https://www.npmjs.com/package/@beefree.io/sdk',
    // Backs the "asset management" row: their own docs state the Custom File Picker is
    // "available on Beefree SDK Superpowers plan and above".
    beefreeFilePickerDocs:
        'https://docs.beefree.io/beefree-sdk/other-customizations/advanced-options/custom-file-picker',
    grapesjsSite: 'https://grapesjs.com/',
    // Backs the GrapesJS footnote: Studio SDK has published plans and is not compared.
    grapesjsSdkPricing: 'https://grapesjs.com/sdk/pricing',
    grapesjsNpm: 'https://www.npmjs.com/package/grapesjs',
    grapesjsMjmlNpm: 'https://www.npmjs.com/package/grapesjs-mjml',
    chamaileonSdk: 'https://chamaileon.io/sdk/',
    chamaileonNpm: 'https://www.npmjs.com/package/@chamaileon-sdk/plugins',
    topolPlugin: 'https://topol.io/plugin',
    topolNpm: 'https://www.npmjs.com/package/@topol.io/editor',
    stripoPlugin: 'https://stripo.email/plugin/',
    stripoPlanComparison:
        'https://support.stripo.email/en/articles/11331457-new-plugin-what-s-the-difference-between-free-startup-business-and-enterprise-plans',
    unlayerPricing: 'https://unlayer.com/pricing',
    // Installation page. docs.unlayer.com/docs/getting-started canonicalizes here.
    unlayerDocs: 'https://docs.unlayer.com/builder/installation',
    unlayerNpm: 'https://www.npmjs.com/package/react-email-editor',
    // Back the "Language versions and translation" rows, rechecked on 19 November 2026.
    beefreeMultiLanguageDocs:
        'https://docs.beefree.io/beefree-sdk/other-customizations/multi-language-templates',
    beefreeDeeplDocs: 'https://docs.beefree.io/beefree-sdk/ai-and-mcp/ai-addons/deepl',
    unlayerMultiLanguageDocs: 'https://docs.unlayer.com/builder/templates/multi-language',
    unlayerMultiLanguageHelp:
        'https://help.unlayer.com/en/articles/12746617-multi-language-templates',
    stripoPluginLocalization: 'https://plugin.stripo.email/extensions/features/localization',
    stripoPluginAi: 'https://plugin.stripo.email/editor-configuration/artificial-intelligence',
    stripoTranslateHelp:
        'https://support.stripo.email/en/articles/13393929-how-to-translate-an-email-template',
    // Backs the hosting row: the editor's static files can be served from your own CDN.
    stripoCdnHosting: 'https://plugin.stripo.email/hosting-stripo-editor-files-on-your-own-cdn',
    topolMultilingualDocs: 'https://docs.topol.io/email-editor/guide/multilingual-templates.html',
    topolTranslationDocs: 'https://docs.topol.io/email-editor/guide/template-translation.html',
    // Backs the custom-blocks row: Business plan and higher.
    topolCustomBlockDocs: 'https://docs.topol.io/email-editor/guide/custom-block.html',
    // Backs the framework-support row: plain JavaScript or TypeScript, plus React, Vue, Svelte and Angular.
    topolFrameworkDocs: 'https://docs.topol.io/email-editor/guide/js-frameworks.html',
    // Backs the end-user row: unique userId values counted within a billing cycle.
    topolFaqDocs: 'https://docs.topol.io/email-editor/guide/faq.html',
    topolPricing: 'https://topol.io/pricing',
    chamaileonEditorDocs: 'https://chamaileon.io/sdk/v2/docs/email-editor/',
    easyEmailProTranslateDocs: 'https://docs.easyemail.pro/docs/advanced/email-translate',
    grapesjsI18nDocs: 'https://grapesjs.com/docs/modules/I18n.html',
    unlayerTimerDocs: 'https://docs.unlayer.com/builder/latest/tools/timer',
    stripoTimerDocs:
        'https://support.stripo.email/en/articles/13374791-how-to-change-the-date-in-the-timer-if-the-email-is-already-exported',
    stripoTimerOpensDocs:
        'https://support.stripo.email/en/articles/13374755-what-do-you-mean-by-timer-block-monthly-opens',
    beefreePartnerAddonsDocs:
        'https://docs.beefree.io/beefree-sdk/builder-addons/partner-addons/partner-addons-directory',
    chamaileonTimerDocs:
        'https://help.chamaileon.io/en/articles/2318251-how-do-i-add-a-countdown-timer',
} as const;

export const LOCALIZED_URLS = {
    countdownDocs: {
        en: 'https://docs.templatical.com/guide/countdown',
        de: 'https://docs.templatical.com/de/guide/countdown',
    },
    dynamicMergeTagsDocs: {
        en: 'https://docs.templatical.com/guide/merge-tags#dynamic-tag-loading',
        de: 'https://docs.templatical.com/de/guide/merge-tags#dynamisches-tag-laden',
    },
    shadowDomDocs: {
        en: 'https://docs.templatical.com/guide/shadow-dom',
        de: 'https://docs.templatical.com/de/guide/shadow-dom',
    },
    agentSkillDocs: {
        en: 'https://docs.templatical.com/guide/agent-skill',
        de: 'https://docs.templatical.com/de/guide/agent-skill',
    },
    beefreeMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-beefree',
        de: 'https://docs.templatical.com/de/guide/migration-from-beefree',
    },
    unlayerMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-unlayer',
        de: 'https://docs.templatical.com/de/guide/migration-from-unlayer',
    },
    stripoMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-stripo',
        de: 'https://docs.templatical.com/de/guide/migration-from-stripo',
    },
    topolMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-topol',
        de: 'https://docs.templatical.com/de/guide/migration-from-topol',
    },
    chamaileonMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-chamaileon',
        de: 'https://docs.templatical.com/de/guide/migration-from-chamaileon',
    },
    easyEmailProMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-easy-email-pro',
        de: 'https://docs.templatical.com/de/guide/migration-from-easy-email-pro',
    },
    // Used by the GrapesJS page: a grapesjs-mjml setup already produces MJML, which is
    // the format Templatical works in natively — so the MJML guide is the real path.
    mjmlMigrationDocs: {
        en: 'https://docs.templatical.com/guide/migration-from-mjml',
        de: 'https://docs.templatical.com/de/guide/migration-from-mjml',
    },
    backendDocs: {
        en: 'https://docs.templatical.com/backend/',
        de: 'https://docs.templatical.com/de/backend/',
    },
    aiDocs: {
        en: 'https://docs.templatical.com/backend/ai',
        de: 'https://docs.templatical.com/de/backend/ai',
    },
    localizedTemplatesDocs: {
        en: 'https://docs.templatical.com/guide/localized-templates',
        de: 'https://docs.templatical.com/de/guide/localized-templates',
    },
    installation: {
        en: 'https://docs.templatical.com/getting-started/installation',
        de: 'https://docs.templatical.com/de/getting-started/installation',
    },
} as const;

export function localizedUrl(key: keyof typeof LOCALIZED_URLS, locale: string): string {
    const map = LOCALIZED_URLS[key];
    return (map as Record<string, string>)[locale] ?? map.en;
}
