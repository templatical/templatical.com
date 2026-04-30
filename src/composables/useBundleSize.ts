import { ref, onMounted } from 'vue';

const PACKAGE = '@templatical/editor';
const CACHE_KEY = 'tpl:bundle-size';
const TTL_MS = 24 * 60 * 60 * 1000;

type CacheEntry = {
    gzip: number;
    fetchedAt: number;
};

function readCache(): CacheEntry | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<CacheEntry>;
        if (typeof parsed.gzip !== 'number' || typeof parsed.fetchedAt !== 'number') return null;
        if (Date.now() - parsed.fetchedAt > TTL_MS) return null;
        return parsed as CacheEntry;
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
    return `${Math.round(bytes / 1024)} KB`;
}

async function fetchBundlejs(): Promise<number | null> {
    try {
        const res = await fetch(
            `https://deno.bundlejs.com/?q=${encodeURIComponent(PACKAGE)}`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as { size?: { rawCompressedSize?: number } };
        return typeof data.size?.rawCompressedSize === 'number' ? data.size.rawCompressedSize : null;
    } catch {
        return null;
    }
}

export function useBundleSize() {
    const label = ref<string | null>(null);

    onMounted(async () => {
        const cached = readCache();
        if (cached) {
            label.value = `${formatKb(cached.gzip)} gzipped`;
            return;
        }

        const gzip = await fetchBundlejs();
        if (gzip !== null) {
            const entry: CacheEntry = { gzip, fetchedAt: Date.now() };
            writeCache(entry);
            label.value = `${formatKb(gzip)} gzipped`;
        }
    });

    return { label };
}
