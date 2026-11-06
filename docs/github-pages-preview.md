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

## Manual publication (owner action required)

After merging the preparation PRs, configure the repository:
1. Open GitHub repository Settings > Pages.
2. Under Build and deployment, select **GitHub Actions** as the source.
3. Open Actions > **Publish portfolio to GitHub Pages (manual)**.
4. Select branch **main**, then choose **Run workflow**.
5. Inspect the deployment job and its Pages URL before sharing it.

The publication workflow is intentionally `workflow_dispatch`-only, and it
refuses non-`main` branches. Merging PRs does **not** publish a website.
The build is verified against the /porto-test/ base path before deployment.

GitHub Pages deployment may need repository settings/permissions and may not
produce a live URL until the user completes those GitHub UI steps.

For a custom root domain, do not reuse this /porto-test/ build configuration.
A separate domain migration should adjust Astro site/base, internal links,
canonical URLs, and DNS after the destination is confirmed.
