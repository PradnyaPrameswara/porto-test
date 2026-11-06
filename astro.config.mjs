import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// Opt-in variant for the /porto-test/ GitHub Pages project path.
const pagesPreview = process.env.DEPLOY_TARGET === "github-pages"

export default defineConfig({
  ...(pagesPreview
    ? { site: "https://pradnyaprameswara.github.io", base: "/porto-test" }
    : {}),
  integrations: [react()],
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
})
