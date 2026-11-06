import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { mkdir, writeFile } from "node:fs/promises"
import { chromium } from "playwright"

const origin = "http://127.0.0.1:4321"
const server = spawn("pnpm", ["preview", "--host", "127.0.0.1", "--port", "4321"], { stdio: "ignore" })
const results = []
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function awaitPreview() {
  for (let i = 0; i < 80; i++) {
    if (server.exitCode !== null) throw new Error("Preview process exited")
    try {
      if ((await fetch(origin)).ok) return
    } catch {
      // Wait for static preview.
    }
    await sleep(250)
  }
  throw new Error("Static preview never started")
}

let browser
try {
  await mkdir("acceptance-audit", { recursive: true })
  await awaitPreview()
  browser = await chromium.launch({ headless: true })
  for (const width of [390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    })
    const jsErrors = []
    page.on("pageerror", (error) => jsErrors.push(error.message))
    const home = await page.goto(origin, { waitUntil: "domcontentloaded" })
    assert.equal(home.status(), 200)
    assert.equal(await page.locator("main").count(), 1)
    assert.equal(await page.locator("main h1").count(), 1)

    const title = await page.title()
    assert.match(title, /Pradnya Prameswara/)
    const description = await page.locator('meta[name="description"]').getAttribute("content")
    assert.ok(description && description.length > 40)

    const projectLinks = await page.locator('main a[href^="/projects/"]').evaluateAll(
      (links) => links.map((element) => element.getAttribute("href"))
    )
    assert.equal(projectLinks.length, 3)
    assert.equal(new Set(projectLinks).size, 3)
    assert.ok((await page.locator('a[href^="mailto:"]').count()) >= 2)

    await page.keyboard.press("Tab")
    const focused = await page.evaluate(() => ({
      href: document.activeElement?.getAttribute("href"),
      outline: document.activeElement ? getComputedStyle(document.activeElement).outlineStyle : null,
    }))
    assert.equal(focused.href, "/")
    assert.equal(focused.outline, "solid")

    const beforeOverflow = await page.evaluate(() => document.documentElement.scrollWidth)
    assert.ok(beforeOverflow <= width + 1)

    for (const path of projectLinks) {
      const response = await page.goto(origin + path, { waitUntil: "domcontentloaded" })
      assert.equal(response.status(), 200)
      assert.equal(await page.locator("main h1").count(), 1)
      assert.equal(await page.locator('nav[aria-label="Breadcrumb"] a').count(), 1)
      assert.ok(
        (await page.evaluate(() => document.documentElement.scrollWidth)) <= width + 1,
        "Case study overflows viewport: " + path
      )
      const back = await page.locator('nav[aria-label="Breadcrumb"] a').getAttribute("href")
      assert.equal(back, "/#work-heading")
    }

    assert.deepEqual(jsErrors, [], "Unexpected browser JavaScript errors")
    results.push({ width, homepageTitle: title, projects: projectLinks, keyboardFocus: focused, javascriptErrors: jsErrors })
    await page.close()
  }
  console.log("Portfolio accessibility, navigation, and responsiveness checks passed")
} finally {
  if (browser) await browser.close()
  server.kill("SIGTERM")
  await writeFile("acceptance-audit/results.json", JSON.stringify({ results }, null, 2) + "\n")
}
