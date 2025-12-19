import type { DateValue } from "@internationalized/date";
import { atom, computed } from "nanostores";
import type { SermonData } from "./types";
import Fuse from "fuse.js";

const options = {
  includeScore: true,
  keys: [
    { name: "data.title", weight: 0.7 },
    { name: "data.scripture", weight: 0.5 },
    { name: "preacher.data.name", weight: 0.2 },
  ],
};

export const $series = atom<string | undefined>(undefined);
export const $preacher = atom<string | undefined>(undefined);
export const $from = atom<DateValue | null>(null);
export const $to = atom<DateValue | null>(null);
export const $searchTerm = atom<string>("");

export const $allSermonData = atom<SermonData[] | undefined>(undefined);

export const $filteredSermons = computed(
  [$series, $preacher, $from, $to, $allSermonData, $searchTerm],
  (series, preacher, from, to, allSermonData, searchTerm) => {
    if (!allSermonData) return undefined;

    let sermonData = allSermonData;

    if (series) {
      sermonData = sermonData.filter((item) => item.series.id === series);
    }

    if (preacher) {
      sermonData = sermonData.filter((item) => item.preacher.id === preacher);
    }

    if (from) {
      sermonData = sermonData.filter(
        (item) => item.data.date >= from.toDate("UTC"),
      );
    }

    if (to) {
      sermonData = sermonData.filter(
        (item) => item.data.date <= to.toDate("UTC"),
      );
    }

    if (searchTerm !== "" && searchTerm !== undefined) {
      const fuse = new Fuse(sermonData, options);
      const result = fuse.search(searchTerm);

      // console.log("data:", sermonData);
      // console.log("term:", searchTerm);
      // console.log(result);

      sermonData = result.map((hit) => hit.item);
    }

    return sermonData;
  },
);
