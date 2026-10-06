import { describe, expect, it } from 'vitest';
import indexHtml from '../../index.html?raw';
import pkg from '../../package.json';

describe('head ownership', () => {
    it('leaves title, description and social tags to unhead', () => {
        expect(indexHtml).not.toMatch(/<title>|name="description"|property="og:|name="twitter:/);
    });
});

/*
    vite-ssg bundles its own entry into the server build, so its createHead()
    resolves to this app's @unhead/vue, while its prerender step renders that
    head with vite-ssg's own @unhead/dom 2. @unhead/dom 2 writes nothing for a
    head created by @unhead/vue 3, and no error is raised: on another major,
    every page's title and description silently drop out of the prerendered
    HTML. Move both pins together.
*/
describe('@unhead/vue', () => {
    it('stays on the version vite-ssg renders heads with', () => {
        expect(pkg.dependencies['@unhead/vue']).toBe('2.1.17');
        expect(pkg.devDependencies['vite-ssg']).toBe('28.3.0');
    });
});
