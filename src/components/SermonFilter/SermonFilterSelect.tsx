import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type PreacherData, type SeriesData, isSeries } from "@/lib/types";
import { useStore } from "@nanostores/react";
import { $series, $preacher } from "@/lib/nanostores";

interface SermonFilterSelectProps {
  data: SeriesData[] | PreacherData[];
  type: "series" | "preacher";
}

const SermonFilterSelect: React.FC<SermonFilterSelectProps> = ({
  data,
  type,
}) => {
  // Set variables according to type
  let label, store, setStore;

  if (type === "series") {
    label = "Series";
    store = useStore($series);
    setStore = (v: string | undefined) => $series.set(v);
  }
  if (type === "preacher") {
    label = "Preacher";
    store = useStore($preacher);
    setStore = (v: string | undefined) => $preacher.set(v);
  }

  return (
    <div className="inline-flex items-stretch">
      <p className="bg-muted border-muted-content/20 flex h-full min-w-24 flex-1/4 items-center rounded-l-md border px-4 py-2 text-sm select-none sm:flex-1">
        {label}
      </p>
      <Select value={store ? store : ""} onValueChange={setStore}>
        <SelectTrigger className="bg-muted data-placeholder:text-muted-foreground -ml-px flex-[65%] overflow-hidden rounded-l-none px-4 py-2 text-sm data-[size=default]:h-full">
          <SelectValue placeholder={`Filter by ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {isSeries(data)
              ? data.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.data.title}
                  </SelectItem>
                ))
              : data.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.data.name}
                  </SelectItem>
                ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export { SermonFilterSelect };
