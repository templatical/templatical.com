<script setup lang="ts">
import { URLS } from '@/lib/urls';
import { useI18n } from 'vue-i18n';
import AnnouncementBadge from './AnnouncementBadge.vue';
import GitHubStarButton from './GitHubStarButton.vue';
import HeroAurora from './HeroAurora.vue';
import SiteButton from './SiteButton.vue';
import SiteContainer from './SiteContainer.vue';
import SiteHeading from './SiteHeading.vue';
import IconChevronRight from './icons/IconChevronRight.vue';

const { t } = useI18n();
const terminalLabel = t('a11y.terminal');
</script>

<template>
    <section
        id="hero"
        class="relative isolate -mt-21 overflow-hidden bg-neutral-50 pt-41 sm:pt-53 dark:bg-neutral-950"
    >
        <HeroAurora />

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
            <SiteHeading
                class="hero-headline max-w-4xl motion-safe:animate-fade-in motion-safe:[animation-delay:100ms]"
            >
                {{ t('home.hero.headline') }}
            </SiteHeading>
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
                    class="relative overflow-hidden rounded-lg bg-neutral-950 shadow-2xl ring-1 ring-white/10 dark:bg-neutral-900"
                >
                    <div
                        class="flex items-center gap-2 border-b border-white/10 px-4 py-3"
                    >
                        <div class="size-3 rounded-full bg-white/10" />
                        <div class="size-3 rounded-full bg-white/10" />
                        <div class="size-3 rounded-full bg-white/10" />
                        <span class="ml-2 text-xs text-neutral-500">
                            {{ terminalLabel }}
                        </span>
                    </div>
                    <pre
                        class="hero-code overflow-x-auto p-5 font-mono text-sm/7 text-neutral-300"
                    ><code><span class="hero-line" style="--i:0"><span class="text-neutral-500">$</span> npm install <span class="text-primary">@templatical/editor @templatical/renderer</span></span><span class="hero-line" style="--i:1"> </span><span class="hero-line" style="--i:2"><span class="text-blue-400">import</span> { <span class="text-neutral-100">init</span> } <span class="text-blue-400">from</span> <span class="text-primary">'@templatical/editor'</span></span><span class="hero-line" style="--i:3"><span class="text-blue-400">import</span> <span class="text-primary">'@templatical/editor/style.css'</span></span><span class="hero-line" style="--i:4"> </span><span class="hero-line" style="--i:5"><span class="text-blue-400">const</span> <span class="text-neutral-100">editor</span> = <span class="text-blue-400">await</span> <span class="text-neutral-100">init</span>({</span><span class="hero-line" style="--i:6">  <span class="text-neutral-100">container</span>: <span class="text-primary">'#editor'</span>,</span><span class="hero-line" style="--i:7">  <span class="text-neutral-100">onChange</span>(<span class="text-neutral-100">content</span>) {</span><span class="hero-line" style="--i:8">    <span class="text-neutral-500">// JSON — store, version, send anywhere</span></span><span class="hero-line" style="--i:9">    <span class="text-neutral-100">save</span>(<span class="text-neutral-100">content</span>)</span><span class="hero-line" style="--i:10">  },</span><span class="hero-line" style="--i:11">})</span><span class="hero-line" style="--i:12"> </span><span class="hero-line" style="--i:13"><span class="text-neutral-500">// MJML out — render in browser or on your server</span></span><span class="hero-line" style="--i:14"><span class="text-blue-400">const</span> <span class="text-neutral-100">mjml</span> = <span class="text-neutral-100">editor</span>.<span class="text-neutral-100">toMjml</span>()</span></code></pre>
                </div>
            </div>
        </SiteContainer>
    </section>
</template>

<style scoped>
.hero-code .hero-line {
    display: block;
    min-height: 1.75em;
}

@media (prefers-reduced-motion: no-preference) {
    .hero-code .hero-line {
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
