import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { LOCALIZED_URLS, localizedUrl } from '@/lib/urls';

const SOURCES = Object.fromEntries(
    Object.entries(
        import.meta.glob('../../src/**/*.vue', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>,
    ).map(([path, source]) => [path.replace('../../src/', ''), source] as const),
);

const INSTALLATION = {
    en: 'https://docs.templatical.com/getting-started/installation',
    de: 'https://docs.templatical.com/de/getting-started/installation',
} as const;

const hero = SOURCES['components/HeroSection.vue'];
const heroTemplate = hero.slice(hero.indexOf('<template>'));
const navbar = SOURCES['components/TheNavbar.vue'];
const close = SOURCES['components/HomeCloseSection.vue'];
const features = SOURCES['pages/Features.vue'];
const faq = SOURCES['pages/Faq.vue'];

describe('installation destination', () => {
    it('resolves the installation guide by locale, falling back to English', () => {
        expect(LOCALIZED_URLS.installation).toEqual(INSTALLATION);
        expect(localizedUrl('installation', 'en')).toBe(INSTALLATION.en);
        expect(localizedUrl('installation', 'de')).toBe(INSTALLATION.de);
        expect(localizedUrl('installation', 'fr')).toBe(INSTALLATION.en);
    });

    it('points Get Started at the installation guide', () => {
        const getStartedAt = navbar.indexOf("t('nav.getStarted')");
        const button = navbar.slice(Math.max(0, getStartedAt - 600), getStartedAt);
        expect(button).toContain("localizedUrl('installation', locale)");
        expect(button).toContain('max-sm:hidden');
        expect(button).not.toContain('URLS.docs');
        expect(navbar.match(/nav\.getStarted/g)).toEqual(['nav.getStarted']);
        expect(navbar).toContain('href: URLS.docs');
    });

    it('points the hero secondary CTA at the installation guide and shows the editor install command above the framework note', () => {
        expect(en.home.hero.ctaSecondary).toBe('Installation guide');
        expect(de.home.hero.ctaSecondary).toBe('Installationsanleitung');
        expect(en.home.hero.copyLabel).toBe('Copy');
        expect(de.home.hero.copyLabel).toBe('Kopieren');
        expect(en.home.hero.copiedLabel).toBe('Copied');
        expect(de.home.hero.copiedLabel).toBe('Kopiert');
        expect(en.home.hero.copyAriaLabel).toBe('Copy the install command');
        expect(de.home.hero.copyAriaLabel).toBe('Installationsbefehl kopieren');

        expect(hero).toContain("const installCommand = 'npm install @templatical/editor';");
        expect(hero).toContain('useClipboard({ source: installCommand })');
        expect(heroTemplate).toContain("localizedUrl('installation', locale)");
        expect(heroTemplate).toContain("t('home.hero.ctaSecondary')");

        const cta = heroTemplate.indexOf("t('home.hero.ctaSecondary')");
        const command = heroTemplate.indexOf('{{ installCommand }}');
        const note = heroTemplate.indexOf("t('home.hero.frameworkNote')");
        expect(cta).toBeGreaterThan(-1);
        expect(command).toBeGreaterThan(cta);
        expect(note).toBeGreaterThan(command);

        const button = heroTemplate.slice(command, note);
        expect(button).toContain('v-if="isSupported"');
        expect(button).toContain('type="button"');
        expect(button).toContain('focus-visible:ring-2');
        expect(button).toContain('focus-visible:ring-ring');
        expect(button).toContain('focus-visible:outline-none');
        expect(button).toContain("t('home.hero.copyAriaLabel')");
        expect(button).toContain("t('home.hero.copyLabel')");
        expect(button).toContain("t('home.hero.copiedLabel')");
        expect(button).not.toMatch(/\btext-primary\b/);
        expect(button).toContain('motion-safe:');
    });

    it('points the features install card at the installation guide', () => {
        expect(en.features.cta.install.cta).toBe('Read the install guide');
        const installCard = features.slice(
            features.indexOf("key: 'install'"),
            features.indexOf("key: 'migrate'"),
        );
        expect(installCard).toContain("localizedUrl('installation', locale)");
        expect(installCard).not.toContain('URLS.docs');
    });

    it('keeps the close-section install command and points its secondary CTA at the installation guide', () => {
        expect(close).toContain(
            "const installCommand = 'npm install @templatical/editor @templatical/renderer';",
        );
        expect(close).toContain('editor.toMjml()');
        expect(close).toContain("localizedUrl('installation', locale)");
        expect(close).not.toContain('URLS.github');
        expect(en.home.close.ctaSecondary).toBe('Installation guide');
        expect(de.home.close.ctaSecondary).toBe('Installationsanleitung');
    });

    it('adds the install FAQ after frameworks and points the docs CTA at the installation guide', () => {
        expect(faq).toMatch(/'frameworks',\s*'install',\s*'migrate',/);
        expect(en.faq.items.install).toEqual({
            question: 'How do I install Templatical?',
            answer: "Run npm install {'@'}templatical/editor and mount the editor with one init() call. To convert templates to MJML, also install {'@'}templatical/renderer; it is optional. The installation guide on docs.templatical.com covers pnpm, yarn, bun and the CDN build.",
        });
        expect(de.faq.items.install).toEqual({
            question: 'Wie installiere ich Templatical?',
            answer: "Führen Sie npm install {'@'}templatical/editor aus und binden Sie den Editor mit einem init()-Aufruf ein. Um Vorlagen nach MJML zu konvertieren, installieren Sie zusätzlich {'@'}templatical/renderer; das ist optional. Die Installationsanleitung auf docs.templatical.com behandelt pnpm, yarn, bun und den CDN-Build.",
        });
        expect(en.faq.stillAsking.docsCta).toBe('Read the install guide');
        expect(en.faq.stillAsking.description).toBe(
            'Ask the community on GitHub Discussions, or start with the installation guide in the docs.',
        );
        expect(de.faq.stillAsking.description).toContain('Installationsanleitung');
        expect(de.faq.stillAsking.description).not.toContain('API-Referenz');
        expect(de.faq.stillAsking.docsCta).toBe(de.features.cta.install.cta);
        expect(de.features.cta.install.cta).toBe('Zur Installationsanleitung');
        const ctaAt = faq.indexOf('faq.stillAsking.docsCta');
        const anchor = faq.slice(faq.lastIndexOf('<a', ctaAt), ctaAt);
        expect(anchor).toContain("localizedUrl('installation', locale)");
        expect(anchor).not.toContain('URLS.docs');
    });
});
