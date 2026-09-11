import { describe, expect, it } from 'vitest';
import type { TemplateContent } from '@templatical/types';
import { createStore, memoryStorage } from '@/lib/demo-backend/store';
import { createVersionStore } from '@/lib/demo-backend/version-store';

const content = (marker: string): TemplateContent =>
    ({ settings: {}, blocks: [{ id: marker, type: 'paragraph', content: marker }] }) as unknown as TemplateContent;

describe('createVersionStore', () => {
    it('starts empty', () => {
        expect(createVersionStore(createStore(memoryStorage())).read()).toEqual([]);
    });

    it('appends newest-first', () => {
        const versions = createVersionStore(createStore(memoryStorage()));

        versions.append(content('first'), true);
        versions.append(content('second'), false);

        const stored = versions.read();
        expect(stored).toHaveLength(2);
        expect(stored[0]?.content).toEqual(content('second'));
        expect(stored[1]?.content).toEqual(content('first'));
    });

    it('carries isAutomatic through', () => {
        const versions = createVersionStore(createStore(memoryStorage()));

        expect(versions.append(content('a'), true).isAutomatic).toBe(true);
        expect(versions.append(content('b'), false).isAutomatic).toBe(false);
    });

    it('deep-copies content so later canvas edits cannot mutate a stored version', () => {
        const versions = createVersionStore(createStore(memoryStorage()));
        const live = content('live');

        versions.append(live, true);
        (live as unknown as { blocks: { id: string }[] }).blocks[0]!.id = 'mutated';

        expect(versions.read()[0]?.content).toEqual(content('live'));
    });

    it('replaceAll overwrites the whole list', () => {
        const versions = createVersionStore(createStore(memoryStorage()));
        versions.append(content('old'), true);

        versions.replaceAll([
            { id: 'v1', createdAt: '2026-09-01T00:00:00.000Z', isAutomatic: false, content: content('seeded') },
        ]);

        expect(versions.read()).toHaveLength(1);
        expect(versions.read()[0]?.id).toBe('v1');
    });
});
