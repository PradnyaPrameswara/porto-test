import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

const dist = new URL("../dist/", import.meta.url)
const load = (path) => readFile(new URL(path, dist), "utf8")

test("homepage publishes the profile and real project links", async () => {
  const html = await load("index.html")
  for (const required of [
    "Pradnya Prameswara",
    "pradnya/numbers",
    "pradnya/projects",
    "pradnya/experience",
    "pradnya/stack",
    "Universitas Pendidikan Ganesha",
    "https://www.linkedin.com/in/pradnyaprameswara/",
    "https://github.com/PradnyaPrameswara",
  ]) {
    assert.ok(html.includes(required), `Missing content: ${required}`)
  }
  assert.match(html, /<main\b/)
  assert.match(html, /<h1\b/)
})

const pages = [
  ["widhi-asih-bali-export", "Widhi Asih Bali Export"],
  ["wedding-website", "Wedding Website"],
  ["invoiceaura", "InvoiceAura"],
]
for (const [slug, title] of pages) {
  test(`case study for ${title} renders`, async () => {
    const html = await load(`projects/${slug}/index.html`)
    assert.ok(html.includes(title))
    assert.ok(html.includes("pradnya/contributions"))
    assert.match(html, /<main\b/)
    assert.match(html, /<h1\b/)
  })
}
