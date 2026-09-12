<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getHighlighter, shikiThemeFor, stripPreBackground } from '@/composables/useShikiHighlight';
import { useDarkMode } from '@/composables/useDarkMode';

const props = defineProps<{ open: boolean; render: () => Promise<string> }>();

const { t } = useI18n();
const { isDark } = useDarkMode();

const html = ref<string | null>(null);
const failed = ref(false);
// The last successfully rendered + highlighted MJML string, kept outside
// reactivity purely as a cache key — it drives the isDark watcher below so a
// theme toggle re-highlights the existing output instead of either calling
// props.render() again (re-invoking editor.toMjml() for no reason) or
// leaving the previous theme's colours on screen.
let lastMjml: string | null = null;

async function highlight(mjml: string) {
    const h = await getHighlighter();
    html.value = h.codeToHtml(mjml, {
        // MJML is HTML-shaped markup. The highlighter only registers
        // javascript/html/lit — an unregistered lang throws, so this must
        // stay 'html' rather than 'xml'.
        lang: 'html',
        theme: shikiThemeFor(isDark.value),
        transformers: [stripPreBackground],
    });
}

// Re-renders on every open, so the output always reflects the visitor's live
// edits rather than a cached first render.
async function renderPanel() {
    failed.value = false;
    html.value = null;
    try {
        const mjml = await props.render();
        await highlight(mjml);
        lastMjml = mjml;
    } catch {
        failed.value = true;
        lastMjml = null;
    }
}

watch(
    () => props.open,
    (open) => {
        if (open) renderPanel();
    },
);

watch(isDark, async () => {
    if (!props.open || lastMjml === null) return;
    try {
        await highlight(lastMjml);
    } catch {
        failed.value = true;
        lastMjml = null;
    }
});
</script>

<template>
    <div
        v-if="open"
        class="mt-3 overflow-hidden rounded-lg border border-neutral-950/5 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-white/5"
    >
        <div
            class="flex items-baseline justify-between gap-4 border-b border-neutral-950/5 px-4 py-2.5 dark:border-white/10"
        >
            <h3 class="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {{ t('heroEditor.mjml.heading') }}
            </h3>
            <p
                class="hidden max-w-md text-[11px]/4 text-neutral-500 sm:block dark:text-neutral-400"
            >
                {{ t('heroEditor.mjml.note') }}
            </p>
        </div>
        <p
            v-if="failed"
            role="alert"
            class="px-4 py-6 text-xs text-neutral-600 dark:text-neutral-400"
        >
            {{ t('heroEditor.mjml.error') }}
        </p>
        <div v-else-if="html" class="max-h-80 overflow-auto p-4 text-[11px]/5" v-html="html" />
        <div v-else class="space-y-2 p-4" aria-hidden="true">
            <div
                v-for="i in 6"
                :key="i"
                class="h-2 rounded bg-neutral-200/70 dark:bg-neutral-800/70"
                :style="{ width: `${90 - i * 8}%` }"
            />
        </div>
    </div>
</template>
