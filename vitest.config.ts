import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        environment: 'node',
        /*
            Vitest stubs every `.css` import to an empty string unless this is on,
            and the `?raw` query does NOT opt out of that — `import appCss from
            '.../app.css?raw'` silently yields `''`. `tests/styles/contrast.test.ts`
            parses the real token values out of `app.css`, so it needs the source,
            and reading it with `node:fs` is not available here: `@types/node` is not
            installed and tsconfig pins `types` to `vite/client`.
        */
        css: true,
        include: ['tests/**/*.test.ts'],
    },
});
