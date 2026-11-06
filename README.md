# porto-test

Personal portfolio foundation built with Astro, React, TypeScript, Tailwind CSS v4 and shadcn/ui. GSAP and Lenis are installed for later, optional animation work.

This repository is in the foundation stage; the shadcn.com-inspired visual implementation and any Arete-inspired project pages have not been started.

## Local development

Requires Node.js 22.23.4+ and pnpm 12.

```bash
pnpm install
pnpm dev
```

Open http://localhost:4321.

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Adding shadcn/ui components

The official shadcn/ui configuration lives in `components.json`. To add a free component:

```bash
pnpm exec shadcn add button
```

Keep the portfolio's content and assets original. The premium Arete template is not included or licensed through this repository.
