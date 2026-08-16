# brand-kit

The NoTambourine brand's golden set: `tokens.css`, `components.css`, `deck.css`, the
font binaries, and `SKILL.md`, which is the written system behind them - color, type,
spacing, component recipes, and voice.

Correct a brand value here. Every other copy is downstream.

| Link this | To get |
|---|---|
| `tokens.css` | The whole system: the faces, every value, and styled bare HTML. |
| `vars.css` | The values alone, for a surface with its own faces and base layer. |
| `components.css` | `.nt-btn`, `.nt-card`, `.nt-nav`, and the rest, all `var()`-based. |
| `deck.css` | The Marpit slide theme, 1280x720. Load `vars.css` on the page too. |

## Consume it

Pin this repo as a submodule and read the bytes out of the checkout. Do not copy a
stylesheet into a consumer; a copy drifts and nothing fails when it does.

```bash
git submodule add https://github.com/notambourine/brand-kit.git upstream/brand-kit
```

`tokens.css` declares the `@font-face` rules and every `var()` the other two read, so
load it first and serve `fonts/` beside it. The paths inside it are relative to the CSS
file, so inlining it into a `<style>` block breaks the faces.

Consumers today:

| | |
|---|---|
| `notambourine/claude` | Ships it as the `/nt-brand:system` skill. |
| `notambourine/share` | Serves `tokens.css` and `deck.css` from its own origin; a self-only CSP forbids a CDN. |
| `notambourine/notambourine.com` | The site's stylesheet. |

## Gate a consumer

A `var(--x)` that reads a token this repo stopped declaring falls through to its
fallback and the page still renders, so a bump can go wrong quietly. Check three things
in the consumer's CI: the font bytes hash against `fonts/`, every color is one this kit
defines, and every `var()` reads a property it still declares. `notambourine/share`'s
`npm run brand` is the reference implementation.

## License

MIT for the stylesheets and `SKILL.md`. The faces in `fonts/` are SIL Open Font License;
see `fonts/OFL.txt`.
