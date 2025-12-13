import type { DateValue } from "@internationalized/date";
import { atom, computed } from "nanostores";
import type { SermonData } from "./types";
// import { getAllSermonData } from "./posts";

export const $series = atom<string | undefined>(undefined);
export const $preacher = atom<string | undefined>(undefined);
export const $from = atom<DateValue | undefined>(undefined);
export const $to = atom<DateValue | undefined>(undefined);

export const $allSermonData = atom<SermonData[] | undefined>(undefined);

// const allSermonData = await getAllSermonData();

export const $filteredSermons = computed(
  [$series, $preacher, $allSermonData],
  (series, preacher, allSermonData) => {
    if (!allSermonData) return undefined;

    let sermonData = allSermonData;

    if (series) {
      sermonData = sermonData.filter((item) => item.series.id === series);
    }

    if (preacher) {
      sermonData = sermonData.filter((item) => item.preacher.id === preacher);
    }

    return sermonData;
  },
);
