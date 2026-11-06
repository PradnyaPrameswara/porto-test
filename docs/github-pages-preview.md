# GitHub Pages build preparation

Root-relative paths remain the default for local development and root-domain hosting.

To build the GitHub Pages project-path preview:

```sh
pnpm install --frozen-lockfile
DEPLOY_TARGET=github-pages pnpm build
pnpm test:pages
```

Astro then prefixes internal navigation, favicon, and build assets with /porto-test/.
GitHub Actions verifies this variant and uploads a portfolio-pages-preview build artifact.
This is not a public website or an automatic deployment.

Expected Pages URL only after a manual publication:
https://pradnyaprameswara.github.io/porto-test/

No DNS changes, hosting configuration, or public deployment occur in this PR.
For a custom domain served at the root, continue using the default build.
