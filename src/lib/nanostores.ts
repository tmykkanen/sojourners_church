import type { DateValue } from "@internationalized/date";
import { atom } from "nanostores";
import { $sermonFilterParams, isSermonFilterKey } from "@/lib/nanostoreSermons";
import {
  $writingsFilterParams,
  isWritingsFilterKey,
} from "./nanostoreWritings";

export const updateNanostore = (value: string, key: string) => {
  const normalizedValue = value === "" ? undefined : value;

  (isSermonFilterKey(key) &&
    $sermonFilterParams.setKey(key, normalizedValue)) ||
    (isWritingsFilterKey(key) &&
      $writingsFilterParams.setKey(key, normalizedValue));
};

// SERMON FILTERING
export const $from = atom<DateValue | null>(null);
export const $to = atom<DateValue | null>(null);
