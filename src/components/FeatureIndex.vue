<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue';
import type { FeatureNavItem } from '@/composables/useFeatureNav';
import { featureSectionId } from '@/composables/useFeatureNav';
import { ArrowUpRight } from '@lucide/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    items: FeatureNavItem[];
    jump: (slug: string, options?: { source?: HTMLElement | null; commit?: () => void }) => void;
    openPalette: () => void;
    shortcutLabel: string;
}>();

const { t } = useI18n();

// Two groups, in page order, each derived from the same list that renders the
// sections. The backend group reuses the band's own eyebrow rather than
// inventing a second name for it, so the label the reader meets here is the
// label they meet again at the band.
const groups = computed(() => [
    {
        key: 'core',
        label: t('features.index.groupCore'),
        items: props.items.filter((item) => item.group === 'core'),
    },
    {
        key: 'backend',
        label: t('features.backend.eyebrow'),
        items: props.items.filter((item) => item.group === 'backend'),
    },
]);

function onActivate(event: MouseEvent, slug: string) {
    const row = event.currentTarget as HTMLElement;
    // The morph is text-to-text: hand it the label, not the whole row, or the
    // transition interpolates a 570px box into a headline and reads as a smear.
    props.jump(slug, { source: row.querySelector<HTMLElement>('[data-feature-label]') });
}
</script>

<template>
    <!-- First section after the hero, so it carries both HeroAurora obligations:
         the exact colours the aurora's fade ends on, and `relative` on the
         container so the content paints above the 160px bleed instead of under
         it. See the rule in HeroAurora.vue. -->
    <section class="bg-white pb-20 sm:pb-24 dark:bg-neutral-950">
        <SiteContainer class="relative">
            <div
                class="flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-neutral-800"
            >
                <h2 class="font-display text-xl/7 tracking-tight text-neutral-950 dark:text-white">
                    {{ t('features.index.heading') }}
                </h2>
                <button
                    type="button"
                    class="group inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-sm/5 text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
                    @click="openPalette()"
                >
                    {{ t('features.index.jump') }}
                    <kbd class="fi-kbd">{{ shortcutLabel }}</kbd>
                </button>
            </div>

            <div class="mt-10 flex flex-col gap-10">
                <div v-for="group in groups" :key="group.key" class="flex flex-col gap-4">
                    <h3
                        class="text-[0.6875rem]/5 font-semibold tracking-[0.08em] text-neutral-950 uppercase dark:text-white"
                    >
                        {{ group.label }}
                    </h3>
                    <ul class="fi-list">
                        <li
                            v-for="item in group.items"
                            :key="item.slug"
                            class="border-t border-neutral-200 dark:border-neutral-800"
                        >
                            <a
                                :href="`#${featureSectionId(item.slug)}`"
                                class="fi-row"
                                @click.prevent="onActivate($event, item.slug)"
                            >
                                <span class="fi-row__eyebrow">{{ item.eyebrow }}</span>
                                <span data-feature-label class="fi-row__label">
                                    {{ item.title }}
                                </span>
                                <ArrowUpRight class="fi-row__arrow" aria-hidden="true" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </SiteContainer>
    </section>
</template>

<style scoped>
.fi-kbd {
    display: inline-flex;
    align-items: center;
    min-width: 1.75rem;
    justify-content: center;
    border-radius: 4px;
    background: var(--color-neutral-100);
    padding: 0.0625rem 0.3125rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.6875rem;
    line-height: 1.25rem;
    color: var(--color-neutral-500);
    box-shadow: inset 0 0 0 1px var(--color-neutral-200);
}
/* A touch device has no modifier key to press, so the legend is a claim about
   an input the reader does not have. The button itself stays — it is how the
   palette is reached without a keyboard. */
@media (pointer: coarse) {
    .fi-kbd {
        display: none;
    }
}
/* Plain descendant selector, never `:global(.dark) .fi-kbd` — Vue's scoped
   transform drops the element from that form and lands the declarations on
   <html>. See the rule in CLAUDE.md. */
.dark .fi-kbd {
    background: var(--color-neutral-800);
    color: var(--color-neutral-400);
    box-shadow: inset 0 0 0 1px var(--color-neutral-700);
}

.fi-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0.125rem 1rem;
    padding: 0.75rem 0.75rem 0.75rem 0;
    margin-inline: -0.75rem;
    padding-inline-start: 0.75rem;
    border-radius: 8px;
    text-decoration: none;
    transition:
        background-color 220ms var(--ease-spring),
        color 220ms var(--ease-spring);
}
/* Multi-column rather than `grid-cols-2`: a grid fills row by row, so a
   two-column index would run 1,2 / 3,4 across the page order the rail and the
   sections both read downward. `columns` fills the first column before the
   second and balances any count, so the eleventh and the seventh section need
   no per-group row maths. */
.fi-list {
    columns: 1;
}
@media (min-width: 1024px) {
    .fi-list {
        columns: 2;
        column-gap: 3rem;
    }
    .fi-list > li {
        break-inside: avoid;
    }
}

/* Below sm the eyebrow takes its own row above the title; from sm it becomes
   the index's left column and the three children auto-place across it. */
.fi-row__eyebrow {
    grid-column: 1 / -1;
}
@media (min-width: 640px) {
    .fi-row {
        grid-template-columns: 9rem 1fr auto;
        gap: 1rem;
    }
    .fi-row__eyebrow {
        grid-column: auto;
    }
}
.fi-row:hover {
    background-color: var(--color-neutral-50);
}
.dark .fi-row:hover {
    background-color: var(--color-neutral-900);
}
.fi-row:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.fi-row__eyebrow {
    font-size: 0.6875rem;
    line-height: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    /* neutral-500 / neutral-400, not 400 / 600: this names the section's
       category, so it is text and owes 4.5:1 (5.05 and 7.70 against their own
       grounds; the lighter pair measured 2.57 and 2.48). */
    color: var(--color-neutral-500);
    transition: color 220ms var(--ease-spring);
}
.dark .fi-row__eyebrow {
    color: var(--color-neutral-400);
}
/* Deliberately not the accent on hover: --primary is 2.8:1 on white, so
   tinting this would make it *less* legible than at rest. The hover darkens
   instead, and the arrow carries the colour. */
.fi-row:hover .fi-row__eyebrow {
    color: var(--color-neutral-600);
}
.dark .fi-row:hover .fi-row__eyebrow {
    color: var(--color-neutral-300);
}

.fi-row__label {
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: var(--color-neutral-700);
    text-wrap: pretty;
    transition: color 220ms var(--ease-spring);
}
.dark .fi-row__label {
    color: var(--color-neutral-300);
}
.fi-row:hover .fi-row__label {
    color: var(--color-neutral-950);
}
.dark .fi-row:hover .fi-row__label {
    color: #fff;
}

.fi-row__arrow {
    width: 0.875rem;
    height: 0.875rem;
    align-self: center;
    color: var(--color-neutral-300);
    opacity: 0;
    transform: translate(-2px, 2px);
    transition:
        opacity 220ms var(--ease-spring),
        transform 220ms var(--ease-spring),
        color 220ms var(--ease-spring);
}
.dark .fi-row__arrow {
    color: var(--color-neutral-600);
}
.fi-row:hover .fi-row__arrow,
.fi-row:focus-visible .fi-row__arrow {
    opacity: 1;
    transform: translate(0, 0);
    color: var(--primary-text);
}
@media (prefers-reduced-motion: reduce) {
    .fi-row,
    .fi-row__eyebrow,
    .fi-row__label,
    .fi-row__arrow {
        transition: none;
    }
    .fi-row__arrow {
        opacity: 1;
        transform: none;
    }
}
</style>
