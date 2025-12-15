import type { DateValue } from "@internationalized/date";
import { atom, computed } from "nanostores";
import type { SermonData } from "./types";

export const $series = atom<string | undefined>(undefined);
export const $preacher = atom<string | undefined>(undefined);
export const $from = atom<DateValue | null>(null);
export const $to = atom<DateValue | null>(null);

export const $allSermonData = atom<SermonData[] | undefined>(undefined);

export const $filteredSermons = computed(
  [$series, $preacher, $from, $to, $allSermonData],
  (series, preacher, from, to, allSermonData) => {
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

    return sermonData;
  },
);
