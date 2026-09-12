import { describe, expect, it } from 'vitest';
import { createStore, memoryStorage } from '@/lib/demo-backend/store';
import { createMediaProvider, MAX_FILE_SIZE_BYTES } from '@/lib/demo-backend/media';

// vitest.config.ts runs this suite under environment: 'node', which has
// neither File nor FileReader. createMediaProvider's create() needs both, so
// they're stubbed here and kept local to this file — nothing else in the
// suite touches files.
class StubFile {
    constructor(
        public readonly name: string,
        public readonly type: string,
        public readonly size: number,
    ) {}
}

class StubFileReader {
    result: string | null = null;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;

    readAsDataURL(file: { type: string }): void {
        // Resolves on a real microtask, like the browser API, so awaiting
        // create() exercises an actual async boundary rather than a sync stub.
        queueMicrotask(() => {
            this.result = `data:${file.type || 'application/octet-stream'};base64,stub`;
            this.onload?.();
        });
    }
}

(globalThis as unknown as { File: unknown }).File = StubFile;
(globalThis as unknown as { FileReader: unknown }).FileReader = StubFileReader;

function stubFile(name: string, type: string, size: number): File {
    return new StubFile(name, type, size) as unknown as File;
}

function setup() {
    const provider = createMediaProvider(createStore(memoryStorage()));
    if (typeof provider.create !== 'function') throw new Error('create must be a function');
    if (typeof provider.update !== 'function') throw new Error('update must be a function');
    if (typeof provider.delete !== 'function') throw new Error('delete must be a function');
    return { provider, create: provider.create, update: provider.update, remove: provider.delete };
}

describe('createMediaProvider', () => {
    it('seeds two assets from /public on the first list()', async () => {
        const { provider } = setup();

        const { items } = await provider.list();

        expect(items).toHaveLength(2);
        expect(items.map((a) => a.url).sort()).toEqual(['/logo.png', '/preview.png']);
        for (const asset of items) {
            expect(asset.filename).toEqual(expect.any(String));
            expect(asset.alt).toEqual(expect.any(String));
            expect(asset.mimeType).toBe('image/png');
        }
    });

    it('seeding is idempotent — a second list() call adds nothing new', async () => {
        const { provider } = setup();

        const first = await provider.list();
        const second = await provider.list();

        expect(second.items).toHaveLength(2);
        // Same ids, not just the same count — a bug that cleared and
        // re-seeded on every call would still pass a bare length check.
        expect(second.items.map((a) => a.id).sort()).toEqual(first.items.map((a) => a.id).sort());
    });

    it('list() honours search, case-insensitively over filename and alt', async () => {
        const { provider } = setup();

        const matches = await provider.list({ search: 'LOGO' });
        expect(matches.items).toHaveLength(1);
        expect(matches.items[0]?.filename).toBe('logo.png');

        const none = await provider.list({ search: 'does-not-exist' });
        expect(none.items).toEqual([]);
    });

    it('list() honours category — seeded assets are images', async () => {
        const { provider } = setup();

        expect((await provider.list({ category: 'images' })).items).toHaveLength(2);
        expect((await provider.list({ category: 'videos' })).items).toEqual([]);
    });

    it('create() assigns the id and persists through the store', async () => {
        const { create, provider } = setup();

        const asset = await create({
            file: stubFile('photo.jpg', 'image/jpeg', 1024),
            alt: 'A photo',
        });

        expect(asset.id).toEqual(expect.any(String));
        expect(asset.url).toMatch(/^data:image\/jpeg;base64,/);

        // The return value alone would still pass if create() never wrote the
        // asset back — list() re-reads via store.read() on every call, so
        // this confirms it actually persisted rather than just echoing input.
        const stored = (await provider.list()).items.find((a) => a.id === asset.id);
        expect(stored?.filename).toBe('photo.jpg');
        expect(stored?.alt).toBe('A photo');
        expect(stored?.mimeType).toBe('image/jpeg');
        expect(stored?.size).toBe(1024);
    });

    it('create() rejects a file over the 200 KB demo limit, naming the limit', async () => {
        const { create } = setup();

        await expect(
            create({ file: stubFile('big.png', 'image/png', MAX_FILE_SIZE_BYTES + 1) }),
        ).rejects.toThrow(/200\s*KB/);
    });

    it('create() allows a file exactly at the 200 KB limit', async () => {
        const { create } = setup();

        await expect(
            create({ file: stubFile('exact.png', 'image/png', MAX_FILE_SIZE_BYTES) }),
        ).resolves.toMatchObject({ filename: 'exact.png' });
    });

    it('create() rejects with an explanatory error when FileReader is unavailable (SSR)', async () => {
        const { create } = setup();
        const stub = globalThis.FileReader;
        (globalThis as unknown as { FileReader: unknown }).FileReader = undefined;

        try {
            await expect(create({ file: stubFile('a.png', 'image/png', 10) })).rejects.toThrow(
                /FileReader/,
            );
        } finally {
            globalThis.FileReader = stub;
        }
    });

    it('update() merges only the keys present, stamping updatedAt', async () => {
        const { create, update, provider } = setup();
        const asset = await create({
            file: stubFile('photo.jpg', 'image/jpeg', 100),
            alt: 'Original alt',
        });

        const renamed = await update(asset.id, { filename: 'renamed.jpg' });
        expect(renamed.filename).toBe('renamed.jpg');
        expect(renamed.alt).toBe('Original alt');
        expect(renamed.updatedAt).toEqual(expect.any(String));

        const altOnly = await update(asset.id, { alt: 'New alt' });
        expect(altOnly.alt).toBe('New alt');
        expect(altOnly.filename).toBe('renamed.jpg');

        const stored = (await provider.list()).items.find((a) => a.id === asset.id);
        expect(stored?.filename).toBe('renamed.jpg');
        expect(stored?.alt).toBe('New alt');
    });

    it('update() rejects for an unknown id', async () => {
        const { update } = setup();

        await expect(update('nope', { alt: 'x' })).rejects.toThrow(/nope/);
    });

    it('delete() is bulk and removes exactly the given ids', async () => {
        const { create, remove, provider } = setup();
        const a = await create({ file: stubFile('a.png', 'image/png', 10) });
        const b = await create({ file: stubFile('b.png', 'image/png', 10) });
        const c = await create({ file: stubFile('c.png', 'image/png', 10) });

        await remove([a.id, b.id]);

        // Seeded assets are also in list() — a bare length check couldn't
        // tell you the RIGHT ones survived, so assert identity both ways.
        const remainingIds = (await provider.list()).items.map((x) => x.id);
        expect(remainingIds).toContain(c.id);
        expect(remainingIds).not.toContain(a.id);
        expect(remainingIds).not.toContain(b.id);
    });

    it('delete() rejects when any id is unknown, leaving the store untouched', async () => {
        const { create, remove, provider } = setup();
        const a = await create({ file: stubFile('a.png', 'image/png', 10) });

        await expect(remove([a.id, 'nope'])).rejects.toThrow(/nope/);

        // Validate-before-mutate: a bad id in the batch must not partially
        // apply and delete the good ones anyway.
        const remainingIds = (await provider.list()).items.map((x) => x.id);
        expect(remainingIds).toContain(a.id);
    });
});
