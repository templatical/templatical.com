import type { Block, Comment, TemplateContent } from '@templatical/types';
import type { DemoStore } from './store';
import type { StoredVersion, VersionStore } from './version-store';
import { COMMENTS_KEY } from './comments';

/** Anyone but the visitor, so the editor withholds edit/delete on these. */
export const SEEDED_AUTHOR_ID = 'reviewer';

/** The CTA is the block a reviewer would actually comment on, and it is visible without scrolling the canvas. */
export const SEED_ANCHOR_BLOCK_ID = 'hero-cta';

const SEEDED_KEY = 'seeded';
const HOUR = 60 * 60 * 1000;

export interface SeedCopy {
    reviewerName: string;
    threadBody: string;
    replyBody: string;
}

/** A shallow clone with one block replaced, so seeded history diverges visibly. */
function withBlockPatch(
    content: TemplateContent,
    blockId: string,
    patch: Record<string, unknown>,
): TemplateContent {
    const clone = JSON.parse(JSON.stringify(content)) as { blocks: Block[] };
    clone.blocks = clone.blocks.map((block) =>
        block.id === blockId ? ({ ...block, ...patch } as Block) : block,
    );
    return clone as unknown as TemplateContent;
}

/** A clone with one block removed. */
function withoutBlock(content: TemplateContent, blockId: string): TemplateContent {
    const clone = JSON.parse(JSON.stringify(content)) as { blocks: Block[] };
    clone.blocks = clone.blocks.filter((block) => block.id !== blockId);
    return clone as unknown as TemplateContent;
}

export function ensureSeeded(
    store: DemoStore,
    versions: VersionStore,
    baseContent: TemplateContent,
    copy: SeedCopy,
): void {
    if (store.read<boolean>(SEEDED_KEY)) return;

    const now = Date.now();
    const at = (hoursAgo: number) => new Date(now - hoursAgo * HOUR).toISOString();
    const author = { id: SEEDED_AUTHOR_ID, name: copy.reviewerName };

    // Newest first, matching the order the editor renders verbatim. Each entry
    // differs from the live template — identical content would make previewing
    // a version show an unchanged canvas.
    const seededVersions: StoredVersion[] = [
        {
            id: 'seed-v3',
            createdAt: at(3),
            isAutomatic: true,
            content: withBlockPatch(baseContent, SEED_ANCHOR_BLOCK_ID, {
                text: 'Go to dashboard',
            }),
        },
        {
            id: 'seed-v2',
            createdAt: at(26),
            isAutomatic: false,
            content: withBlockPatch(baseContent, SEED_ANCHOR_BLOCK_ID, {
                text: 'Get started',
                backgroundColor: '#2c85de',
            }),
        },
        {
            id: 'seed-v1',
            createdAt: at(52),
            isAutomatic: true,
            content: withoutBlock(
                withBlockPatch(baseContent, SEED_ANCHOR_BLOCK_ID, { text: 'Get started' }),
                'hero-divider',
            ),
        },
    ];
    versions.replaceAll([...seededVersions, ...versions.read()]);

    const thread: Comment = {
        id: 'seed-c1',
        body: copy.threadBody,
        author,
        createdAt: at(27),
        blockId: SEED_ANCHOR_BLOCK_ID,
        parentId: null,
        resolvedAt: null,
        replies: [
            {
                id: 'seed-c2',
                body: copy.replyBody,
                author,
                createdAt: at(25),
                parentId: 'seed-c1',
                resolvedAt: null,
            },
        ],
    };
    const existing = store.read<Comment[]>(COMMENTS_KEY);
    store.write(COMMENTS_KEY, [thread, ...(Array.isArray(existing) ? existing : [])]);

    store.write(SEEDED_KEY, true);
}
