import { ref, type Ref } from 'vue';

const CACHE_KEY = 'templatical:github-stars';
const TTL_MS = 60 * 60 * 1000;
const ENDPOINT = 'https://api.github.com/repos/templatical/sdk';

const stars = ref<number | null>(null);
let pending: Promise<void> | null = null;

function readCache(): number | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { value, ts } = JSON.parse(raw) as { value: number; ts: number };
        if (Date.now() - ts > TTL_MS) return null;
        return typeof value === 'number' ? value : null;
    } catch {
        return null;
    }
}

function writeCache(value: number): void {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ value, ts: Date.now() }));
    } catch {
        // ignore quota / disabled storage
    }
}

async function load(): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    try {
        const res = await fetch(ENDPOINT, { signal: controller.signal });
        if (!res.ok) return;
        const json = (await res.json()) as { stargazers_count?: number };
        if (typeof json.stargazers_count === 'number') {
            stars.value = json.stargazers_count;
            writeCache(json.stargazers_count);
        }
    } catch {
        // network error / abort — leave stars null, button hides count
    } finally {
        clearTimeout(timeout);
    }
}

export function useGitHubStars(): { stars: Ref<number | null> } {
    if (typeof window === 'undefined') return { stars };
    if (stars.value === null) {
        const cached = readCache();
        if (cached !== null) {
            stars.value = cached;
        } else if (!pending) {
            pending = load();
        }
    }
    return { stars };
}
