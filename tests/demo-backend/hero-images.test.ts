import { describe, expect, it } from 'vitest';
import { HERO_CONTENT } from '@/lib/demo-backend/hero-content';

const MAX_BYTES = 60 * 1024;

type ImageBlock = {
    id: string;
    type: string;
    src?: string;
    alt?: string;
    width?: number;
    naturalWidth?: number;
    children?: unknown[];
};

/**
 * Vite inlines a PNG as a base64 data URL. Decode the payload so the assertion
 * is the file's byte length, not the length of the data URL.
 */
function bytesOfInline(value: string): number {
    const comma = value.indexOf(',');
    expect(comma).toBeGreaterThan(-1);
    expect(value.slice(0, comma)).toContain('base64');
    const payload = value.slice(comma + 1);
    const padding = payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0;
    return Math.floor((payload.length * 3) / 4) - padding;
}

const DEMO_PNGS = import.meta.glob('../../public/demo/*.png', {
    query: '?inline',
    import: 'default',
    eager: true,
}) as Record<string, string>;

const PUBLIC_PNGS = import.meta.glob('../../public/{demo/,}*.png', {
    query: '?url',
    import: 'default',
    eager: true,
}) as Record<string, string>;

function walk(blocks: readonly ImageBlock[], visit: (block: ImageBlock) => void): void {
    for (const block of blocks) {
        visit(block);
        if (!Array.isArray(block.children)) continue;
        for (const column of block.children) {
            if (Array.isArray(column)) walk(column as ImageBlock[], visit);
        }
    }
}

const images: ImageBlock[] = [];
walk(HERO_CONTENT.blocks as ImageBlock[], (block) => {
    if (block.type === 'image') images.push(block);
});

function publicKey(src: string): string {
    return `../../public${src}`;
}

describe('hero images', () => {
    it('uses a local public path, a width, and non-empty alt text on every image', () => {
        expect(images.map((image) => image.id)).toEqual([
            'ship-hero-image',
            'ship-icon-timeline',
            'ship-icon-quiet',
            'ship-icon-rounds',
        ]);

        for (const image of images) {
            expect(image.src).toMatch(/^\/(?:demo\/[a-z0-9-]+\.png|logo\.png|preview\.png)$/);
            expect(PUBLIC_PNGS).toHaveProperty(publicKey(image.src ?? ''));
            expect(image.alt?.trim().length).toBeGreaterThan(0);
            expect(typeof image.width).toBe('number');
            expect(image.width).toBeGreaterThan(0);
        }

        expect(images[0]).toMatchObject({
            src: '/demo/hero-banner.png',
            width: 600,
            naturalWidth: 1200,
            alt: 'Geometric banner with an indigo ring, a coral circle, and a paper card of timeline bars',
        });
    });

    it('keeps every generated demo PNG under 60 KB', () => {
        const entries = Object.entries(DEMO_PNGS).sort(([a], [b]) => a.localeCompare(b));
        expect(entries.map(([path]) => path)).toEqual([
            '../../public/demo/hero-banner.png',
            '../../public/demo/icon-quiet.png',
            '../../public/demo/icon-rounds.png',
            '../../public/demo/icon-timeline.png',
        ]);

        const sizes = Object.fromEntries(
            entries.map(([path, inline]) => [path, bytesOfInline(inline)]),
        );
        for (const [path, size] of Object.entries(sizes)) {
            expect(size, path).toBeGreaterThan(0);
            expect(size, path).toBeLessThan(MAX_BYTES);
        }
    });
});
