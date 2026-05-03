<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface Props {
    options: ReadonlyArray<{ label: string; value?: string }>;
    modelValue: number;
    ariaLabel?: string;
    size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), { size: 'md' });
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
    (e: 'change', value: number, direction: 1 | -1): void
}>();

const tabRefs = ref<HTMLButtonElement[]>([]);
const tablistRef = ref<HTMLDivElement | null>(null);
const pillStyle = ref<Record<string, string>>({
    clipPath: 'inset(0 100% 0 0 round 9999px)',
    opacity: '0',
});

const isSm = computed(() => props.size === 'sm');
const PADDING = 4;

function updatePill() {
    const btn = tabRefs.value[props.modelValue];
    const list = tablistRef.value;
    if (!btn || !list) return;
    const inner = list.clientWidth - PADDING * 2;
    const left = btn.offsetLeft - PADDING;
    const right = inner - left - btn.offsetWidth;
    const radius = isSm.value ? '4px' : '9999px';
    pillStyle.value = {
        clipPath: `inset(0 ${Math.max(0, right)}px 0 ${Math.max(0, left)}px round ${radius})`,
        opacity: '1',
    };
}

function select(idx: number) {
    if (idx === props.modelValue) return;
    const dir: 1 | -1 = idx > props.modelValue ? 1 : -1;
    emit('update:modelValue', idx);
    emit('change', idx, dir);
}

function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const dir = event.key === 'ArrowRight' ? 1 : -1;
    const next = (props.modelValue + dir + props.options.length) % props.options.length;
    select(next);
    tabRefs.value[next]?.focus();
}

let resizeObserver: ResizeObserver | null = null;
let rafId = 0;

function queuePillUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        rafId = 0;
        updatePill();
    });
}

onMounted(() => {
    nextTick(updatePill);
    if (typeof ResizeObserver !== 'undefined' && tablistRef.value) {
        resizeObserver = new ResizeObserver(queuePillUpdate);
        resizeObserver.observe(tablistRef.value);
    }
});

onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    if (rafId) cancelAnimationFrame(rafId);
});

watch(() => props.modelValue, () => nextTick(updatePill));
watch(() => props.options.map((o) => o.label).join('|'), () => nextTick(updatePill));
</script>

<template>
    <div
        ref="tablistRef"
        role="tablist"
        :aria-label="ariaLabel"
        :class="[
            'relative inline-flex self-start ring-1',
            isSm
                ? 'rounded-md bg-neutral-100 p-1 ring-neutral-200 dark:bg-neutral-800/60 dark:ring-neutral-700'
                : 'rounded-full bg-neutral-100 p-1 ring-neutral-950/5 dark:bg-neutral-900 dark:ring-white/10',
        ]"
    >
        <span
            aria-hidden="true"
            :class="[
                'pointer-events-none absolute inset-1 drop-shadow-sm transition-[clip-path,opacity] duration-[380ms] ease-[var(--ease-spring)] will-change-[clip-path] motion-reduce:transition-none',
                isSm ? 'bg-white dark:bg-neutral-900' : 'bg-white dark:bg-neutral-950',
            ]"
            :style="pillStyle"
        />
        <button
            v-for="(opt, i) in options"
            :key="opt.label"
            :ref="(el) => (tabRefs[i] = el as HTMLButtonElement)"
            type="button"
            role="tab"
            :aria-selected="modelValue === i"
            :tabindex="modelValue === i ? 0 : -1"
            :class="[
                'relative z-10 inline-flex items-center justify-center font-medium transition-[color,transform] duration-200 ease-[var(--ease-spring)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100',
                isSm ? 'rounded-sm px-3 py-1.5 text-sm' : 'min-h-11 rounded-full px-4 py-2 text-sm/6',
                modelValue === i
                    ? 'text-neutral-950 dark:text-white'
                    : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white',
            ]"
            @click="select(i)"
            @keydown="onKeydown"
        >
            {{ opt.label }}
        </button>
    </div>
</template>
