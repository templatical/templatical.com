<script setup lang="ts">
import type { FeatureNavItem } from '@/composables/useFeatureNav';
import { matchFeatures } from '@/composables/useFeatureNav';
import { Search } from '@lucide/vue';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    items: FeatureNavItem[];
    open: boolean;
    jump: (slug: string, options?: { source?: HTMLElement | null; commit?: () => void }) => void;
}>();
const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>();

const { t } = useI18n();

const dialogRef = ref<HTMLDialogElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const query = ref('');
const activeIndex = ref(0);

const results = computed(() => matchFeatures(props.items, query.value));

const activeOption = computed(() => results.value[activeIndex.value] ?? null);
const optionId = (slug: string) => `fj-option-${slug}`;

watch(results, () => (activeIndex.value = 0));

watch(
    () => props.open,
    async (isOpen) => {
        const dialog = dialogRef.value;
        if (!dialog) return;
        if (isOpen) {
            if (!dialog.open) dialog.showModal();
            query.value = '';
            activeIndex.value = 0;
            await nextTick();
            inputRef.value?.focus();
        } else if (dialog.open) {
            dialog.close();
        }
    },
);

function move(delta: number) {
    const total = results.value.length;
    if (!total) return;
    activeIndex.value = (activeIndex.value + delta + total) % total;
    nextTick(() => {
        listRef.value
            ?.querySelector('[aria-selected="true"]')
            ?.scrollIntoView({ block: 'nearest' });
    });
}

function choose(item: FeatureNavItem | null, source?: HTMLElement | null) {
    if (!item) return;
    props.jump(item.slug, {
        source,
        // Closing is part of the same DOM change as the scroll: the row being
        // morphed has to survive long enough to be captured.
        commit: () => emit('update:open', false),
    });
}

/**
 * Escape, handled explicitly rather than left to the dialog's own close
 * watcher. `showModal()` is supposed to close on Escape for free, and usually
 * does — but the keydown reaches the dialog without any `cancel` or `close`
 * following it in at least one embedded Chromium, leaving the palette open over
 * an inert page with no way out but the mouse. The native path still runs where
 * it works; both converge on the same emit, and the open watcher no-ops when
 * the dialog is already closed.
 */
function onDialogKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    emit('update:open', false);
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        move(1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        move(-1);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        const active = activeOption.value;
        if (!active) return;
        const row = listRef.value?.querySelector<HTMLElement>(
            `#${CSS.escape(optionId(active.slug))} [data-feature-label]`,
        );
        choose(active, row);
    }
}

function onRowClick(event: MouseEvent, item: FeatureNavItem) {
    const row = event.currentTarget as HTMLElement;
    choose(item, row.querySelector<HTMLElement>('[data-feature-label]'));
}

// Clicking the backdrop: the click lands on the dialog itself, never on its
// contents, because the contents are inside the padded inner panel.
function onDialogClick(event: MouseEvent) {
    if (event.target === dialogRef.value) emit('update:open', false);
}
</script>

<template>
    <dialog
        ref="dialogRef"
        class="fj"
        :aria-label="t('features.index.palette.label')"
        @close="emit('update:open', false)"
        @keydown="onDialogKeydown"
        @click="onDialogClick"
    >
        <div class="fj__panel">
            <div class="fj__search">
                <Search class="fj__searchIcon" aria-hidden="true" />
                <input
                    ref="inputRef"
                    v-model="query"
                    type="text"
                    class="fj__input"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="fj-list"
                    :aria-activedescendant="activeOption ? optionId(activeOption.slug) : undefined"
                    autocomplete="off"
                    spellcheck="false"
                    :placeholder="t('features.index.palette.placeholder')"
                    @keydown="onKeydown"
                />
            </div>

            <ul
                v-if="results.length"
                id="fj-list"
                ref="listRef"
                role="listbox"
                :aria-label="t('features.index.palette.label')"
                class="fj__list"
            >
                <li
                    v-for="(item, idx) in results"
                    :id="optionId(item.slug)"
                    :key="item.slug"
                    role="option"
                    :aria-selected="idx === activeIndex"
                    class="fj__row"
                    @click="onRowClick($event, item)"
                    @mousemove="activeIndex = idx"
                >
                    <span data-feature-label class="fj__rowLabel">{{ item.title }}</span>
                    <span class="fj__rowMeta">{{ item.eyebrow }}</span>
                </li>
            </ul>
            <p v-else class="fj__empty">
                {{ t('features.index.palette.empty', { query: query.trim() }) }}
            </p>

            <p class="fj__hint">{{ t('features.index.palette.hint') }}</p>
        </div>
    </dialog>
</template>

<style scoped>
.fj {
    margin: 0 auto;
    max-width: 34rem;
    width: calc(100% - 2rem);
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    position: fixed;
    top: 12vh;
}
.fj::backdrop {
    background: oklch(14.5% 0.008 55 / 0.4);
    backdrop-filter: blur(3px);
}

/* `display` and `overlay` need `allow-discrete` or the element is yanked out of
   the top layer on the first frame and the exit never renders. */
.fj,
.fj::backdrop {
    transition:
        opacity 220ms var(--ease-spring),
        transform 220ms var(--ease-spring),
        overlay 220ms allow-discrete,
        display 220ms allow-discrete;
}
.fj,
.fj::backdrop {
    opacity: 0;
}
.fj {
    transform: translateY(-8px) scale(0.98);
}
.fj[open],
.fj[open]::backdrop {
    opacity: 1;
}
.fj[open] {
    transform: translateY(0) scale(1);
}
@starting-style {
    .fj[open],
    .fj[open]::backdrop {
        opacity: 0;
    }
    .fj[open] {
        transform: translateY(-8px) scale(0.98);
    }
}

.fj__panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 14px;
    background: #fff;
    box-shadow:
        0 24px 64px oklch(0% 0 0 / 0.18),
        0 8px 20px oklch(0% 0 0 / 0.08);
    outline: 1px solid var(--color-neutral-200);
}
.dark .fj__panel {
    background: var(--color-neutral-900);
    outline-color: var(--color-neutral-800);
}

.fj__search {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-neutral-200);
}
.dark .fj__search {
    border-bottom-color: var(--color-neutral-800);
}
.fj__searchIcon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--color-neutral-500);
}
.dark .fj__searchIcon {
    color: var(--color-neutral-400);
}
.fj__input {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    font-size: 0.9375rem;
    line-height: 1.5rem;
    color: var(--color-neutral-950);
    outline: none;
}
.dark .fj__input {
    color: #fff;
}
.fj__input::placeholder {
    color: var(--color-neutral-500);
}
/* The panel is neutral-900 in dark, not neutral-950, so neutral-500 drops to
   3.5:1 against it — every muted string here steps up one stop. */
.dark .fj__input::placeholder {
    color: var(--color-neutral-400);
}

.fj__list {
    max-height: min(22rem, 50vh);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.375rem;
    /* No scrollbar rules here: `app.css` styles the thumb once, on `html`, and it
       inherits. This block used to set its own `neutral-300` / `neutral-700` pair,
       which measured 1.51:1 and 1.84:1 against the panel — far under the 3:1 that
       WCAG 1.4.11 owes once an author restyles a control. It also set
       `scrollbar-width: thin`, deliberately dropped site-wide. */
}

.fj__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
}
.fj__row[aria-selected='true'] {
    background: var(--color-neutral-100);
}
.dark .fj__row[aria-selected='true'] {
    background: var(--color-neutral-800);
}
.fj__rowLabel {
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: var(--color-neutral-800);
    text-wrap: pretty;
}
.dark .fj__rowLabel {
    color: var(--color-neutral-100);
}
.fj__row[aria-selected='true'] .fj__rowLabel {
    color: var(--color-neutral-950);
}
.dark .fj__row[aria-selected='true'] .fj__rowLabel {
    color: #fff;
}
.fj__rowMeta {
    flex-shrink: 0;
    font-size: 0.6875rem;
    line-height: 1rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-neutral-500);
}
.dark .fj__rowMeta {
    color: var(--color-neutral-400);
}
.fj__row[aria-selected='true'] .fj__rowMeta {
    color: var(--color-neutral-600);
}
.dark .fj__row[aria-selected='true'] .fj__rowMeta {
    color: var(--color-neutral-300);
}

.fj__empty {
    padding: 1.5rem 1rem;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: var(--color-neutral-500);
    text-wrap: pretty;
}
.dark .fj__empty {
    color: var(--color-neutral-400);
}

.fj__hint {
    border-top: 1px solid var(--color-neutral-200);
    padding: 0.5rem 1rem;
    font-size: 0.6875rem;
    line-height: 1.125rem;
    color: var(--color-neutral-500);
}
.dark .fj__hint {
    border-top-color: var(--color-neutral-800);
    color: var(--color-neutral-400);
}

@media (prefers-reduced-motion: reduce) {
    .fj,
    .fj::backdrop {
        transition:
            overlay 1ms allow-discrete,
            display 1ms allow-discrete;
        transform: none;
    }
    .fj[open] {
        transform: none;
    }
}
</style>
