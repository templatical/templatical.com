import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import heroSource from '../../src/components/HeroSection.vue?raw';

// A hosted service may come later in some form, so the site makes no standing
// claim that one does not exist. The hero used to carry exactly that line.
describe('hosted service claims', () => {
    it('the hero has no backend note', () => {
        expect(heroSource).not.toContain('backendNote');
        expect(en.home.hero).not.toHaveProperty('backendNote');
        expect(de.home.hero).not.toHaveProperty('backendNote');
    });

    it('neither locale says there is no hosted service', () => {
        expect(JSON.stringify(en)).not.toMatch(/no hosted service/i);
        expect(JSON.stringify(de)).not.toMatch(/keinen gehosteten Dienst/i);
    });
});
