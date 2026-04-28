<script setup lang="ts">
import BentoGrid from '@/components/BentoGrid.vue';
import CtaSection from '@/components/CtaSection.vue';
import HeroAurora from '@/components/HeroAurora.vue';
import HeroHeadline from '@/components/HeroHeadline.vue';
import RevealOnScroll from '@/components/RevealOnScroll.vue';
import SiteContainer from '@/components/SiteContainer.vue';
import SiteEyebrow from '@/components/SiteEyebrow.vue';
import SiteSection from '@/components/SiteSection.vue';
import SiteText from '@/components/SiteText.vue';
import IconArrowUpTray from '@/components/icons/IconArrowUpTray.vue';
import IconArrowUturnLeft from '@/components/icons/IconArrowUturnLeft.vue';
import IconGlobe from '@/components/icons/IconGlobe.vue';
import IconMoon from '@/components/icons/IconMoon.vue';
import IconSwatch from '@/components/icons/IconSwatch.vue';
import { useHead } from '@unhead/vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { tagTemplateAsHtml } from '@/composables/useShikiHighlight';
import CodeBlock from '@/components/CodeBlock.vue';
import { URLS } from '@/lib/urls';

const { t, tm, locale, fallbackLocale } = useI18n();

function docsUrl(path: string): string {
    const fallback = String(fallbackLocale.value);
    const prefix = locale.value === fallback ? '' : `/${locale.value}`;
    return `${URLS.docs}${prefix}${path}`;
}

useHead({
    title: computed(() => t('features.meta.title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('features.meta.description')),
        },
    ],
});

interface CodeVariant {
    label: string;
    code: string;
}
interface FeatureSection {
    slug: string;
    eyebrow: string;
    title: string;
    description: string;
    features: string[];
    code?: string;
    variants?: CodeVariant[];
    docsPath: string;
}

const featureSections = computed<FeatureSection[]>(() => [
    {
        slug: 'custom-blocks',
        docsPath: '/guide/custom-blocks',
        eyebrow: t('features.customBlocks.eyebrow'),
        title: t('features.customBlocks.title'),
        description: t('features.customBlocks.description'),
        features: tm('features.customBlocks.features') as string[],
        variants: [
            {
                label: t('features.variants.static'),
                code: `const editor = await init({
  container: '#editor',
  customBlocks: [
    {
      type: 'event-details',
      name: 'Event Details',
      description: 'Date, time, location, and a map link',
      fields: [
        { type: 'text',  key: 'eventName', label: 'Event Name', required: true },
        { type: 'text',  key: 'date',      label: 'Date',       default: 'April 15, 2026' },
        { type: 'text',  key: 'location',  label: 'Location' },
        { type: 'text',  key: 'mapUrl',    label: 'Map Link (optional)' },
        { type: 'color', key: 'accent',    label: 'Accent',     default: '#7c3aed' },
      ],
      template: \`
        <div style="border: 2px solid {{ accent }}; padding: 20px; border-radius: 8px;">
          <h3 style="color: {{ accent }};">{{ eventName }}</h3>
          <p>📅 {{ date }} · 📍 {{ location }}</p>
          {% if mapUrl %}
            <a href="{{ mapUrl }}">View on Map →</a>
          {% endif %}
        </div>
      \`,
    },
  ],
})`,
            },
            {
                label: t('features.variants.apiBacked'),
                code: `const editor = await init({
  container: '#editor',
  customBlocks: [
    {
      type: 'featured-article',
      name: 'Featured Article',
      description: 'Fetches article data from your CMS',
      fields: [
        { type: 'text',     key: 'title',    label: 'Title',    readOnly: true },
        { type: 'textarea', key: 'excerpt',  label: 'Excerpt',  readOnly: true },
        { type: 'image',    key: 'imageUrl', label: 'Cover image' },
        { type: 'text',     key: 'author',   label: 'Author',   readOnly: true },
      ],
      template: \`
        <article style="border: 1px solid #e5e7eb; border-radius: 8px;">
          {% if imageUrl %}
            <img src="{{ imageUrl }}" width="100%" />
          {% endif %}
          <div style="padding: 20px;">
            <h3>{{ title }}</h3>
            <p>{{ excerpt }}</p>
            {% if author %}
              <small>By {{ author }}</small>
            {% endif %}
          </div>
        </article>
      \`,
      dataSource: {
        label: 'Change article',
        async onFetch({ fieldValues }) {
          const res = await fetch(\`/api/articles?category=\${fieldValues.category}\`)
          const articles = await res.json()
          const picked = await openPicker(articles)
          return picked?.data ?? null
        },
      },
    },
  ],
})`,
            },
        ],
    },
    {
        slug: 'merge-tags',
        docsPath: '/guide/merge-tags',
        eyebrow: t('features.mergeTags.eyebrow'),
        title: t('features.mergeTags.title'),
        description: t('features.mergeTags.description'),
        features: tm('features.mergeTags.features') as string[],
        variants: [
            {
                label: t('features.variants.predefined'),
                code: `const editor = await init({
  container: '#editor',
  mergeTags: {
    syntax: 'liquid',
    tags: [
      { label: 'First name',      value: '{{first_name}}' },
      { label: 'Email',           value: '{{email}}' },
      { label: 'Plan name',       value: '{{plan_name}}' },
      { label: 'Order ID',        value: '{{order_id}}' },
      { label: 'Order total',     value: '{{order_total}}' },
      { label: 'Unsubscribe URL', value: '{{unsubscribe_url}}' },
    ],
  },
})`,
            },
            {
                label: t('features.variants.customPicker'),
                code: `const editor = await init({
  container: '#editor',
  mergeTags: {
    syntax: 'liquid',
    tags: [
      { label: 'First name', value: '{{first_name}}' },
      { label: 'Email',      value: '{{email}}' },
    ],
    // Editor calls onRequest when the user inserts a merge tag.
    // Open your own picker (CRM-aware modal, search, etc.) and
    // resolve with the chosen tag — or null on cancel.
    async onRequest() {
      const picked = await openMergeTagPicker({
        title: 'Select a merge tag',
        groups: ['Contact', 'Account', 'Order'],
        endpoint: '/api/crm/fields',
      })
      return picked ?? null
    },
  },
})`,
            },
        ],
    },
    {
        slug: 'display-conditions',
        docsPath: '/guide/display-conditions',
        eyebrow: t('features.displayConditions.eyebrow'),
        title: t('features.displayConditions.title'),
        description: t('features.displayConditions.description'),
        features: tm('features.displayConditions.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  displayConditions: {
    conditions: [
      {
        label: 'VIP Partners',
        before: '{% if vip_partner %}',
        after: '{% endif %}',
        group: 'Audience',
        description: 'Show only to VIP partner accounts',
      },
      {
        label: 'Enterprise',
        before: '{% if plan == "enterprise" %}',
        after: '{% endif %}',
        group: 'Audience',
      },
      {
        label: 'Early Bird',
        before: '{% if early_bird %}',
        after: '{% endif %}',
        group: 'Registration',
      },
    ],
    allowCustom: true,
  },
})`,
    },
    {
        slug: 'theming',
        docsPath: '/guide/theming',
        eyebrow: t('features.theming.eyebrow'),
        title: t('features.theming.title'),
        description: t('features.theming.description'),
        features: tm('features.theming.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  uiTheme: 'auto',
  theme: {
    '--tpl-color-primary':    '#0d9488',
    '--tpl-color-accent':     '#0ea5e9',
    '--tpl-color-background': '#ffffff',
    '--tpl-radius':           '10px',
    '--tpl-font-sans':        'Inter, system-ui, sans-serif',
    dark: {
      '--tpl-color-primary':    '#22d3ee',
      '--tpl-color-accent':     '#a78bfa',
      '--tpl-color-background': '#0b1220',
    },
  },
})`,
    },
    {
        slug: 'defaults',
        docsPath: '/guide/defaults',
        eyebrow: t('features.defaults.eyebrow'),
        title: t('features.defaults.title'),
        description: t('features.defaults.description'),
        features: tm('features.defaults.features') as string[],
        code: `const editor = await init({
  container: '#editor',
  blockDefaults: {
    button: {
      backgroundColor: '#0f3460',
      textColor: '#ffffff',
      borderRadius: 2,
      fontSize: 14,
      buttonPadding: { top: 14, right: 28, bottom: 14, left: 28 },
    },
    divider: { color: '#e5e7eb', thickness: 1 },
    spacer: { height: 24 },
    image:  { align: 'center' },
  },
  templateDefaults: {
    width: 640,
    backgroundColor: '#f8f9fa',
    fontFamily: 'Georgia, serif',
  },
})`,
    },
]);

const activeVariant = ref<Record<string, number>>({});

function variantIndex(slug: string): number {
    return activeVariant.value[slug] ?? 0;
}
function selectVariant(slug: string, idx: number) {
    activeVariant.value[slug] = idx;
}

const supportingItems = computed(() => [
    {
        key: 'framework',
        icon: IconGlobe,
        title: t('features.supportingItems.framework.title'),
        description: t('features.supportingItems.framework.description'),
    },
    {
        key: 'output',
        icon: IconArrowUpTray,
        title: t('features.supportingItems.output.title'),
        description: t('features.supportingItems.output.description'),
    },
    {
        key: 'darkMode',
        icon: IconMoon,
        title: t('features.supportingItems.darkMode.title'),
        description: t('features.supportingItems.darkMode.description'),
    },
    {
        key: 'i18n',
        icon: IconGlobe,
        title: t('features.supportingItems.i18n.title'),
        description: t('features.supportingItems.i18n.description'),
    },
    {
        key: 'undoRedo',
        icon: IconArrowUturnLeft,
        title: t('features.supportingItems.undoRedo.title'),
        description: t('features.supportingItems.undoRedo.description'),
    },
    {
        key: 'responsivePreview',
        icon: IconSwatch,
        title: t('features.supportingItems.responsivePreview.title'),
        description: t('features.supportingItems.responsivePreview.description'),
    },
]);

</script>

<template>
    <div>
        <section
            class="relative isolate -mt-21 overflow-hidden bg-white pt-37 pb-28 sm:pt-41 sm:pb-40 dark:bg-neutral-950"
        >
            <HeroAurora
                fade-class="bg-gradient-to-b from-transparent from-55% to-white dark:to-neutral-950"
            />
            <SiteContainer class="relative">
                <div class="flex max-w-2xl flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <SiteEyebrow>
                            {{ t('features.hero.eyebrow') }}
                        </SiteEyebrow>
                        <HeroHeadline
                            :text="t('features.hero.headline')"
                            as="h1"
                        />
                    </div>
                    <SiteText class="text-pretty">
                        <p>{{ t('features.hero.subheadline') }}</p>
                    </SiteText>
                </div>
            </SiteContainer>
        </section>

        <section
            v-for="(section, idx) in featureSections"
            :key="section.slug"
            :class="[
                'py-20 lg:py-28',
                idx % 2 === 0
                    ? 'bg-white dark:bg-neutral-950'
                    : 'bg-neutral-50 dark:bg-neutral-900',
            ]"
        >
            <div
                class="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10"
            >
                <RevealOnScroll>
                    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                        <div class="flex flex-col gap-5">
                            <div class="text-sm/7 font-semibold text-primary">
                                {{ section.eyebrow }}
                            </div>
                            <h2
                                class="font-display text-3xl/10 tracking-tight text-pretty text-neutral-950 sm:text-4xl/12 dark:text-white"
                            >
                                {{ section.title }}
                            </h2>
                            <p class="text-base/7 text-neutral-700 dark:text-neutral-400">
                                {{ section.description }}
                            </p>
                            <ul class="mt-2 flex flex-col gap-3">
                                <li
                                    v-for="feature in section.features"
                                    :key="feature"
                                    class="flex gap-3 text-sm/7 text-neutral-700 dark:text-neutral-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="mt-0.5 size-5 shrink-0 text-primary"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5"
                                        />
                                    </svg>
                                    {{ feature }}
                                </li>
                            </ul>
                            <a
                                :href="docsUrl(section.docsPath)"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-2 inline-flex items-center gap-1.5 self-start text-sm/7 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                            >
                                {{ t('features.docsLink') }}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="size-4"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div
                                v-if="section.variants?.length"
                                role="tablist"
                                :aria-label="t('features.examplesLabel', { title: section.title })"
                                class="inline-flex self-start rounded-md bg-neutral-100 p-1 ring-1 ring-neutral-200 dark:bg-neutral-800/60 dark:ring-neutral-700"
                            >
                                <button
                                    v-for="(v, i) in section.variants"
                                    :key="v.label"
                                    type="button"
                                    role="tab"
                                    :aria-selected="variantIndex(section.slug) === i"
                                    :class="[
                                        'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                                        variantIndex(section.slug) === i
                                            ? 'bg-white text-neutral-950 shadow-sm dark:bg-neutral-900 dark:text-white'
                                            : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white',
                                    ]"
                                    @click="selectVariant(section.slug, i)"
                                >
                                    {{ v.label }}
                                </button>
                            </div>
                            <CodeBlock
                                v-if="section.variants?.length"
                                :code="section.variants[variantIndex(section.slug)].code"
                                lang="lit"
                                :transformers="[tagTemplateAsHtml]"
                            />
                            <CodeBlock
                                v-else-if="section.code"
                                :code="section.code"
                                lang="javascript"
                            />
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>

        <SiteSection
            :eyebrow="t('features.supporting.eyebrow')"
            :headline="t('features.supporting.headline')"
            :subheadline="t('features.supporting.subheadline')"
            bg="gray"
            class="!py-14 sm:!py-20"
        >
            <BentoGrid :items="supportingItems" />
        </SiteSection>

        <SiteSection
            :eyebrow="t('features.migration.eyebrow')"
            :headline="t('features.migration.title')"
            :subheadline="t('features.migration.description')"
            class="!py-14 sm:!py-20"
        >
            <ul class="flex max-w-2xl flex-col gap-3">
                <li
                    v-for="feature in (tm('features.migration.features') as string[])"
                    :key="feature"
                    class="flex gap-3 text-sm/7 text-neutral-700 dark:text-neutral-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                        />
                    </svg>
                    {{ feature }}
                </li>
            </ul>
        </SiteSection>

        <CtaSection />
    </div>
</template>
