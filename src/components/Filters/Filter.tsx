import { type FC, useEffect, useState } from "react";
import type {
  PreacherData,
  SeriesData,
  SermonData,
  WritingsData,
} from "@/lib/types";
import { useStore } from "@nanostores/react";
import {
  // $series,
  // $preacher,
  $from,
  $to,
  // $sermonsSearchTerm,
  // $writingsSearchTerm,
  updateNanostore,
  // $writingsTag,
} from "@/lib/nanostores";
import { $sermonFilterParams, isSermonFilterKey } from "@/lib/nanostoreSermons";
import {
  $writingsFilterParams,
  isWritingsFilterKey,
} from "@/lib/nanostoreWritings";

// Components / Assets
import { StyledText } from "@/components/StyledText";
import DatePickerCustom from "@/components/Filters/DatePickerCustom";
import Combobox from "@/components/Filters/Combobox";
import Search from "@/components/Filters/Search";
import { Button } from "@/components/ui/button";
import { Settings2, Undo2 } from "lucide-react";

interface FilterProps {
  allSermonData?: SermonData[];
  allSeriesData?: SeriesData[];
  allPreachersData?: PreacherData[];
  allWritings?: WritingsData[];
  allTags?: string[] | null;
}

const Filter: FC<FilterProps> = ({
  allSermonData,
  allSeriesData,
  allPreachersData,
  allWritings,
  allTags,
}) => {
  // const sermonsSearchTerm = useStore($sermonsSearchTerm);
  // const series = useStore($series);
  // const preacher = useStore($preacher);
  const from = useStore($from);
  const to = useStore($to);
  // const writingsSearchTerm = useStore($writingsSearchTerm);
  // const tag = useStore($writingsTag);
  const sermonFilterParams = useStore($sermonFilterParams);
  const writingsFilterParams = useStore($writingsFilterParams);
  const { series, preacher, searchTerm: sermonSearchTerm } = sermonFilterParams;
  const { tag, searchTerm: writingsSearchTerm } = writingsFilterParams;

  // Get URLparams & sync nanostore
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = new URL(window.location.href);
    params.forEach((value, key) => {
      // Clear empty query strings
      value ? updateNanostore(value, key) : url.searchParams.delete(key);
    });
    window.history.replaceState({}, "", url);
  }, []);

  // url.searchParams.set(storeKey, value);
  // window.history.replaceState({}, "", url);

  const hasActiveFilters = series || preacher || from || to || tag;

  const [isShowFilters, setIsShowFilters] = useState(false);

  useEffect(() => {
    if (hasActiveFilters) {
      setIsShowFilters(true);
    }
  }, [hasActiveFilters]);

  const resetFilters = () => {
    // $sermonsSearchTerm.set("");
    // $series.set(undefined);
    // $preacher.set(undefined);
    $from.set(null);
    $to.set(null);
    // $writingsSearchTerm.set("");
    // $writingsTag.set(undefined);
    $sermonFilterParams.set({});
    $writingsFilterParams.set({});
    setIsShowFilters(false);
    window.history.replaceState(
      {},
      "",
      window.location.pathname + window.location.hash,
    );
  };

  const type = allSermonData ? "sermons" : "writings";

  // Logic for titleText
  let titleText;
  if (writingsSearchTerm) {
    titleText = `Posts matching ${writingsSearchTerm}`;
  } else if (tag) {
    titleText = `Posts tagged with ${tag}`;
  } else if (allWritings) {
    titleText = "All Posts";
  } else if (sermonSearchTerm) {
    titleText = `Sermons matching ${sermonSearchTerm}`;
  } else if (series && allSeriesData) {
    titleText = `Sermons from ${allSeriesData.find((i) => i.id === series)?.data.title}`;
  } else if (preacher && allPreachersData) {
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
        <Search className="bg-muted text-muted-foreground" type={type} />
        <div className="flex content-between justify-between self-end">
          <Button
            variant="link"
            onClick={() => setIsShowFilters(!isShowFilters)}
            className={isShowFilters ? "" : "text-muted-foreground"}
          >
            <Settings2 />
            {isShowFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          {/*BUG FIX*/}
          {(Object.keys(sermonFilterParams).length > 0 ||
            Object.keys(writingsFilterParams).length > 0) && (
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
          {allSeriesData && <Combobox data={allSeriesData} type="series" />}
          {allPreachersData && (
            <Combobox data={allPreachersData} type="preacher" />
          )}
          {allSermonData && (
            <DatePickerCustom data={allSermonData} type="from" />
          )}
          {allSermonData && <DatePickerCustom data={allSermonData} type="to" />}
          {allTags && <Combobox data={allTags} type="tag" />}
        </div>
      )}
    </div>
  );
};

export default Filter;
