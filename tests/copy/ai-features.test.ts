import { describe, expect, it } from 'vitest';
import llms from '../../public/llms.txt?raw';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';

/*
    The editor's AI is a bring-your-own provider: the integrator's backend calls the
    model, and @templatical/ai-kit (MIT) supplies the HTTP provider, the server kit,
    the conformance suites and the eval set. What shipped is the AI assistant (a chat
    that takes image and PDF attachments, with import from a screenshot or PDF),
    Rewrite, Fix with AI on lint findings and Write alt text. AI scoring, AI
    suggestions, subject lines and whole-template translation were cut before the
    release, so the site may not claim them.

    `cloud.*` is not scanned here: it describes Templatical Cloud's own roadmap, which
    is corrected together with the rest of the Cloud copy, not with an SDK release.
*/

/** Every string leaf as [path, text]; array items get `[i]`. */
function strings(tree: unknown, path: string): Array<[string, string]> {
    if (typeof tree === 'string') return [[path, tree]];
    if (Array.isArray(tree)) return tree.flatMap((item, i) => strings(item, `${path}[${i}]`));
    if (tree !== null && typeof tree === 'object')
        return Object.entries(tree).flatMap(([key, value]) => strings(value, `${path}.${key}`));
    return [];
}

function outsideCloud(messages: typeof en, locale: string): Array<[string, string]> {
    return Object.entries(messages)
        .filter(([key]) => key !== 'cloud')
        .flatMap(([key, value]) => strings(value, `${locale}.${key}`));
}

const CUT_AI_FEATURES: Array<[string, RegExp]> = [
    ['AI scoring', /\bscor(e|es|ing)\b|Bewertung/i],
    ['AI suggestions', /\b(AI|KI)[- ](suggestions|Vorschläge)\b/i],
    ['subject lines', /subject lines?|Betreffzeile/i],
    ['translation', /\btranslat(e|es|ion|ions)\b|[UÜ]bersetz/i],
];

/**
 * Model hosts the kit's adapters are not checked against. The adapters cover an
 * Anthropic client (its own baseURL included), OpenAI and AzureOpenAI clients, and the
 * Vercel AI SDK; anything else is described only as an OpenAI-compatible endpoint. The
 * site states what is supported and does not list what is not, so Bedrock, Vertex and
 * Claude on AWS are left unnamed rather than named as limits.
 */
const UNBACKED_HOSTS =
    /OpenRouter|Groq|Ollama|Vertex|Bedrock|Claude on AWS|Together AI|Mistral|Gemini/i;

const FEATURES = (
    import.meta.glob('../../src/pages/Features.vue', {
        query: '?raw',
        import: 'default',
        eager: true,
    }) as Record<string, string>
)['../../src/pages/Features.vue'];

describe.each([
    ['en', en],
    ['de', de],
])('%s copy', (locale, messages) => {
    const copy = outsideCloud(messages, locale);

    it('has strings outside the Cloud tree to scan', () => {
        expect(copy.length).toBeGreaterThan(0);
    });

    it.each(CUT_AI_FEATURES)('never claims %s', (_feature, pattern) => {
        expect(copy.filter(([, text]) => pattern.test(text)).map(([path]) => path)).toEqual([]);
    });

    it('lists ai-kit among the MIT packages', () => {
        const answer = messages.faq.items.packages.answer;
        const mitSentence = answer.split('. ')[0];
        expect(mitSentence).toMatch(/\bMIT\b/);
        // German capitalizes the package names it lists ("Template-Tools", "AI-Kit").
        expect(mitSentence).toMatch(/\bai-kit\b/i);
    });

    it('says where AI requests go when the template data answer covers init()', () => {
        const answer = messages.faq.items.data.answer;
        // Only the self-hosted part: a Cloud sentence, where present, is Cloud's own copy.
        const cloudAt = answer.indexOf('Templatical Cloud');
        const initSentences = cloudAt === -1 ? answer : answer.slice(0, cloudAt);
        expect(initSentences).toMatch(locale === 'en' ? /\bAI\b/ : /\bKI\b/);
        expect(initSentences).toMatch(locale === 'en' ? /\bmodel\b/ : /\bModell\b/);
    });
});

describe('the AI section on /features', () => {
    it('calls each shipped feature by its editor name', () => {
        const english = JSON.stringify(en.features.ai);
        for (const name of ['AI assistant', 'Rewrite', 'Fix with AI', 'Write alt text'])
            expect(english, name).toContain(name);

        const german = JSON.stringify(de.features.ai);
        for (const name of [
            'KI-Assistent',
            'Mit KI umformulieren',
            'Mit KI beheben',
            'Alt-Text schreiben',
        ])
            expect(german, name).toContain(name);
    });

    it('names the kit and its MIT licence', () => {
        for (const messages of [en, de]) {
            const section = JSON.stringify(messages.features.ai);
            expect(section).toContain('@templatical/ai-kit');
            expect(section).toMatch(/\bMIT\b/);
        }
    });

    // The kit ships one adapter per subpath, and any other model implements the
    // interface itself, so the copy names the subpaths and the interface rather
    // than a list of supported models.
    it('names the adapter subpaths and the interface for any other model', () => {
        for (const messages of [en, de]) {
            const section = JSON.stringify(messages.features.ai);
            expect(section).toContain('@templatical/ai-kit/adapters/anthropic');
            expect(section).toContain('/openai');
            expect(section).toContain('/vercel');
            expect(section).toContain('AiModelAdapter');
        }
    });

    it('names each adapter factory and the clients CI checks', () => {
        for (const messages of [en, de]) {
            const section = JSON.stringify(messages.features.ai);
            for (const name of [
                'createAnthropicAdapter',
                'createOpenAiAdapter',
                'createVercelAdapter',
                'AzureOpenAI',
                'baseURL',
            ])
                expect(section, name).toContain(name);
        }
    });

    // Optional peers are never installed for you: the integrator installs the SDK of the
    // adapter they import. The Vercel adapter's PDF support depends on the provider package.
    it('says who installs the provider SDK, and where PDF support depends on the provider', () => {
        const english = JSON.stringify(en.features.ai);
        expect(english).toContain('install the one for the adapter you import');
        expect(english).toContain('PDF support depends on your AI SDK provider package');
        expect(english).toContain('gateway model id');
        const german = JSON.stringify(de.features.ai);
        expect(german).toContain('Installieren Sie das für den Adapter, den Sie importieren');
        expect(german).toContain('hängt die PDF-Unterstützung von Ihrem AI-SDK-Provider-Paket ab');
        expect(german).toContain('Gateway-Modell-ID');
        for (const section of [english, german])
            expect(section).not.toMatch(/installed only when|nur installiert, wenn/);
    });

    // Only clients a CI check covers are named; any other endpoint is "OpenAI-compatible".
    it('names no model host that CI does not cover', () => {
        for (const messages of [en, de])
            expect(JSON.stringify(messages.features.ai)).not.toMatch(UNBACKED_HOSTS);
    });

    it('shows the client and a model adapter, not the text-only configuration', () => {
        const section = FEATURES.slice(
            FEATURES.indexOf("slug: 'ai'"),
            FEATURES.indexOf("slug: 'mjml-output'"),
        );
        expect(section).toContain("t('features.variants.yourEndpoint')");
        expect(section).toContain("t('features.variants.modelAdapter')");
        expect(section).toContain(
            "import { createAnthropicAdapter } from '@templatical/ai-kit/adapters/anthropic'",
        );
        expect(section).toContain('client: new Anthropic()');
        expect(section).not.toMatch(UNBACKED_HOSTS);
        expect(section).not.toContain('textOnly');
        expect(en.features.variants).not.toHaveProperty('textOnly');
        expect(de.features.variants).not.toHaveProperty('textOnly');
    });
});

describe('the homepage editor', () => {
    const HERO_EDITOR = (
        import.meta.glob('../../src/components/HeroEditor.vue', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>
    )['../../src/components/HeroEditor.vue'];

    // The mock plays recorded turns through the public contract, so the demo
    // needs no model, no keys and no backend.
    it('wires the recorded AI provider', () => {
        expect(HERO_EDITOR).toMatch(/ai: createMockAiProvider\(\{ \.\.\.AI_RECORDINGS \}\)/);
    });

    // The kit's test entry is only needed once the editor mounts, so it stays
    // out of the home page's initial bundle.
    it('loads the kit lazily, never with a static import', () => {
        expect(HERO_EDITOR).toContain("import('@templatical/ai-kit/testing')");
        expect(HERO_EDITOR).toContain("import('@templatical/ai-kit')");
        expect(HERO_EDITOR).not.toMatch(/^\s*import\s[^(]*['"]@templatical\/ai-kit/m);
    });

    // The editor shows an AI failure in its own UI and also passes it to onError,
    // so the hero's toast skips the AI's error codes instead of repeating them.
    it('keeps AI errors out of the provider-error toast', () => {
        expect(HERO_EDITOR).toContain('aiErrorCodes = new Set(Object.keys(AI_ERROR_MESSAGES))');
        const handler = HERO_EDITOR.slice(HERO_EDITOR.indexOf('function showProviderError'));
        expect(handler.indexOf('aiErrorCodes.has(')).toBeGreaterThan(-1);
        expect(handler.indexOf('aiErrorCodes.has(')).toBeLessThan(
            handler.indexOf('providerErrorMessage.value = error.message'),
        );
    });

    // The legend is the demo's disclosure of what is wired, so it names the AI
    // and says the replies are recorded.
    it('names AI in the legend, and says the replies are recorded', () => {
        expect(en.heroEditor.demo.description).toMatch(/\bAI\b/);
        expect(en.heroEditor.demo.description).toMatch(/recorded AI replies/);
        expect(de.heroEditor.demo.description).toMatch(/\bKI\b/);
        expect(de.heroEditor.demo.description).toMatch(/aufgezeichnete KI-Antworten/);
    });
});

describe('the patterns', () => {
    // A guard that matches too much blocks legitimate copy, and one that matches too
    // little is silent, so each pattern is checked on literals in both languages.
    it.each([
        'AI template scoring',
        'Score your template',
        'KI-Bewertung von Vorlagen',
        'AI suggestions for your next block',
        'KI-Vorschläge',
        'AI subject lines',
        'Betreffzeilen per KI',
        'Translate the whole template',
        'Übersetzung der ganzen Vorlage',
    ])('catches "%s"', (text) => {
        expect(CUT_AI_FEATURES.some(([, pattern]) => pattern.test(text))).toBe(true);
    });

    it.each([
        'Rewrite in the paragraph toolbar',
        'Fix with AI on lint findings',
        'Mit KI beheben',
        'Write alt text for one image or in bulk',
        'The AI assistant reads image and PDF attachments',
    ])('leaves "%s" alone', (text) => {
        expect(CUT_AI_FEATURES.some(([, pattern]) => pattern.test(text))).toBe(false);
    });
});

describe('llms.txt', () => {
    it('names the AI kit among the MIT packages', () => {
        const mitLine = llms.split('\n').find((line) => line.includes('MIT today')) ?? '';
        expect(mitLine).toMatch(/AI kit/);
    });

    it('links the AI and collaboration docs pages', () => {
        expect(llms).toContain('(https://docs.templatical.com/backend/ai)');
        expect(llms).toContain('(https://docs.templatical.com/backend/collaboration)');
        expect(llms).toContain('`@templatical/ai-kit`');
    });

    it('names the adapter subpaths and the interface for any other model', () => {
        expect(llms).toContain('`@templatical/ai-kit/adapters/anthropic`');
        expect(llms).toContain('`/openai`');
        expect(llms).toContain('`/vercel`');
        expect(llms).toContain('`AiModelAdapter`');
    });

    it('names each adapter factory, and no model host CI does not cover', () => {
        for (const name of ['createAnthropicAdapter', 'createOpenAiAdapter', 'createVercelAdapter'])
            expect(llms, name).toContain(`\`${name}\``);
        expect(llms).not.toMatch(UNBACKED_HOSTS);
    });
});
