declare module 'vue-router' {
    interface RouteMeta {
        /**
         * The page opens with a hero that slides up under the sticky navbar
         * (`-mt-21` + matching top padding), so the navbar stays transparent
         * until scrolled. Opt-in: a page without it gets the solid navbar,
         * which is the safe default for any layout that starts at the top edge.
         */
        transparentHero?: boolean;
    }
}

export const routes = [
    {
        path: '/',
        component: () => import('./pages/Home.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/features',
        component: () => import('./pages/Features.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/faq',
        component: () => import('./pages/Faq.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/changelog',
        component: () => import('./pages/Changelog.vue'),
        meta: { transparentHero: true },
    },
];
