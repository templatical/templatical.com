/**
 * Prettier was used on this repo for a long time before it was ever a
 * dependency — applied by an editor integration, with no config file, no script
 * and no CI check. The tree drifted accordingly: at the time this config was
 * added, 42 of 84 source files disagreed with *any* single setting, and one file
 * broke a 94-character line while leaving a 104-character one intact, which no
 * single `printWidth` can produce. A one-time reformat landed alongside this
 * file to make the tree self-consistent; `pnpm run format:check` is what keeps
 * it that way.
 *
 * `printWidth` was measured, not guessed: reformatting the pre-existing tree at
 * 80/84/88/92/96/100/110/120 produced a shallow minimum across 92–100 (1,338 /
 * 1,250 / 1,257 changed lines at 92 / 96 / 100 — i.e. a tie within noise). 100
 * is the conventional round value inside that basin.
 *
 * `tabWidth: 4` and `singleQuote` are not judgement calls — they are what the
 * existing tree overwhelmingly already used.
 */
export default {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: true,

    // Sorts Tailwind utilities into the canonical order. 35 of 43 .vue files
    // already matched the plugin's output before it was installed, which is the
    // evidence that it had been in use via the editor all along.
    //
    // Tailwind v4 has no JS config to point at, so the plugin reads the CSS
    // entry instead — the same file src/main.ts imports. Without this it falls
    // back to stock Tailwind and silently reorders this project's custom
    // utilities and theme tokens incorrectly.
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/styles/app.css',
};
