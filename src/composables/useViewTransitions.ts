import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

type ViewTransitionLike = {
    /** Settles when the pseudo-element tree is built; REJECTS on a skip. */
    ready: Promise<void>;
    finished: Promise<void>;
};

type DocWithVT = Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => ViewTransitionLike;
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
            const transition = doc.startViewTransition!(() => {
                proceed();
                return new Promise<void>((resolve) => {
                    finishRender = resolve;
                });
            });

            /*
                `ready` rejects with `InvalidStateError` whenever the transition is
                SKIPPED, and nothing here awaits it — so the rejection is unobserved
                and reaches the console as `Uncaught (in promise) InvalidStateError`.

                The common skip on this site is a document that is not visible: a
                route change in a backgrounded tab is skipped by the spec. Measured
                on `/importers` → `/faq`, that was the only skip condition present —
                `finished` still resolved, one transition was in flight, and no two
                elements shared a `view-transition-name`. So this is a console-noise
                fix, not a broken-animation fix: with a visible tab the transition
                runs and the choreography in `app.css` plays normally.

                Swallowing `ready` alone, never `finished`: a `finished` rejection
                would mean the update callback itself threw, which is a real bug and
                should stay loud. `Features.vue` catches `ready` the same way, for
                the same reason.
            */
            transition.ready.catch(() => {});
        });
    });

    router.afterEach(() => {
        nextTick(() => {
            finishRender?.();
            finishRender = null;
        });
    });
}
