import { ref, onMounted } from 'vue';

const PACKAGE = '@templatical/editor';
const CACHE_KEY = 'tpl:bundle-size';
const TTL_MS = 24 * 60 * 60 * 1000;

type CacheEntry = {
    gzip?: number;
    min?: number;
    fetchedAt: number;
};

function readCache(): CacheEntry | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CacheEntry;
        if (Date.now() - parsed.fetchedAt > TTL_MS) return null;
        return parsed;
    } catch {
        return null;
    }
}

function writeCache(entry: CacheEntry) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch {
        // ignore quota or disabled storage
    }
}

function formatKb(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatLabel(entry: CacheEntry): string | null {
    if (typeof entry.gzip === 'number') return `${formatKb(entry.gzip)} gzipped`;
    if (typeof entry.min === 'number') return `${formatKb(entry.min)} minified`;
    return null;
}

async function fetchBundlephobia(): Promise<number | null> {
    try {
        const res = await fetch(
            `https://bundlephobia.com/api/size?package=${encodeURIComponent(PACKAGE)}`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as { gzip?: number };
        return typeof data.gzip === 'number' ? data.gzip : null;
    } catch {
        return null;
    }
}

async function fetchLatestVersion(): Promise<string | null> {
    try {
        const res = await fetch(
            `https://data.jsdelivr.com/v1/packages/npm/${PACKAGE}`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as {
            tags?: { latest?: string };
            versions?: { version: string }[];
        };
        return data.tags?.latest ?? data.versions?.[0]?.version ?? null;
    } catch {
        return null;
    }
}

async function fetchDefaultFilePath(version: string): Promise<string | null> {
    try {
        const res = await fetch(
            `https://data.jsdelivr.com/v1/packages/npm/${PACKAGE}@${version}?structure=flat`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as {
            default?: string;
            files?: { name: string; size?: number }[];
        };
        return data.default ?? null;
    } catch {
        return null;
    }
}

async function fetchFileMinSize(
    version: string,
    path: string,
): Promise<number | null> {
    try {
        const res = await fetch(
            `https://data.jsdelivr.com/v1/packages/npm/${PACKAGE}@${version}?structure=flat`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as {
            files?: { name: string; size?: number }[];
        };
        const match = data.files?.find((f) => f.name === path);
        return typeof match?.size === 'number' ? match.size : null;
    } catch {
        return null;
    }
}

async function gzipFile(version: string, path: string): Promise<number | null> {
    if (typeof CompressionStream === 'undefined') return null;
    try {
        const url = `https://cdn.jsdelivr.net/npm/${PACKAGE}@${version}${path}`;
        const res = await fetch(url);
        if (!res.ok || !res.body) return null;
        const compressed = res.body.pipeThrough(new CompressionStream('gzip'));
        const blob = await new Response(compressed).blob();
        return blob.size;
    } catch {
        return null;
    }
}

export function useBundleSize() {
    const label = ref<string | null>(null);

    onMounted(async () => {
        const cached = readCache();
        if (cached) {
            label.value = formatLabel(cached);
            return;
        }

        // 1. Bundlephobia (returns gzip directly)
        const bp = await fetchBundlephobia();
        if (bp !== null) {
            const entry = { gzip: bp, fetchedAt: Date.now() };
            writeCache(entry);
            label.value = formatLabel(entry);
            return;
        }

        // 2. jsdelivr — resolve latest version + default file path
        const version = await fetchLatestVersion();
        if (!version) return;
        const filePath = await fetchDefaultFilePath(version);
        if (!filePath) return;

        // 3. Gzip the file locally via CompressionStream
        const gzip = await gzipFile(version, filePath);
        if (gzip !== null) {
            const entry = { gzip, fetchedAt: Date.now() };
            writeCache(entry);
            label.value = formatLabel(entry);
            return;
        }

        // 4. Fallback: jsdelivr minified size
        const min = await fetchFileMinSize(version, filePath);
        if (min !== null) {
            const entry = { min, fetchedAt: Date.now() };
            writeCache(entry);
            label.value = formatLabel(entry);
        }
    });

    return { label };
}
