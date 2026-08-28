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
        // Split after each hyphen so a word becomes one or more atomic segments.
        // Every character is its own inline-block, so the browser sees a run of boxes
        // with no notion of "this one is a hyphen, prefer breaking here" — left to
        // itself it breaks mid-syllable. Segmenting is what puts the break opportunity
        // on the hyphen: `.hh__seg` is `white-space: pre` (never breaks inside), while
        // `.hh__w` is `white-space: normal` (may break between segments). A word with
        // no hyphen yields a single segment and behaves exactly as before.
        // This exists for German compounds — `Open-Source-Drag-and-Drop-E-Mail-Editor-SDK.`
        // is 1735px at the 80px hero size and scrolled the whole page sideways.
        const segments = w.split(/(?<=-)/).map((seg, s) => ({
            id: s,
            chars: Array.from(seg).map((c) => ({ c, i: charIndex++ })),
        }));
        return { kind: 'word' as const, id: i, isAccent, segments };
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

function clearTransforms() {
    for (const node of chars) node.style.transform = '';
}

onMounted(() => {
    enhanced.value = true;
    const el = root.value;
    if (!el) return;
    chars = Array.from(el.querySelectorAll<HTMLElement>('.hh__c'));

    const isReduced = reducedMotion.value === 'reduce';

    if (isReduced) {
        chars.forEach((node) => {
            node.style.opacity = '1';
            node.style.transform = 'none';
            node.style.filter = 'none';
        });
    } else {
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
    }

    if (coarsePointer.value) return;

    measure();
    if (!isReduced) {
        // Start the magnetic effect after the intro animation completes.
        useTimeoutFn(resumeRaf, startDelay + chars.length * perChar + duration);
    }
});

// React to reduced-motion toggling mid-session.
watch(reducedMotion, (v) => {
    if (coarsePointer.value) return;
    if (v === 'reduce') {
        pauseRaf();
        clearTransforms();
    } else if (chars.length) {
        measure();
        resumeRaf();
    }
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
                <span v-for="seg in tok.segments" :key="seg.id" class="hh__seg">
                    <span v-for="ch in seg.chars" :key="ch.i" class="hh__c">
                        {{ ch.c }}
                    </span>
                </span>
            </span>
        </template>
    </component>
</template>

<style scoped>
.hh {
    position: relative;
}
/* `normal`, not `pre`: this is the only place a long word is allowed to wrap, and it
   wraps between `.hh__seg` boxes — i.e. on hyphens. See computeTokens(). */
.hh__w {
    display: inline-block;
    white-space: normal;
}
.hh__seg {
    display: inline-block;
    white-space: pre;
}
/* Plain inline collapsible whitespace, NOT an inline-block with `white-space: pre`.
   An inline-block space is an atomic box: it can't be collapsed or hung at a line
   break, so when a line wraps at a space that box lands at the START of the new line
   and indents it by one space width (measured: 18px at the 80px hero size). Real text
   never does this because normal spaces are collapsible — this restores that. The
   space still renders at full width mid-line; only the line-break case changes. */
.hh__sp {
    display: inline;
    white-space: normal;
}
.hh__c {
    display: inline-block;
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
