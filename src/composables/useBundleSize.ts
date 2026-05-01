import { ref } from 'vue';

declare const __BUNDLE_SIZE__: string | null;

export function useBundleSize() {
    const label = ref<string | null>(
        __BUNDLE_SIZE__ ? `${__BUNDLE_SIZE__} gzipped` : null,
    );
    return { label };
}
