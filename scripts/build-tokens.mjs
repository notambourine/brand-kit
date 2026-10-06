#!/usr/bin/env node
// Compiles tokens/*.tokens.json into vars.css (the kit's names) and tailwind.css
// (Tailwind v4 theme names). Values stay CSS strings, so the output is exactly
// what the JSON says; a reference compiles to var() so a theme swap still carries.
import StyleDictionary from "style-dictionary";

const TAILWIND = "com.notambourine.tailwind";
const LIGHT = "light";

const header = (title, body) =>
  `/* =========================================================
   NoTambourine: ${title}
   ---------------------------------------------------------
${body.map((line) => `   ${line}`.trimEnd()).join("\n")}
   Generated from tokens/ by scripts/build-tokens.mjs.
   ========================================================= */
`;

const comment = (text, indent) => {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && line.length + word.length > 72) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  lines.push(line);
  return `${indent}/* ${lines.join(`\n${indent}   `)} */\n`;
};

const refName = (byPath, value) => {
  const ref = /^\{([^}]+)\}$/.exec(value);
  if (!ref) return null;
  const target = byPath.get(ref[1]);
  if (!target) throw new Error(`unresolved reference ${value}`);
  return target.name;
};

const cssValue = (byPath, token) => {
  const ref = refName(byPath, token.original.$value);
  return ref ? `var(--${ref})` : token.original.$value;
};

function block(dictionary, byPath, groups, selector) {
  let out = `${selector} {\n`;
  for (const group of groups) {
    const tokens = dictionary.allTokens.filter((t) => t.path[0] === group);
    const description = dictionary.tokens[group].$description;
    if (description) out += `\n${comment(description, "  ")}`;
    for (const token of tokens) {
      const line = `  --${token.name}: ${cssValue(byPath, token)};`;
      out += token.$description
        ? `${line} /* ${token.$description} */\n`
        : `${line}\n`;
    }
  }
  return `${out}}\n`;
}

StyleDictionary.registerTransform({
  name: "name/nt",
  type: "name",
  transform: (token) => token.path.slice(1).join("-"),
});

StyleDictionary.registerFormat({
  name: "css/nt-vars",
  format: ({ dictionary }) => {
    const byPath = new Map(
      dictionary.allTokens.map((t) => [t.path.join("."), t]),
    );
    const groups = Object.keys(dictionary.tokens).filter(
      (g) => !g.startsWith("$"),
    );
    return [
      header("every brand value as a custom property", [
        "Import this file alone to take the values without the faces",
        "or the element styles. tokens.css is the whole system.",
      ]),
      block(
        dictionary,
        byPath,
        groups.filter((g) => g !== LIGHT),
        ":root",
      ),
      block(dictionary, byPath, [LIGHT], ".theme-light"),
    ].join("\n");
  },
});

StyleDictionary.registerFormat({
  name: "css/nt-tailwind",
  format: ({ dictionary }) => {
    const byPath = new Map(
      dictionary.allTokens.map((t) => [t.path.join("."), t]),
    );
    const lines = [];
    for (const token of dictionary.allTokens) {
      if (token.path[0] === LIGHT) continue;
      const names = [token.$extensions?.[TAILWIND] ?? []].flat();
      for (const name of names) {
        // Same name in both namespaces: point past the alias, or it reads itself.
        const value =
          name === token.name
            ? cssValue(byPath, token)
            : `var(--${token.name})`;
        lines.push(`  --${name}: ${value};`);
      }
    }
    return `${header("the kit as a Tailwind v4 theme", [
      "Import this instead of writing a @theme bridge. inline makes",
      "each utility read the alias at the element, so .theme-light",
      "flips a Tailwind subtree too; static keeps every variable",
      "declared for hand-written var(--color-*) reads.",
    ])}
@import './vars.css';

@theme static inline {
${lines.join("\n")}
}
`;
  },
});

const sd = new StyleDictionary({
  source: ["tokens/*.tokens.json"],
  // light.* shares names with the dark set on purpose; it renders in its own block.
  log: { warnings: "disabled" },
  platforms: {
    css: {
      transforms: ["name/nt"],
      files: [
        { destination: "vars.css", format: "css/nt-vars" },
        { destination: "tailwind.css", format: "css/nt-tailwind" },
      ],
    },
  },
});

await sd.buildAllPlatforms();
