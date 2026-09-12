import type {
    CommentsProvider,
    EditorUser,
    MediaProvider,
    SavedBlocksProvider,
    TemplateContent,
    TemplatesProvider,
    TestEmailProvider,
    VersionHistoryProvider,
} from '@templatical/types';
import { createStore, TEMPLATE_ID } from './store';
import { createVersionStore } from './version-store';
import { createTemplatesProvider, hasStoredTemplate } from './templates';
import { createVersionHistoryProvider } from './versions';
import { createCommentsProvider } from './comments';
import { createSavedBlocksProvider } from './saved-blocks';
import { createMediaProvider } from './media';
import { ensureSeeded } from './seed';
import type { SeedCopy } from './seed';

/**
 * RFC 2606 reserved — it can never receive mail.
 *
 * Passed as a single-entry `allowedRecipients`, which makes the editor render
 * the recipient field read-only and pre-filled. That is a documented feature
 * doing real work, and it is what stops a visitor believing the stubbed send
 * delivered something. The test-email dialog has no slot for a note.
 */
export const DEMO_RECIPIENT = 'you@example.com';

/** How long the stub waits, so the sending -> sent transition actually plays. */
const SEND_DELAY_MS = 900;

const VISITOR_ID = 'you';

export interface DemoBackendCopy extends SeedCopy {
    visitorName: string;
}

export interface DemoBackend {
    config: {
        templates: TemplatesProvider;
        versionHistory: VersionHistoryProvider;
        comments: CommentsProvider;
        savedBlocks: SavedBlocksProvider;
        testEmail: TestEmailProvider;
        media: MediaProvider;
        user: EditorUser;
    };
    templateId: string;
    hasStoredTemplate(): boolean;
    reset(): void;
}

export function createDemoBackend(
    baseContent: TemplateContent,
    copy: DemoBackendCopy,
): DemoBackend {
    const store = createStore();
    const versionStore = createVersionStore(store);
    const visitor: EditorUser = { id: VISITOR_ID, name: copy.visitorName };

    const templates: TemplatesProvider = {
        ...createTemplatesProvider(store, versionStore),
        autoSave: true,
        // MUST stay false. Defaults to on, and a landing page may never trap a
        // visitor's tab close behind a beforeunload prompt.
        unsavedChangesGuard: false,
    };

    ensureSeeded(store, versionStore, baseContent, copy);

    return {
        config: {
            templates,
            versionHistory: createVersionHistoryProvider(versionStore, templates),
            comments: createCommentsProvider(store, visitor),
            savedBlocks: createSavedBlocksProvider(store),
            media: createMediaProvider(store),
            testEmail: {
                allowedRecipients: [DEMO_RECIPIENT],
                defaultRecipient: DEMO_RECIPIENT,
                send: async () => {
                    await new Promise((resolve) => setTimeout(resolve, SEND_DELAY_MS));
                },
            },
            user: visitor,
        },
        templateId: TEMPLATE_ID,
        hasStoredTemplate: () => hasStoredTemplate(store),
        reset: () => {
            store.reset();
            ensureSeeded(store, versionStore, baseContent, copy);
        },
    };
}
