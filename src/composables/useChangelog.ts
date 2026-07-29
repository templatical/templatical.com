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
    strong?: boolean;
    em?: boolean;
}

/** Bold before italic, so `**x**` never reads as italic plus a stray asterisk. */
const EMPHASIS = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function emphasisSegments(text: string): TitleSegment[] {
    const segments: TitleSegment[] = [];
    let cursor = 0;
    for (const match of text.matchAll(EMPHASIS)) {
        const start = match.index ?? 0;
        if (start > cursor) segments.push({ text: text.slice(cursor, start), code: false });
        segments.push(
            match[1] !== undefined
                ? { text: match[1], code: false, strong: true }
                : { text: match[2], code: false, em: true },
        );
        cursor = start + match[0].length;
    }
    if (cursor < text.length) segments.push({ text: text.slice(cursor), code: false });
    return segments;
}

/**
 * Splits an entry title into plain, inline-code, bold and italic runs.
 *
 * Titles come from changeset summaries, which reach for three inline-markdown
 * constructs: backtick-quoted identifiers, `**bold**` and `*italic*`. Rendering them
 * raw shows the delimiters as characters; a full markdown renderer would be a new
 * dependency for three constructs. Code is tokenised first, so asterisks inside a
 * backtick span stay literal the way markdown treats them. An unpaired delimiter
 * stays literal text rather than swallowing the rest of the title.
 */
export function titleSegments(title: string): TitleSegment[] {
    const parts = title.split('`');
    const codeAware: TitleSegment[] =
        parts.length % 2 === 0
            ? [{ text: title, code: false }]
            : parts.map((text, index) => ({ text, code: index % 2 === 1 }));
    return codeAware
        .flatMap((segment) => (segment.code ? [segment] : emphasisSegments(segment.text)))
        .filter((segment) => segment.text.length > 0);
}

export function useChangelog() {
    const versions = ref<ChangelogVersion[]>(__CHANGELOG__ ?? []);
    const isUnavailable = computed(() => versions.value.length === 0);
    const latest = computed<ChangelogVersion | null>(() => versions.value[0] ?? null);

    return { versions, isUnavailable, latest };
}
