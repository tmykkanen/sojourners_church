import { getCollection, getEntry } from "astro:content";
import type { SermonData } from "./types";
import { type CollectionEntry } from "astro:content";

// TODO: Update getAllSermonData w/ this function
export const getSermonItemData = async (
  sermonItem: CollectionEntry<"sermons">,
) => {
  return {
    ...sermonItem,
    series: await getEntry(sermonItem.data.series),
    preacher: await getEntry(sermonItem.data.preacher),
  };
};

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

export const allSermonData = await getAllSermonData();

export async function getAllSeriesData() {
  return (await getCollection("series")).sort(
    (a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf(),
  );
}

export async function getAllPreachersData() {
  return (
    (await getCollection("preachers"))
      // alpha sort by last name
      .sort((a, b) =>
        a.data.name.split(" ")[1].localeCompare(b.data.name.split(" ")[1]),
      )
      // sort by priority, 1 being highest priority, set 0 to 9999 to keep from sorting above 1
      .sort(
        (a, b) =>
          (a.data.priority === 0 ? 9999 : a.data.priority) -
          (b.data.priority === 0 ? 9999 : b.data.priority),
      )
      // Prioritize non-guest preachers
      .sort((a, b) => Number(a.data.isGuest) - Number(b.data.isGuest))
  );
}
