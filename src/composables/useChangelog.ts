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
    /** Set when the run came from a `[label](url)` link. */
    href?: string;
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
 * Stands in for a code span while emphasis is matched, so the two passes can't
 * see each other's delimiters. NUL never appears in a changeset summary; a title
 * that somehow contains one skips masking rather than mis-slicing itself.
 */
const CODE_MASK = '\u0000';
const MASKED_CODE = /\u0000(\d+)\u0000/g;

/**
 * Same masking trick as code spans, one layer earlier: a link's URL is arbitrary text
 * that the emphasis and backtick passes would otherwise chew (an underscore or asterisk
 * in a path, a stray backtick), and it has to survive verbatim to stay clickable.
 *
 * Only http/https targets match. The href reaches an :href binding, so accepting an
 * arbitrary scheme would make a javascript: URL in a changeset summary a script
 * injection; anything else is left as literal text instead.
 */
const LINK_MASK = '\u0001';
const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const MASKED_LINK = /\u0001(\d+)\u0001/g;

/** Re-expands masked links, carrying any emphasis the run picked up. */
function expandLinkMasks(
    segment: TitleSegment,
    links: { text: string; href: string }[],
): TitleSegment[] {
    const segments: TitleSegment[] = [];
    let cursor = 0;
    for (const match of segment.text.matchAll(MASKED_LINK)) {
        const start = match.index ?? 0;
        if (start > cursor) segments.push({ ...segment, text: segment.text.slice(cursor, start) });
        const link = links[Number(match[1])];
        segments.push({ ...segment, text: link.text, href: link.href });
        cursor = start + match[0].length;
    }
    if (cursor < segment.text.length)
        segments.push({ ...segment, text: segment.text.slice(cursor) });
    return segments;
}

/** Re-expands masked code spans, carrying any emphasis the run picked up. */
function expandCodeMasks(segment: TitleSegment, codes: string[]): TitleSegment[] {
    const segments: TitleSegment[] = [];
    let cursor = 0;
    for (const match of segment.text.matchAll(MASKED_CODE)) {
        const start = match.index ?? 0;
        if (start > cursor) segments.push({ ...segment, text: segment.text.slice(cursor, start) });
        segments.push({ ...segment, text: codes[Number(match[1])], code: true });
        cursor = start + match[0].length;
    }
    if (cursor < segment.text.length)
        segments.push({ ...segment, text: segment.text.slice(cursor) });
    return segments;
}

/**
 * Splits an entry title into plain, inline-code, bold, italic and link runs.
 *
 * Titles come from changeset summaries, which reach for four inline-markdown
 * constructs: backtick-quoted identifiers, `**bold**`, `*italic*` and `[label](url)`.
 * Rendering them raw shows the delimiters as characters; a full markdown renderer
 * would be a new dependency for four constructs.
 *
 * Links are masked first, outside the backtick split. A URL is arbitrary text: left
 * unmasked, an odd backtick inside one flips the whole title onto the emphasis-only
 * path, and underscores or asterisks in a path get eaten as emphasis. Masking first
 * also fixed a real defect — a title carrying an issue link rendered the raw
 * `([#487](https://…))` syntax to readers, and the unbreakable URL pushed the page
 * into horizontal scroll on mobile.
 *
 * Code spans are masked before emphasis is matched rather than tokenised into
 * separate segments. Masking keeps both rules that a single pass would break:
 * asterisks inside a backtick span stay literal the way markdown treats them
 * (they are hidden behind the mask), while emphasis wrapping or crossing a span
 * still pairs — ``**`MergeTag.sample`**`` is one bold code run, not two literal
 * `**` around a code pill. An unpaired delimiter stays literal text rather than
 * swallowing the rest of the title. Nested emphasis (`***x***`) is not supported.
 */
export function titleSegments(title: string): TitleSegment[] {
    // A title already containing either sentinel skips masking rather than
    // mis-slicing itself, matching the existing CODE_MASK guard.
    const links: { text: string; href: string }[] = [];
    const linked =
        title.includes(LINK_MASK) || title.includes(CODE_MASK)
            ? title
            : title.replace(MARKDOWN_LINK, (_m, text: string, href: string) => {
                  links.push({ text, href });
                  return `${LINK_MASK}${links.length - 1}${LINK_MASK}`;
              });

    const expand = (segments: TitleSegment[]) =>
        (links.length
            ? segments.flatMap((segment) => expandLinkMasks(segment, links))
            : segments
        ).filter((segment) => segment.text.length > 0);

    const parts = linked.split('`');
    // An odd backtick leaves no way to tell where the span ends, so every
    // backtick stays literal and only emphasis is matched.
    if (parts.length % 2 === 0 || linked.includes(CODE_MASK)) {
        return expand(emphasisSegments(linked));
    }

    const codes: string[] = [];
    const masked = parts
        .map((text, index) => {
            if (index % 2 === 0) return text;
            codes.push(text);
            return `${CODE_MASK}${codes.length - 1}${CODE_MASK}`;
        })
        .join('');

    return expand(emphasisSegments(masked).flatMap((segment) => expandCodeMasks(segment, codes)));
}

export function useChangelog() {
    const versions = ref<ChangelogVersion[]>(__CHANGELOG__ ?? []);
    const isUnavailable = computed(() => versions.value.length === 0);
    const latest = computed<ChangelogVersion | null>(() => versions.value[0] ?? null);

    return { versions, isUnavailable, latest };
}
