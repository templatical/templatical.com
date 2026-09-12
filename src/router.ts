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
        path: '/importers',
        component: () => import('./pages/Importers.vue'),
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
    {
        path: '/alternatives/easy-email-pro',
        component: () => import('./pages/AlternativeEasyEmailPro.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/alternatives/beefree',
        component: () => import('./pages/AlternativeBeefree.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/alternatives/unlayer',
        component: () => import('./pages/AlternativeUnlayer.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/alternatives/stripo',
        component: () => import('./pages/AlternativeStripo.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/alternatives/topol',
        component: () => import('./pages/AlternativeTopol.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/alternatives/chamaileon',
        component: () => import('./pages/AlternativeChamaileon.vue'),
        meta: { transparentHero: true },
    },
    {
        path: '/alternatives/grapesjs',
        component: () => import('./pages/AlternativeGrapesjs.vue'),
        meta: { transparentHero: true },
    },
];
