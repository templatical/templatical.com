/**
 * A tiny, synchronous tokenizer for the two languages the /importers hero shows:
 * the markup an email tool exported, and the JSON a converter returned.
 *
 * Deliberately NOT Shiki, which the rest of the site uses. Three reasons, all of
 * them specific to this surface:
 *
 *   1. Shiki is async and pulls its grammars as separate chunks. This runs in a
 *      hero, above the fold, and vite-ssg prerenders the route — a synchronous
 *      tokenizer means the static HTML already contains both panes fully
 *      highlighted, which is also exactly the no-JS and reduced-motion state.
 *   2. The transmuter needs token *identity*, not a highlighted HTML string: it
 *      animates specific values from one pane to the other, so it has to know
 *      which span holds which value. Shiki hands back markup to re-parse.
 *   3. The excerpts are ~10 lines of two well-known shapes. A full grammar buys
 *      nothing here, and colours come from the site's own palette rather than
 *      GitHub's.
 *
 * `carry` is the whole point of the file: the index into a sample's `carried`
 * array, set on the FIRST occurrence of that value in each pane. The animation
 * follows those indices, so it can only ever animate a correspondence the
 * conversion actually produced — see importerSamples.ts.
 */

export type TokenKind =
    'plain' | 'key' | 'string' | 'number' | 'literal' | 'punct' | 'tag' | 'attr';

export interface Token {
    t: string;
    k: TokenKind;
    /** Index into the sample's `carried` array, on its first occurrence only. */
    carry?: number;
}

export type CodeLine = Token[];

const JSON_PATTERNS: readonly [RegExp, TokenKind | 'key?'][] = [
    [/^"(?:[^"\\]|\\.)*"(?=\s*:)/, 'key?'],
    [/^"(?:[^"\\]|\\.)*"/, 'string'],
    [/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, 'number'],
    [/^(?:true|false|null)\b/, 'literal'],
    [/^[{}[\],:]/, 'punct'],
    [/^\s+/, 'plain'],
];

function tokenizeJsonLine(line: string): CodeLine {
    const out: CodeLine = [];
    let rest = line;
    while (rest) {
        let matched = false;
        for (const [re, kind] of JSON_PATTERNS) {
            const m = re.exec(rest);
            if (!m) continue;
            out.push({ t: m[0], k: kind === 'key?' ? 'key' : kind });
            rest = rest.slice(m[0].length);
            matched = true;
            break;
        }
        // Unrecognised byte: emit it alone rather than dropping it, so a pane
        // always renders its source verbatim even if this tokenizer is wrong.
        if (!matched) {
            out.push({ t: rest[0], k: 'plain' });
            rest = rest.slice(1);
        }
    }
    return out;
}

const MARKUP_PATTERNS: readonly [RegExp, TokenKind][] = [
    [/^<\/?[\w:-]+/, 'tag'],
    [/^\/?>/, 'tag'],
    [/^"(?:[^"\\]|\\.)*"/, 'string'],
    [/^[\w:-]+(?=\s*=)/, 'attr'],
    [/^=/, 'punct'],
    [/^\s+/, 'plain'],
];

function tokenizeMarkupLine(line: string): CodeLine {
    const out: CodeLine = [];
    let rest = line;
    while (rest) {
        let matched = false;
        for (const [re, kind] of MARKUP_PATTERNS) {
            const m = re.exec(rest);
            if (!m) continue;
            out.push({ t: m[0], k: kind });
            rest = rest.slice(m[0].length);
            matched = true;
            break;
        }
        if (matched) continue;
        // Text between tags: take the whole run up to the next delimiter, so a
        // sentence stays one token and can carry a value as a single span.
        const text = /^[^<>="\s]+/.exec(rest);
        out.push({ t: text ? text[0] : rest[0], k: 'plain' });
        rest = rest.slice(text ? text[0].length : 1);
    }
    return out;
}

interface CarryRange {
    start: number;
    end: number;
    carry: number;
}

/** Append, merging into the previous token when kind and carry agree. */
function push(out: CodeLine, token: Token): void {
    if (!token.t) return;
    const last = out[out.length - 1];
    if (last && last.k === token.k && last.carry === token.carry) {
        last.t += token.t;
        return;
    }
    out.push(token);
}

/**
 * Split tokens so each carried value occupies a token of its own, marked with
 * its index.
 *
 * Matching happens against the line's concatenated TEXT rather than token by
 * token, because a carried value routinely spans several tokens: markup prose
 * tokenizes per word, so `Verify email` is `Verify` + ` ` + `email` and a
 * per-token search would never find it. The matched range is then re-sliced
 * back over the tokens and merged into one span — one span per value is what
 * the flight animation needs, since it measures a single rect per endpoint.
 *
 * Only the first occurrence in the document is marked: `carried` values repeat
 * (BeeFree's fixture holds the same social URL as both `href` and `prefix`),
 * and two candidate endpoints would make the flight ambiguous. Longer values
 * are matched first so a value that is a prefix of another cannot consume it.
 */
function applyCarries(lines: CodeLine[], carried: readonly string[]): CodeLine[] {
    const order = carried
        .map((value, index) => ({ value, index }))
        .filter((entry) => entry.value)
        .sort((a, b) => b.value.length - a.value.length);
    if (order.length === 0) return lines;

    const claimed = new Set<number>();

    return lines.map((line) => {
        const text = line.map((token) => token.t).join('');
        const ranges: CarryRange[] = [];

        for (const { value, index } of order) {
            if (claimed.has(index)) continue;
            let at = text.indexOf(value);
            while (at >= 0) {
                const overlaps = ranges.some((r) => at < r.end && at + value.length > r.start);
                if (!overlaps) break;
                at = text.indexOf(value, at + 1);
            }
            if (at < 0) continue;
            claimed.add(index);
            ranges.push({ start: at, end: at + value.length, carry: index });
        }
        if (ranges.length === 0) return line;
        ranges.sort((a, b) => a.start - b.start);

        const out: CodeLine = [];
        let offset = 0;
        for (const token of line) {
            let local = 0;
            while (local < token.t.length) {
                const at = offset + local;
                const range = ranges.find((r) => r.end > at);
                if (range && at >= range.start) {
                    const take = Math.min(token.t.length - local, range.end - at);
                    push(out, {
                        t: token.t.slice(local, local + take),
                        k: token.k,
                        carry: range.carry,
                    });
                    local += take;
                    continue;
                }
                const take = range
                    ? Math.min(token.t.length - local, range.start - at)
                    : token.t.length - local;
                push(out, { t: token.t.slice(local, local + take), k: token.k });
                local += take;
            }
            offset += token.t.length;
        }
        return out;
    });
}

export function tokenize(
    code: string,
    lang: 'html' | 'json',
    carried: readonly string[] = [],
): CodeLine[] {
    const tokenizeLine = lang === 'json' ? tokenizeJsonLine : tokenizeMarkupLine;
    return applyCarries(code.split('\n').map(tokenizeLine), carried);
}
