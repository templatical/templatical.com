export const URLS = {
    docs: 'https://docs.templatical.com',
    playground: 'https://play.templatical.com',
    cloud: 'https://cloud.templatical.com',
    github: 'https://github.com/templatical/sdk',
    discussions: 'https://github.com/templatical/sdk/discussions',
    // Corrections to /alternatives/* pages are site-copy issues, not SDK bugs — they
    // belong in this repo's tracker rather than the SDK's, which real bug reports use.
    siteIssues: 'https://github.com/templatical/templatical.com/issues',
    siteRepo: 'https://github.com/templatical/templatical.com',
    skillRepo: 'https://github.com/templatical/sdk/tree/main/skills/templatical-email',
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
    beefreePricing: 'https://developers.beefree.io/pricing-plans',
    beefreeAuthDocs:
        'https://docs.beefree.io/beefree-sdk/getting-started/readme/installation/authorization-process-in-detail',
    beefreeNpm: 'https://www.npmjs.com/package/@beefree.io/sdk',
    // Backs the "asset management" row: their own docs state the Custom File Picker is
    // "available on Beefree SDK Superpowers plan and above".
    beefreeFilePickerDocs:
        'https://docs.beefree.io/beefree-sdk/other-customizations/advanced-options/custom-file-picker',
    grapesjsSite: 'https://grapesjs.com/',
    grapesjsNpm: 'https://www.npmjs.com/package/grapesjs',
    grapesjsMjmlNpm: 'https://www.npmjs.com/package/grapesjs-mjml',
    chamaileonSdk: 'https://chamaileon.io/sdk/',
    chamaileonNpm: 'https://www.npmjs.com/package/@chamaileon-sdk/plugins',
    topolPluginPricing: 'https://topol.io/tariff-plugin',
    topolPlugin: 'https://topol.io/plugin',
    topolNpm: 'https://www.npmjs.com/package/@topol.io/editor',
    stripoPlugin: 'https://stripo.email/plugin/',
    stripoPlanComparison:
        'https://support.stripo.email/en/articles/11331457-new-plugin-what-s-the-difference-between-free-startup-business-and-enterprise-plans',
    unlayerPricing: 'https://unlayer.com/pricing',
    unlayerDocs: 'https://docs.unlayer.com/docs/getting-started',
    unlayerNpm: 'https://www.npmjs.com/package/react-email-editor',
} as const;

export const LOCALIZED_URLS = {
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
} as const;

export function localizedUrl(
    key: keyof typeof LOCALIZED_URLS,
    locale: string,
): string {
    const map = LOCALIZED_URLS[key];
    return (map as Record<string, string>)[locale] ?? map.en;
}
