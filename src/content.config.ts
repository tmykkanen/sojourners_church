// Import the glob loader
import { glob } from "astro/loaders";

// Import utilities from 'astro:content'
import { z, defineCollection } from "astro:content";

// Define a 'loader' and 'schema' for each defineCollection
const sermons = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/sermons" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    series: z.string(),
    sermonText: z.array(
      z.object({
        book: z.string(),
        startingChapter: z.number(),
        startingVerse: z.number().optional().nullable(),
        endingChapter: z.number().optional().nullable(),
        endingVerse: z.number().optional().nullable(),
      }),
    ),
    preacher: z.string(),
    spotifyLink: z.string().optional(),
    bulletinLink: z.string().optional(),
    body: z.string().optional(),
  }),
});

const sermonSeries = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/series" }),
  schema: z.object({
    name: z.string(),
    image: z.string(),
    imageSQ: z.string(),
    startDate: z.date(),
    book: z.array(
      z.enum([
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Kings",
        "2 Kings",
        "1 Chronicles",
        "2 Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalms",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "1 Corinthians",
        "2 Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1 Thessalonians",
        "2 Thessalonians",
        "1 Timothy",
        "2 Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "Jude",
        "Revelation",
      ]),
    ),
  }),
});

const preachers = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/preachers" }),
  schema: z.object({
    name: z.object({
      first: z.string(),
      last: z.string(),
    }),
    priority: z.number().optional().nullable(),
    guest: z.boolean().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/writings" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

// Export a single 'collections' object to register your collection(s)
export const collections = { sermons, sermonSeries, preachers, writings };
