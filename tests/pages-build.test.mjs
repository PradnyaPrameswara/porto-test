import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

const load = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), "utf8")

test("GitHub Pages preview prefixes internal navigation", async () => {
  const html = await load("index.html")
  assert.ok(html.includes('href="/porto-test/"'))
  assert.ok(html.includes('href="/porto-test/favicon.svg"'))
  for (const slug of ["widhi-asih-bali-export", "wedding-website", "invoiceaura"]) {
    assert.ok(html.includes(`href="/porto-test/projects/${slug}/"`))
    const detail = await load(`projects/${slug}/index.html`)
    assert.ok(detail.includes('href="/porto-test/#work-heading"'))
    assert.ok(detail.includes('href="/porto-test/favicon.svg"'))
  }
  assert.ok(!html.includes('href="/projects/'))
  assert.ok(!html.includes('href="/favicon.svg"'))
})

test("404 link returns to the Pages project root", async () => {
  const html = await load("404.html")
  assert.ok(html.includes('href="/porto-test/"'))
})
