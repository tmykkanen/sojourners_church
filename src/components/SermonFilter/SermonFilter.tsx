import * as React from "react";
import { SermonFilterSelect } from "./SermonFilterSelect";
import type { PreacherData, SeriesData, SermonData } from "@/lib/types";
import { useStore } from "@nanostores/react";
import { $series, $preacher, $from, $to } from "@/lib/nanostores";

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

  return (
    <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
      <SermonFilterSelect data={allSeriesData} type="series" />
      <SermonFilterSelect data={allPreachersData} type="preacher" />
    </div>
  );
};

export { SermonFilter };
