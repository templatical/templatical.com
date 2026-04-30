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

type PackageFiles = {
    defaultPath: string | null;
    minSize: number | null;
};

async function fetchPackageFiles(version: string): Promise<PackageFiles | null> {
    try {
        const res = await fetch(
            `https://data.jsdelivr.com/v1/packages/npm/${PACKAGE}@${version}?structure=flat`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as {
            default?: string;
            files?: { name: string; size?: number }[];
        };
        const defaultPath = data.default ?? null;
        const match = defaultPath
            ? data.files?.find((f) => f.name === defaultPath)
            : null;
        return {
            defaultPath,
            minSize: typeof match?.size === 'number' ? match.size : null,
        };
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

        const commit = (entry: CacheEntry) => {
            writeCache(entry);
            label.value = formatLabel(entry);
        };

        const [bp, version] = await Promise.all([
            fetchBundlephobia(),
            fetchLatestVersion(),
        ]);

        if (bp !== null) {
            commit({ gzip: bp, fetchedAt: Date.now() });
            return;
        }

        if (!version) return;
        const files = await fetchPackageFiles(version);
        if (!files?.defaultPath) return;

        const gzip = await gzipFile(version, files.defaultPath);
        if (gzip !== null) {
            commit({ gzip, fetchedAt: Date.now() });
            return;
        }

        if (files.minSize !== null) {
            commit({ min: files.minSize, fetchedAt: Date.now() });
        }
    });

    return { label };
}
