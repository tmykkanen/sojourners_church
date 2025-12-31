import type { DateValue } from "@internationalized/date";
import { atom } from "nanostores";
import { $sermonFilterParams, isSermonFilterKey } from "@/lib/nanostoreSermons";
import {
  $writingsFilterParams,
  isWritingsFilterKey,
} from "./nanostoreWritings";

export const isDateValue = (value: unknown): value is DateValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    "calendar" in value &&
    "year" in value &&
    "month" in value &&
    "day" in value
  );
};

export const updateNanostore = (value: any, key: string) => {
  const normalizedValue = value === "" || value === null ? undefined : value;

  (isSermonFilterKey(key) &&
    $sermonFilterParams.setKey(key, normalizedValue)) ||
    (isWritingsFilterKey(key) &&
      !isDateValue(normalizedValue) &&
      $writingsFilterParams.setKey(key, normalizedValue));
};

// SERMON FILTERING
export const $from = atom<DateValue | null>(null);
export const $to = atom<DateValue | null>(null);
