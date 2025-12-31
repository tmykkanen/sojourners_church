import { useCallback } from "react";
import { CalendarDate } from "@internationalized/date";
import { useNanostoreURLSync } from "./useNanostoreURLSync";

type DateType = "from" | "to";

interface UseDateFilterResult {
  value: CalendarDate | null;
  otherValue: CalendarDate | null;
  setValue: (value: CalendarDate | null) => void;
  clamp: (
    value: CalendarDate | null,
    min: CalendarDate,
    max: CalendarDate,
    other?: CalendarDate | null,
  ) => void;
}

/**
 * Hook for a date filter synced with nanostore and URL
 */
export const useDateFilter = (type: DateType): UseDateFilterResult => {
  const { value, setValue } = useNanostoreURLSync<CalendarDate | null>(type);

  // Get the other date (for min/max clamping)
  const otherType: DateType = type === "from" ? "to" : "from";
  const { value: otherValue } = useNanostoreURLSync<CalendarDate | null>(
    otherType,
  );

  /**
   * Clamp the value between min/max and the other date
   */
  const clamp = useCallback(
    (
      val: CalendarDate | null,
      min: CalendarDate,
      max: CalendarDate,
      other?: CalendarDate | null,
    ) => {
      if (!val) return;

      let clamped = val;

      if (clamped < min) clamped = min;
      if (clamped > max) clamped = max;

      // Ensure "from" <= "to"
      if (type === "from" && other && clamped > other) clamped = other;
      if (type === "to" && other && clamped < other) clamped = other;

      setValue(clamped);
    },
    [setValue, type],
  );

  return { value, setValue, otherValue, clamp };
};
