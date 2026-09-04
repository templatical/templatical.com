import type { TemplateContent } from '@templatical/types';
import type { DemoStore } from './store';

/**
 * How many of the newest versions carry their content in `list()`.
 *
 * The editor treats `TemplateVersion.content` as a per-entry hint, so hydrating
 * only the recent ones keeps both paths live in the demo: scrubbing the newest
 * versions never awaits, and stepping past the cut-off exercises `get()` and the
 * editor's cache.
 */
export const HYDRATED_VERSIONS = 5;

const KEY = 'versions';

export interface StoredVersion {
    id: string;
    createdAt: string;
    isAutomatic: boolean;
    content: TemplateContent;
}

export interface VersionStore {
    read(): StoredVersion[];
    append(content: TemplateContent, isAutomatic: boolean): StoredVersion;
    replaceAll(versions: StoredVersion[]): void;
}

/**
 * Sits between the templates provider and the version-history provider on
 * purpose. That is exactly what the SDK contract describes: the editor never
 * records a version — whatever *persists* does. Keeping it here is also what
 * stops `templates.save` → version and `versions.restore` → `templates.save`
 * from becoming a circular import.
 */
export function createVersionStore(store: DemoStore): VersionStore {
    function read(): StoredVersion[] {
        const stored = store.read<StoredVersion[]>(KEY);
        return Array.isArray(stored) ? stored : [];
    }

    return {
        read,
        append(content, isAutomatic) {
            const version: StoredVersion = {
                id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                createdAt: new Date().toISOString(),
                isAutomatic,
                // Deep copy: the canvas keeps editing the object it handed us.
                content: JSON.parse(JSON.stringify(content)) as TemplateContent,
            };
            // Newest first — the editor renders the order it is given verbatim.
            store.write(KEY, [version, ...read()]);
            return version;
        },
        replaceAll(versions) {
            store.write(KEY, versions);
        },
    };
}
