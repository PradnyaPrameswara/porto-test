# shadcn.com visual comparison — baseline and intended changes

Reference: https://shadcn.com/ (full-page screenshot captured 25 October 2026, via Arche Directory)
Implementation: https://github.com/PradnyaPrameswara/porto-test

## Observed reference

- Off-white page, monochrome typography, Schibsted Grotesk.
- Left-aligned, deliberately narrow reading column rather than a centered wide layout.
- Compact top navigation with slash separators and underlined links.
- Short introductory paragraph, an understated numbers section, a compact contact/newsletter block, and individually spaced linked project summaries.
- Minimal borders and no decorative card backgrounds.
- Sections use tighter type scale and longer vertical gaps than their row content.

## Corrections

- Switch from the 680px centered shell to a 440px max-width left-aligned reading column.
- Align header link styling, paragraph text, section labels, and vertical rhythm to the compact reference.
- Keep individual project detail pages within the same shell.
- Retain accurate professional data, personal branding, and native contact behavior; don't copy newsletter subscriptions or sponsors.
- Recheck on 320, 390, 768, 1024 and 1440 CSS px.

## Evidence limitation

This is a reference-led adjustment based on an archived screenshot, not a pixel-difference measurement from two live browser screenshots. A final browser-based comparison remains necessary before claiming visual parity.

## Homepage content reflow (follow-up PR)

- Keep the shadcn.com sequence: introduction → compact metrics → narrow call to action → linked portfolio entries, then supplementary biographical details.
- Use a native `mailto:` contact CTA in the area where the reference has a newsletter. The project has no mailing-list backend, so no fake signup is shown.
- Project names are underlined, description-first, vertically separated without card backgrounds or table dividers.
- Omit client/sponsor logos and interaction metrics that cannot be verified.

## 2026-11-06 measured side-by-side browser audit

Evidence: [GitHub Actions run #42181955480](https://github.com/PradnyaPrameswara/porto-test/actions/runs/42181955480), artifact `shadcn-reference-comparison`. Both pages captured at 390, 768 and 1440 CSS px, same Chromium settings. Measurements **before** PR #11:

| Measure | shadcn.com | portfolio | Correction |
| --- | --- | --- | --- |
| Content left at 1440px | 96px | 94px | 96px gutter |
| Content left at 768px | 96px | 50px | 96px gutter |
| Content left at 390px | 24px | 24px | Retain |
| Body font size | 14px | 13px | 14px |
| Section heading | 16px | 13px | 16px |
| Body background | #ffffff | #fefefe | White |
| Numbers heading Y at 1440px | 296px | 342px | Shorten intro and align rhythm |
| Numbers heading Y at 390px | 224px | 331px | Reduce mobile top padding and intro length |

The intro is intentionally shortened without fabricating facts; employment and education details remain in their own sections. The shadcn.com newsletter, sponsor art, and product data are not copied. Further results must be checked on the next CI screenshots; these values do not represent post-change measurements.
