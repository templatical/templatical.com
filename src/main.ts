import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { i18n } from './i18n';
import { routes } from './router';
import './styles/app.css';

export const createApp = ViteSSG(
    App,
    {
        routes,
        /**
         * Without this, vue-router leaves the window where it was, so following a
         * footer link from the bottom of a long page lands you mid-content on the
         * next one — which is how every /alternatives page behaved.
         *
         * `savedPosition` is only populated on browser back/forward, where restoring
         * the previous offset is the expected behaviour rather than a bug. A hash
         * target wins over both so in-page anchors keep working.
         */
        scrollBehavior(to, _from, savedPosition) {
            if (savedPosition) return savedPosition;
            if (to.hash) return { el: to.hash };
            return { top: 0 };
        },
    },
    ({ app }) => {
        app.use(i18n);
    },
);
