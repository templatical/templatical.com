<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
    useEventListener,
    useMediaQuery,
    useMouse,
    usePreferredReducedMotion,
    useRafFn,
    useResizeObserver,
    useTimeoutFn,
} from '@vueuse/core';
import { computed, onMounted, ref, useAttrs, watch } from 'vue';

const props = withDefaults(
    defineProps<{
        text: string;
        accent?: string;
        as?: 'h1' | 'h2';
    }>(),
    { accent: undefined, as: 'h1' },
);

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const baseClass =
    'font-display tracking-tight text-balance text-neutral-950 dark:text-white';
const sizeClass =
    props.as === 'h1'
        ? 'text-5xl/12 sm:text-[5rem]/20'
        : 'text-3xl/10 sm:text-4xl/12';

const classes = computed(() =>
    cn(baseClass, sizeClass, attrs.class as string),
);

const root = ref<HTMLElement | null>(null);
const enhanced = ref(false);

const tokens = computeTokens(props.text, props.accent);

function computeTokens(text: string, accent?: string) {
    const words = text.split(/(\s+)/);
    let charIndex = 0;
    return words.map((w, i) => {
        if (/^\s+$/.test(w)) return { kind: 'space' as const, id: i };
        const isAccent = accent ? w.replace(/[.,]$/, '') === accent : false;
        const chars = Array.from(w).map((c) => ({ c, i: charIndex++ }));
        return { kind: 'word' as const, id: i, isAccent, chars };
    });
}

const reducedMotion = usePreferredReducedMotion();
const coarsePointer = useMediaQuery('(pointer: coarse)');
const { x: pointerX, y: pointerY } = useMouse({ type: 'client', initialValue: { x: -9999, y: -9999 } });

const startDelay = 80;
const perChar = 18;
const duration = 720;
const radius = 120;

let chars: HTMLElement[] = [];
let centers: { x: number; y: number }[] = [];

function measure() {
    centers = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
}

const { pause: pauseRaf, resume: resumeRaf } = useRafFn(
    () => {
        for (let i = 0; i < chars.length; i++) {
            const c = centers[i];
            if (!c) continue;
            const dx = pointerX.value - c.x;
            const dy = pointerY.value - c.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > radius * radius) {
                chars[i].style.transform = '';
                continue;
            }
            const d = Math.sqrt(d2);
            const f = (1 - d / radius) ** 2;
            const tx = -(dx / Math.max(d, 1)) * f * 4;
            const ty = -(dy / Math.max(d, 1)) * f * 4 - f * 2;
            chars[i].style.transform =
                `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
        }
    },
    { immediate: false },
);

useEventListener(typeof window !== 'undefined' ? window : null, 'scroll', () => measure(), {
    passive: true,
});
useResizeObserver(typeof document !== 'undefined' ? document.body : null, measure);

onMounted(() => {
    enhanced.value = true;
    const el = root.value;
    if (!el) return;
    chars = Array.from(el.querySelectorAll<HTMLElement>('.hh__c'));

    if (reducedMotion.value === 'reduce') {
        chars.forEach((node) => {
            node.style.opacity = '1';
            node.style.transform = 'none';
            node.style.filter = 'none';
        });
        return;
    }

    chars.forEach((node, i) => {
        node.animate(
            [
                {
                    opacity: 0,
                    transform: 'translateY(14px) scale(0.96)',
                    filter: 'blur(6px)',
                },
                {
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                    filter: 'blur(0)',
                },
            ],
            {
                duration,
                delay: startDelay + i * perChar,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'both',
            },
        );
    });

    if (coarsePointer.value) return;

    measure();
    // Start the magnetic effect after the intro animation completes.
    useTimeoutFn(resumeRaf, startDelay + chars.length * perChar + duration);
});

// Stop the raf loop when reduced-motion turns on mid-session.
watch(reducedMotion, (v) => {
    if (v === 'reduce') pauseRaf();
});
</script>

<template>
    <component
        :is="as"
        ref="root"
        :class="[classes, 'hh', { 'hh--enhanced': enhanced }]"
    >
        <span class="sr-only">{{ text }}</span>
        <template v-for="tok in tokens" :key="tok.id">
            <span
                v-if="tok.kind === 'space'"
                class="hh__sp"
                aria-hidden="true"
            >
                {{ ' ' }}
            </span>
            <span
                v-else
                class="hh__w"
                :class="{ 'hh__w--accent': tok.isAccent }"
                aria-hidden="true"
            >
                <span v-for="ch in tok.chars" :key="ch.i" class="hh__c">
                    {{ ch.c }}
                </span>
            </span>
        </template>
    </component>
</template>

<style scoped>
.hh {
    position: relative;
}
.hh__w {
    display: inline-block;
    white-space: pre;
}
.hh__sp {
    display: inline-block;
    white-space: pre;
}
.hh__c {
    display: inline-block;
    will-change: transform, opacity, filter;
    transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}
.hh--enhanced .hh__c {
    opacity: 0;
}
.hh__w--accent .hh__c {
    color: var(--primary);
}
@media (prefers-reduced-motion: reduce) {
    .hh--enhanced .hh__c {
        opacity: 1;
    }
    .hh__c {
        transition: none;
    }
}
</style>
