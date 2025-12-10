// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import superforms from "@tmykkanen/astro-superforms-custom-pkg";

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte(), icon(), superforms()],
  adapter: netlify()
});