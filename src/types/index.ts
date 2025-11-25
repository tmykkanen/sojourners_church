import type { CollectionEntry } from "astro:content";

export interface SermonData extends CollectionEntry<"sermons"> {
  series: CollectionEntry<"series">;
  preacher: CollectionEntry<"preachers">;
}
