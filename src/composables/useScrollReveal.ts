import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

export function useScrollReveal(threshold = 0.15) {
    const sectionRef = ref<HTMLElement | null>(null);
    const isVisible = ref(false);

    const { stop } = useIntersectionObserver(
        sectionRef,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                isVisible.value = true;
                stop();
            }
        },
        { threshold },
    );

    return { sectionRef, isVisible };
}
