import { map, computed, atom } from "nanostores";
import type { DateValue } from "@internationalized/date";
import type { SermonData } from "@/lib/types";
import Fuse from "fuse.js";

export interface SermonFilterParamsValue {
  series?: string;
  preacher?: string;
  // TODO: Does from need to have a null option?
  from?: DateValue;
  to?: DateValue;
  searchTerm?: string;
}

export const isSermonFilterKey = (
  key: string,
): key is keyof SermonFilterParamsValue => {
  // NOTE: Be sure to update this array if changing SermonFilterParamsValue interface
  return ["series", "preacher", "from", "to", "searchTerm"].includes(key);
};

export const $sermonFilterParams = map<SermonFilterParamsValue>({});
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
  [$sermonFilterParams, $allSermonData],
  ({ series, preacher, from, to, searchTerm }, allSermonData) => {
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
      const fuse = new Fuse(sermonData, sermonSearchOptions);
      const result = fuse.search(searchTerm);

      sermonData = result.map((hit) => hit.item);
    }

    return sermonData;
  },
);
