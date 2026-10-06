import palette from "../tokens/palette.tokens.json";
import semantic from "../tokens/semantic.tokens.json";

export default { title: "Tokens", tags: ["!autodocs"] };

const label = ({ $value: v }) =>
  typeof v === "string"
    ? v.replace(/^\{[^.]+\.(.+)\}$/, "var(--$1)")
    : v.alpha === undefined
      ? v.hex
      : `${v.hex} / ${v.alpha}`;

const entries = (group) =>
  Object.entries(group).filter(([key]) => !key.startsWith("$"));

// Swatches paint var(), not the hex, so the theme toolbar shows the light remap.
const swatches = (groups) =>
  groups
    .map(
      (group) => `<section class="nt-stack" style="--gap: var(--sp-3)">
        <p class="caption">${group.$description ?? ""}</p>
        <div class="nt-grid" style="--gap: var(--sp-3)">
          ${entries(group)
            .map(
              ([
                name,
                token,
              ]) => `<div class="nt-card" style="padding: var(--sp-3)">
                <div style="height: 48px; border-radius: var(--r-sm); border: 1px solid var(--line); background: var(--${name})"></div>
                <p style="margin-top: var(--sp-2)"><code>--${name}</code></p>
                <p class="caption">${label(token)}</p>
              </div>`,
            )
            .join("")}
        </div>
      </section>`,
    )
    .join("");

export const Palette = {
  render: () =>
    `<div class="nt-stack" style="--gap: var(--sp-10)">${swatches(entries(palette).map(([, g]) => g))}</div>`,
};
export const Semantic = {
  render: () => `<div class="nt-stack">${swatches([semantic.semantic])}</div>`,
};
