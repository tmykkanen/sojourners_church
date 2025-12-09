import type { CollectionEntry } from "astro:content";

export type SeriesData = CollectionEntry<"series">;
export type PreacherData = CollectionEntry<"preachers">;

export interface SermonData extends CollectionEntry<"sermons"> {
  series: SeriesData;
  preacher: PreacherData;
}

// Helper function for type narrowing
export const isSeries = (
  data: SeriesData[] | PreacherData[],
): data is SeriesData[] => {
  return (data[0] as SeriesData).data.title !== undefined;
};
