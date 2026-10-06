#!/usr/bin/env node
// Compiles tokens/*.tokens.json into vars.css (the kit's names) and tailwind.css
// (Tailwind v4 theme names). A reference compiles to var() so a theme swap still carries.
// The spec has no clamp() or em, so those tokens carry a spec fallback in $value
// and the CSS in $extensions.
import StyleDictionary from "style-dictionary";

const TAILWIND = "com.notambourine.tailwind";
const CSS = "com.notambourine.css";
const UNIT = "com.notambourine.unit";
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
  if (ref) return `var(--${ref})`;
  if (token.$extensions?.[CSS]) return token.$extensions[CSS];
  const unit = token.groupUnit;
  return unit ? `${token.$value}${unit}` : String(token.$value);
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

StyleDictionary.registerTransform({
  name: "unit/css",
  type: "value",
  filter: (token) =>
    ["dimension", "duration"].includes(token.$type) &&
    typeof token.$value === "object",
  transform: (token) => `${token.$value.value}${token.$value.unit}`,
});

// shadow/css/shorthand prints a DTCG color as rgb(%); rgba() matches color/css.
StyleDictionary.registerTransform({
  name: "shadow/rgba",
  type: "value",
  filter: (token) =>
    token.$type === "shadow" && typeof token.$value === "object",
  transform: (token) =>
    [token.$value].flat().map(({ color, ...layer }) => {
      const [r, g, b] = color.components.map((c) => Math.round(c * 255));
      return { ...layer, color: `rgba(${r}, ${g}, ${b}, ${color.alpha ?? 1})` };
    }),
});

StyleDictionary.registerPreprocessor({
  name: "group-unit",
  preprocessor: (tokens) => {
    const tag = (node, unit) => {
      if ("$value" in node) {
        if (unit) node.groupUnit = unit;
        return;
      }
      const own = node.$extensions?.[UNIT] ?? unit;
      for (const [k, child] of Object.entries(node))
        if (!k.startsWith("$")) tag(child, own);
    };
    tag(tokens);
    return tokens;
  },
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
  preprocessors: ["group-unit"],
  platforms: {
    css: {
      transforms: [
        "name/nt",
        "color/css",
        "unit/css",
        "fontFamily/css",
        "cubicBezier/css",
        "shadow/rgba",
        "shadow/css/shorthand",
      ],
      files: [
        { destination: "vars.css", format: "css/nt-vars" },
        { destination: "tailwind.css", format: "css/nt-tailwind" },
      ],
    },
  },
});

await sd.buildAllPlatforms();
