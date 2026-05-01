import { ref, onMounted } from 'vue';

const PACKAGE = '@templatical/editor';
const CACHE_KEY = 'tpl:bundle-size';
const TTL_MS = 24 * 60 * 60 * 1000;

type CacheEntry = {
    size: string;
    fetchedAt: number;
};

function readCache(): CacheEntry | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<CacheEntry>;
        if (typeof parsed.size !== 'string' || typeof parsed.fetchedAt !== 'number') return null;
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

async function fetchBundlejs(): Promise<string | null> {
    try {
        const res = await fetch(
            `https://deno.bundlejs.com/?q=${encodeURIComponent(PACKAGE)}`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as { size?: { compressedSize?: string } };
        return typeof data.size?.compressedSize === 'string' ? data.size.compressedSize : null;
    } catch {
        return null;
    }
}

export function useBundleSize() {
    const label = ref<string | null>(null);

    onMounted(async () => {
        const cached = readCache();
        if (cached) {
            label.value = `${cached.size} gzipped`;
            return;
        }

        const size = await fetchBundlejs();
        if (size !== null) {
            const entry: CacheEntry = { size, fetchedAt: Date.now() };
            writeCache(entry);
            label.value = `${size} gzipped`;
        }
    });

    return { label };
}
