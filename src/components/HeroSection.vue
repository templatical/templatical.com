<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getHighlighter, shikiThemeFor, stripPreBackground } from '@/composables/useShikiHighlight';
import { useDarkMode } from '@/composables/useDarkMode';
import AnnouncementBadge from './AnnouncementBadge.vue';
import GitHubStarButton from './GitHubStarButton.vue';
import HeroAurora from './HeroAurora.vue';
import HeroHeadline from './HeroHeadline.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import IconChevronRight from './icons/IconChevronRight.vue';

const { t } = useI18n();

const heroCode = `// npm install @templatical/editor @templatical/renderer

import { init } from '@templatical/editor'
import '@templatical/editor/style.css'

const editor = await init({
  container: '#editor',
  onChange(content) {
    // JSON content — store, version, send anywhere
    console.log(content)
  },
})

// MJML out — render in browser or on your server
const mjml = editor.toMjml()`;

const heroCodeHtml = ref<string | null>(null);
const { isDark } = useDarkMode();

async function renderHeroCode() {
    const h = await getHighlighter();
    heroCodeHtml.value = h.codeToHtml(heroCode, {
        lang: 'javascript',
        theme: shikiThemeFor(isDark.value),
        transformers: [
            stripPreBackground,
            {
                line(node, line) {
                    const existing = (node.properties.style as string | undefined) ?? '';
                    node.properties.style = `${existing ? `${existing};` : ''}--i:${line - 1}`;
                },
            },
        ],
    });
}

onMounted(renderHeroCode);
watch(isDark, renderHeroCode);
</script>

<template>
    <section
        id="hero"
        class="relative -mt-21 bg-neutral-50 pt-41 sm:pt-53 dark:bg-neutral-950"
    >
        <HeroAurora
            root-class="inset-x-0 top-0 -bottom-40"
            fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
        />

        <SiteContainer
            class="relative flex flex-col items-center gap-8 text-center"
        >
            <AnnouncementBadge
                :text="t('home.hero.badge')"
                :href="URLS.github"
                :cta="t('home.hero.badgeCta')"
                external
                class="motion-safe:animate-fade-in"
            />
            <GitHubStarButton
                class="motion-safe:animate-fade-in motion-safe:[animation-delay:50ms]"
            />
            <HeroHeadline
                :text="t('home.hero.headline')"
                class="hero-headline max-w-4xl"
            />
            <div
                class="flex max-w-2xl flex-col gap-4 text-lg/8 text-neutral-600 motion-safe:animate-fade-in motion-safe:[animation-delay:200ms] dark:text-neutral-400"
            >
                <p>{{ t('home.hero.subheadline') }}</p>
            </div>
            <div
                class="flex flex-wrap items-center justify-center gap-4 motion-safe:animate-fade-in motion-safe:[animation-delay:300ms]"
            >
                <SiteButton :href="URLS.playground" size="lg" external>
                    {{ t('home.hero.ctaPrimary') }}
                </SiteButton>
                <SiteButton
                    :href="URLS.comparison"
                    variant="plain"
                    size="lg"
                    external
                >
                    {{ t('home.hero.ctaSecondary') }}
                    <IconChevronRight />
                </SiteButton>
            </div>
        </SiteContainer>
        <SiteContainer class="relative mt-16 pb-20 sm:pb-28">
            <div
                class="hero-terminal-wrap mx-auto max-w-2xl motion-safe:animate-scale-in motion-safe:[animation-delay:400ms]"
            >
                <div
                    class="relative overflow-hidden rounded-lg bg-neutral-100 shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
                >
                    <div
                        v-if="heroCodeHtml"
                        role="region"
                        :aria-label="t('a11y.codeExample')"
                        class="hero-code overflow-x-auto p-5 font-mono text-sm/7 text-neutral-700 dark:text-neutral-300"
                        v-html="heroCodeHtml"
                    />
                    <pre
                        v-else
                        role="region"
                        :aria-label="t('a11y.codeExample')"
                        class="hero-code overflow-x-auto p-5 font-mono text-sm/7 text-neutral-700 dark:text-neutral-300"
                    ><code>{{ heroCode }}</code></pre>
                </div>
            </div>
        </SiteContainer>
    </section>
</template>

<style scoped>
.hero-code :deep(pre) {
    margin: 0;
    padding: 0;
    background: transparent !important;
    line-height: 0;
}
.hero-code :deep(.line) {
    display: block;
    line-height: 1.75rem;
    min-height: 1.75rem;
}

@media (prefers-reduced-motion: no-preference) {
    .hero-code :deep(.line) {
        opacity: 0;
        transform: translateY(6px);
        animation: hero-line-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
        animation-delay: calc(var(--i) * 55ms + 600ms);
    }
}

@keyframes hero-line-in {
    from {
        opacity: 0;
        transform: translateY(8px);
        filter: blur(2px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}

@supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
        .hero-terminal-wrap {
            animation: terminal-parallax linear both;
            animation-timeline: scroll();
            animation-range: 0 600px;
        }
        .hero-headline {
            animation: headline-parallax linear both;
            animation-timeline: scroll();
            animation-range: 0 500px;
        }
    }
}

@keyframes terminal-parallax {
    to {
        transform: translateY(-40px) scale(0.985);
        opacity: 0.85;
    }
}

@keyframes headline-parallax {
    to {
        transform: translateY(-12px);
        letter-spacing: -0.012em;
    }
}
</style>
