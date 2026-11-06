import { spawn } from "node:child_process"
import { mkdir, writeFile } from "node:fs/promises"
import { chromium } from "playwright"

const origin = "http://127.0.0.1:4321"
const referenceURL = "https://shadcn.com/"
const widths = [390, 768, 1440]
const folder = "reference-audit"
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const server = spawn("pnpm", ["preview", "--host", "127.0.0.1", "--port", "4321"], {
  stdio: "ignore",
})

async function awaitPreview() {
  for (let i = 0; i < 80; i++) {
    if (server.exitCode !== null) throw new Error("Preview server exited unexpectedly")
    try {
      const response = await fetch(origin)
      if (response.ok) return
    } catch {
      // Astro needs time to start.
    }
    await sleep(250)
  }
  throw new Error("Preview not reachable")
}

async function measure(page) {
  return page.evaluate(() => {
    const rect = (element) => {
      const { x, y, width, height } = element.getBoundingClientRect()
      return { x, y, width, height }
    }
    const style = (element) => {
      const css = getComputedStyle(element)
      return {
        fontFamily: css.fontFamily,
        fontSize: css.fontSize,
        fontWeight: css.fontWeight,
        lineHeight: css.lineHeight,
        letterSpacing: css.letterSpacing,
        color: css.color,
        backgroundColor: css.backgroundColor,
      }
    }
    const summarize = (element) => ({
      tag: element.tagName.toLowerCase(),
      text: (element.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 120),
      bounds: rect(element),
      style: style(element),
    })
    const visible = (element) => {
      const box = element.getBoundingClientRect()
      return box.width > 0 && box.height > 0
    }
    const headingNodes = Array.from(document.querySelectorAll("h1, h2, h3"))
      .filter(visible).slice(0, 25)
    const paragraphNodes = Array.from(document.querySelectorAll("main p, p"))
      .filter(visible).slice(0, 18)
    const sectionNodes = Array.from(document.querySelectorAll("section"))
      .filter(visible).slice(0, 20)
    const navLinks = Array.from(document.querySelectorAll("header a, nav a"))
      .filter(visible).slice(0, 12)
    const shell = document.querySelector(".portfolio-shell")
    return {
      pageTitle: document.title,
      url: location.href,
      windowWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      body: summarize(document.body),
      shell: shell ? summarize(shell) : null,
      headings: headingNodes.map(summarize),
      paragraphs: paragraphNodes.map(summarize),
      sections: sectionNodes.map(summarize),
      navigation: navLinks.map(summarize),
    }
  })
}

let browser
const report = { referenceURL, comparison: "geometry and visual inspection; no raw pixel difference because content differs", captures: [] }
try {
  await mkdir(folder, { recursive: true })
  await awaitPreview()
  browser = await chromium.launch({ headless: true })

  for (const width of widths) {
    const entry = { width, reference: null, portfolio: null, warning: null }
    for (const site of ["portfolio", "reference"]) {
      const url = site === "portfolio" ? origin : referenceURL
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
        colorScheme: "light",
        reducedMotion: "reduce",
        locale: "en-US",
      })
      try {
        const result = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
        if (!result || result.status() >= 400) {
          throw new Error("HTTP status " + (result ? result.status() : "unknown"))
        }
        await page.evaluate(() => document.fonts.ready)
        await page.waitForTimeout(600)
        const metrics = await measure(page)
        if (site === "portfolio" && metrics.documentWidth > width + 1) {
          throw new Error("Portfolio horizontal overflow at " + width)
        }
        await page.screenshot({ path: folder + "/" + site + "-" + width + ".png", fullPage: true, animations: "disabled" })
        entry[site] = { httpStatus: result.status(), metrics }
      } catch (error) {
        entry[site] = { error: String(error) }
        console.error(site + " @ " + width + ": " + String(error))
      } finally {
        await page.close()
      }
    }
    report.captures.push(entry)
  }
} finally {
  if (browser) await browser.close()
  server.kill("SIGTERM")
  await writeFile(folder + "/comparison-metrics.json", JSON.stringify(report, null, 2) + "\n")
  const available = report.captures.filter((r) => r.reference?.metrics && r.portfolio?.metrics).length
  const summary = [
    "# Reference comparison",
    "",
    "Reference: " + referenceURL,
    "Local build: " + origin,
    "Date (UTC): " + new Date().toISOString(),
    "Successful paired captures: " + available + "/" + widths.length,
    "",
    "Inspect matching viewport screenshots side-by-side and compare positions, typography, vertical rhythm, and responsive wrapping.",
    "Do not infer pixel-identical similarity from this audit because copy and sections differ.",
    "",
    ...report.captures.map((r) => "- " + r.width + "px: reference " + (r.reference?.error || "captured") + "; portfolio " + (r.portfolio?.error || "captured")),
    "",
  ].join("\n")
  await writeFile(folder + "/README.md", summary)
  if (available !== widths.length) {
    process.exitCode = 1
    console.error("Some reference captures unavailable; see reference-audit/README.md")
  } else {
    console.log("Reference and portfolio captures completed:", widths.join(", "))
  }
}
