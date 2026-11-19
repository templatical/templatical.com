import { describe, expect, it } from 'vitest';
import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import { SOFTWARE_APPLICATION } from '@/lib/seo';
import llms from '../../public/llms.txt?raw';
import readme from '../../README.md?raw';

describe('MIT licence wording', () => {
    it('states the current licence in both locales', () => {
        expect(en.footer.copyright).toMatch(/open source.*MIT/i);
        expect(de.footer.copyright).toMatch(/Open-Source.*MIT/i);
        expect(en.faq.items.free.answer).toMatch(/open source under MIT/i);
        expect(de.faq.items.free.answer).toMatch(/unter MIT quelloffen/i);
        expect(en.faq.items.packages.answer).toMatch(/all published Templatical packages.*MIT/i);
        expect(de.faq.items.packages.answer).toMatch(
            /alle veröffentlichten Templatical-Pakete.*MIT/i,
        );
    });

    it('states the current licence on agent and repository surfaces', () => {
        expect(llms).toContain('All packages are MIT-licensed and open source.');
        expect(llms).toContain('[License](https://docs.templatical.com/license-faq)');
        expect(readme).toContain('open-source, MIT-licensed drag-and-drop email editor SDK');
        expect(SOFTWARE_APPLICATION.description).toContain('open source under MIT');
        expect(SOFTWARE_APPLICATION.license).toBe('https://opensource.org/licenses/MIT');
    });
});
