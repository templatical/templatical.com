<script setup lang="ts">
/**
 * The release rhythm of the rendered window, as a time axis: one tick per release
 * DAY, positioned proportionally, height encoding how many landed that day.
 *
 * A tick per day rather than a cell per day is what makes this survive any span.
 * A day-grid would need 22 cells for the current window and several hundred for a
 * quiet quarter; positioning ticks on a proportional axis costs the same markup at
 * either extreme, and same-day releases show up as a taller mark instead of an
 * overlap.
 *
 * It exists to replace an assertion. The hero used to open "Templatical ships
 * often", which is a claim no build step can check and which quietly becomes false
 * during a slow month. Everything here derives from `__CHANGELOG__`.
 */
import type { Cadence } from '@/lib/releaseTimeline';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ cadence: Cadence }>();

const { t, locale } = useI18n();

/**
 * UTC, matching `releaseTimeline`'s parsing — a release date is a day, and
 * rendering it in the reader's zone would show the previous day west of
 * Greenwich for a date the axis has already placed.
 */
function formatDate(date: string, month: 'long' | 'short'): string {
    return new Intl.DateTimeFormat(locale.value, {
        year: month === 'long' ? 'numeric' : undefined,
        month,
        day: month === 'long' ? 'numeric' : undefined,
        timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
}

function monthLabel(date: string): string {
    return new Intl.DateTimeFormat(locale.value, { month: 'short', timeZone: 'UTC' }).format(
        new Date(`${date}T00:00:00Z`),
    );
}

function dayTitle(date: string, count: number): string {
    const formatted = formatDate(date, 'long');
    return count === 1
        ? t('changelog.cadence.dayOne', { date: formatted })
        : t('changelog.cadence.dayMany', { date: formatted, count });
}

/**
 * Height in px. Absolute steps, not a scale normalised to the busiest day: a
 * three-release day should look the same on this page next month, when the
 * busiest day might be five.
 */
function tickHeight(count: number): string {
    return `${Math.min(6 + count * 9, 48)}px`;
}

const summary = computed(() =>
    t('changelog.cadence.summary', {
        releases: props.cadence.releases,
        days: props.cadence.spanDays,
    }),
);

const label = computed(() =>
    t('changelog.cadence.label', {
        releases: props.cadence.releases,
        first: formatDate(props.cadence.first, 'long'),
        last: formatDate(props.cadence.last, 'long'),
    }),
);

const gridlines = computed(() => props.cadence.months.filter((m) => m.boundary));

const offset = (value: number) => `${(value * 100).toFixed(4)}%`;
</script>

<template>
    <figure class="rc">
        <div class="rc__plot" role="img" :aria-label="label">
            <!-- Inset by the tick half-width so the first and last ticks sit fully
                 inside the axis instead of hanging a pixel off each end. -->
            <div class="rc__track">
                <span
                    v-for="month in gridlines"
                    :key="`grid-${month.date}`"
                    class="rc__grid"
                    :style="{ left: offset(month.offset) }"
                />
                <span
                    v-for="(day, index) in cadence.days"
                    :key="day.date"
                    class="rc__tick"
                    :style="{
                        left: offset(day.offset),
                        '--tick-h': tickHeight(day.count),
                        '--tick-i': String(index),
                    }"
                    :title="dayTitle(day.date, day.count)"
                />
            </div>
        </div>

        <div class="rc__axis">
            <span
                v-for="month in cadence.months"
                :key="`label-${month.date}`"
                class="rc__month"
                :class="{ 'rc__month--origin': !month.boundary }"
                :style="{ left: offset(month.offset) }"
                >{{ monthLabel(month.date) }}</span
            >
        </div>

        <figcaption class="rc__caption">{{ summary }}</figcaption>
    </figure>
</template>

<style scoped>
.rc {
    --rc-plot-h: 3.5rem;
}

.rc__plot {
    position: relative;
    height: var(--rc-plot-h);
    border-bottom: 1px solid var(--color-neutral-200);
}
.dark .rc__plot {
    border-bottom-color: var(--color-neutral-800);
}

.rc__track {
    position: absolute;
    inset: 0 1px;
}

.rc__grid {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--color-neutral-200);
}
.dark .rc__grid {
    background: var(--color-neutral-800);
}

/* `--primary` as a fill, never a foreground — see the token comment in app.css. */
.rc__tick {
    position: absolute;
    bottom: 0;
    width: 2px;
    height: var(--tick-h);
    transform: translateX(-50%);
    border-radius: 1px;
    background: var(--primary);
}

.rc__axis {
    position: relative;
    height: 1.375rem;
    font-size: 0.6875rem;
    line-height: 1.375rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-neutral-500);
}
.dark .rc__axis {
    color: var(--color-neutral-400);
}

.rc__month {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    white-space: nowrap;
}
/* The origin label has no gridline to centre on, so it hangs off the axis start. */
.rc__month--origin {
    transform: none;
}

.rc__caption {
    margin-top: 0.625rem;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    font-variant-numeric: tabular-nums;
    color: var(--color-neutral-600);
}
.dark .rc__caption {
    color: var(--color-neutral-400);
}

/*
    The ticks continue the headline's entrance rather than starting a second one:
    the delay clears `HeroHeadline`'s per-character reveal before the first tick
    moves, so the hero reads as one gesture. Default state is the resting state —
    the animation only exists inside the query, so reduced motion and the
    prerendered no-JS HTML both show a finished plot.
*/
@media (prefers-reduced-motion: no-preference) {
    .rc__tick {
        animation: rc-tick-rise 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
        animation-delay: calc(560ms + var(--tick-i) * 34ms);
        transform-origin: bottom;
    }
}

@keyframes rc-tick-rise {
    from {
        transform: translateX(-50%) scaleY(0);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) scaleY(1);
        opacity: 1;
    }
}
</style>
