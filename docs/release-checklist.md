# Portfolio final review checklist

## Automated
- Frozen `pnpm install` from checked-in lockfile.
- ESLint, Astro typecheck, production build, generated-site tests.
- Browser responsive checks at 320/390/768/1024/1440px.
- Browser acceptance at 390/1440px: home and all 3 project pages, valid metadata, working internal links, keyboard focus, no page errors or horizontal overflow.
- Compare shadcn.com and the built portfolio at 390/768/1440px, with screenshots and JSON metrics.
- Review build files from the `portfolio-static-preview` GitHub Actions artifact.

## Visual review (manual; cannot be inferred from CI pass)
- Compare matched viewport screenshots side-by-side, allowing for different personal content.
- Inspect font rasterization, mobile wrapping, section heights and interactions.
- Verify personal contact links and project descriptions remain accurate.
- Check color contrast and focus indicators across supported browsers.

## Publishing
This repository does not configure GitHub Pages, custom DNS or a public deployment. A successful static preview artifact is reviewable but is **not** a live URL. Publish only after the owner approves the final visual design and deployment destination.
