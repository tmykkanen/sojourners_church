import { getCollection, getEntry } from "astro:content";
import type { SermonData } from "./types";

export async function getAllSermonData(): Promise<SermonData[]> {
  const allSermons = (await getCollection("sermons")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const promises = allSermons.map(async (sermonItem) => {
    return {
      ...sermonItem,
      series: await getEntry(sermonItem.data.series),
      preacher: await getEntry(sermonItem.data.preacher),
    };
  });

  return Promise.all(promises);
}

export async function getAllSeriesData() {
  return (await getCollection("series")).sort(
    (a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf(),
  );
}

export async function getAllPreachersData() {
  return (await getCollection("preachers"))
    .sort((a, b) =>
      a.data.name.split(" ")[1].localeCompare(b.data.name.split(" ")[1]),
    )
    .sort((a, b) => b.data.priority - a.data.priority);
}
