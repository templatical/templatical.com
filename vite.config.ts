import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
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

export default defineConfig(async () => ({
    define: {
        __BUNDLE_SIZE__: JSON.stringify(await fetchBundleSize()),
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [vue(), tailwindcss()],
}));
