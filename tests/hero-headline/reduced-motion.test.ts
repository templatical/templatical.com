import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref, watch } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { transpileModule, ScriptTarget } from 'typescript';

const HEADLINE = import.meta.glob('../../src/components/HeroHeadline.vue', {
    query: '?raw',
    import: 'default',
    eager: true,
})['../../src/components/HeroHeadline.vue'] as string;

// The suite runs in Node without a Vue SFC transform. Execute the component's
// RAF callback, timer and watcher with a controlled frame scheduler.
function setupMagnet() {
    const sections = [
        /const \{ pause: pauseRaf, resume: resumeRaf \} = useRafFn\([\s\S]*?\n\);/,
        /function clearTransforms\(\) \{[\s\S]*?\n\}/,
        /const \{ start: startMagnet, stop: stopMagnet \} = useTimeoutFn\([\s\S]*?\n\);/,
        /watch\(reducedMotion, \(v\) => \{[\s\S]*?\n\}\);/,
    ].map((pattern) => {
        const match = HEADLINE.match(pattern);
        expect(match, `HeroHeadline section ${pattern}`).not.toBeNull();
        return match![0];
    });

    const transforms: string[] = [];
    const character = {
        style: {
            set transform(value: string) {
                transforms.push(value);
            },
        },
    };
    const reducedMotion = ref<'no-preference' | 'reduce'>('no-preference');
    let resumes = 0;
    let frameTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduledRaf = (callback: () => void) => ({
        pause: () => {
            if (frameTimer) clearTimeout(frameTimer);
            frameTimer = undefined;
        },
        resume: () => {
            resumes++;
            const frame = () => {
                callback();
                frameTimer = setTimeout(frame, 16);
            };
            frameTimer = setTimeout(frame, 16);
        },
    });
    let timeoutCallback: (() => void) | undefined;
    const trackedTimeout: typeof useTimeoutFn = (callback, interval, options) => {
        timeoutCallback = callback;
        return useTimeoutFn(callback, interval, options);
    };

    const source = transpileModule(`${sections.join('\n')}\nreturn { startMagnet };`, {
        compilerOptions: { target: ScriptTarget.ES2022 },
    }).outputText;
    const run = new Function(
        'useRafFn',
        'useTimeoutFn',
        'watch',
        'reducedMotion',
        'character',
        'pointerX',
        'pointerY',
        `const chars = [character];
         const centers = [{ x: 0, y: 0 }];
         const radius = 120;
         const startDelay = 80;
         const perChar = 18;
         const duration = 720;
         const coarsePointer = { value: false };
         const measure = () => {};
         ${source}`,
    ) as (...args: unknown[]) => { startMagnet: () => void };
    const { startMagnet } = run(
        scheduledRaf,
        trackedTimeout,
        watch,
        reducedMotion,
        character,
        ref(0),
        ref(0),
    );
    return {
        startMagnet,
        reducedMotion,
        transforms,
        get resumes() {
            return resumes;
        },
        fireQueuedTimeout: () => timeoutCallback?.(),
    };
}

describe('HeroHeadline reduced motion', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('cancels a pending magnetic start when reduced motion turns on', async () => {
        vi.useFakeTimers();
        const magnet = setupMagnet();

        magnet.startMagnet();
        magnet.reducedMotion.value = 'reduce';
        await nextTick();
        const writesAfterReduction = magnet.transforms.length;

        vi.advanceTimersByTime(1000);

        expect(magnet.resumes).toBe(0);
        expect(magnet.transforms).toHaveLength(writesAfterReduction);
    });

    it('ignores a delayed callback already queued when reduced motion turns on', async () => {
        vi.useFakeTimers();
        const magnet = setupMagnet();

        magnet.startMagnet();
        magnet.reducedMotion.value = 'reduce';
        await nextTick();
        const writesAfterReduction = magnet.transforms.length;

        magnet.fireQueuedTimeout();
        vi.advanceTimersByTime(1000);

        expect(magnet.resumes).toBe(0);
        expect(magnet.transforms).toHaveLength(writesAfterReduction);
    });
});
