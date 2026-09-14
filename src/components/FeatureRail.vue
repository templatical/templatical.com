<script setup lang="ts">
import type { FeatureNavItem } from '@/composables/useFeatureNav';
import { featureSectionId } from '@/composables/useFeatureNav';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    items: FeatureNavItem[];
    activeSlug: string | null;
    progress: number;
    visible: boolean;
    jump: (slug: string, options?: { source?: HTMLElement | null; commit?: () => void }) => void;
}>();

const { t } = useI18n();

// The rail encodes the page's two halves: a wider gap falls where the
// provider-backed band begins, so position in the rail means the same thing as
// position on the page without a second label to keep in step.
const rows = computed(() =>
    props.items.map((item, idx) => ({
        ...item,
        startsGroup: idx > 0 && props.items[idx - 1].group !== item.group,
    })),
);

function onActivate(slug: string) {
    // No source element: a 14px tick has no text to morph into a headline, so
    // the rail scrolls plainly and leaves the morph to the index and palette.
    props.jump(slug);
}
</script>

<template>
    <nav
        :aria-label="t('features.index.railLabel')"
        class="fr"
        :class="{ 'fr--visible': visible }"
        :aria-hidden="visible ? undefined : 'true'"
        :inert="visible ? undefined : true"
    >
        <span class="fr__track" aria-hidden="true" />
        <span
            class="fr__fill"
            aria-hidden="true"
            :style="{ transform: `scaleY(${progress.toFixed(4)})` }"
        />
        <ul class="fr__list">
            <li v-for="row in rows" :key="row.slug" :class="{ 'fr__item--group': row.startsGroup }">
                <a
                    :href="`#${featureSectionId(row.slug)}`"
                    class="fr__tick"
                    :class="{ 'fr__tick--active': row.slug === activeSlug }"
                    :aria-current="row.slug === activeSlug ? 'true' : undefined"
                    @click.prevent="onActivate(row.slug)"
                >
                    <span class="fr__mark" aria-hidden="true" />
                    <span class="fr__label">{{ row.title }}</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
/* Measured, not `2xl:`: at 1280px the max-w-7xl container touches both edges
   and the rail would sit on top of the code blocks. 1380px is the first width
   with room for the rail plus its hover label clear of the container. */
.fr {
    display: none;
}
@media (min-width: 1380px) {
    .fr {
        position: fixed;
        right: 1.25rem;
        top: 50%;
        z-index: 30;
        display: block;
        translate: 0 -50%;
        opacity: 0;
        transform: translateX(8px);
        pointer-events: none;
        transition:
            opacity 320ms var(--ease-spring),
            transform 320ms var(--ease-spring);
    }
    .fr--visible {
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
    }
}

.fr__list {
    position: relative;
    display: flex;
    flex-direction: column;
}
.fr__item--group {
    margin-top: 0.75rem;
}

/* One hairline behind every tick, and the same hairline again in the accent
   clipped to how far the reader has come. */
.fr__track,
.fr__fill {
    position: absolute;
    left: calc(1.5rem - 0.5px);
    top: 0.6875rem;
    bottom: 0.6875rem;
    width: 1px;
}
.fr__track {
    background: var(--color-neutral-200);
}
.dark .fr__track {
    background: var(--color-neutral-800);
}
.fr__fill {
    background: var(--primary);
    transform-origin: top;
    will-change: transform;
}

.fr__tick {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 1.5rem;
    width: 2.25rem;
    padding-right: 0.375rem;
    text-decoration: none;
}
.fr__tick:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
    border-radius: 4px;
}

.fr__mark {
    height: 1px;
    width: 0.625rem;
    border-radius: 999px;
    /* A tick is an interactive target, so it owes 1.4.11's 3:1 against its own
       ground: neutral-500 measures 5.05 on white and 3.92 on neutral-950.
       neutral-300 was 1.51 and effectively invisible. */
    background: var(--color-neutral-500);
    transition:
        width 260ms var(--ease-spring),
        background-color 260ms var(--ease-spring),
        height 260ms var(--ease-spring);
}
.dark .fr__mark {
    background: var(--color-neutral-500);
}
.fr__tick:hover .fr__mark {
    width: 1rem;
    background: var(--color-neutral-700);
}
.dark .fr__tick:hover .fr__mark {
    background: var(--color-neutral-300);
}
.fr__tick--active .fr__mark,
.fr__tick--active:hover .fr__mark {
    /* The active mark is the rail's state signal, so it owes 1.4.11's 3:1
       like the ticks above: --primary is 2.80 on white, --primary-text 5.10.
       The 1px .fr__fill hairline stays on --primary; a hairline is exempt. */
    width: 1.25rem;
    height: 2px;
    background: var(--primary-text);
}

/* The name only exists on hover or focus. Eighteen labels at rest would be a
   second navigation competing with the one in the navbar. */
.fr__label {
    position: absolute;
    right: calc(100% + 0.25rem);
    top: 50%;
    translate: 0 -50%;
    white-space: nowrap;
    border-radius: 8px;
    background: var(--color-neutral-950);
    color: var(--color-neutral-50);
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    line-height: 1.125rem;
    box-shadow:
        0 4px 16px oklch(0% 0 0 / 0.12),
        0 2px 6px oklch(0% 0 0 / 0.06);
    opacity: 0;
    transform: translateX(4px);
    pointer-events: none;
    transition:
        opacity 200ms var(--ease-spring),
        transform 200ms var(--ease-spring);
}
.dark .fr__label {
    background: var(--color-neutral-100);
    color: var(--color-neutral-950);
}
.fr__tick:hover .fr__label,
.fr__tick:focus-visible .fr__label {
    opacity: 1;
    transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
    .fr,
    .fr__mark,
    .fr__label {
        transition: none;
    }
}
</style>
