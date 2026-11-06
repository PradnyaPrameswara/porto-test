# Pradnya Prameswara — Portfolio

An editorial developer portfolio inspired by the clean, monochrome layout of [shadcn.com](https://shadcn.com/), featuring original code and verified personal information.

Built with Astro 7, React 19 (islands when necessary), TypeScript, Tailwind CSS v4, and shadcn/ui. GSAP and Lenis are installed but deliberately not activated on this static portfolio; motion should not be added without a clear user benefit.

## Development

Requires Node.js 22.23.4+ and pnpm 12.

```sh
pnpm install
pnpm dev
```

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm test:site
pnpm exec playwright install chromium
pnpm test:visual
```

The smoke tests read the statically built `dist/` output, so run `pnpm build` before `pnpm test:site`.

## Content

Verified identity, work history, projects, and technology labels are maintained in `src/data/portfolio.ts`. LinkedIn: https://www.linkedin.com/in/pradnyaprameswara/.

Company project source is not published here. The portfolio contains no premium Arete source code or assets. Project case studies describe contributions without confidential code or invented performance statistics.

## Repository workflow

Develop future changes in focused pull requests against the appropriate base. Stacked PRs must be merged in dependency order, then retargeted to `main`.

Dependencies are pinned by `pnpm-lock.yaml`; CI installs with `pnpm install --frozen-lockfile`.

## Typography

Schibsted Grotesk Variable is self-hosted through Fontsource (OFL-1.1) so screenshots and deployments no longer depend on Google Fonts availability. Fontsource assets are bundled by Vite.

## Reference visual review

Run `pnpm build && pnpm exec playwright install chromium && pnpm test:reference` to capture the actual [shadcn.com](https://shadcn.com/) homepage beside the local static portfolio at 390/768/1440px. GitHub Actions uploads paired screenshots, DOM geometry, and a capture-status report as the `shadcn-reference-comparison` artifact. A remote website failure is reported explicitly and does not block the core project CI.

The reference is a separate creator's website; use it to inspect layout and typography, not to copy assets, business data or proprietary code. Different text/sections mean that a raw pixel-difference percentage is not a meaningful quality metric.

## Acceptance and preview artifacts

`pnpm test:acceptance` runs browser checks against a locally served production build. CI uploads `portfolio-static-preview` with static `dist/` files and `shadcn-reference-comparison` with reference screenshots. These are downloadable build artifacts, not a deployment.

See `docs/release-checklist.md` before publishing.

## GitHub Pages compatibility

CI also builds a separate path-aware /porto-test/ preview without publishing it. See docs/github-pages-preview.md.

## Optional manual GitHub Pages publication

A GitHub Actions workflow is prepared but never auto-deploys on a merge.
The repository owner must enable GitHub Actions as the Pages source and
manually run the publish workflow on `main` after reviewing the site.
See `docs/github-pages-preview.md`. No custom domain is configured.
