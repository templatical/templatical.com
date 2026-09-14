<script setup lang="ts">
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import ReleaseCadence from '@/components/ReleaseCadence.vue';
import ReleaseEntry from '@/components/ReleaseEntry.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteText from '@/components/SiteText.vue';
import { useChangelog } from '@/composables/useChangelog';
import { buildCadence, daysBetween, spineGapRem } from '@/lib/releaseTimeline';
import { URLS } from '@/lib/urls';
import { useHead } from '@unhead/vue';
import { ChevronRight } from '@lucide/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { versions, isUnavailable } = useChangelog();

useHead({
    title: computed(() => t('changelog.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('changelog.meta.description')),
        },
    ],
});

const cadence = computed(() => buildCadence(versions.value));

/**
 * Each entry carries the spacing that separates it from the release above.
 *
 * `versions` is newest-first, so entry `i`'s neighbour above is `i - 1` and the
 * gap measures from this release forward to that one — always non-negative for a
 * well-ordered feed, and clamped by `spineGapRem` if a feed ever arrives out of
 * order. The newest release opens the rail and takes no gap at all.
 */
const entries = computed(() =>
    versions.value.map((version, index) => {
        const newer = index === 0 ? null : versions.value[index - 1];
        const gapDays = newer ? daysBetween(version.date, newer.date) : null;
        return {
            version,
            gap: index === 0 ? 0 : spineGapRem(gapDays),
            gapDays: index === 0 ? null : gapDays,
            latest: index === 0,
        };
    }),
);

const showingLatest = computed(() =>
    t('changelog.showingLatest', { count: versions.value.length }),
);
</script>

<template>
    <div>
        <section class="relative -mt-21 bg-white pt-37 pb-20 sm:pt-41 sm:pb-28 dark:bg-neutral-950">
            <HeroAurora
                root-class="inset-x-0 top-0 -bottom-40"
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div
                    class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-16"
                >
                    <div class="flex max-w-2xl flex-col gap-6">
                        <div class="flex flex-col gap-2">
                            <SiteEyebrow>
                                {{ t('changelog.hero.eyebrow') }}
                            </SiteEyebrow>
                            <HeroHeadline :text="t('changelog.hero.headline')" as="h1" />
                        </div>
                        <SiteText class="text-pretty">
                            <p>{{ t('changelog.hero.subheadline') }}</p>
                        </SiteText>
                    </div>
                    <!--
                        The cadence plot, not a sentence: the hero used to assert
                        "Templatical ships often", which nothing could check and a
                        quiet month would quietly falsify. Omitted entirely when the
                        feed is unavailable or too short to carry an axis.
                    -->
                    <ReleaseCadence v-if="cadence" :cadence="cadence" class="lg:pb-1.5" />
                </div>
            </SiteContainer>
        </section>

        <!--
            `relative` on the container, not the section: the hero aurora is absolutely
            positioned and bleeds 160px past its own section, so it would otherwise paint
            over the first entry. Positioning the container lifts the content above the
            aurora while leaving the section background beneath it, keeping the bleed.
        -->
        <section class="bg-white py-16 sm:py-20 dark:bg-neutral-950">
            <SiteContainer class="relative">
                <div
                    v-if="isUnavailable"
                    class="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                    <h2
                        class="font-display text-xl/7 tracking-tight text-neutral-950 dark:text-white"
                    >
                        {{ t('changelog.unavailable.headline') }}
                    </h2>
                    <p class="text-base/7 text-neutral-700 dark:text-neutral-400">
                        {{ t('changelog.unavailable.description') }}
                    </p>
                    <a
                        :href="URLS.changelog"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary-text underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                    >
                        {{ t('changelog.unavailable.cta') }}
                        <ChevronRight class="size-4" />
                    </a>
                </div>

                <div v-else class="mx-auto max-w-3xl">
                    <div class="spine">
                        <!--
                            Zero-height sticky flow child: it travels the length of the
                            rail as the page scrolls and draws the reading head on it.
                            Sticky rather than a scroll-driven animation on purpose —
                            it is the one part of this that every browser gets, Firefox
                            included, and it needs no fallback.
                        -->
                        <span class="spine__head" aria-hidden="true" />
                        <ReleaseEntry
                            v-for="entry in entries"
                            :key="entry.version.version"
                            :version="entry.version"
                            :gap="entry.gap"
                            :gap-days="entry.gapDays"
                            :latest="entry.latest"
                        />
                    </div>

                    <p class="mt-12 text-sm/7 text-neutral-500 tabular-nums dark:text-neutral-400">
                        {{ showingLatest }}
                    </p>
                </div>
            </SiteContainer>
        </section>

        <section class="bg-white py-16 sm:py-24 dark:bg-neutral-950">
            <SiteContainer>
                <div
                    class="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/40"
                >
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>{{ t('changelog.fullHistory.eyebrow') }}</SiteEyebrow>
                        <h2
                            class="font-display text-2xl/8 tracking-tight text-pretty text-neutral-950 sm:text-3xl/10 dark:text-white"
                        >
                            {{ t('changelog.fullHistory.headline') }}
                        </h2>
                        <p class="max-w-xl text-base/7 text-neutral-700 dark:text-neutral-400">
                            {{ t('changelog.fullHistory.description') }}
                        </p>
                    </div>
                    <div class="flex flex-col gap-3 sm:shrink-0 sm:items-end">
                        <a
                            :href="URLS.changelog"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 text-sm/7 font-medium text-primary-text underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                        >
                            {{ t('changelog.fullHistory.docsCta') }}
                            <ChevronRight class="size-4" />
                        </a>
                        <a
                            :href="URLS.releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 text-sm/7 font-medium text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-neutral-300 dark:hover:text-white"
                        >
                            {{ t('changelog.fullHistory.releasesCta') }}
                            <ChevronRight class="size-4" />
                        </a>
                    </div>
                </div>
            </SiteContainer>
        </section>
    </div>
</template>

<style scoped>
/*
    The rail is a time axis, not a decorative border: the space between two nodes
    is proportional to the days between the releases (see `spineGapRem`), so a
    week of daily shipping reads as a cluster and a quiet spell reads as air.

    `--spine-eye` is the reading line — where the travelling head parks and where a
    node is considered "current". `ReleaseEntry`'s `animation-range` carries its
    complement (`100% - 44%`) because the two properties take different units and
    cannot share one value. Move one, move both.
*/
.spine {
    --spine-eye: 44%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
}

/*
    Masked at both ends rather than hard-stopped. A hairline that begins and ends
    on a blunt edge reads as a border that ran out; fading it reads as an axis
    continuing past the window, which is exactly what the archive does.
*/
.spine::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    /*
        A step darker than the `neutral-200` this list used as a plain left
        border. At 1.09:1 on white that was a divider you stop seeing; the rail
        now carries the page's argument and has to stay legible for 21 screens.
    */
    background: var(--color-neutral-300);
    mask-image: linear-gradient(
        to bottom,
        transparent,
        #000 2.5rem,
        #000 calc(100% - 5rem),
        transparent
    );
}
.dark .spine::before {
    background: var(--color-neutral-800);
}

.spine__head {
    position: sticky;
    top: var(--spine-eye);
    height: 0;
    pointer-events: none;
}

/* The lit segment, centred on the 1px rail: 3px wide starting one pixel left. */
.spine__head::after {
    content: '';
    position: absolute;
    top: -2.75rem;
    left: -1px;
    width: 3px;
    height: 5.5rem;
    border-radius: 2px;
    background: linear-gradient(
        to bottom,
        transparent,
        var(--primary) 42%,
        var(--primary) 58%,
        transparent
    );
}

/* A wider, much fainter bloom so the head has a falloff instead of an edge. */
.spine__head::before {
    content: '';
    position: absolute;
    top: -4.5rem;
    left: -0.625rem;
    width: 1.3125rem;
    height: 9rem;
    background: radial-gradient(
        closest-side,
        color-mix(in oklch, var(--primary) 20%, transparent),
        transparent
    );
}
</style>
