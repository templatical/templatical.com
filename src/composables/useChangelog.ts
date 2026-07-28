import { URLS } from '@/lib/urls';
import { computed, ref } from 'vue';

export type ChangelogLevel = 'major' | 'minor' | 'patch';

export interface ChangelogChange {
    hash: string;
    level: ChangelogLevel;
    title: string;
    packages: string[];
}

export interface ChangelogVersion {
    version: string;
    date: string | null;
    changes: ChangelogChange[];
}

// Injected at build time by vite.config.ts; null when the fetch failed, which the
// page renders as an unavailable state rather than as an empty changelog.
declare const __CHANGELOG__: ChangelogVersion[] | null;

/**
 * Deep-links a version to its heading on the docs changelog.
 *
 * VitePress slugifies `## 0.20.0` to `_0-20-0` — dots become dashes and a leading
 * digit gets an underscore prefix. Kept in one place so a slugification change is a
 * single edit.
 */
export function docsAnchor(version: string): string {
    return `${URLS.changelog}#_${version.replaceAll('.', '-')}`;
}

export interface TitleSegment {
    text: string;
    code: boolean;
}

/**
 * Splits an entry title into plain and inline-code runs.
 *
 * Titles come from changeset summaries and quote identifiers in backticks. Rendering
 * them raw shows the backticks as characters; a full markdown renderer would be a new
 * dependency for the one inline construct these titles actually use. An unpaired
 * trailing backtick stays literal text rather than swallowing the rest of the title.
 */
export function titleSegments(title: string): TitleSegment[] {
    const parts = title.split('`');
    if (parts.length % 2 === 0) return [{ text: title, code: false }];
    return parts
        .map((text, index) => ({ text, code: index % 2 === 1 }))
        .filter((segment) => segment.text.length > 0);
}

export function useChangelog() {
    const versions = ref<ChangelogVersion[]>(__CHANGELOG__ ?? []);
    const isUnavailable = computed(() => versions.value.length === 0);
    const latest = computed<ChangelogVersion | null>(() => versions.value[0] ?? null);

    return { versions, isUnavailable, latest };
}
