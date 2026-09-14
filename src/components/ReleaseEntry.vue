<script setup lang="ts">
/**
 * One release on the spine: its node, its heading, and one row per change.
 *
 * The node is the scroll-timeline subject — see the `view()` block at the foot of
 * this file, which has to agree with `--spine-eye` in `Changelog.vue`.
 */
import { docsAnchor, titleSegments, type ChangelogLevel } from '@/composables/useChangelog';
import { GAP_LABEL_MIN_DAYS } from '@/lib/releaseTimeline';
import { ChevronRight, Sparkles, TriangleAlert, Wrench } from '@lucide/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ChangelogVersion } from '@/composables/useChangelog';

const props = defineProps<{
    version: ChangelogVersion;
    /** Rail spacing above this entry, in rem. `0` for the first one. */
    gap: number;
    /** Days since the release above, or null when either date is missing. */
    gapDays: number | null;
    latest: boolean;
}>();

const { t, locale } = useI18n();

const LEVEL_ICONS = {
    major: TriangleAlert,
    minor: Sparkles,
    patch: Wrench,
} satisfies Record<ChangelogLevel, unknown>;

const LEVEL_CLASSES = {
    major: 'border-amber-300 text-amber-700 dark:border-amber-500/40 dark:text-amber-400',
    minor: 'border-primary/30 text-primary-text',
    patch: 'border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400',
} satisfies Record<ChangelogLevel, string>;

/** Falls back to `patch` styling for a level a future release might introduce. */
function levelIcon(level: ChangelogLevel) {
    return LEVEL_ICONS[level] ?? LEVEL_ICONS.patch;
}

function levelClass(level: ChangelogLevel): string {
    return LEVEL_CLASSES[level] ?? LEVEL_CLASSES.patch;
}

function levelLabel(level: ChangelogLevel): string {
    return t(`changelog.levels.${level in LEVEL_ICONS ? level : 'patch'}`);
}

/** Renders an ISO date in the active locale; returns null when there is no date. */
const formattedDate = computed<string | null>(() => {
    if (!props.version.date) return null;
    const parsed = new Date(`${props.version.date}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Intl.DateTimeFormat(locale.value, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    }).format(parsed);
});

const gapLabel = computed<string | null>(() =>
    props.gapDays !== null && props.gapDays >= GAP_LABEL_MIN_DAYS
        ? t('changelog.spine.gap', { count: props.gapDays })
        : null,
);

/**
 * Splits `@scope/name` so the scope can recede typographically. Every specifier
 * here repeats `@templatical/`, and dimming it is what lets the part that differs
 * carry the row. The string itself is never shortened — it stays the thing you
 * would type into `npm install`.
 */
function packageParts(name: string): { scope: string; leaf: string } {
    const cut = name.lastIndexOf('/');
    return cut === -1
        ? { scope: '', leaf: name }
        : { scope: name.slice(0, cut + 1), leaf: name.slice(cut + 1) };
}
</script>

<template>
    <article class="entry" :style="{ '--spine-gap': `${gap}rem` }">
        <span v-if="gapLabel" class="entry__gap">{{ gapLabel }}</span>
        <span class="entry__node" :class="{ 'entry__node--latest': latest }" aria-hidden="true" />

        <header class="entry__meta">
            <h2
                class="font-display text-2xl/8 tracking-tight text-neutral-950 tabular-nums sm:text-[1.75rem]/9 dark:text-white"
            >
                {{ version.version }}
            </h2>
            <time
                v-if="formattedDate"
                :datetime="version.date ?? undefined"
                class="text-sm/7 text-neutral-500 tabular-nums dark:text-neutral-400"
            >
                {{ formattedDate }}
            </time>
            <span v-if="latest" class="entry__latest">{{ t('changelog.latest') }}</span>
        </header>

        <p
            v-if="version.changes.length === 0"
            class="entry__body text-base/7 text-neutral-600 dark:text-neutral-400"
        >
            {{ t('changelog.emptyVersion') }}
        </p>

        <ul v-else class="entry__body flex flex-col gap-5">
            <!-- `change.hash` is the feed's stable id for a change and is used only
                 as the list key. It is deliberately NOT rendered: a commit SHA dates
                 a release to a repository state rather than to a release, and this
                 page identifies a change by the version and date that carry it. The
                 full notes link already reaches the prose, and the docs changelog
                 reaches the commit. -->
            <li v-for="change in version.changes" :key="change.hash" class="flex flex-col gap-2">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    <span
                        class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs/5 font-medium"
                        :class="levelClass(change.level)"
                    >
                        <component
                            :is="levelIcon(change.level)"
                            class="size-3"
                            aria-hidden="true"
                        />
                        {{ levelLabel(change.level) }}
                    </span>
                    <span
                        v-for="pkg in change.packages"
                        :key="pkg"
                        class="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs/5 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                        ><span class="text-neutral-600 dark:text-neutral-400">{{
                            packageParts(pkg).scope
                        }}</span
                        >{{ packageParts(pkg).leaf }}</span
                    >
                </div>
                <p class="text-base/7 text-pretty text-neutral-700 dark:text-neutral-300">
                    <template v-for="(segment, index) in titleSegments(change.title)" :key="index">
                        <!-- `wrap-anywhere`, not `break-words`: changeset titles
                             quote package names and identifiers with no break
                             opportunity, and only `overflow-wrap: anywhere` also
                             shrinks min-content, which is what stops the pill
                             pushing the page wider at mobile widths. Prose keeps
                             normal wrapping — this is scoped to code spans. -->
                        <a
                            v-if="segment.href"
                            :href="segment.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="font-medium text-primary-text underline-offset-2 hover:underline"
                            :class="{ 'font-semibold': segment.strong, italic: segment.em }"
                            >{{ segment.text }}</a
                        >
                        <code
                            v-else-if="segment.code"
                            class="rounded bg-neutral-100 px-1 py-0.5 font-mono text-sm wrap-anywhere text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                            :class="{ 'font-semibold': segment.strong, italic: segment.em }"
                            >{{ segment.text }}</code
                        >
                        <strong
                            v-else-if="segment.strong"
                            class="font-semibold text-neutral-950 dark:text-white"
                            >{{ segment.text }}</strong
                        >
                        <em v-else-if="segment.em" class="italic">{{ segment.text }}</em>
                        <template v-else>{{ segment.text }}</template>
                    </template>
                </p>
            </li>
        </ul>

        <a
            :href="docsAnchor(version.version)"
            rel="noopener noreferrer"
            class="entry__notes inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary-text underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
            {{ t('changelog.versionNotes', { version: version.version }) }}
            <ChevronRight class="size-4" />
        </a>
    </article>
</template>

<style scoped>
.entry {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* Proportional to the days since the release above — see `spineGapRem`. */
    margin-top: var(--spine-gap);
    /* 1.5rem matches the `pl-6` this list carried as a bordered block; the extra
       1/2rem from `sm` up is clearance for the node, which the border never had. */
    padding-left: 1.5rem;
}

@media (min-width: 640px) {
    .entry {
        padding-left: 2rem;
    }
}

/*
    Names the spacing so it reads as an axis rather than as loose rhythm, and sits
    in the gap it measures. Only gaps of two days or more get one; see
    `GAP_LABEL_MIN_DAYS`. The background punches the label out of the hairline.
*/
.entry__gap {
    position: absolute;
    top: calc(var(--spine-gap) / -2);
    /*
        Aligned with the content column by default, centred ON the rail only once
        there is page margin to hang into. Below `lg` the rail sits 24px from the
        viewport edge — exactly half this label — so centring it there pins it to
        the edge of the screen and it reads as falling off the page.
    */
    left: 1.5rem;
    translate: 0 -50%;
    padding: 0 0.4375rem;
    background: var(--color-white);
    font-size: 0.6875rem;
    line-height: 1rem;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    color: var(--color-neutral-500);
}
.dark .entry__gap {
    background: var(--color-neutral-950);
    color: var(--color-neutral-400);
}

@media (min-width: 640px) {
    .entry__gap {
        left: 2rem;
    }
}

@media (min-width: 1024px) {
    .entry__gap {
        left: 0;
        translate: -50% -50%;
    }
}

/*
    The node sits ON the rail, so the page colour is its ring, punching a hole in
    the hairline behind it. `--node-rest` carries the resting fill so the keyframes
    below can be written once for both themes AND for the latest node, which rests
    on the accent instead of a neutral.
*/
.entry__node {
    --node-rest: var(--color-neutral-300);
    position: absolute;
    top: 1.0625rem;
    left: 0;
    z-index: 1;
    width: 0.5rem;
    height: 0.5rem;
    translate: -50% -50%;
    border-radius: 9999px;
    background: var(--node-rest);
    box-shadow: 0 0 0 4px var(--color-white);
}
.dark .entry__node {
    --node-rest: var(--color-neutral-700);
    box-shadow: 0 0 0 4px var(--color-neutral-950);
}

/* The newest release is the one you get by installing today — worth marking. */
.entry__node--latest {
    --node-rest: var(--primary);
}

.entry__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 0.75rem;
    row-gap: 0.25rem;
}

.entry__body {
    margin-top: 1rem;
}

.entry__notes {
    margin-top: 1rem;
}

/*
    Wide viewports move the version and date into the page margin, LEFT of the
    rail, where they stop being a heading beside a line and become the axis
    label for that point in time.

    The breakpoint is measured, not chosen. `.spine` is `max-w-3xl` (768px)
    inside a `max-w-7xl` container, so the empty margin beside it is
    `(viewport - 80 - 768) / 2`: 88px at 1024px, 176px at 1200px. The gutter
    needs 140px plus 20px of clearance, so 1200px is the first common width
    where it fits — and it fits with 16px to spare. Same measured-breakpoint
    idiom as `min-[1120px]` on /importers.

    140px is set by the DATE, not the version: the longest month name renders
    at 129.8px in both locales at this size (German and English happen to tie).
    Re-measure if the date size or format changes.
*/
@media (min-width: 1200px) {
    .entry {
        /*
            The gutter is out of flow and contributes no height, so a release
            with a single short change would let the next entry's node ride up
            beside this one's date. The stack is 36 + 20 + 20px.
        */
        min-height: 4.75rem;
    }

    .entry__meta {
        position: absolute;
        top: 0;
        /* `right: 100%` lands the block's right edge exactly on the rail. */
        right: calc(100% + 1.25rem);
        display: block;
        width: 8.75rem;
        text-align: right;
    }

    .entry__meta > * {
        display: block;
    }

    /* Sits the first change row on the version's optical centre, not its box top. */
    .entry__body {
        margin-top: 0.5rem;
    }
}

.entry__latest {
    font-size: 0.6875rem;
    line-height: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--primary-text);
}

/*
    Progressive enhancement, and the only scroll-linked effect on the page: the
    node the reader is level with takes the accent, so the rail marks their place
    the way a finger would.

    The peak is 60.5%, and it is MEASURED, not derived. The obvious arithmetic
    says a subject this small is lit at `100% - 44%` = 56%, where 44% is
    `--spine-eye` in `Changelog.vue` — and that is wrong by 92px, because
    `html { scroll-padding-top: 5.25rem }` insets the scrollport that `view()`
    resolves its ranges against. Read off a live page, the reading line sits at
    progress 0.607 in a 900px viewport, and between 0.593 and 0.619 across 700 to
    1200px tall, since the 84px inset is a fixed length rather than a share of the
    viewport. The ±10% ramp swallows that drift.

    So do not "correct" this to 56%. If the head and the lit node ever separate,
    re-measure rather than re-derive: fit progress against viewport y over the
    unsaturated nodes, and read off the value at `--spine-eye`.

    Firefox has no view timeline and simply keeps the resting state, which is why
    the travelling head is plain `position: sticky` instead of a second timeline.

    One keyframe list covers both themes and the latest node because every colour
    goes through a custom property. CSS animations substitute `var()` normally —
    it is only the WAAPI path (see `HeroTransmuter`) that drops it silently.
*/
@supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
        .entry__node {
            animation: entry-node-lit linear both;
            animation-timeline: view();
            animation-range: cover 0% cover 100%;
        }
    }
}

/*
    `translate` and `scale` as individual properties, not a `transform` shorthand:
    the spec applies translate before scale, so the node stays centred on the rail
    while it grows. Folding both into one `transform` would scale the -50% offset
    too and walk the node off the hairline.
*/
@keyframes entry-node-lit {
    0%,
    50.5% {
        background-color: var(--node-rest);
        scale: 1;
    }
    60.5% {
        background-color: var(--primary);
        scale: 1.5;
    }
    70.5%,
    100% {
        background-color: var(--node-rest);
        scale: 1;
    }
}
</style>
