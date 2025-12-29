import * as React from "react";
import type { PreacherData, SeriesData, SermonData } from "@/lib/types";
import { useStore } from "@nanostores/react";
import {
  $series,
  $preacher,
  $from,
  $to,
  $sermonsSearchTerm,
} from "@/lib/nanostores";
import { DatePickerCustom } from "@/components/Filters/DatePickerCustom";
import { Combobox } from "@/components/Filters/Combobox";
import { StyledText } from "../StyledText";
import { Settings2, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import Search from "./Search";
import { useState } from "react";

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
  const [isShowFilters, setIsShowFilters] = useState(false);

  const searchTerm = useStore($sermonsSearchTerm);
  const series = useStore($series);
  const preacher = useStore($preacher);
  const from = useStore($from);
  const to = useStore($to);

  const resetFilters = () => {
    $series.set(undefined);
    $preacher.set(undefined);
    $from.set(null);
    $to.set(null);
    $sermonsSearchTerm.set("");
    setIsShowFilters(false);
  };

  let titleText;

  if (searchTerm) {
    titleText = `Sermons matching ${searchTerm}`;
  } else if (series) {
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
    <div className="flex flex-col gap-4">
      <StyledText as="h2" variant="heading">
        {titleText}
      </StyledText>
      <div className="flex flex-col gap-4 md:flex-row">
        <Search className="bg-muted text-muted-foreground" type="sermons" />
        <div className="flex content-between justify-between self-end">
          <Button
            variant="link"
            onClick={() => setIsShowFilters(!isShowFilters)}
            className={isShowFilters ? "" : "text-muted-foreground"}
          >
            <Settings2 />
            {isShowFilters ? "Hide Filters" : "Show Filters"}
          </Button>
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
        </div>
      </div>

      {isShowFilters && (
        <div className="flex flex-col gap-x-8 gap-y-4 lg:grid lg:grid-cols-2">
          <Combobox data={allSeriesData} type="series" />
          <Combobox data={allPreachersData} type="preacher" />
          <DatePickerCustom data={allSermonData} type="from" />
          <DatePickerCustom data={allSermonData} type="to" />
        </div>
      )}
    </div>
  );
};

export { SermonFilter };
