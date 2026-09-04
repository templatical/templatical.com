import type {
    TemplateVersion,
    TemplatesProvider,
    VersionHistoryProvider,
} from '@templatical/types';
import type { StoredVersion, VersionStore } from './version-store';
import { HYDRATED_VERSIONS } from './version-store';

export function createVersionHistoryProvider(
    versions: VersionStore,
    templates: TemplatesProvider,
): VersionHistoryProvider {
    function requireVersion(versionId: string): StoredVersion {
        const version = versions.read().find((v) => v.id === versionId);
        if (!version) throw new Error(`No version stored under "${versionId}"`);
        return version;
    }

    return {
        // Everything is in one store, so one page is the whole history and
        // there is no nextCursor to hand back.
        list: async () => ({
            versions: versions.read().map((version, index) => {
                const entry: TemplateVersion = {
                    id: version.id,
                    createdAt: version.createdAt,
                    isAutomatic: version.isAutomatic,
                };
                if (index < HYDRATED_VERSIONS) entry.content = version.content;
                return entry;
            }),
        }),

        get: async (_templateId, versionId) => requireVersion(versionId).content,

        create: async (_templateId, content) => {
            const version = versions.append(content, false);
            return {
                id: version.id,
                createdAt: version.createdAt,
                isAutomatic: false,
                content: version.content,
            };
        },

        // The composition the contract documents for a backend with no atomic
        // restore endpoint: read the old content, then save it.
        restore: async (templateId, versionId) => {
            const content = requireVersion(versionId).content;
            if (typeof templates.save !== 'function') {
                throw new Error('Templates provider is read-only — cannot restore.');
            }
            return templates.save(templateId, { content });
        },
    };
}
