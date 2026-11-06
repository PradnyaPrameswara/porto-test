import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { mkdir, writeFile } from "node:fs/promises"
import { chromium } from "playwright"

const origin = "http://127.0.0.1:4321"
const widths = [320, 390, 768, 1024, 1440]
const dir = "visual-audit"
const server = spawn(
  "pnpm",
  ["preview", "--host", "127.0.0.1", "--port", "4321"],
  { stdio: "ignore" }
)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt++) {
    if (server.exitCode !== null) {
      throw new Error(`Preview server exited: ${server.exitCode}`)
    }
    try {
      const response = await fetch(origin)
      if (response.ok) return
    } catch {
      // The preview server may still be starting.
    }
    await delay(250)
  }
  throw new Error("Astro preview did not become reachable on port 4321")
}

let browser
try {
  await mkdir(dir, { recursive: true })
  await waitForServer()
  browser = await chromium.launch({ headless: true })

  const measurements = []
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    })
    await page.goto(origin, { waitUntil: "domcontentloaded" })
    await page.locator(".portfolio-shell").waitFor()
    const loadedFont = await page.evaluate(async () => {
      await document.fonts.load('400 13px "Schibsted Grotesk Variable"')
      return document.fonts.check('400 13px "Schibsted Grotesk Variable"')
    })
    assert.ok(loadedFont, `Schibsted Grotesk font missing at ${width}px`)

    assert.equal(await page.locator("main h1").count(), 1)
    assert.equal(await page.locator(".portfolio-project").count(), 3)
    assert.equal(
      await page.locator('nav[aria-label="Social and contact links"] a').count(),
      3
    )
    assert.equal(
      await page.locator('a[href^="/projects/"]').count(),
      3
    )

    const metrics = await page.evaluate(() => {
      const shell = document.querySelector(".portfolio-shell")
      if (!shell) throw new Error("Missing portfolio shell")
      const rect = shell.getBoundingClientRect()
      const body = getComputedStyle(document.body)
      return {
        viewport: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        shellLeft: rect.left,
        shellWidth: rect.width,
        bodyFont: body.fontFamily,
        bodyFontSize: body.fontSize,
      }
    })

    assert.ok(
      metrics.documentWidth <= width + 1,
      `Horizontal overflow at ${width}px: ${JSON.stringify(metrics)}`
    )
    assert.ok(
      metrics.shellWidth <= 441,
      `Reading column too wide at ${width}px: ${metrics.shellWidth}`
    )
    const expectedLeft =
      width <= 340 ? 18 : width <= 600 ? 24 : Math.min(96, Math.max(24, width * 0.0655))
    assert.ok(
      Math.abs(metrics.shellLeft - expectedLeft) <= 3,
      `Shell left position mismatch at ${width}px: got ${metrics.shellLeft}, expected ${expectedLeft}`
    )
    assert.match(metrics.bodyFont, /Schibsted Grotesk Variable/)
    measurements.push(metrics)

    if ([390, 768, 1440].includes(width)) {
      await page.screenshot({ path: `${dir}/homepage-${width}.png`, fullPage: true })
    }

    if (width === 390) {
      for (const slug of [
        "widhi-asih-bali-export",
        "wedding-website",
        "invoiceaura",
      ]) {
        await page.goto(`${origin}/projects/${slug}/`, { waitUntil: "domcontentloaded" })
        assert.equal(await page.locator("main h1").count(), 1)
        assert.ok(
          (await page.locator("body").evaluate((element) => element.scrollWidth)) <= width + 1,
          `Overflow in project page: ${slug}`
        )
        assert.equal(await page.locator('nav[aria-label="Breadcrumb"] a').count(), 1)
      }
    }
    await page.close()
  }

  await writeFile(
    `${dir}/layout-metrics.json`,
    JSON.stringify({ widths, measurements }, null, 2) + "\n"
  )
  console.log("Viewport geometry and navigation checks passed:", widths.join(", "))
} finally {
  if (browser) await browser.close()
  server.kill("SIGTERM")
}
