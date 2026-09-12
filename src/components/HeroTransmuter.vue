<!--
    The /importers hero panel: one real conversion, animated.

    Everything on screen came out of a published converter — see
    src/lib/importerSamples.ts for provenance and how to regenerate. Nothing here
    is illustrative: the two panes are windows on a real fixture and the real
    `content` it produced, the counts are the verbatim `report.summary`, and the
    warning is the verbatim first warning. That is the whole point; if you find
    yourself hand-writing a value into this component, stop.

    Two things are load-bearing and fail quietly:

      1. `carried` values are what the highlight marks. A value is only in that
         array when it appears verbatim in BOTH windows (tests assert this), so
         the panel can never mark a correspondence the conversion did not make.
      2. The static render is the real fallback. vite-ssg prerenders this route,
         the tokenizer is synchronous, and no animation is required to read the
         panel — which is exactly the no-JS and reduced-motion state.

    The panel rotates on its own, stops while the pointer is over it or focus is
    inside it, and can be stopped outright with the control in the report strip.
    That control sits down there rather than on the rail on purpose: it is panel
    chrome, and beside eight source names it read as a ninth tab.
-->
<script setup lang="ts">
import { IMPORTERS } from '@/lib/importers';
import { IMPORTER_SAMPLES } from '@/lib/importerSamples';
import { tokenize } from '@/lib/codeTokens';
import { Pause, Play, TriangleAlert } from '@lucide/vue';
import {
    useElementHover,
    useFocusWithin,
    useIntersectionObserver,
    useIntervalFn,
    usePreferredReducedMotion,
} from '@vueuse/core';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/**
 * The rotation and the intro are coupled: the intro now runs to roughly 2.4s, so
 * a 3s cycle left well under a second to actually read the code. 6s gives ~3.6s
 * of rest on each sample, which is the part that makes it legible.
 */
const CYCLE_MS = 6000;
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Source wipes in, then the target follows — the gap IS the argument, so it is
 *  long enough to register as a pause rather than as a stagger. */
const SOURCE_DELAY = 0;
const TARGET_DELAY = 850;
const STAGE_MS = 800;
/** One synchronised pulse across both panes once the target has landed, so the
 *  pairing reads as a pairing rather than as two tinted lists. */
const PULSE_DELAY = TARGET_DELAY + STAGE_MS - 60;
const PULSE_MS = 760;

const entries = IMPORTERS.map((importer) => ({
    ...importer,
    sample: IMPORTER_SAMPLES[importer.slug],
}));

const index = ref(0);
const active = computed(() => entries[index.value]);

const sourceLines = computed(() =>
    tokenize(active.value.sample.source, active.value.sample.lang, active.value.sample.carried),
);
const targetLines = computed(() =>
    tokenize(active.value.sample.target, 'json', active.value.sample.carried),
);

const segments = computed(() => {
    const { total, converted, approximated, htmlFallback, skipped } = active.value.sample.report;
    return (
        [
            { key: 'converted', count: converted },
            { key: 'approximated', count: approximated },
            { key: 'htmlFallback', count: htmlFallback },
            { key: 'skipped', count: skipped },
        ] as const
    )
        .filter((segment) => segment.count > 0)
        .map((segment) => ({ ...segment, percent: (segment.count / total) * 100 }));
});

const root = ref<HTMLElement | null>(null);
const panel = ref<HTMLElement | null>(null);
const sourceStage = ref<HTMLElement | null>(null);
const targetStage = ref<HTMLElement | null>(null);
const bridge = ref<HTMLElement | null>(null);
const bar = ref<HTMLElement | null>(null);

const paused = ref(false);
const reducedMotion = usePreferredReducedMotion();
const isReduced = computed(() => reducedMotion.value === 'reduce');
const hovered = useElementHover(root);
const { focused } = useFocusWithin(root);
const onScreen = ref(false);

useIntersectionObserver(
    root,
    ([entry]) => {
        onScreen.value = entry.isIntersecting;
    },
    { threshold: 0.25 },
);

// Three ways the rotation stops, and they are not the same kind of thing. Hover
// and focus hold it only while they last, so a reader studying one sample never
// has it swapped out mid-read. `paused` latches, and is the explicit WCAG 2.2.2
// control. Picking a source from the rail latches too — deliberately: the button
// then reads Play, so the way back is visible.
const cycling = computed(
    () => !paused.value && !hovered.value && !focused.value && onScreen.value && !isReduced.value,
);

function select(next: number): void {
    index.value = next;
    paused.value = true;
}

const { pause: stopTimer, resume: startTimer } = useIntervalFn(
    () => {
        index.value = (index.value + 1) % entries.length;
    },
    CYCLE_MS,
    { immediate: false },
);

watch(
    cycling,
    (on) => {
        if (on) startTimer();
        else stopTimer();
    },
    { immediate: true },
);

/**
 * Drop a finished animation instead of leaving it filled.
 *
 * A filled animation holds the element on its own composited layer for good —
 * with `filter` or `clip-path` in the keyframes that layer can paint empty in a
 * screenshot even though the DOM reports `opacity: 1`. And `play()` runs on
 * every cycle, so without this each pass stacks another filled animation on the
 * same nodes and they never go away. Every keyframe list here ends on the
 * element's resting style, so cancelling at the end is visually a no-op.
 */
function settle(animation: Animation): void {
    animation.onfinish = () => animation.cancel();
}

/** Reveal and slide, stacked on one element: a left-edge wipe plus a short
 *  travel from the left, so the pane arrives rather than just appearing. */
function slideIn(element: HTMLElement, delay: number): void {
    settle(
        element.animate(
            [
                {
                    opacity: 0,
                    transform: 'translateX(-22px)',
                    clipPath: 'inset(0 100% 0 0)',
                },
                {
                    opacity: 1,
                    transform: 'translateX(0px)',
                    clipPath: 'inset(0 0% 0 0)',
                },
            ],
            { duration: STAGE_MS, delay, easing: SPRING, fill: 'both' },
        ),
    );
}

function play(): void {
    const source = sourceStage.value;
    const target = targetStage.value;
    if (!source || !target) return;
    if (isReduced.value) return;

    // Source first, target after a beat. The pause between them is the whole
    // point: one document goes in, the other comes out.
    slideIn(source, SOURCE_DELAY);
    if (bridge.value) slideIn(bridge.value, TARGET_DELAY - 180);
    slideIn(target, TARGET_DELAY);

    // Carried values are already tinted at rest. This brightens them in BOTH
    // panes at the same instant, once the target has landed — that simultaneity
    // is what reads as "these two are the same value", with nothing flying.
    //
    // The two colours are READ from the computed style rather than written as
    // `var(--tm-carry-bg)` in the keyframes: `element.animate()` does not
    // substitute custom properties, so a `var()` keyframe is dropped silently
    // and the pulse simply never happens. Reading them per run also means a
    // theme switch is picked up without re-registering anything.
    const panelStyle = getComputedStyle(panel.value ?? source);
    const rest = panelStyle.getPropertyValue('--tm-carry-bg').trim();
    const peak = panelStyle.getPropertyValue('--tm-carry-peak').trim();
    if (rest && peak) {
        const carried = [
            ...source.querySelectorAll<HTMLElement>('[data-carry]'),
            ...target.querySelectorAll<HTMLElement>('[data-carry]'),
        ];
        for (const token of carried) {
            settle(
                token.animate(
                    [
                        { backgroundColor: rest },
                        { backgroundColor: peak, offset: 0.35 },
                        { backgroundColor: rest },
                    ],
                    {
                        duration: PULSE_MS,
                        delay: PULSE_DELAY,
                        easing: 'ease-in-out',
                        fill: 'both',
                    },
                ),
            );
        }
    }

    // The report wipes in last. clip-path on the container, not width on the
    // four segments: they are already laid out, so nothing here touches layout.
    if (bar.value) {
        settle(
            bar.value.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
                duration: 620,
                delay: PULSE_DELAY + 80,
                easing: SPRING,
                fill: 'both',
            }),
        );
    }
}

watch(
    [index, onScreen],
    async () => {
        if (!onScreen.value) return;
        await nextTick();
        play();
    },
    { flush: 'post' },
);
</script>

<template>
    <div ref="root" class="tm" role="region" :aria-label="t('importers.transmuter.label')">
        <div ref="panel" class="tm-panel relative overflow-hidden rounded-2xl">
            <div
                class="tm-rail flex flex-wrap items-center gap-x-1 gap-y-1 px-3 py-2.5"
                role="group"
                :aria-label="t('importers.transmuter.tablist')"
            >
                <button
                    v-for="(entry, i) in entries"
                    :key="entry.slug"
                    type="button"
                    :aria-pressed="i === index"
                    class="tm-tab"
                    :class="i === index ? 'tm-tab--on' : ''"
                    @click="select(i)"
                >
                    {{ entry.name }}
                </button>
            </div>

            <div class="flex flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
                <!-- Caption and pane animate as ONE stage, so a label never arrives
                     ahead of the code it labels. -->
                <div ref="sourceStage" class="flex flex-col gap-2">
                    <p class="tm-cap">
                        <!-- "What BeeFree saved" is right for a hosted editor and
                             wrong for a format — nothing "saves" MJML, you write it. -->
                        <span>{{
                            active.group === 'markup'
                                ? t('importers.transmuter.sourceCaptionMarkup', {
                                      name: active.name,
                                  })
                                : t('importers.transmuter.sourceCaption', {
                                      name: active.name,
                                  })
                        }}</span>
                        <span class="tm-cap-meta">{{ active.sample.lang }}</span>
                    </p>
                    <pre class="tm-pane"><code><span
                        v-for="(line, l) in sourceLines"
                        :key="l"
                        class="tm-line"
                    ><span
                        v-for="(token, k) in line"
                        :key="k"
                        :class="['tm-t', `tm-${token.k}`, token.carry !== undefined ? 'tm-carry' : '']"
                        :data-carry="token.carry"
                    >{{ token.t }}</span>{{ '\n' }}</span></code></pre>
                </div>

                <div ref="bridge" class="tm-bridge">
                    <span class="tm-bridge-line" aria-hidden="true" />
                    <span class="tm-bridge-pkg">{{ active.sample.pkg }}</span>
                    <span class="tm-bridge-line" aria-hidden="true" />
                </div>

                <div ref="targetStage" class="flex flex-col gap-2">
                    <p class="tm-cap">
                        <span>{{ t('importers.transmuter.targetCaption') }}</span>
                        <span class="tm-cap-meta">json</span>
                    </p>
                    <pre class="tm-pane"><code><span
                        v-for="(line, l) in targetLines"
                        :key="`${index}-${l}`"
                        class="tm-line"
                    ><span
                        v-for="(token, k) in line"
                        :key="k"
                        :class="['tm-t', `tm-${token.k}`, token.carry !== undefined ? 'tm-carry' : '']"
                        :data-carry="token.carry"
                    >{{ token.t }}</span>{{ '\n' }}</span></code></pre>
                </div>
            </div>

            <div class="tm-report flex flex-col gap-2 px-3 py-2.5 sm:px-4">
                <div ref="bar" class="tm-bar flex h-1 overflow-hidden rounded-full">
                    <span
                        v-for="segment in segments"
                        :key="segment.key"
                        :class="['tm-seg', `tm-seg--${segment.key}`]"
                        :style="{ width: `${segment.percent}%` }"
                        aria-hidden="true"
                    />
                </div>
                <div class="flex items-start gap-3">
                    <p class="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-[11px]/4">
                        <span class="tm-total">{{
                            t('importers.transmuter.report.blocks', {
                                count: active.sample.report.total,
                            })
                        }}</span>
                        <span v-for="segment in segments" :key="segment.key" class="tm-legend">
                            <span
                                :class="['tm-dot', `tm-seg--${segment.key}`]"
                                aria-hidden="true"
                            />
                            {{
                                t(`importers.transmuter.report.${segment.key}`, {
                                    count: segment.count,
                                })
                            }}
                        </span>
                    </p>
                    <button
                        type="button"
                        class="tm-ctl"
                        :aria-label="
                            paused
                                ? t('importers.transmuter.play')
                                : t('importers.transmuter.pause')
                        "
                        :aria-pressed="paused"
                        @click="paused = !paused"
                    >
                        <Play v-if="paused" class="size-3" aria-hidden="true" />
                        <Pause v-else class="size-3" aria-hidden="true" />
                    </button>
                </div>
                <!--
                    Verbatim converter output, not site copy — so it stays in the
                    converter's own language, like the code above it. It is also the
                    one line here that can name a competitor's capability, which is
                    why the page footnote pins the version and date it was produced
                    at. Drop `warning` from the sample type to remove this entirely.
                -->
                <p class="tm-warn">
                    <template v-if="active.sample.warning">
                        <TriangleAlert class="mt-px size-3.5 shrink-0" aria-hidden="true" />
                        <span>{{ active.sample.warning }}</span>
                    </template>
                    <template v-else>
                        <span class="tm-clean">{{ t('importers.transmuter.report.clean') }}</span>
                    </template>
                </p>
            </div>
        </div>

        <p class="mt-3 text-[11px]/5 text-neutral-500 dark:text-neutral-400">
            <!-- No version here on purpose: converter versions move every release
                 and repeating one under all eight samples is eight things to
                 re-verify. The single dated pin lives in the page footnote. -->
            {{ t('importers.transmuter.excerpt', { pkg: active.sample.pkg }) }}
        </p>
    </div>
</template>

<style scoped>
/*
    Dark overrides are written `.dark .x`, NOT `:global(.dark) .x`. Vue's scoped
    transform turns the latter into a bare `.dark`, dropping the element entirely
    — which puts every token on <html> while the element keeps its own light
    value, and the panel renders white in dark mode. Verified in the browser, and
    `tests/styles/scoped-css.test.ts` now fails the build on it repo-wide.

    One hue family only — the warm primary at 55 and warm neutrals at 55–60. Code
    highlighting normally reaches for a second and third hue; here the kinds are
    separated by lightness and weight instead, which is what keeps the panel
    looking like this site rather than like an embedded editor.

    Every value below is a foreground on `--tm-pane` and clears 4.5:1 there,
    punctuation included — it is small text, and small text that happens to be
    syntax is still text.
*/
.tm {
    --tm-panel: oklch(99.2% 0.003 60);
    --tm-pane: oklch(100% 0 0);
    --tm-edge: oklch(92% 0.006 55);
    --tm-track: oklch(94% 0.005 60);

    --tm-plain: oklch(38% 0.015 60);
    --tm-key: oklch(45% 0.128 45);
    --tm-string: oklch(46% 0.02 60);
    --tm-number: oklch(38% 0.015 60);
    --tm-literal: oklch(45% 0.128 45);
    --tm-punct: oklch(55% 0.014 60);
    --tm-tag: oklch(45% 0.128 45);
    --tm-attr: oklch(46% 0.02 60);

    --tm-carry-bg: oklch(70% 0.16 55 / 0.16);
    --tm-carry-rule: oklch(58% 0.15 50 / 0.55);
    --tm-carry-peak: oklch(70% 0.16 55 / 0.34);
}
.dark .tm {
    --tm-panel: oklch(17.5% 0.009 55);
    --tm-pane: oklch(13.5% 0.007 55);
    --tm-edge: oklch(27% 0.012 55);
    --tm-track: oklch(24% 0.01 55);

    --tm-plain: oklch(80% 0.012 60);
    --tm-key: oklch(80% 0.11 55);
    --tm-string: oklch(72% 0.018 60);
    --tm-number: oklch(80% 0.012 60);
    --tm-literal: oklch(80% 0.11 55);
    --tm-punct: oklch(62% 0.014 60);
    --tm-tag: oklch(80% 0.11 55);
    --tm-attr: oklch(72% 0.018 60);

    --tm-carry-bg: oklch(75% 0.15 55 / 0.2);
    --tm-carry-rule: oklch(80% 0.13 55 / 0.6);
    --tm-carry-peak: oklch(75% 0.15 55 / 0.4);
}

.tm-panel {
    background: var(--tm-panel);
    /* Hairline ring and drop shadow in one declaration — a second box-shadow
       rule from a utility class would be overridden by this one, not merged. */
    box-shadow:
        0 0 0 1px var(--tm-edge),
        0 10px 30px -12px oklch(25% 0.03 55 / 0.16),
        0 3px 8px -4px oklch(25% 0.03 55 / 0.1);
}
.dark .tm-panel {
    box-shadow:
        0 0 0 1px var(--tm-edge),
        0 14px 36px -12px oklch(0% 0 0 / 0.6),
        0 4px 10px -4px oklch(0% 0 0 / 0.45);
}
.tm-rail {
    border-bottom: 1px solid var(--tm-edge);
}
.tm-report {
    border-top: 1px solid var(--tm-edge);
}
.tm-bar {
    background: var(--tm-track);
}

.tm-tab {
    flex: 1 1 auto;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    font-size: 11px;
    line-height: 1rem;
    color: oklch(48% 0.016 60);
    transition:
        color 160ms ease,
        background-color 160ms ease;
}
.tm-tab:hover {
    background: oklch(95% 0.005 60);
    color: oklch(30% 0.015 60);
}
.tm-tab--on,
.tm-tab--on:hover {
    background: oklch(70% 0.16 55 / 0.14);
    color: oklch(42% 0.13 45);
    font-weight: 500;
}
.dark .tm-tab {
    color: oklch(68% 0.014 60);
}
.dark .tm-tab:hover {
    background: oklch(24% 0.01 55);
    color: oklch(92% 0.006 60);
}
.dark .tm-tab--on,
.dark .tm-tab--on:hover {
    background: oklch(75% 0.15 55 / 0.18);
    color: oklch(84% 0.11 55);
}

.tm-ctl {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 0.3rem;
    color: oklch(48% 0.016 60);
    transition:
        color 160ms ease,
        background-color 160ms ease;
}
.tm-ctl:hover {
    background: oklch(95% 0.005 60);
    color: oklch(30% 0.015 60);
}
.dark .tm-ctl {
    color: oklch(68% 0.014 60);
}
.dark .tm-ctl:hover {
    background: oklch(24% 0.01 55);
    color: oklch(92% 0.006 60);
}

.tm-ctl {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    margin-top: -1px;
    border-radius: 5px;
    padding: 0.25rem;
    color: oklch(58% 0.016 60);
    transition:
        color 160ms ease,
        background-color 160ms ease;
}
.tm-ctl:hover {
    background: oklch(95% 0.005 60);
    color: oklch(30% 0.015 60);
}
.dark .tm-ctl {
    color: oklch(64% 0.014 60);
}
.dark .tm-ctl:hover {
    background: oklch(24% 0.01 55);
    color: oklch(92% 0.006 60);
}

.tm-tab:focus-visible,
.tm-ctl:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.tm-cap {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 10px;
    line-height: 1rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: oklch(50% 0.016 60);
}
.dark .tm-cap {
    color: oklch(66% 0.014 60);
}
.tm-cap-meta {
    font-family: var(--font-mono, ui-monospace, monospace);
    letter-spacing: 0;
    text-transform: none;
    opacity: 0.75;
}

.tm-pane {
    overflow-x: auto;
    border-radius: 10px;
    background: var(--tm-pane);
    padding: 0.625rem 0.75rem;
    box-shadow: inset 0 0 0 1px var(--tm-edge);
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: 10px;
    line-height: 1.125rem;
    font-variant-ligatures: none;
    tab-size: 2;
}
@media (min-width: 640px) {
    .tm-pane {
        font-size: 12px;
        line-height: 1.25rem;
    }
}
.tm-line {
    display: block;
    min-height: 1.125rem;
}
@media (min-width: 640px) {
    .tm-line {
        min-height: 1.25rem;
    }
}
.tm-t {
    white-space: pre;
}
.tm-plain {
    color: var(--tm-plain);
}
.tm-key {
    color: var(--tm-key);
    font-weight: 500;
}
.tm-string {
    color: var(--tm-string);
}
.tm-number {
    color: var(--tm-number);
}
.tm-literal {
    color: var(--tm-literal);
}
.tm-punct {
    color: var(--tm-punct);
}
.tm-tag {
    color: var(--tm-tag);
    font-weight: 500;
}
.tm-attr {
    color: var(--tm-attr);
}

/* Carried values are tinted in BOTH panes, at rest. That is deliberate: with no
   JS and under reduced motion the panel still says which values came through,
   so the static state carries the same information the flight does. */
.tm-carry {
    border-radius: 3px;
    background-color: var(--tm-carry-bg);
    box-shadow: inset 0 -1px 0 0 var(--tm-carry-rule);
    padding: 0 1px;
}

.tm-bridge {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.125rem 0;
}
.tm-bridge-line {
    height: 1px;
    flex: 1;
    background: linear-gradient(
        to right,
        transparent,
        var(--tm-edge) 30%,
        var(--tm-edge) 70%,
        transparent
    );
}
.tm-bridge-pkg {
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: 10px;
    line-height: 1rem;
    color: oklch(45% 0.128 45);
    white-space: nowrap;
}
.dark .tm-bridge-pkg {
    color: oklch(80% 0.11 55);
}

.tm-seg {
    display: block;
    height: 100%;
}
.tm-dot {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-radius: 999px;
    margin-right: 0.375rem;
    vertical-align: 1px;
}
.tm-seg--converted {
    background: oklch(64% 0.17 50);
}
.tm-seg--approximated {
    background: oklch(78% 0.11 60);
}
.tm-seg--htmlFallback {
    background: oklch(72% 0.02 60);
}
.tm-seg--skipped {
    background: oklch(86% 0.01 60);
}
.dark .tm-seg--converted {
    background: oklch(72% 0.16 55);
}
.dark .tm-seg--approximated {
    background: oklch(60% 0.1 60);
}
.dark .tm-seg--htmlFallback {
    background: oklch(48% 0.016 60);
}
.dark .tm-seg--skipped {
    background: oklch(36% 0.012 60);
}

.tm-total {
    font-weight: 500;
    color: oklch(30% 0.015 60);
}
.tm-legend {
    color: oklch(45% 0.016 60);
}
.dark .tm-total {
    color: oklch(94% 0.005 60);
}
.dark .tm-legend {
    color: oklch(73% 0.014 60);
}

.tm-warn {
    display: flex;
    align-items: flex-start;
    gap: 0.375rem;
    min-height: 2rem;
    font-size: 11px;
    line-height: 1rem;
    color: oklch(44% 0.09 55);
}
.dark .tm-warn {
    color: oklch(80% 0.08 60);
}
.tm-clean {
    color: oklch(50% 0.016 60);
}
.dark .tm-clean {
    color: oklch(66% 0.014 60);
}
</style>
