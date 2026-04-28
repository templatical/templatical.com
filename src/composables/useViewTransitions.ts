import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

type DocWithVT = Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> };
};

export function useViewTransitions() {
    if (typeof document === 'undefined') return;

    const doc = document as DocWithVT;
    if (typeof doc.startViewTransition !== 'function') return;

    const router = useRouter();
    let finishRender: (() => void) | null = null;

    router.beforeResolve((to, from) => {
        if (to.path === from.path) return;

        return new Promise<void>((proceed) => {
            doc.startViewTransition!(() => {
                proceed();
                return new Promise<void>((resolve) => {
                    finishRender = resolve;
                });
            });
        });
    });

    router.afterEach(() => {
        nextTick(() => {
            finishRender?.();
            finishRender = null;
        });
    });
}
