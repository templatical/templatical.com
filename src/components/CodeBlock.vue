<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getHighlighter, shikiThemeFor, stripPreBackground } from '@/composables/useShikiHighlight';
import { useDarkMode } from '@/composables/useDarkMode';
import type { ShikiTransformer } from 'shiki';

const props = withDefaults(
    defineProps<{
        code: string;
        lang?: string;
        transformers?: ShikiTransformer[];
    }>(),
    { lang: 'javascript', transformers: () => [] },
);

const { t } = useI18n();
const { isDark } = useDarkMode();
const html = ref<string | null>(null);

async function render() {
    const h = await getHighlighter();
    html.value = h.codeToHtml(props.code, {
        lang: props.lang,
        theme: shikiThemeFor(isDark.value),
        transformers: [stripPreBackground, ...props.transformers],
    });
}

onMounted(render);
watch([() => props.code, () => props.lang, isDark], render);
</script>

<template>
    <div
        v-if="html"
        role="region"
        :aria-label="t('a11y.codeExample')"
        class="overflow-hidden rounded-xl bg-neutral-100 p-5 font-mono text-sm/7 text-neutral-700 shadow-lg ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-white/10"
        v-html="html"
    />
    <pre
        v-else
        role="region"
        :aria-label="t('a11y.codeExample')"
        class="overflow-x-auto rounded-xl bg-neutral-100 p-5 font-mono text-sm/7 text-neutral-700 shadow-lg ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-white/10"
    ><code>{{ code }}</code></pre>
</template>
