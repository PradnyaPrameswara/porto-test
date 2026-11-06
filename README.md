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

The repository does not yet include a committed pnpm lockfile. Local and CI dependency resolution may therefore change across installs.
