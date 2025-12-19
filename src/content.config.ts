import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const getSlugFromFilename = (val: string): string => {
  const regexRes = val?.match(/([^/?#]+)$/g);
  let slug = regexRes ? regexRes[0] : val;
  slug = slug.replace(".md", "");
  return slug;
};

const sermonsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/sermons" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    series: z.preprocess((val) => {
      return getSlugFromFilename(val as string);
    }, reference("series")),
    scripture: z.array(z.string()).optional(),
    preacher: z.preprocess((val) => {
      return getSlugFromFilename(val as string);
    }, reference("preachers")),
    spotifyURL: z.string().optional(),
    googleDocsURL: z.string().optional(),
  }),
});

const seriesCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    imageSquare: z.string(),
    startDate: z.date(),
    book: z
      .array(
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
      )
      .optional(),
  }),
});

const preachersCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/preachers" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    isGuest: z.boolean().optional(),
    priority: z.number(),
    bio: z.string().optional(),
    image: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
});

// const writingsCollection = defineCollection({
//   loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/writings" }),
//   schema: z.object({
//     title: z.string(),
//     date: z.date(),
//   }),
// });

export const collections = {
  sermons: sermonsCollection,
  series: seriesCollection,
  preachers: preachersCollection,
  pages: pagesCollection,
  // writings: writingsCollection,
};
