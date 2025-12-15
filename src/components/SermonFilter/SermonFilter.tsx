import * as React from "react";
import type { PreacherData, SeriesData, SermonData } from "@/lib/types";
import { useStore } from "@nanostores/react";
import { $series, $preacher, $from, $to } from "@/lib/nanostores";
import { SermonFilterDatePicker } from "./SermonFilterDatePicker";
import { SermonFilterCombobox } from "./SermonFilterCombobox";
import { StyledText } from "../StyledText";
import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";

// TODO: Consider converting to API endpoint rather than passing data?
interface SermonFilterProps {
  allSermonData: SermonData[];
  allSeriesData: SeriesData[];
  allPreachersData: PreacherData[];
}

const SermonFilter: React.FC<SermonFilterProps> = ({
  allSermonData,
  allSeriesData,
  allPreachersData,
}) => {
  const series = useStore($series);
  const preacher = useStore($preacher);
  const from = useStore($from);
  const to = useStore($to);

  const resetFilters = () => {
    $series.set(undefined);
    $preacher.set(undefined);
    $from.set(null);
    $to.set(null);
  };

  let titleText;

  if (series) {
    titleText = `Sermons from ${allSeriesData.find((i) => i.id === series)?.data.title}`;
  } else if (preacher) {
    titleText = `Sermons by ${allPreachersData.find((i) => i.id === preacher)?.data.name}`;
  } else if (to && from) {
    titleText = `Sermons between ${from.toString()} and ${to.toString()}`;
  } else if (from) {
    titleText = `Sermons after ${from.toString()}`;
  } else if (to) {
    titleText = `Sermons before ${to.toString()}`;
  } else {
    titleText = "All Sermons";
  }

  return (
    <>
      <StyledText as="h2" variant="heading">
        {titleText}
      </StyledText>
      {(series || preacher || from || to) && (
        <Button
          variant="link"
          className="flex w-fit cursor-pointer items-center gap-1 px-0 py-0"
          onClick={resetFilters}
        >
          Reset Filters
          <Undo2 />
        </Button>
      )}

      <div className="flex flex-col gap-x-8 gap-y-4 lg:grid lg:grid-cols-2">
        <SermonFilterCombobox data={allSeriesData} type="series" />
        <SermonFilterCombobox data={allPreachersData} type="preacher" />
        <SermonFilterDatePicker data={allSermonData} type="from" />
        <SermonFilterDatePicker data={allSermonData} type="to" />
      </div>
    </>
  );
};

export { SermonFilter };
