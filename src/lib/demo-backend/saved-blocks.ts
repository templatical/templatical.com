import type { SavedBlock, SavedBlocksProvider } from '@templatical/types';
import type { DemoStore } from './store';

const KEY = 'saved-blocks';

export function createSavedBlocksProvider(store: DemoStore): SavedBlocksProvider {
    function read(): SavedBlock[] {
        const stored = store.read<SavedBlock[]>(KEY);
        return Array.isArray(stored) ? stored : [];
    }

    function requireIndex(entries: SavedBlock[], id: string): number {
        const index = entries.findIndex((e) => e.id === id);
        if (index === -1) throw new Error(`No saved block stored under "${id}"`);
        return index;
    }

    return {
        list: async () => read(),

        create: async (input) => {
            const entry: SavedBlock = {
                // Store-assigned: the editor never generates one, so the store
                // stays the authority on identity.
                id: `sb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name: input.name,
                content: input.content,
                ...(input.category === undefined ? {} : { category: input.category }),
            };
            store.write(KEY, [...read(), entry]);
            return entry;
        },

        update: async (id, patch) => {
            const entries = read();
            const index = requireIndex(entries, id);
            // Only the keys present are changing: `category: ''` clears it,
            // omitting it leaves it alone.
            const updated: SavedBlock = { ...entries[index]!, ...patch };
            entries[index] = updated;
            store.write(KEY, entries);
            return updated;
        },

        delete: async (id) => {
            const entries = read();
            requireIndex(entries, id);
            store.write(
                KEY,
                entries.filter((e) => e.id !== id),
            );
        },
    };
}
