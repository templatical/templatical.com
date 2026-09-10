import type { DemoStore } from './store';

// ---------------------------------------------------------------------------
// TEMPORARY MIRROR of @templatical/types' MediaProvider contract.
//
// Installed @templatical/types is 0.30.0, which predates this contract
// entirely (zero "MediaProvider" matches in the published package). This
// block mirrors packages/types/src/media.ts from the SDK's unmerged
// `byo-media` branch (~/Sites/templatical-sdk). DELETE this whole block and
// replace every reference below with an import from '@templatical/types'
// once that branch publishes.
//
// Deliberately NOT mirrored: `MediaFoldersProvider`, `MediaUsageInfo`,
// `MediaStorageInfo`, and MediaProvider's `extends MediaOptions` (optional
// maxFileSize/mimeTypes/onCreated/onUpdated/onDeleted config+hooks this demo
// never sets). This provider only ever assigns `false` to the members whose
// "on" shape would need those three types, so `folders` / `checkUsage` /
// `storage` below are narrowed to the literal `false` instead of the real
// `false | X` union — see the comment on each.
// ---------------------------------------------------------------------------

type MediaCategory = 'images' | 'documents' | 'videos' | 'audio';

export interface MediaAsset {
    id: string;
    url: string;
    alt?: string;
    filename?: string;
    mimeType?: string;
    width?: number;
    height?: number;
    size?: number;
    thumbnailUrl?: string;
    folderId?: string | null;
    createdAt?: string;
    updatedAt?: string;
    canUpdate?: boolean;
    canDelete?: boolean;
}

interface MediaListParams {
    search?: string;
    cursor?: string;
    folderId?: string | null;
    category?: MediaCategory;
    templateId?: string;
}

interface MediaListPage {
    items: MediaAsset[];
    nextCursor?: string;
}

interface MediaCreateInput {
    file: File;
    folderId?: string | null;
    alt?: string;
    filename?: string;
    templateId?: string;
}

interface MediaAssetPatch {
    alt?: string;
    filename?: string;
}

export interface MediaProvider {
    list(params?: MediaListParams): Promise<MediaListPage>;
    create: false | ((input: MediaCreateInput) => Promise<MediaAsset>);
    update: false | ((id: string, patch: MediaAssetPatch) => Promise<MediaAsset>);
    delete: false | ((ids: string[]) => Promise<void>);
    /** Real contract: `false | MediaFoldersProvider`. Always `false` here — see block comment above. */
    folders: false;
    replace: false | ((id: string, file: File) => Promise<MediaAsset>);
    importFromUrl:
        | false
        | ((url: string, folderId?: string | null, templateId?: string) => Promise<MediaAsset>);
    /** Real contract: `false | ((ids: string[]) => Promise<Record<string, MediaUsageInfo>>)`. Always `false` here. */
    checkUsage: false;
    frequentlyUsed: false | (() => Promise<MediaAsset[]>);
    /** Real contract: `false | (() => Promise<MediaStorageInfo | null>)`. Always `false` here. */
    storage: false;
}
// ---------------------------------------------------------------------------
// END temporary mirror of @templatical/types' MediaProvider.
// ---------------------------------------------------------------------------

const KEY = 'media';
const MEDIA_SEEDED_KEY = 'media-seeded';

/**
 * Base64 inflates a file's byte size by ~33%, and sessionStorage's ~5 MB quota
 * is shared across this entire namespace (template, versions, comments,
 * saved blocks, media). 200 KB keeps a handful of demo uploads well inside
 * that alongside everything else this hero already stores.
 */
export const MAX_FILE_SIZE_BYTES = 200 * 1024;

function nextId(): string {
    return `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * MediaAsset carries no `category` field — the contract's only per-asset
 * signal is `mimeType`, so category is derived from it rather than stored
 * redundantly. Seeded assets are PNGs, so they resolve to 'images' without
 * needing any special-casing here.
 */
function categoryOf(asset: MediaAsset): MediaCategory | undefined {
    const mime = asset.mimeType ?? '';
    if (mime.startsWith('image/')) return 'images';
    if (mime.startsWith('video/')) return 'videos';
    if (mime.startsWith('audio/')) return 'audio';
    return mime ? 'documents' : undefined;
}

function readFileAsDataUrl(file: File): Promise<string> {
    // Only touched when create() actually runs — never at module scope — so
    // this stays inert rather than throwing during vite-ssg's Node prerender.
    if (typeof FileReader === 'undefined') {
        return Promise.reject(
            new Error('Media upload requires a browser environment with FileReader.'),
        );
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                reject(new Error('Failed to read the file as a data URL.'));
                return;
            }
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(reader.error ?? new Error('Failed to read the file as a data URL.'));
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Two starter assets from the site's own /public, so the gallery never opens
 * empty. Guarded the same way as seed.ts's ensureSeeded: a boolean flag under
 * its own key, checked before writing anything.
 *
 * Called from list() rather than once at construction — that is what makes
 * it self-healing after reset() wipes the whole templatical:hero: namespace
 * (this flag included). The next list() call reseeds on its own; index.ts
 * needs no separate reseed wiring for media.
 */
function ensureMediaSeeded(store: DemoStore): void {
    if (store.read<boolean>(MEDIA_SEEDED_KEY)) return;

    const now = new Date().toISOString();
    const seeded: MediaAsset[] = [
        {
            id: 'media-seed-preview',
            url: '/preview.png',
            filename: 'preview.png',
            alt: 'Screenshot of the Templatical editor',
            mimeType: 'image/png',
            createdAt: now,
        },
        {
            id: 'media-seed-logo',
            url: '/logo.png',
            filename: 'logo.png',
            alt: 'Templatical logo',
            mimeType: 'image/png',
            createdAt: now,
        },
    ];
    const existing = store.read<MediaAsset[]>(KEY);
    store.write(KEY, [...seeded, ...(Array.isArray(existing) ? existing : [])]);
    store.write(MEDIA_SEEDED_KEY, true);
}

export function createMediaProvider(store: DemoStore): MediaProvider {
    function read(): MediaAsset[] {
        const stored = store.read<MediaAsset[]>(KEY);
        return Array.isArray(stored) ? stored : [];
    }

    function requireIndex(assets: MediaAsset[], id: string): number {
        const index = assets.findIndex((a) => a.id === id);
        if (index === -1) throw new Error(`No media asset stored under "${id}"`);
        return index;
    }

    return {
        list: async (params) => {
            ensureMediaSeeded(store);
            let items = read();

            const search = params?.search?.trim().toLowerCase();
            if (search) {
                items = items.filter((asset) => {
                    const filename = asset.filename?.toLowerCase() ?? '';
                    const alt = asset.alt?.toLowerCase() ?? '';
                    return filename.includes(search) || alt.includes(search);
                });
            }

            if (params?.category) {
                items = items.filter((asset) => categoryOf(asset) === params.category);
            }

            // One store is the whole gallery — one page, same as version history.
            return { items };
        },

        create: async (input) => {
            if (input.file.size > MAX_FILE_SIZE_BYTES) {
                const sizeKb = Math.ceil(input.file.size / 1024);
                const limitKb = MAX_FILE_SIZE_BYTES / 1024;
                throw new Error(
                    `"${input.file.name || 'This file'}" is ${sizeKb} KB — this demo accepts uploads up to ${limitKb} KB. Try a smaller one.`,
                );
            }

            const url = await readFileAsDataUrl(input.file);
            const now = new Date().toISOString();
            const asset: MediaAsset = {
                // Store-assigned, like every other id in this layer — the
                // editor never generates one, so the store stays the
                // authority on identity.
                id: nextId(),
                url,
                filename: input.filename || input.file.name,
                // createdAt only: stamping updatedAt here would claim an edit
                // that never happened (see templates.ts's create()).
                createdAt: now,
                size: input.file.size,
            };
            if (input.alt !== undefined) asset.alt = input.alt;
            if (input.file.type) asset.mimeType = input.file.type;

            // Newest-first — matches the order the editor applies locally
            // after an optimistic create, so a reload preserves what the
            // visitor just saw (mirrors the SDK's own media-local.ts).
            store.write(KEY, [asset, ...read()]);
            return asset;
        },

        update: async (id, patch) => {
            const assets = read();
            const index = requireIndex(assets, id);
            // Only the keys present are changing — MediaAssetPatch's alt and
            // filename are both optional, so an omitted key is left alone.
            const updated: MediaAsset = {
                ...assets[index]!,
                ...patch,
                updatedAt: new Date().toISOString(),
            };
            assets[index] = updated;
            store.write(KEY, assets);
            return updated;
        },

        delete: async (ids) => {
            const assets = read();
            // Validate every id before removing any — a bulk delete that
            // partially applies on a bad id is worse than one that rejects
            // cleanly and leaves the gallery untouched.
            for (const id of ids) requireIndex(assets, id);
            const remove = new Set(ids);
            store.write(
                KEY,
                assets.filter((asset) => !remove.has(asset.id)),
            );
        },

        // A hero demo has nothing to fold assets into (folders), version by
        // re-upload (replace), pull from a remote URL (importFromUrl), count
        // template references for (checkUsage), or report quota on (storage).
        // `false` makes the editor hide each control rather than render it
        // disabled.
        folders: false,
        replace: false,
        importFromUrl: false,
        checkUsage: false,
        frequentlyUsed: false,
        storage: false,
    };
}
