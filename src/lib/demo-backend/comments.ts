import type { Comment, CommentAuthor, CommentsProvider } from '@templatical/types';
import type { DemoStore } from './store';

export const COMMENTS_KEY = 'comments';

/**
 * Deliberately no `subscribe`. One browser tab with no backend gives a realtime
 * transport nothing to carry, and its absence demonstrates what the contract
 * promises: comments work identically without one.
 */
export function createCommentsProvider(store: DemoStore, author: CommentAuthor): CommentsProvider {
    function read(): Comment[] {
        const stored = store.read<Comment[]>(COMMENTS_KEY);
        return Array.isArray(stored) ? stored : [];
    }

    function write(threads: Comment[]): Comment[] {
        return store.write(COMMENTS_KEY, threads);
    }

    /** Roots and replies, flat, so an id is findable wherever it lives. */
    function locate(
        threads: Comment[],
        commentId: string,
    ): { thread: Comment; reply?: Comment } | null {
        for (const thread of threads) {
            if (thread.id === commentId) return { thread };
            for (const reply of thread.replies ?? []) {
                if (reply.id === commentId) return { thread, reply };
            }
        }
        return null;
    }

    function nextId(): string {
        return `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function requireTarget(threads: Comment[], commentId: string) {
        const found = locate(threads, commentId);
        if (!found) throw new Error(`No comment stored under "${commentId}"`);
        return found;
    }

    return {
        list: async () => read(),

        create: async (_templateId, input) => {
            const threads = read();

            // requireTarget resolves a reply's id to its containing root, so
            // replying to a reply flattens into that root's thread. Resolve
            // it before building the comment: the stored parentId must name
            // the root it actually lives under, never the raw input value,
            // or the record would point at a comment that isn't a top-level
            // thread anywhere in the store.
            let target: Comment | undefined;
            if (input.parentId) {
                target = requireTarget(threads, input.parentId).thread;
            }

            const comment: Comment = {
                id: nextId(),
                body: input.body,
                author,
                createdAt: new Date().toISOString(),
                blockId: input.blockId ?? null,
                parentId: target?.id ?? null,
                resolvedAt: null,
            };

            if (target) {
                target.replies = [...(target.replies ?? []), comment];
            } else {
                threads.push(comment);
            }

            write(threads);
            return comment;
        },

        update: async (_templateId, commentId, patch) => {
            const threads = read();
            const { thread, reply } = requireTarget(threads, commentId);
            const target = reply ?? thread;
            if (patch.body !== undefined) target.body = patch.body;
            // Only ever stamped on a real edit — a store that stamps it on
            // creation makes every comment look edited.
            target.updatedAt = new Date().toISOString();
            write(threads);
            return target;
        },

        delete: async (_templateId, commentId) => {
            const threads = read();
            const found = locate(threads, commentId);
            if (!found) return;

            if (found.reply) {
                found.thread.replies = (found.thread.replies ?? []).filter(
                    (r) => r.id !== commentId,
                );
                write(threads);
                return;
            }
            // Deleting a root takes its replies with it.
            write(threads.filter((t) => t.id !== commentId));
        },

        // Takes the TARGET state rather than toggling, so the call is idempotent
        // and two clicks in flight cannot end up inverted.
        setResolved: async (_templateId, commentId, resolved) => {
            const threads = read();
            const { thread, reply } = requireTarget(threads, commentId);
            const target = reply ?? thread;
            target.resolvedAt = resolved ? new Date().toISOString() : null;
            target.resolvedBy = resolved ? author : null;
            write(threads);
            return target;
        },
    };
}
