<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { URLS } from '@/lib/urls';
import CodeBlock from './CodeBlock.vue';
import { ChevronRight } from 'lucide-vue-next';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';

const { t } = useI18n();

const installCommand = 'npm install @templatical/editor @templatical/renderer';
const { copy, copied, isSupported } = useClipboard({ source: installCommand });

const usageCode = `import { init } from '@templatical/editor'
import '@templatical/editor/style.css'

const editor = await init({
  container: '#editor',
  onChange(content) {
    // JSON content — store, version, send anywhere
    console.log(content)
  },
})

const mjml = await editor.toMjml()`;
</script>

<template>
    <section class="bg-neutral-50 py-20 sm:py-28 dark:bg-neutral-900">
        <SiteContainer>
            <div class="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
                <h2
                    class="font-display text-3xl/10 tracking-tight text-pretty text-neutral-950 sm:text-5xl/14 dark:text-white"
                >
                    {{ t('home.close.headline') }}
                </h2>
                <p class="max-w-2xl text-lg/8 text-pretty text-neutral-600 dark:text-neutral-400">
                    {{ t('home.close.subheadline') }}
                </p>

                <div
                    class="w-full max-w-xl overflow-hidden rounded-xl bg-white text-left ring-1 ring-neutral-950/10 dark:bg-neutral-950 dark:ring-white/10"
                >
                    <div
                        class="flex items-center justify-between gap-3 px-4 py-3 font-mono text-sm/6"
                    >
                        <span class="truncate text-neutral-700 dark:text-neutral-300">
                            <span
                                class="mr-2 select-none text-neutral-400 dark:text-neutral-600"
                            >$</span>
                            {{ installCommand }}
                        </span>
                        <button
                            v-if="isSupported"
                            type="button"
                            class="shrink-0 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                            @click="copy(installCommand)"
                        >
                            {{ copied ? t('home.close.copiedLabel') : t('home.close.copyLabel') }}
                        </button>
                    </div>
                </div>

                <CodeBlock :code="usageCode" lang="javascript" class="w-full max-w-2xl text-left" />

                <div class="flex flex-wrap items-center justify-center gap-4">
                    <SiteButton :href="URLS.playground" size="lg" external>
                        {{ t('home.close.ctaPrimary') }}
                    </SiteButton>
                    <SiteButton
                        :href="URLS.github"
                        variant="plain"
                        size="lg"
                        external
                    >
                        {{ t('home.close.ctaSecondary') }}
                        <ChevronRight class="size-5" />
                    </SiteButton>
                </div>
            </div>
        </SiteContainer>
    </section>
</template>
