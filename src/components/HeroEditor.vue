<script setup lang="ts">
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core';
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDarkMode } from '@/composables/useDarkMode';

const EDITOR_ESM_URL = 'https://unpkg.com/@templatical/editor/dist/cdn/editor.js';
const EDITOR_CSS_URL = 'https://unpkg.com/@templatical/editor/dist/cdn/editor.css';

const noMargin = { top: 0, right: 0, bottom: 0, left: 0 } as const;
const heroContent = {
    settings: {
        width: 600,
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, Arial, sans-serif',
        preheaderText: 'Your workspace is ready — here is what comes next.',
    },
    blocks: [
        {
            id: 'hero-brand',
            type: 'title',
            content: '<p>Acme</p>',
            level: 1,
            color: '#0f172a',
            textAlign: 'center',
            styles: {
                padding: { top: 32, right: 32, bottom: 8, left: 32 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-headline',
            type: 'title',
            content:
                '<p>Welcome, <span data-merge-tag="{{first_name}}">First Name</span></p>',
            level: 2,
            color: '#0f172a',
            textAlign: 'center',
            styles: {
                padding: { top: 8, right: 40, bottom: 8, left: 40 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-intro',
            type: 'paragraph',
            content:
                '<p style="text-align: center"><span style="color: #475569">Your workspace is ready. Pick up where you left off, or jump in fresh — we set up a quick tour for you.</span></p>',
            styles: {
                padding: { top: 0, right: 40, bottom: 24, left: 40 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-cta',
            type: 'button',
            text: 'Open your dashboard',
            url: 'https://example.com/dashboard',
            backgroundColor: '#0f172a',
            textColor: '#ffffff',
            borderRadius: 8,
            fontSize: 15,
            buttonPadding: { top: 14, right: 28, bottom: 14, left: 28 },
            styles: {
                padding: { top: 0, right: 20, bottom: 32, left: 20 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-divider',
            type: 'divider',
            lineStyle: 'solid',
            color: '#e5e7eb',
            thickness: 1,
            width: 'full',
            styles: {
                padding: { top: 0, right: 40, bottom: 0, left: 40 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
        {
            id: 'hero-footer',
            type: 'paragraph',
            content:
                '<p style="text-align: center"><span style="font-size: 12px; color: #94a3b8">Acme Inc. · 1 Market St, San Francisco · <a href="{{unsubscribe_url}}">Unsubscribe</a></span></p>',
            styles: {
                padding: { top: 16, right: 24, bottom: 32, left: 24 },
                margin: noMargin,
                backgroundColor: '#ffffff',
            },
        },
    ],
};

const { isDark } = useDarkMode();
const { locale } = useI18n();
const isDesktop = useMediaQuery('(min-width: 1024px)');

const root = useTemplateRef<HTMLDivElement>('root');
const container = useTemplateRef<HTMLDivElement>('container');
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle');

type EditorInstance = {
    unmount(): void;
    setTheme?(theme: 'light' | 'dark' | 'auto'): void;
};
let editorInstance: EditorInstance | null = null;
let cssLink: HTMLLinkElement | null = null;

async function mountEditor() {
    if (status.value !== 'idle') return;
    status.value = 'loading';
    try {
        if (!document.querySelector(`link[href="${EDITOR_CSS_URL}"]`)) {
            cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = EDITOR_CSS_URL;
            document.head.appendChild(cssLink);
        }

        const mod = await import(/* @vite-ignore */ EDITOR_ESM_URL);
        if (!container.value) return;
        editorInstance = await mod.init({
            container: container.value,
            uiTheme: isDark.value ? 'dark' : 'light',
            locale: locale.value,
            branding: false,
            content: heroContent,
            mergeTags: {
                tags: [
                    { label: 'First name', value: '{{first_name}}' },
                    { label: 'Unsubscribe URL', value: '{{unsubscribe_url}}' },
                ],
            },
        });
        status.value = 'ready';
    } catch (e) {
        console.warn('Templatical editor failed to load', e);
        status.value = 'error';
    }
}

watch(isDark, (dark) => {
    editorInstance?.setTheme?.(dark ? 'dark' : 'light');
});

const { stop } = useIntersectionObserver(
    root,
    ([entry]) => {
        if (entry?.isIntersecting && isDesktop.value) {
            stop();
            mountEditor();
        }
    },
    { threshold: 0.1 },
);

onBeforeUnmount(() => {
    try {
        editorInstance?.unmount();
    } catch {
        // ignore
    }
    cssLink?.remove();
});
</script>

<template>
    <div ref="root" class="mx-auto w-full max-w-7xl">
        <div
            class="relative overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
        >
            <template v-if="isDesktop">
                <div ref="container" class="hero-editor-container" />
                <div
                    v-if="status !== 'ready'"
                    class="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-neutral-900/70"
                    aria-hidden="true"
                >
                    <p
                        v-if="status === 'error'"
                        class="text-sm text-neutral-600 dark:text-neutral-300"
                    >
                        Live preview unavailable. Try the
                        <a
                            href="https://play.templatical.com"
                            target="_blank"
                            rel="noopener"
                            class="font-medium text-primary underline"
                        >playground</a>.
                    </p>
                    <div v-else class="hero-editor-skeleton" />
                </div>
            </template>
            <img
                v-else
                src="/preview.png"
                alt="Templatical editor preview"
                loading="lazy"
                class="block h-auto w-full"
            />
        </div>
    </div>
</template>

<style scoped>
.hero-editor-container {
    width: 100%;
    height: 70vh;
    min-height: 600px;
    max-height: 860px;
}
@media (max-width: 640px) {
    .hero-editor-container {
        height: 60vh;
        min-height: 460px;
    }
}
.hero-editor-skeleton {
    position: absolute;
    inset: 0;
    background:
        linear-gradient(
            100deg,
            transparent 30%,
            rgba(0, 0, 0, 0.04) 50%,
            transparent 70%
        ),
        repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.04) 0 14px,
            transparent 14px 28px
        );
    background-size: 200% 100%, 100% 100%;
    animation: shimmer 1.6s linear infinite;
}
:global(.dark) .hero-editor-skeleton {
    background:
        linear-gradient(
            100deg,
            transparent 30%,
            rgba(255, 255, 255, 0.06) 50%,
            transparent 70%
        ),
        repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.05) 0 14px,
            transparent 14px 28px
        );
    background-size: 200% 100%, 100% 100%;
}
@keyframes shimmer {
    from {
        background-position: -200% 0, 0 0;
    }
    to {
        background-position: 200% 0, 0 0;
    }
}
</style>
