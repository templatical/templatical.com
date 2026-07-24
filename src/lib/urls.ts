export const URLS = {
    docs: 'https://docs.templatical.com',
    playground: 'https://play.templatical.com',
    cloud: 'https://cloud.templatical.com',
    github: 'https://github.com/templatical/sdk',
    discussions: 'https://github.com/templatical/sdk/discussions',
    siteRepo: 'https://github.com/templatical/templatical.com',
    skillRepo: 'https://github.com/templatical/sdk/tree/main/skills/templatical-email',
    licenseFaq: 'https://docs.templatical.com/license-faq',
    showcase: 'https://docs.templatical.com/showcase',
    sponsor: 'https://github.com/sponsors/orkhanahmadov',
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
} as const;

export function localizedUrl(
    key: keyof typeof LOCALIZED_URLS,
    locale: string,
): string {
    const map = LOCALIZED_URLS[key];
    return (map as Record<string, string>)[locale] ?? map.en;
}
