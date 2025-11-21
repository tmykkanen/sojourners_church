// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";
import pagefind from "astro-pagefind";

import svelte from "@astrojs/svelte";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    icon(),
    pagefind(),
    svelte(),
    alpinejs({ entrypoint: "/src/entrypoint" }),
  ],
});
