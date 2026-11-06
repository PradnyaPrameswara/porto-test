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
