import { useIntersectionObserver, useTimeoutFn } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

export function useScrollReveal(threshold = 0.15, rootMargin = '0px') {
    const sectionRef = ref<HTMLElement | null>(null);
    const prepared = ref(false);
    const hasRevealed = ref(false);

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
        useTimeoutFn(() => {
            hasRevealed.value = true;
            stop();
        }, 2000);
    });

    const isVisible = computed(() => hasRevealed.value);
    const shouldHide = computed(
        () => prepared.value && !hasRevealed.value,
    );

    return { sectionRef, isVisible, shouldHide };
}
