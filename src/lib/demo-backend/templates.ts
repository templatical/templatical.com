import type { Template, TemplatesProvider } from '@templatical/types';
import type { DemoStore } from './store';
import { TEMPLATE_ID } from './store';
import type { VersionStore } from './version-store';

const KEY = 'template';

export function hasStoredTemplate(store: DemoStore): boolean {
    return store.read<Template>(KEY) !== null;
}

export function createTemplatesProvider(
    store: DemoStore,
    versions: VersionStore,
): TemplatesProvider {
    function requireStored(templateId: string): Template {
        const stored = store.read<Template>(KEY);
        if (!stored || stored.id !== templateId) {
            // Reaches the editor's error surface, so it is written for a reader.
            throw new Error(`No template stored under "${templateId}"`);
        }
        return stored;
    }

    return {
        load: async (templateId) => requireStored(templateId),

        create: async (input) =>
            store.write<Template>(KEY, {
                id: TEMPLATE_ID,
                name: input.name,
                content: input.content,
                // `createdAt` only. See the test: stamping `updatedAt` here
                // claims an update that never happened, and the header believes
                // the store. A column default of `updated_at = created_at`
                // produces the same lie in a real backend.
                createdAt: new Date().toISOString(),
            }),

        save: async (templateId, patch) => {
            const saved = store.write<Template>(KEY, {
                ...requireStored(templateId),
                ...patch,
                updatedAt: new Date().toISOString(),
            });
            // The contract puts automatic versions on whoever implements `save`
            // — the side that knows what storage costs. A rename patch carries
            // no content and records nothing.
            if (patch.content) versions.append(patch.content, true);
            return saved;
        },
    };
}
