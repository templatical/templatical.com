export const routes = [
    {
        path: '/',
        component: () => import('./pages/Home.vue'),
    },
    {
        path: '/features',
        component: () => import('./pages/Features.vue'),
    },
    {
        path: '/faq',
        component: () => import('./pages/Faq.vue'),
    },
];
