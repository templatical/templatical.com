import { usePreferredReducedMotion, useIntersectionObserver } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

export function useScrollReveal(threshold = 0.15, rootMargin = '0px') {
    const sectionRef = ref<HTMLElement | null>(null);
    const prepared = ref(false);
    const hasRevealed = ref(false);
    const reducedMotion = usePreferredReducedMotion();

    const { stop } = useIntersectionObserver(
        sectionRef,
        ([entry]) => {
            if (entry?.isIntersecting) {
                hasRevealed.value = true;
                stop();
            }
        },
        { threshold, rootMargin },
    );

    onMounted(() => {
        prepared.value = true;
    });

    const isVisible = computed(
        () => reducedMotion.value === 'reduce' || hasRevealed.value,
    );
    const shouldHide = computed(
        () =>
            reducedMotion.value !== 'reduce' &&
            prepared.value &&
            !hasRevealed.value,
    );

    return { sectionRef, isVisible, shouldHide };
}
