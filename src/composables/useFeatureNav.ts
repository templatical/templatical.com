import { useEventListener, usePreferredReducedMotion, useResizeObserver } from '@vueuse/core';
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';

/**
 * One entry per section rendered by /features. Every surface that names a
 * feature — the index band, the rail, the jump palette — derives its rows from
 * this list, which `Features.vue` builds from the same `pageSections` computed
 * that renders the sections themselves. Adding a nineteenth section therefore
 * needs no edit here and no locale edit at all, the same discipline `IMPORTERS`
 * enforces for the converters.
 */
export interface FeatureNavItem {
    slug: string;
    eyebrow: string;
    title: string;
    group: 'core' | 'backend';
    /** The section's own checklist, so the palette matches on what a feature
     *  *does* and not only on what it is called. */
    keywords: string[];
}

/** Section anchors are part of the public URL surface: /features#feature-comments. */
export function featureSectionId(slug: string): string {
    return `feature-${slug}`;
}

/**
 * Rows matching `query`, ranked in two bands.
 *
 * A row matches when every term appears somewhere — its name *or* its
 * checklist. Searching the checklist is what makes the palette useful: the
 * words a reader arrives with ("restore", "quota", "unsubscribe") are in the
 * bullets, not in the headings, so "restore" has to reach version history
 * although neither its title nor its eyebrow contains the word.
 *
 * But matching on the checklist alone cannot decide the order. Half the
 * sections mention comments somewhere in their bullets, so a reader typing
 * "comments" in strict page order lands on saving-and-loading — the right
 * section is three rows down, and they typed its name. Rows whose *name*
 * carries every term therefore come first, and page order breaks ties inside
 * each band, so the palette never disagrees with the rail about sequence.
 *
 * The slug counts as part of the name: it is the section's identifier and the
 * anchor in the URL, so someone who has seen /features#feature-comments can
 * type what they saw.
 */
export function matchFeatures(items: FeatureNavItem[], query: string): FeatureNavItem[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return items;
    const terms = trimmed.split(/\s+/);

    const byName: FeatureNavItem[] = [];
    const byChecklist: FeatureNavItem[] = [];

    for (const item of items) {
        const name = `${item.title} ${item.eyebrow} ${item.slug}`.toLowerCase();
        const everything = `${name} ${item.keywords.join(' ')}`.toLowerCase();
        if (!terms.every((term) => everything.includes(term))) continue;
        (terms.every((term) => name.includes(term)) ? byName : byChecklist).push(item);
    }

    return [...byName, ...byChecklist];
}

/**
 * px — the navbar is 84px and sticky, plus 20px so a pinned column does not sit
 * flush against it. Mirrored by `top` on `.feature-col` in `app.css`.
 */
export const COLUMN_STICK_TOP = 104;

/**
 * px of travel below which pinning is not worth doing. A column only 12px
 * shorter than its code block technically pins and visibly does nothing.
 */
const MIN_COLUMN_TRAVEL = 48;

/**
 * Whether a section's prose column should pin while its code block scrolls past.
 *
 * Two conditions, and the second is the whole reason this is measured at runtime
 * rather than written as a height media query. A pinned column taller than the
 * space under the navbar has its own tail permanently off-screen — and the
 * threshold is not a constant across languages. Measured at 1440px wide, the
 * tallest column that would pin is 696px in English but 824px in German, so a
 * fixed `min-height` gate is either wrong for German (clipping it) or set high
 * enough for German that English loses the effect on every 13-inch laptop, where
 * it is provably safe. Measuring each section against the actual viewport is the
 * only version that is never worse in either language, and it stays correct when
 * the copy changes in either one.
 */
export function shouldPinColumn(left: number, right: number, viewportHeight: number): boolean {
    if (right - left < MIN_COLUMN_TRAVEL) return false;
    return left <= viewportHeight - COLUMN_STICK_TOP;
}

/**
 * Shared by the entry that is clicked and the heading it points at — never by
 * both at once, which would make the name ambiguous and skip the transition.
 * The stylesheet targets this literal in `app.css`.
 */
const MORPH_NAME = 'feature-morph';

type DocWithVT = Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => {
        ready: Promise<void>;
        finished: Promise<void>;
    };
};

export function useFeatureNav(items: Ref<FeatureNavItem[]>, stack: Ref<HTMLElement | null>) {
    const activeSlug = ref<string | null>(null);
    /** 0–1 across the section stack only, so the rail's fill lines up with its
     *  own ticks rather than with the whole document. */
    const progress = ref(0);
    const paletteOpen = ref(false);
    const reducedMotion = usePreferredReducedMotion();

    // ── Which section is the reader in ────────────────────────────────────
    // The observer root is squeezed to a thin band across the viewport middle,
    // so "active" means "crossing the middle of the screen" rather than "any
    // part is on screen" — with 1200px sections the latter is true of three at
    // once and the rail flickers between them.
    const onScreen = new Set<string>();
    let observer: IntersectionObserver | null = null;

    function syncActive() {
        const first = items.value.find((item) => onScreen.has(item.slug));
        // Between two sections nothing crosses the band; hold the last one
        // rather than blanking the rail in every gutter.
        if (first) activeSlug.value = first.slug;
    }

    function observeSections() {
        observer?.disconnect();
        onScreen.clear();
        if (typeof IntersectionObserver === 'undefined') return;
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const slug = (entry.target as HTMLElement).dataset.featureSlug;
                    if (!slug) continue;
                    if (entry.isIntersecting) onScreen.add(slug);
                    else onScreen.delete(slug);
                }
                syncActive();
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
        );
        for (const item of items.value) {
            const el = document.getElementById(featureSectionId(item.slug));
            if (el) observer.observe(el);
        }
    }

    // ── How far through the stack ─────────────────────────────────────────
    // Deliberately not `animation-timeline: scroll()`: that timeline measures
    // the whole document, which includes the hero and the closing CTA, so its
    // fill would disagree with the ticks it sits behind. A named view-timeline
    // would be exact but needs `timeline-scope` to reach a fixed element, which
    // Firefox does not ship. One property write per frame is the honest cost.
    let queued = false;
    let lastViewportHeight = 0;
    function measureProgress() {
        const el = stack.value;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        progress.value = travel <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / travel));
    }
    function queueMeasure() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            measureProgress();
            // Belt and braces for the pinned columns below. `resize` is the
            // proper signal for a viewport-height change and normally drives
            // that sync, but a column left pinned after the window got shorter
            // is precisely the failure the measurement exists to prevent, and
            // one integer compare per already-throttled scroll frame is a
            // cheaper guarantee than trusting a single event to always arrive.
            if (window.innerHeight !== lastViewportHeight) {
                lastViewportHeight = window.innerHeight;
                syncStickyColumns();
            }
        });
    }

    // The rail belongs to the stack, not to the page: it is noise over the hero
    // and over the closing CTA, which are not sections it can point at.
    const stackInView = ref(false);
    let stackObserver: IntersectionObserver | null = null;

    // ── Pinning the prose beside a taller code block ──────────────────────
    // Nine of the eighteen sections have a code block taller than the prose
    // next to it — up to 584px of dead column on `comments`. Pinning the prose
    // closes that gap and makes the section read as one held scene.
    //
    // `shouldPinColumn` decides per section, per resize; the stylesheet only
    // honours the flag above `lg`, where the layout is two columns at all.
    let stickyQueued = false;
    let gridObserver: ResizeObserver | null = null;

    function syncStickyColumns() {
        const twoColumn =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(min-width: 1024px)').matches;
        for (const item of items.value) {
            const section = document.getElementById(featureSectionId(item.slug));
            const grid = section?.querySelector<HTMLElement>('[data-feature-grid]');
            if (!section || !grid) continue;
            const [left, right] = Array.from(grid.children) as HTMLElement[];
            if (!left || !right) continue;
            const pin =
                twoColumn &&
                shouldPinColumn(
                    left.getBoundingClientRect().height,
                    right.getBoundingClientRect().height,
                    window.innerHeight,
                );
            section.toggleAttribute('data-feature-sticky', pin);
        }
    }

    function queueStickySync() {
        if (stickyQueued) return;
        stickyQueued = true;
        requestAnimationFrame(() => {
            stickyQueued = false;
            syncStickyColumns();
        });
    }

    onMounted(() => {
        observeSections();
        measureProgress();
        // Scroll snapping has to live on the scroll container, which is <html>,
        // so it is flagged for as long as this route is mounted rather than set
        // globally. Toggled directly rather than through `useHead`, because
        // `useDarkMode` owns the same class attribute and the two must not
        // fight over it.
        document.documentElement.classList.add('feature-snap');
        lastViewportHeight = window.innerHeight;
        syncStickyColumns();
        if (typeof ResizeObserver !== 'undefined') {
            // The grids, not the window: the code blocks are highlighted by
            // Shiki after mount, so their height arrives late, and a locale
            // switch changes the prose height without any resize event at all.
            gridObserver = new ResizeObserver(queueStickySync);
            for (const item of items.value) {
                const grid = document
                    .getElementById(featureSectionId(item.slug))
                    ?.querySelector('[data-feature-grid]');
                if (grid) gridObserver.observe(grid);
            }
        }
        if (typeof IntersectionObserver !== 'undefined' && stack.value) {
            stackObserver = new IntersectionObserver(
                ([entry]) => (stackInView.value = entry?.isIntersecting ?? false),
                { threshold: 0 },
            );
            stackObserver.observe(stack.value);
        }
    });
    onBeforeUnmount(() => {
        observer?.disconnect();
        stackObserver?.disconnect();
        gridObserver?.disconnect();
        document.documentElement.classList.remove('feature-snap');
    });
    watch(() => items.value.map((i) => i.slug).join('|'), observeSections);

    useEventListener(typeof window !== 'undefined' ? window : null, 'scroll', queueMeasure, {
        passive: true,
    });
    useEventListener(typeof window !== 'undefined' ? window : null, 'resize', () => {
        queueMeasure();
        // Viewport height is half of the pin decision: a window short enough to
        // clip a column has to give the pinning up again.
        queueStickySync();
    });
    useResizeObserver(stack, queueMeasure);

    // ── Jumping ───────────────────────────────────────────────────────────
    function focusHeading(heading: HTMLElement | null) {
        // The heading carries tabindex="-1" so a keyboard jump lands inside the
        // section it asked for instead of continuing from the control it left.
        heading?.focus({ preventScroll: true });
    }

    /**
     * Scroll to a section. When `source` is an element that reads as the
     * section's name — an index row, a palette row — it morphs into the real
     * heading on the way there; the rail passes none, because a 2px tick
     * morphing into a 40px headline reads as a glitch rather than a link.
     *
     * The name has to move between the two elements *inside* the callback:
     * the old snapshot is taken before it runs and the new one after, so the
     * source owns the name in the first and the heading owns it in the second.
     * Holding it on both at once is what makes a transition silently skip.
     *
     * `commit` is any other DOM change the jump implies — closing the palette,
     * say. It has to run in the same callback for the same reason: close the
     * palette first and the row being morphed is gone before its snapshot is
     * taken.
     */
    function jumpTo(
        slug: string,
        options: { source?: HTMLElement | null; commit?: () => void } = {},
    ) {
        const { source, commit } = options;
        const section = document.getElementById(featureSectionId(slug));
        if (!section) {
            commit?.();
            return;
        }
        const heading = section.querySelector<HTMLElement>('[data-feature-heading]');
        const doc = document as DocWithVT;
        const canMorph =
            !!source &&
            !!heading &&
            reducedMotion.value !== 'reduce' &&
            typeof doc.startViewTransition === 'function';

        if (!canMorph) {
            commit?.();
            section.scrollIntoView({ block: 'start' });
            // Deferred by a frame, unlike the morph path where `finished`
            // already provides the gap. `commit` closing the palette is a Vue
            // state change, so the dialog does not actually close until the
            // flush — and closing a modal returns focus to whatever opened it.
            // Focusing the heading synchronously here gets silently undone, and
            // a keyboard reader lands on <body> with their next Tab starting
            // from the top of the document.
            requestAnimationFrame(() => focusHeading(heading));
            return;
        }

        const root = document.documentElement;
        source!.style.viewTransitionName = MORPH_NAME;
        root.dataset.featureJump = '';

        const cleanup = () => {
            heading!.style.viewTransitionName = '';
            source!.style.viewTransitionName = '';
            delete root.dataset.featureJump;
            focusHeading(heading);
        };

        const transition = doc.startViewTransition!(() => {
            source!.style.viewTransitionName = '';
            heading!.style.viewTransitionName = MORPH_NAME;
            commit?.();
            // Instant, not smooth: the transition animates between the two
            // captured frames itself, and a concurrent smooth scroll would
            // leave the new snapshot mid-flight.
            section.scrollIntoView({ block: 'start', behavior: 'instant' });
        });
        // Not `.finally()` — that re-raises a skipped transition's rejection as
        // an unhandled one, and a skip still needs the names taken back off.
        transition.finished.then(cleanup, cleanup);
        // `ready` rejects on a skip too — a second jump before this one settles,
        // or the tab hidden mid-flight. Nothing here needs to react, but an
        // unobserved rejection still surfaces as `Uncaught (in promise)
        // InvalidStateError` in the console, and a page arguing for craft cannot
        // log errors while it does it.
        transition.ready.catch(() => {});
    }

    // ── The palette's shortcut ────────────────────────────────────────────
    // Resolved on the client only: vite-ssg prerenders this route in Node, and
    // a label baked from the build machine's platform would be wrong for most
    // readers. Until it resolves, the non-Mac legend is the honest default.
    const isApple = ref(false);
    onMounted(() => {
        const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
        // Case-insensitive: navigator.platform says "MacIntel" but
        // userAgentData.platform says "macOS", and a case-sensitive /Mac/
        // silently showed every Mac the Ctrl legend.
        isApple.value = /mac|iphone|ipad|ipod/i.test(
            nav.userAgentData?.platform || nav.platform || nav.userAgent,
        );
    });
    const shortcutLabel = computed(() => (isApple.value ? '\u2318K' : 'Ctrl K'));

    // Explicitly typed: with a possibly-null target the overload resolves to
    // the bare `Event` signature and the modifier keys fall off.
    useEventListener(
        typeof window !== 'undefined' ? window : null,
        'keydown',
        (event: KeyboardEvent) => {
            if (event.key !== 'k' && event.key !== 'K') return;
            if (!event.metaKey && !event.ctrlKey) return;
            if (event.altKey || event.shiftKey) return;
            event.preventDefault();
            paletteOpen.value = !paletteOpen.value;
        },
    );

    return { activeSlug, progress, stackInView, paletteOpen, shortcutLabel, jumpTo };
}
