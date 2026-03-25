<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { useI18n } from 'vue-i18n';
import AnnouncementBadge from './AnnouncementBadge.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import SiteHeading from './SiteHeading.vue';
import IconChevronRight from './icons/IconChevronRight.vue';

const { t } = useI18n();
const terminalLabel = t('a11y.terminal');
</script>

<template>
    <section id="hero" class="bg-white pt-20 sm:pt-32 dark:bg-neutral-950">
        <SiteContainer
            class="flex flex-col items-center gap-8 text-center"
        >
            <AnnouncementBadge
                :text="t('home.hero.badge')"
                :href="URLS.github"
                :cta="t('home.hero.badgeCta')"
                external
                class="motion-safe:animate-fade-in"
            />
            <SiteHeading
                class="max-w-4xl motion-safe:animate-fade-in motion-safe:[animation-delay:100ms]"
            >
                {{ t('home.hero.headline') }}
            </SiteHeading>
            <div
                class="flex max-w-2xl flex-col gap-4 text-lg/8 text-neutral-600 motion-safe:animate-fade-in motion-safe:[animation-delay:200ms] dark:text-neutral-400"
            >
                <p>{{ t('home.hero.subheadline') }}</p>
            </div>
            <div
                class="flex items-center gap-4 motion-safe:animate-fade-in motion-safe:[animation-delay:300ms]"
            >
                <SiteButton :href="URLS.playground" size="lg" external>
                    {{ t('home.hero.ctaPrimary') }}
                </SiteButton>
                <SiteButton
                    :href="URLS.docs"
                    variant="plain"
                    size="lg"
                    external
                >
                    {{ t('home.hero.ctaSecondary') }}
                    <IconChevronRight />
                </SiteButton>
            </div>
        </SiteContainer>
        <SiteContainer class="mt-16 pb-20 sm:pb-28">
            <div
                class="mx-auto max-w-2xl motion-safe:animate-scale-in motion-safe:[animation-delay:400ms]"
            >
                <div
                    class="overflow-hidden rounded-lg bg-neutral-950 ring-1 ring-white/10 dark:bg-neutral-900"
                >
                    <div
                        class="flex items-center gap-2 border-b border-white/10 px-4 py-3"
                    >
                        <div class="size-3 rounded-full bg-white/10" />
                        <div class="size-3 rounded-full bg-white/10" />
                        <div class="size-3 rounded-full bg-white/10" />
                        <span
                            class="ml-2 text-xs text-neutral-500"
                        >
                            {{ terminalLabel }}
                        </span>
                    </div>
                    <pre
                        class="overflow-x-auto p-5 font-mono text-sm/7 text-neutral-300"
                    ><code><span class="text-neutral-500">$</span> npm install <span class="text-primary">@templatical/vue</span>

<span class="text-blue-400">import</span> { <span class="text-neutral-100">init</span> } <span class="text-blue-400">from</span> <span class="text-primary">'@templatical/vue'</span>
<span class="text-blue-400">import</span> <span class="text-primary">'@templatical/vue/style.css'</span>

<span class="text-blue-400">const</span> <span class="text-neutral-100">editor</span> = <span class="text-neutral-100">init</span>({
  <span class="text-neutral-100">container</span>: <span class="text-primary">'#editor'</span>,
  <span class="text-neutral-100">onChange</span>: (<span class="text-neutral-100">content</span>) =&gt; <span class="text-neutral-100">save</span>(<span class="text-neutral-100">content</span>),
})

<span class="text-neutral-500">// Export as MJML — convert to HTML on your server</span>
<span class="text-blue-400">const</span> <span class="text-neutral-100">mjml</span> = <span class="text-neutral-100">editor</span>.<span class="text-neutral-100">toMjml</span>()</code></pre>
                </div>
            </div>
        </SiteContainer>
    </section>
</template>
