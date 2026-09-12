/**
 * The canonical importer list for the whole site.
 *
 * Every other surface derives from this rather than restating it — the /features
 * migration band, the home band, the FAQ counts. The previous arrangement hardcoded
 * three names in four places across two locales and silently understated us by five
 * when the SDK shipped the rest; nothing tested it and nothing flagged it.
 *
 * One `slug` drives both the package name and the docs path: slug `stripo` is
 * `@templatical/import-stripo` and `/guide/migration-from-stripo`. The SDK names all
 * eight identically — keep that true for anything added here, or split the field.
 *
 * Prose for each entry lives in i18n under `importers.entries.<slug>`. Names and
 * package specifiers stay here because neither is translatable.
 *
 * Adding a ninth importer: add it here, add its `importers.entries.<slug>` block to
 * both locales, and that is the whole change — the count in every headline is
 * interpolated from `IMPORTER_COUNT`.
 */

export type ImporterGroup = 'hosted' | 'markup';

export interface Importer {
    /** Matches the SDK package suffix and the docs guide suffix. */
    slug: string;
    /** The product or format, as its own vendor spells it. */
    name: string;
    group: ImporterGroup;
}

export const IMPORTERS: readonly Importer[] = [
    { slug: 'beefree', name: 'BeeFree', group: 'hosted' },
    { slug: 'unlayer', name: 'Unlayer', group: 'hosted' },
    { slug: 'stripo', name: 'Stripo', group: 'hosted' },
    { slug: 'topol', name: 'Topol', group: 'hosted' },
    { slug: 'chamaileon', name: 'Chamaileon', group: 'hosted' },
    { slug: 'easy-email-pro', name: 'Easy Email Pro', group: 'hosted' },
    { slug: 'html', name: 'HTML', group: 'markup' },
    { slug: 'mjml', name: 'MJML', group: 'markup' },
] as const;

/** Render order on /importers and in the /features name run. */
export const IMPORTER_GROUP_ORDER: readonly ImporterGroup[] = ['hosted', 'markup'];

export const IMPORTER_COUNT = IMPORTERS.length;

export function importerPackage(slug: string): string {
    return `@templatical/import-${slug}`;
}

export function importerGuidePath(slug: string): string {
    return `/guide/migration-from-${slug}`;
}

export function importersIn(group: ImporterGroup): Importer[] {
    return IMPORTERS.filter((importer) => importer.group === group);
}
