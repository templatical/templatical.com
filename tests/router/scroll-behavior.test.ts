import { afterEach, describe, expect, it, vi } from 'vitest';
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import { scrollBehavior } from '@/lib/scrollBehavior';

/*
    vue-router scrolls to a `{ el }` target itself: it measures the element and calls
    `window.scrollTo`, so CSS `scroll-padding-top` never applies and an in-site #anchor
    lands at the very top of the viewport, under the sticky header. The offset has to be
    handed to it as `top`, and app.css is the one owner of the number (84px for the
    navbar), so the behaviour reads it
    off <html> at scroll time rather than repeating it here.

    The tests run in Node, where there is no document, which is also the prerender case:
    vite-ssg imports main.ts at build time.
*/

const MAIN = (
    import.meta.glob('../../src/main.ts', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>
)['../../src/main.ts'];

const FROM = { path: '/' } as RouteLocationNormalizedLoaded;

function to(hash = ''): RouteLocationNormalized {
    return { path: '/features', hash } as RouteLocationNormalized;
}

/** A document whose <html> computes `scroll-padding-top` to `padding`. */
function stubDocument(padding: string) {
    const documentElement = { tagName: 'HTML' };
    const read = vi.fn((_el: unknown) => ({ scrollPaddingTop: padding }));
    vi.stubGlobal('document', { documentElement });
    vi.stubGlobal('getComputedStyle', read);
    return { documentElement, read };
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('scrollBehavior', () => {
    it('restores the saved position on back and forward, even with a hash', () => {
        stubDocument('132px');
        const saved = { left: 0, top: 2400 };
        expect(scrollBehavior(to('#beta'), FROM, saved)).toBe(saved);
    });

    it('offsets a hash target by the scroll padding <html> computes', () => {
        const { documentElement, read } = stubDocument('132px');
        expect(scrollBehavior(to('#beta'), FROM, null)).toEqual({ el: '#beta', top: 132 });
        expect(read).toHaveBeenCalledWith(documentElement);
    });

    it('follows the padding to whatever app.css sets it to', () => {
        stubDocument('84px');
        expect(scrollBehavior(to('#feature-comments'), FROM, null)).toEqual({
            el: '#feature-comments',
            top: 84,
        });
    });

    it('scrolls to the top when there is no hash', () => {
        stubDocument('132px');
        expect(scrollBehavior(to(), FROM, null)).toEqual({ top: 0 });
    });

    it('uses no offset where there is no document', () => {
        expect(typeof document).toBe('undefined');
        expect(scrollBehavior(to('#beta'), FROM, null)).toEqual({ el: '#beta', top: 0 });
    });

    it('uses no offset when the padding is not a length', () => {
        // `auto` is the property's initial value.
        stubDocument('auto');
        expect(scrollBehavior(to('#beta'), FROM, null)).toEqual({ el: '#beta', top: 0 });
    });

    it('is the behaviour main.ts hands to vite-ssg', () => {
        expect(MAIN).toMatch(/import \{ scrollBehavior \} from '@\/lib\/scrollBehavior';/);
        expect(MAIN).toMatch(/^\s+scrollBehavior,$/m);
        // An inline copy would scroll without the offset again.
        expect(MAIN).not.toMatch(/el:\s*to\.hash/);
    });
});
