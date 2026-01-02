// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// deploy adapter
import netlify from "@astrojs/netlify";

// md parsing
import remarkDirective from "remark-directive";
import { remarkDirectiveToHTML } from "./src/lib/remark-directive-to-html";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkDirective, remarkDirectiveToHTML],
  },
  site: "https://sojourners.church",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  adapter: netlify(),
});
