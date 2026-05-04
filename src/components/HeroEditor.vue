<script setup lang="ts">
import { onClickOutside, onKeyStroke, useIntersectionObserver, useMediaQuery } from '@vueuse/core';
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowUpRight, Info, X } from 'lucide-vue-next';
import { useDarkMode } from '@/composables/useDarkMode';
import { URLS, localizedUrl } from '@/lib/urls';

type MergeTag = { label: string; value: string };

const EDITOR_ESM_URL = 'https://unpkg.com/@templatical/editor/dist/cdn/editor.js';
const EDITOR_CSS_URL = 'https://unpkg.com/@templatical/editor/dist/cdn/editor.css';

const noMargin = { top: 0, right: 0, bottom: 0, left: 0 } as const;
const heroContent = {
    settings: {
        width: 600,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica, Arial, sans-serif',
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
const { t, locale } = useI18n();
const isDesktop = useMediaQuery('(min-width: 1024px)');

const root = useTemplateRef<HTMLDivElement>('root');
const container = useTemplateRef<HTMLDivElement>('container');
const modalPanel = useTemplateRef<HTMLDivElement>('modalPanel');
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle');

const DEMO_TAG_KEYS = ['firstName', 'lastName', 'email', 'company', 'unsubscribeUrl'] as const;
const DEMO_TAG_VALUES: Record<(typeof DEMO_TAG_KEYS)[number], string> = {
    firstName: '{{first_name}}',
    lastName: '{{last_name}}',
    email: '{{email}}',
    company: '{{company}}',
    unsubscribeUrl: '{{unsubscribe_url}}',
};

const dynamicMergeTagsDocsUrl = computed(() =>
    localizedUrl('dynamicMergeTagsDocs', locale.value),
);

const demoTags = computed(() =>
    DEMO_TAG_KEYS.map((key) => ({
        key,
        label: t(`heroEditor.mergeTags.${key}.label`),
        description: t(`heroEditor.mergeTags.${key}.description`),
        value: DEMO_TAG_VALUES[key],
    })),
);

const showMergeTagModal = ref(false);
let resolveMergeTagSelection: ((tag: MergeTag | null) => void) | null = null;

function requestMergeTag(): Promise<MergeTag | null> {
    showMergeTagModal.value = true;
    return new Promise((resolve) => {
        resolveMergeTagSelection = resolve;
    });
}

function selectMergeTag(tag: MergeTag) {
    resolveMergeTagSelection?.(tag);
    resolveMergeTagSelection = null;
    showMergeTagModal.value = false;
}

function cancelMergeTag() {
    resolveMergeTagSelection?.(null);
    resolveMergeTagSelection = null;
    showMergeTagModal.value = false;
}

onClickOutside(modalPanel, () => {
    if (showMergeTagModal.value) cancelMergeTag();
});
onKeyStroke('Escape', () => {
    if (showMergeTagModal.value) cancelMergeTag();
});

type EditorInstance = {
    unmount(): void;
    setTheme?(theme: 'light' | 'dark' | 'auto'): void;
};
let editorInstance: EditorInstance | null = null;
let cssLink: HTMLLinkElement | null = null;

const LOAD_TIMEOUT_MS = 15000;

async function mountEditor() {
    if (status.value !== 'idle') return;
    status.value = 'loading';
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), LOAD_TIMEOUT_MS),
    );
    try {
        if (!document.querySelector(`link[href="${EDITOR_CSS_URL}"]`)) {
            cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = EDITOR_CSS_URL;
            document.head.appendChild(cssLink);
        }

        const mod = await Promise.race([
            import(/* @vite-ignore */ EDITOR_ESM_URL),
            timeout,
        ]);
        if (!container.value) return;
        editorInstance = await Promise.race([
            mod.init({
                container: container.value,
                uiTheme: isDark.value ? 'dark' : 'light',
                locale: locale.value,
                branding: false,
                content: heroContent,
                mergeTags: {
                    tags: demoTags.value.map(({ label, value }) => ({ label, value })),
                    onRequest: requestMergeTag,
                },
            }),
            timeout,
        ]);
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
                    class="hero-editor-skeleton absolute inset-0 flex flex-col bg-white dark:bg-neutral-900"
                    aria-hidden="true"
                >
                    <!-- Top bar -->
                    <div class="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <div class="size-7 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                        <div class="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
                        <div class="ml-auto flex items-center gap-2">
                            <div class="h-7 w-20 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                            <div class="h-7 w-16 rounded-md bg-neutral-100 dark:bg-neutral-800/60" />
                            <div class="h-7 w-16 rounded-md bg-neutral-100 dark:bg-neutral-800/60" />
                            <div class="ml-3 size-7 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                            <div class="size-7 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                        </div>
                    </div>

                    <div class="flex flex-1 overflow-hidden">
                        <!-- Left rail -->
                        <div class="flex w-14 flex-col items-center gap-3 border-r border-neutral-200 py-4 dark:border-neutral-800">
                            <div
                                v-for="i in 8"
                                :key="i"
                                class="size-6 rounded-md bg-neutral-200 dark:bg-neutral-800"
                            />
                        </div>

                        <!-- Canvas -->
                        <div class="flex flex-1 justify-center bg-neutral-50 px-6 py-10 dark:bg-neutral-950/40">
                            <div class="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                                <div class="mx-auto h-5 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
                                <div class="mx-auto h-3 w-48 rounded bg-neutral-200/80 dark:bg-neutral-800/80" />
                                <div class="h-2 w-full rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                                <div class="h-2 w-5/6 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                                <div class="h-2 w-2/3 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                                <div class="mx-auto mt-2 h-9 w-40 rounded-md bg-neutral-300 dark:bg-neutral-700" />
                                <div class="mt-2 h-px w-full bg-neutral-200 dark:bg-neutral-800" />
                                <div class="mx-auto h-2 w-3/4 rounded bg-neutral-200/60 dark:bg-neutral-800/60" />
                            </div>
                        </div>

                        <!-- Right sidebar -->
                        <div class="hidden w-64 flex-col gap-4 border-l border-neutral-200 p-4 md:flex dark:border-neutral-800">
                            <div class="flex gap-2">
                                <div class="h-7 flex-1 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                                <div class="h-7 flex-1 rounded-md bg-neutral-100 dark:bg-neutral-800/60" />
                            </div>
                            <div class="mt-6 flex flex-col items-center gap-3">
                                <div class="size-10 rounded-md bg-neutral-200 dark:bg-neutral-800" />
                                <div class="h-3 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
                                <div class="h-2 w-40 rounded bg-neutral-200/70 dark:bg-neutral-800/70" />
                            </div>
                        </div>
                    </div>

                </div>
                <div
                    v-if="status === 'error'"
                    role="alert"
                    class="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80"
                >
                    <p class="text-sm text-neutral-600 dark:text-neutral-300">
                        <i18n-t keypath="heroEditor.error.message" tag="span">
                            <template #playground>
                                <a
                                    :href="URLS.playground"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="font-medium text-primary underline"
                                >{{ t('heroEditor.error.playgroundLabel') }}</a>
                            </template>
                        </i18n-t>
                    </p>
                </div>
            </template>
            <img
                v-else
                src="/preview.png"
                :alt="t('heroEditor.previewAlt') || 'Templatical editor preview'"
                width="2124"
                height="1428"
                decoding="async"
                fetchpriority="high"
                class="block h-auto w-full"
            />
        </div>

        <Teleport to="body">
            <Transition
                enter-active-class="motion-safe:transition motion-safe:duration-150 motion-safe:ease-out"
                leave-active-class="motion-safe:transition motion-safe:duration-100 motion-safe:ease-in"
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="showMergeTagModal"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="merge-tag-modal-title"
                >
                    <div
                        ref="modalPanel"
                        class="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
                    >
                        <div class="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
                            <div>
                                <h2
                                    id="merge-tag-modal-title"
                                    class="text-base font-semibold text-neutral-900 dark:text-neutral-100"
                                >
                                    {{ t('heroEditor.mergeTagModal.title') }}
                                </h2>
                                <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                                    {{ t('heroEditor.mergeTagModal.description') }}
                                </p>
                            </div>
                            <button
                                type="button"
                                class="-m-1 cursor-pointer rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                                :aria-label="t('heroEditor.mergeTagModal.close')"
                                @click="cancelMergeTag"
                            >
                                <X class="size-4" aria-hidden="true" />
                            </button>
                        </div>

                        <div class="mx-5 mt-4 flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] leading-relaxed text-neutral-700 dark:border-primary/30 dark:bg-primary/10 dark:text-neutral-300">
                            <Info class="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                            <div class="space-y-1">
                                <p>{{ t('heroEditor.mergeTagModal.consumerInfo') }}</p>
                                <a
                                    :href="dynamicMergeTagsDocsUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1 font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    {{ t('heroEditor.mergeTagModal.docsLink') }}
                                    <ArrowUpRight class="size-3" aria-hidden="true" />
                                </a>
                            </div>
                        </div>

                        <ul class="max-h-80 overflow-y-auto py-2">
                            <li v-for="tag in demoTags" :key="tag.key">
                                <button
                                    type="button"
                                    class="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-3 text-left transition hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none dark:hover:bg-neutral-800/60 dark:focus-visible:bg-neutral-800/60"
                                    @click="selectMergeTag({ label: tag.label, value: tag.value })"
                                >
                                    <span class="flex flex-col">
                                        <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {{ tag.label }}
                                        </span>
                                        <span class="text-xs text-neutral-500 dark:text-neutral-400">
                                            {{ tag.description }}
                                        </span>
                                    </span>
                                    <code class="shrink-0 rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                        {{ tag.value }}
                                    </code>
                                </button>
                            </li>
                        </ul>

                        <div class="flex items-center justify-between gap-3 border-t border-neutral-200 px-5 py-3 dark:border-neutral-800">
                            <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                                {{ t('heroEditor.mergeTagModal.demoNote') }}
                            </p>
                            <button
                                type="button"
                                class="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-neutral-300 dark:hover:bg-neutral-800"
                                @click="cancelMergeTag"
                            >
                                {{ t('heroEditor.mergeTagModal.cancel') }}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.hero-editor-container {
    width: 100%;
    height: 60vh;
    min-height: 520px;
    max-height: 740px;
}
@media (max-width: 640px) {
    .hero-editor-container {
        height: 55vh;
        min-height: 420px;
    }
}
.hero-editor-skeleton {
    animation: hero-editor-pulse 2s ease-in-out infinite;
}
@keyframes hero-editor-pulse {
    0%,
    100% {
        opacity: 0.85;
    }
    50% {
        opacity: 1;
    }
}
@media (prefers-reduced-motion: reduce) {
    .hero-editor-skeleton {
        animation: none;
        opacity: 0.95;
    }
}
</style>
