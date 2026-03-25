<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs } from 'vue';
import SiteContainer from './SiteContainer.vue';
import SiteEyebrow from './SiteEyebrow.vue';
import SiteHeading from './SiteHeading.vue';
import SiteSubheading from './SiteSubheading.vue';
import SiteText from './SiteText.vue';

const props = withDefaults(
    defineProps<{
        eyebrow?: string;
        headline?: string;
        subheadline?: string;
        bg?: 'white' | 'gray';
        headlineAs?: 'h1' | 'h2';
    }>(),
    {
        eyebrow: undefined,
        headline: undefined,
        subheadline: undefined,
        bg: 'white',
        headlineAs: 'h2',
    },
);

defineSlots<{
    default(): unknown;
    cta(): unknown;
}>();

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        'py-20 sm:py-28',
        props.bg === 'white' && 'bg-white dark:bg-neutral-950',
        props.bg === 'gray' && 'bg-neutral-50 dark:bg-neutral-900',
        attrs.class as string,
    ),
);
</script>

<template>
    <section :class="classes">
        <SiteContainer class="flex flex-col gap-10 sm:gap-16">
            <div v-if="headline" class="flex max-w-2xl flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <SiteEyebrow v-if="eyebrow">
                        {{ eyebrow }}
                    </SiteEyebrow>
                    <SiteHeading v-if="headlineAs === 'h1'">
                        {{ headline }}
                    </SiteHeading>
                    <SiteSubheading v-else>
                        {{ headline }}
                    </SiteSubheading>
                </div>
                <SiteText v-if="subheadline" class="text-pretty">
                    <p>{{ subheadline }}</p>
                </SiteText>
                <slot name="cta" />
            </div>
            <div>
                <slot />
            </div>
        </SiteContainer>
    </section>
</template>
