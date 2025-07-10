// Import the glob loader
import { glob } from "astro/loaders";

// Import utilities from 'astro:content'
import { z, defineCollection } from "astro:content";

// Define a 'loader' and 'schema' for each defineCollection
const sermons = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/sermons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sermon_text: z.string(),
    preacher: z.string(),
    date: z.date(),
    book: z.array(z.string()).optional(),
    spotify_link: z.string().optional(),
    bulletin_link: z.string().optional(),
    series: z.string().optional(),
  }),
});

const sermonSeries = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/series" }),
  schema: z.object({
    name: z.string(),
    image: z.string(),
    startDate: z.date(),
  }),
});

const preachers = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/preachers" }),
  schema: z.object({
    first: z.string(),
    last: z.string(),
  }),
});

// Export a single 'collections' object to register your collection(s)
export const collections = { sermons, sermonSeries, preachers };
