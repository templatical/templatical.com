import { describe, expect, it } from 'vitest';
import type { Block, Comment, TemplateContent } from '@templatical/types';
import { HERO_CONTENT } from '@/lib/demo-backend/hero-content';
import { COMMENTS_KEY } from '@/lib/demo-backend/comments';
import { createStore, memoryStorage } from '@/lib/demo-backend/store';
import { createVersionStore } from '@/lib/demo-backend/version-store';
import { ensureSeeded, SEED_ANCHOR_BLOCK_ID, SEED_REMOVED_BLOCK_ID } from '@/lib/demo-backend/seed';

function blockIds(blocks: readonly Block[]): string[] {
    const ids: string[] = [];
    const walk = (list: readonly Block[]) => {
        for (const block of list) {
            ids.push(block.id);
            if (block.type === 'section') {
                for (const column of block.children) walk(column);
            }
        }
    };
    walk(blocks);
    return ids;
}

function findBlock(blocks: readonly Block[], id: string): Block | undefined {
    for (const block of blocks) {
        if (block.id === id) return block;
        if (block.type !== 'section') continue;
        for (const column of block.children) {
            const found = findBlock(column, id);
            if (found) return found;
        }
    }
    return undefined;
}

describe('seeded history on the live hero template', () => {
    const content = HERO_CONTENT as unknown as TemplateContent;
    const liveIds = new Set(blockIds(content.blocks));

    it('anchors the comment and every version patch to a block that exists', () => {
        const store = createStore(memoryStorage());
        const versions = createVersionStore(store);
        ensureSeeded(store, versions, content, {
            reviewerName: 'Sam Okafor',
            threadBody: 'CTA reads weak',
            replyBody: 'Try imperative',
        });

        expect(liveIds.has(SEED_ANCHOR_BLOCK_ID)).toBe(true);
        expect(liveIds.has(SEED_REMOVED_BLOCK_ID)).toBe(true);

        const threads = store.read<Comment[]>(COMMENTS_KEY) ?? [];
        expect(threads).toHaveLength(1);
        expect(threads[0]?.blockId).toBe('hero-cta');
        expect(liveIds.has(threads[0]?.blockId ?? '')).toBe(true);

        const stored = versions.read();
        expect(stored.map((version) => version.id)).toEqual(['seed-v3', 'seed-v2', 'seed-v1']);

        for (const version of stored) {
            for (const id of blockIds(version.content.blocks)) {
                expect(liveIds.has(id), `${version.id} ${id}`).toBe(true);
            }
        }

        const button = (id: string) =>
            findBlock(
                stored.find((version) => version.id === id)?.content.blocks ?? [],
                'hero-cta',
            );

        expect(button('seed-v3')).toMatchObject({ text: 'See the notes' });
        expect(button('seed-v2')).toMatchObject({
            text: 'View the notes',
            backgroundColor: '#1d4e89',
        });
        expect(button('seed-v1')).toMatchObject({ text: 'View the notes' });
        expect(blockIds(stored[2]?.content.blocks ?? [])).not.toContain('ship-office-hours');
        expect(blockIds(stored[0]?.content.blocks ?? [])).toContain('ship-office-hours');
        expect(findBlock(content.blocks, 'hero-cta')).toMatchObject({
            text: 'Open your workspace',
        });
    });
});
