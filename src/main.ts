import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { i18n } from './i18n';
import { routes } from './router';
import './styles/app.css';

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
    app.use(i18n);
});
