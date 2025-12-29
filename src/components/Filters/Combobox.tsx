import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $series, $preacher, $writingsTag } from "@/lib/nanostores";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  isPreacherCollection,
  isSeriesCollection,
  isStringArray,
  type PreacherData,
  type SeriesData,
} from "@/lib/types";
import { Label } from "../ui/label";

interface ComboboxProps {
  data: SeriesData[] | PreacherData[] | string[];
  type: "series" | "preacher" | "tag";
}

const Combobox: React.FC<ComboboxProps> = ({ data, type }) => {
  // Set variables according to type
  let label, store: string | undefined, placeholder, options;

  if (type === "series" && isSeriesCollection(data)) {
    label = "Series";
    store = useStore($series);
    placeholder = data.find((data) => data.id === store)?.data.title;
    options = data.map((item) => {
      return {
        label: item.data.title,
        key: item.id,
        value: item.id,
        handleSelect: (v: any) => {
          $series.set(v);
          setOpen(false);
        },
      };
    });
  } else if (type === "preacher" && isPreacherCollection(data)) {
    label = "Preacher";
    store = useStore($preacher);
    placeholder = data.find((data) => data.id === store)?.data.name;
    options = data.map((item) => {
      return {
        label: item.data.name,
        key: item.id,
        value: item.id,
        handleSelect: (v: any) => {
          $preacher.set(v);
          setOpen(false);
        },
      };
    });
  } else if (type === "tag" && isStringArray(data)) {
    label = "Tag";
    store = useStore($writingsTag);
    placeholder = store;
    options = data.map((item, index) => {
      return {
        label: item,
        key: index,
        value: item,
        handleSelect: (v: any) => {
          $writingsTag.set(v);
          setOpen(false);
        },
      };
    });
  }

  const [open, setOpen] = React.useState(false);

  return (
    <div className="inline-flex h-9 items-stretch">
      <Label
        htmlFor={label}
        className="bg-muted border-muted-content/20 flex h-full min-w-24 flex-1/4 items-center rounded-l-md border px-4 py-2 text-sm select-none sm:flex-1"
      >
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild id={label}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "bg-muted text-muted-foreground -ml-px flex-[65%] justify-between overflow-hidden rounded-l-none text-sm",
              store
                ? "text-foreground"
                : "text-muted-foreground font-normal italic",
            )}
          >
            {store ? placeholder : `Filter by ${type}`}

            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-2">
          <Command value={store}>
            <CommandInput placeholder={`Search ${type}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options?.map(({ key, value, handleSelect, label }) => (
                  <CommandItem
                    key={key}
                    value={value}
                    onSelect={handleSelect}
                    className="px-4"
                  >
                    {label}
                    <Check
                      className={cn(
                        "ml-auto",
                        store === value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { Combobox };
