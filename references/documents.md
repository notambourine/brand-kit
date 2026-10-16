# Document guidance

Use this for any PDF that is not a slide deck: a contract, a statement of work,
a proposal, a report. Write plain Markdown and let `prose.css` give it
structure; the visual rules list what each Markdown shape becomes.

## Render

Wrap the Markdown with the pandoc template and the self-contained sheet, then
print it with Chrome:

```bash
KIT=node_modules/@notambourine/brand-kit
pandoc doc.md -f gfm -s --embed-resources \
  --template $KIT/doc-template.html --css $KIT/doc-standalone.css \
  --metadata pagetitle="Statement of work" -o doc.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --no-pdf-header-footer --print-to-pdf=doc.pdf doc.html
```

- `-f gfm` keeps a lone image a paragraph rather than a `<figure>` and turns a
  trailing `\` into the break a stat card needs.
- `doc-standalone.css` carries the faces, tokens, and lockup as data URIs, so
  `doc.html` is also a single file to attach. It is built from `prose.css` and
  `print.css`; correct the sources, never the build.
- The page box, margins, page numbers, light theme, and lockup come from the
  sheet. Never add a document-local `<style>` or print flags for them.
- Chrome may refuse to launch in a sandboxed agent shell; rerun the print
  unsandboxed.

## Content

- Open with an H1 and one sentence saying what the document is for; that line is
  the lede.
- Use H2 for each section a reader will look for and H3 for the clauses under
  it. A wall of bold paragraphs prints flat.
- Put fees and dates in a table, and figures worth seeing first in stat cards.
- Follow the voice rules for anything a client signs or reads.
