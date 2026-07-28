import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const BUNDLE_STATS_URL = 'https://unpkg.com/@templatical/editor/dist/bundle-stats.json';

async function fetchBundleSize(): Promise<string | null> {
    try {
        const res = await fetch(BUNDLE_STATS_URL, { signal: AbortSignal.timeout(10_000) });
        if (!res.ok) return null;
        const data = (await res.json()) as {
            initialGzipBytes?: number;
            lazyGzipBytes?: number;
        };
        if (typeof data.initialGzipBytes !== 'number') return null;
        const initial = `${Math.round(data.initialGzipBytes / 1024)} kB`;
        if (typeof data.lazyGzipBytes === 'number' && data.lazyGzipBytes > 0) {
            const lazy = `${Math.round(data.lazyGzipBytes / 1024)} kB`;
            return `${initial} initial · ${lazy} lazy`;
        }
        return `${initial} gzipped`;
    } catch (err) {
        console.warn('[bundle-size] fetch failed:', (err as Error).message);
        return null;
    }
}

// Generated in the SDK repo by apps/docs/scripts/build-changelog.mjs and committed
// there, so it is current the moment a release lands on main — read from the repo
// rather than docs.templatical.com, whose deploy races this site's rebuild.
const CHANGELOG_URL =
    'https://raw.githubusercontent.com/templatical/sdk/main/apps/docs/public/changelog.json';

/** Versions rendered here; the docs changelog stays the complete archive. */
const CHANGELOG_VERSIONS = 20;

interface ChangelogChange {
    hash: string;
    level: string;
    title: string;
    packages: string[];
}

interface ChangelogVersion {
    version: string;
    date: string | null;
    changes: ChangelogChange[];
}

/**
 * Reads the changelog JSON, preferring `CHANGELOG_JSON` when set — a URL or a local
 * path, so the page can be developed against a sibling SDK checkout before a release
 * has published the file.
 */
async function readChangelogSource(): Promise<string | null> {
    const override = process.env.CHANGELOG_JSON;
    if (override && !/^https?:\/\//.test(override)) {
        return readFile(override, 'utf8');
    }
    const res = await fetch(override || CHANGELOG_URL, {
        signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
        console.warn(`[changelog] ${res.status} from ${override || CHANGELOG_URL}`);
        return null;
    }
    return res.text();
}

async function fetchChangelog(): Promise<ChangelogVersion[] | null> {
    try {
        const source = await readChangelogSource();
        if (source === null) return null;
        const data = JSON.parse(source) as { versions?: unknown };
        if (!Array.isArray(data.versions)) return null;
        return (data.versions as ChangelogVersion[])
            .slice(0, CHANGELOG_VERSIONS)
            .map((version) => ({
                version: version.version,
                date: version.date ?? null,
                // The markdown bodies are dropped: each version links to its docs
                // anchor for the full prose, and inlining them would add ~36 kB
                // gzipped to the client bundle and need a markdown renderer.
                changes: (version.changes ?? []).map((change) => ({
                    hash: change.hash,
                    level: change.level,
                    title: change.title,
                    packages: change.packages ?? [],
                })),
            }))
            .filter((version) => typeof version.version === 'string');
    } catch (err) {
        console.warn('[changelog] fetch failed:', (err as Error).message);
        return null;
    }
}

export default defineConfig(async () => ({
    define: {
        __BUNDLE_SIZE__: JSON.stringify(await fetchBundleSize()),
        __CHANGELOG__: JSON.stringify(await fetchChangelog()),
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [vue(), tailwindcss()],
}));
