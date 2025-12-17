// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import icon from "astro-icon";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://sojourners.netlify.app/",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), icon()],
  adapter: netlify(),
});
