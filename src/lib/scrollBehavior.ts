import type { RouterScrollBehavior } from 'vue-router';

/**
 * <html>'s computed `scroll-padding-top` in px, set in app.css. 0 where there is no
 * document (vite-ssg imports main.ts to prerender, in Node) and for a value that
 * is not a length (`auto`, the property's initial value).
 */
function scrollPaddingTop(): number {
    if (typeof document === 'undefined') return 0;
    return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
}

/**
 * Without this, vue-router leaves the window where it was, so following a
 * footer link from the bottom of a long page lands you mid-content on the
 * next one — which is how every /alternatives page behaved.
 *
 * `savedPosition` is only populated on browser back/forward, where restoring
 * the previous offset is the expected behaviour rather than a bug. A hash
 * target wins over both so in-page anchors keep working.
 *
 * A hash target carries `top` because vue-router scrolls to an `{ el }` itself:
 * it measures the element and calls `window.scrollTo`, so CSS `scroll-padding`
 * never applies, and the target would land at the top of the viewport under the
 * sticky header. vue-router subtracts `top` from the element's position. The
 * padding is read at scroll time, after the new route has rendered, so app.css
 * stays the only owner of the number.
 */
export const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: scrollPaddingTop() };
    return { top: 0 };
};
