import type { Block, Comment, TemplateContent } from '@templatical/types';
import type { DemoStore } from './store';
import type { StoredVersion, VersionStore } from './version-store';
import { COMMENTS_KEY } from './comments';

/** Anyone but the visitor, so the editor withholds edit/delete on these. */
export const SEEDED_AUTHOR_ID = 'reviewer';

/** The primary button. The seeded thread asks for a more direct label and the brand colour, and the button sits in the hero. */
export const SEED_ANCHOR_BLOCK_ID = 'hero-cta';

/** The oldest seeded version is the newsletter from before the office-hours band was added. */
export const SEED_REMOVED_BLOCK_ID = 'ship-office-hours';

const SEEDED_KEY = 'seeded';
const HOUR = 60 * 60 * 1000;

export interface SeedCopy {
    reviewerName: string;
    threadBody: string;
    replyBody: string;
}

/**
 * Walk sections as well as the top level. The seeded button lives inside the
 * hero section; a top-level-only patch would leave its text identical in
 * every version.
 */
function mapBlocks(blocks: Block[], visit: (block: Block) => Block | null): Block[] {
    const next: Block[] = [];
    for (const block of blocks) {
        const current: Block =
            block.type === 'section'
                ? {
                      ...block,
                      children: block.children.map((column) => mapBlocks(column, visit)),
                  }
                : block;
        const visited = visit(current);
        if (visited) next.push(visited);
    }
    return next;
}

/** A clone with one block replaced, at any depth, so seeded history diverges visibly. */
function withBlockPatch(
    content: TemplateContent,
    blockId: string,
    patch: Record<string, unknown>,
): TemplateContent {
    const clone = JSON.parse(JSON.stringify(content)) as TemplateContent;
    clone.blocks = mapBlocks(clone.blocks, (block) =>
        block.id === blockId ? ({ ...block, ...patch } as Block) : block,
    );
    return clone;
}

/** A clone with one block removed, at any depth. */
function withoutBlock(content: TemplateContent, blockId: string): TemplateContent {
    const clone = JSON.parse(JSON.stringify(content)) as TemplateContent;
    clone.blocks = mapBlocks(clone.blocks, (block) => (block.id === blockId ? null : block));
    return clone;
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
                text: 'See the notes',
            }),
        },
        {
            id: 'seed-v2',
            createdAt: at(26),
            isAutomatic: false,
            content: withBlockPatch(baseContent, SEED_ANCHOR_BLOCK_ID, {
                text: 'View the notes',
                backgroundColor: '#1d4e89',
            }),
        },
        {
            id: 'seed-v1',
            createdAt: at(52),
            isAutomatic: true,
            content: withoutBlock(
                withBlockPatch(baseContent, SEED_ANCHOR_BLOCK_ID, { text: 'View the notes' }),
                SEED_REMOVED_BLOCK_ID,
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
