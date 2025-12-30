import { map, computed, atom } from "nanostores";
import type { WritingsData } from "@/lib/types";
import Fuse from "fuse.js";

export interface WritingsFilterParamsValue {
  tag?: string;
  searchTerm?: string;
}

export const isWritingsFilterKey = (
  key: string,
): key is keyof WritingsFilterParamsValue => {
  return ["tag", "searchTerm"].includes(key);
};

export const $writingsFilterParams = map<WritingsFilterParamsValue>({});
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
  [$writingsFilterParams, $allWritingsData],
  ({ tag, searchTerm }, allWritingsData) => {
    if (!allWritingsData) return undefined;

    let writingsData = allWritingsData;

    if (tag) {
      writingsData = writingsData.filter((item) =>
        item.data.tags?.includes(tag),
      );
    }

    if (searchTerm !== "" && searchTerm !== undefined) {
      const fuse = new Fuse(writingsData, writingsSearchOptions);
      const result = fuse.search(searchTerm);

      writingsData = result.map((hit) => hit.item);
    }

    return writingsData;
  },
);
