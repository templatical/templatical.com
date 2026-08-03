<script setup lang="ts">
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteText from '@/components/SiteText.vue';
import {
    docsAnchor,
    titleSegments,
    useChangelog,
    type ChangelogLevel,
    type ChangelogVersion,
} from '@/composables/useChangelog';
import { URLS } from '@/lib/urls';
import { useHead } from '@unhead/vue';
import { ChevronRight, Sparkles, TriangleAlert, Wrench } from 'lucide-vue-next';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
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

const LEVEL_ICONS = {
    major: TriangleAlert,
    minor: Sparkles,
    patch: Wrench,
} satisfies Record<ChangelogLevel, unknown>;

const LEVEL_CLASSES = {
    major: 'border-amber-300 text-amber-700 dark:border-amber-500/40 dark:text-amber-400',
    minor: 'border-primary/30 text-primary',
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
function formatDate(date: string | null): string | null {
    if (!date) return null;
    const parsed = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Intl.DateTimeFormat(locale.value, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    }).format(parsed);
}

function versionKey(version: ChangelogVersion): string {
    return version.version;
}

const showingLatest = computed(() =>
    t('changelog.showingLatest', { count: versions.value.length }),
);
</script>

<template>
    <div>
        <section
            class="relative -mt-21 bg-white pt-37 pb-20 sm:pt-41 sm:pb-28 dark:bg-neutral-950"
        >
            <HeroAurora
                root-class="inset-x-0 top-0 -bottom-40"
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div class="flex max-w-2xl flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>
                            {{ t('changelog.hero.eyebrow') }}
                        </SiteEyebrow>
                        <HeroHeadline
                            :text="t('changelog.hero.headline')"
                            as="h1"
                        />
                    </div>
                    <SiteText class="text-pretty">
                        <p>{{ t('changelog.hero.subheadline') }}</p>
                    </SiteText>
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
                        class="inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                    >
                        {{ t('changelog.unavailable.cta') }}
                        <ChevronRight class="size-4" />
                    </a>
                </div>

                <div
                    v-else
                    class="mx-auto flex max-w-3xl flex-col gap-12"
                >
                    <article
                        v-for="version in versions"
                        :key="versionKey(version)"
                        class="flex flex-col gap-4 border-l border-neutral-200 pl-6 dark:border-neutral-800"
                    >
                        <header class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h2
                                class="font-display text-2xl/8 tracking-tight text-neutral-950 dark:text-white"
                            >
                                {{ version.version }}
                            </h2>
                            <time
                                v-if="formatDate(version.date)"
                                :datetime="version.date ?? undefined"
                                class="text-sm/7 text-neutral-500 dark:text-neutral-500"
                            >
                                {{ formatDate(version.date) }}
                            </time>
                        </header>

                        <p
                            v-if="version.changes.length === 0"
                            class="text-base/7 text-neutral-600 dark:text-neutral-400"
                        >
                            {{ t('changelog.emptyVersion') }}
                        </p>

                        <ul
                            v-else
                            class="flex flex-col gap-5"
                        >
                            <li
                                v-for="change in version.changes"
                                :key="change.hash"
                                class="flex flex-col gap-2"
                            >
                                <div class="flex flex-wrap items-center gap-2">
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
                                        class="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs/5 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                                    >
                                        {{ pkg }}
                                    </span>
                                </div>
                                <p
                                    class="text-base/7 text-pretty text-neutral-700 dark:text-neutral-300"
                                >
                                    <template
                                        v-for="(segment, index) in titleSegments(change.title)"
                                        :key="index"
                                    >
                                        <code
                                            v-if="segment.code"
                                            class="rounded bg-neutral-100 px-1 py-0.5 font-mono text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                                            :class="{ 'font-semibold': segment.strong, italic: segment.em }"
                                        >{{ segment.text }}</code>
                                        <strong
                                            v-else-if="segment.strong"
                                            class="font-semibold text-neutral-950 dark:text-white"
                                        >{{ segment.text }}</strong>
                                        <em v-else-if="segment.em" class="italic">{{ segment.text }}</em>
                                        <template v-else>{{ segment.text }}</template>
                                    </template>
                                </p>
                            </li>
                        </ul>

                        <a
                            :href="docsAnchor(version.version)"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                        >
                            {{ t('changelog.versionNotes', { version: version.version }) }}
                            <ChevronRight class="size-4" />
                        </a>
                    </article>

                    <p class="text-sm/7 text-neutral-500 dark:text-neutral-500">
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
                            class="inline-flex items-center gap-1.5 text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
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
