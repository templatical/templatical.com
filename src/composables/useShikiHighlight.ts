import { onMounted, ref, type Ref } from 'vue';
import {
    createHighlighter,
    type HighlighterGeneric,
    type ShikiTransformer,
} from 'shiki';

type Highlighter = HighlighterGeneric<'javascript' | 'html' | 'lit', 'github-dark'>;

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['github-dark'],
            langs: ['javascript', 'html', 'lit'],
        }) as Promise<Highlighter>;
    }
    return highlighterPromise;
}

export const stripPreBackground: ShikiTransformer = {
    pre(node) {
        if (typeof node.properties?.style === 'string') {
            node.properties.style = node.properties.style
                .replace(/background-color\s*:\s*[^;]+;?/g, '')
                .trim();
        }
    },
};

export const tagTemplateAsHtml: ShikiTransformer = {
    preprocess(code) {
        return code.replace(/(template\s*:\s*)`/g, '$1html`');
    },
    postprocess(html) {
        return html.replace(/<span[^>]*>\s*html\s*<\/span>/g, '');
    },
};

export function useShikiHighlight(
    code: string,
    options: { lang?: string; transformers?: ShikiTransformer[] } = {},
): Ref<string | null> {
    const html = ref<string | null>(null);
    onMounted(async () => {
        const h = await getHighlighter();
        html.value = h.codeToHtml(code, {
            lang: options.lang ?? 'javascript',
            theme: 'github-dark',
            transformers: options.transformers,
        });
    });
    return html;
}
