import type { DateValue } from "@internationalized/date";
import { atom, computed } from "nanostores";
import type { SermonData, WritingsData } from "./types";
import Fuse from "fuse.js";

// SERMON FILTERING
export const $series = atom<string | undefined>(undefined);
export const $preacher = atom<string | undefined>(undefined);
export const $from = atom<DateValue | null>(null);
export const $to = atom<DateValue | null>(null);
export const $sermonsSearchTerm = atom<string>("");
export const $allSermonData = atom<SermonData[] | undefined>(undefined);

const sermonSearchOptions = {
  includeScore: true,
  keys: [
    { name: "data.title", weight: 0.7 },
    { name: "data.scripture", weight: 0.5 },
    { name: "preacher.data.name", weight: 0.2 },
  ],
};

export const $filteredSermons = computed(
  [$series, $preacher, $from, $to, $allSermonData, $sermonsSearchTerm],
  (series, preacher, from, to, allSermonData, sermonsSearchTerm) => {
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

    if (sermonsSearchTerm !== "" && sermonsSearchTerm !== undefined) {
      const fuse = new Fuse(sermonData, sermonSearchOptions);
      const result = fuse.search(sermonsSearchTerm);

      sermonData = result.map((hit) => hit.item);
    }

    return sermonData;
  },
);

// WRITINGS FILTERING
export const $writingsTag = atom<string | undefined>(undefined);
export const $writingsSearchTerm = atom<string>("");
export const $allWritingsData = atom<WritingsData[] | undefined>(undefined);

const writingsSearchOptions = {
  includeScore: true,
  ignoreLocation: true,
  includeMatches: true,
  keys: [
    { name: "data.title", weight: 0.7 },
    {
      name: "body",
      weight: 0.5,
    },
    { name: "data.tags", weight: 0.2 },
  ],
};

export const $filteredWritings = computed(
  [$writingsSearchTerm, $allWritingsData, $writingsTag],
  (writingSearchTerm, allWritingsData, writingsTag) => {
    if (!allWritingsData) return undefined;

    let writingsData = allWritingsData;

    if (writingsTag) {
      writingsData = writingsData.filter((item) =>
        item.data.tags?.includes(writingsTag),
      );
    }

    if (writingSearchTerm !== "" && writingSearchTerm !== undefined) {
      const fuse = new Fuse(writingsData, writingsSearchOptions);
      const result = fuse.search(writingSearchTerm);

      writingsData = result.map((hit) => hit.item);
    }

    return writingsData;
  },
);
