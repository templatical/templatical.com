import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const BUNDLE_PACKAGE = '@templatical/editor';

async function fetchBundleSize(): Promise<string | null> {
    try {
        const res = await fetch(
            `https://deno.bundlejs.com/?q=${encodeURIComponent(BUNDLE_PACKAGE)}`,
            { signal: AbortSignal.timeout(30_000) },
        );
        if (!res.ok) return null;
        const data = (await res.json()) as { size?: { compressedSize?: string } };
        return typeof data.size?.compressedSize === 'string' ? data.size.compressedSize : null;
    } catch {
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
