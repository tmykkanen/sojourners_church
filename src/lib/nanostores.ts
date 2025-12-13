import type { DateValue } from "@internationalized/date";
import { atom } from "nanostores";

export const $series = atom<string | undefined>(undefined);
export const $preacher = atom<string | undefined>(undefined);
export const $from = atom<DateValue | undefined>(undefined);
export const $to = atom<DateValue | undefined>(undefined);
