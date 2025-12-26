// FIX: Clear not updating

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import type { ButtonProps, PopoverProps } from "react-aria-components";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
  CalendarDate,
  type DateValue,
} from "@internationalized/date";

import * as React from "react";
import type { SermonData } from "@/lib/types";
import { useStore } from "@nanostores/react";
import { $from, $to } from "@/lib/nanostores";
import { cn } from "@/lib/utils";

interface SermonFilterDatePickerProps {
  data: SermonData[];
  type: "from" | "to";
}

const SermonFilterDatePicker: React.FC<SermonFilterDatePickerProps> = ({
  type,
  data,
}) => {
  const min = getOldestSermonDate(data);
  const max = today(getLocalTimeZone());

  let label, store: DateValue | undefined | null, setStore: any;

  const from = useStore($from);
  const to = useStore($to);

  if (type === "from") {
    label = "From";
    store = useStore($from);
    setStore = (v: any) => $from.set(v);
  }

  if (type === "to") {
    label = "To";
    store = useStore($to);
    setStore = (v: any) => $to.set(v);
  }

  return (
    <DatePicker
      className="flex"
      minValue={type === "from" ? min : from ? from : min}
      maxValue={type === "to" ? max : to ? to : max}
      value={store}
      onChange={setStore}
      onBlur={() => {
        if (store && store < min)
          type === "from"
            ? setStore(min)
            : from
              ? setStore(from)
              : setStore(min);

        if (store && store > max)
          type === "to" ? setStore(max) : to ? setStore(to) : setStore(max);
      }}
    >
      <Label className="bg-muted border-muted-foreground/20 flex h-full min-w-24 flex-1/4 cursor-default items-center rounded-l-md border px-4 text-sm select-none sm:flex-1">
        {label}
      </Label>
      <Group
        className={cn(
          "bg-muted group-open:bg-secondary text-muted-foreground border-muted-foreground/20 ring-muted-foreground focus-visible:ring-primary flex flex-[65%] rounded-md rounded-l-none border pl-3 shadow-md transition focus-visible:ring-2",
          store && "text-foreground",
        )}
      >
        <DateInput className="flex flex-1 py-2">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="focus:ring-accent hover:bg-accent hover:text-accent-foreground rounded-xs px-0.5 text-sm tabular-nums caret-transparent outline-hidden placeholder-shown:italic focus:ring-2"
            />
          )}
        </DateInput>
        <Button
          className={cn(
            "pressed:bg-accent hover:bg-accent hover:text-accent-foreground border-l-muted-foreground/20 ring-primary text-muted-foreground flex items-center rounded-r-md border-0 bg-transparent px-3 outline-hidden transition focus-visible:ring-2",
            store && "text-foreground",
          )}
        >
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </Group>
      <MyPopover>
        <Dialog className="text-foreground bg-muted p-6">
          <Calendar>
            <header className="flex w-full items-center gap-1 px-1 pb-4">
              <Heading className="ml-2 flex-1" />
              <RoundButton slot="previous">
                <ChevronLeft />
              </RoundButton>
              <RoundButton slot="next">
                <ChevronRight />
              </RoundButton>
            </header>
            <CalendarGrid className="border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-muted-foreground text-xs font-semibold">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="outside-month:text-muted-foreground/50 selected:bg-foreground selected:text-background hover:border-primary disabled:text-muted-foreground/50 flex h-9 w-9 cursor-default items-center justify-center text-sm hover:border-2"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </MyPopover>
    </DatePicker>
  );
};

function RoundButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="pressed:bg-accent hover:bg-secondary hover:text-secondary-foreground text-muted-foreground ring-primary disabled:text-muted-foreground/50 flex h-9 w-9 cursor-default items-center justify-center rounded-full border-0 bg-transparent outline-hidden focus-visible:ring-1"
    />
  );
}

function MyPopover(props: PopoverProps) {
  return (
    <Popover
      {...props}
      className={({ isEntering, isExiting }) =>
        `overflow-auto rounded-md bg-transparent drop-shadow-lg ${
          isEntering
            ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 duration-200 ease-out"
            : ""
        } ${
          isExiting
            ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 duration-150 ease-in"
            : ""
        } `
      }
    />
  );
}

const getOldestSermonDate = (data: SermonData[]) => {
  // Sort sermons oldest to newest
  const sorted = data.toSorted(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf(),
  );

  const oldestDateObj = sorted[0].data.date;

  const oldestDateWithOffset = new Date(
    oldestDateObj.valueOf() + oldestDateObj.getTimezoneOffset() * 60 * 1000,
  );

  const oldestDateParsed = parseAbsoluteToLocal(
    oldestDateWithOffset.toISOString(),
  );

  return new CalendarDate(
    oldestDateParsed.year,
    oldestDateParsed.month,
    oldestDateParsed.day,
  );
};

export { SermonFilterDatePicker };
