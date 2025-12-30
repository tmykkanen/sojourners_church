import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { $sermonFilterParams, isSermonFilterKey } from "@/lib/nanostoreSermons";
import {
  $writingsFilterParams,
  isWritingsFilterKey,
} from "@/lib/nanostoreWritings";

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
import { useState } from "react";
import { updateNanostore } from "@/lib/nanostores";

type ComboboxProps =
  | {
      type: "series";
      data: SeriesData[];
    }
  | {
      type: "preacher";
      data: PreacherData[];
    }
  | {
      type: "tag";
      data: string[];
    };

const Combobox: React.FC<ComboboxProps> = ({ data: inputData, type }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamValue = urlParams.get(type);

  const [open, setOpen] = useState(false);

  // Set variables according to type
  let label, placeholder, options, storeKey: string;

  if (type === "series" && isSeriesCollection(inputData)) {
    label = "Series";
    storeKey = "series";
    placeholder = inputData.find((item) => item.id === urlParamValue)?.data
      .title;
    // updateNanostore = (v: any) => {
    //   $sermonFilterParams.setKey("series", v);
    // };
    options = inputData.map((item) => {
      return {
        label: item.data.title,
        key: item.id,
        value: item.id,
      };
    });
  } else if (type === "preacher" && isPreacherCollection(inputData)) {
    label = "Preacher";
    storeKey = "preacher";
    placeholder = inputData.find((item) => item.id === urlParamValue)?.data
      .name;
    // updateNanostore = (v: any) => {
    //   $sermonFilterParams.setKey("preacher", v);
    // };
    options = inputData.map((item) => {
      return {
        label: item.data.name,
        key: item.id,
        value: item.id,
      };
    });
  } else if (type === "tag" && isStringArray(inputData)) {
    label = "Tag";
    storeKey = "tag";
    placeholder = urlParamValue;
    // TODO
    // updateNanostore = (v: any) => {
    //   $writingsFilterParams.setKey("tag", v);
    // };
    options = inputData.map((item, index) => {
      return {
        label: item,
        key: index,
        value: item,
      };
    });
  }

  // const updateNanostore = (v: any, storeKey: any) => {
  //   (isSermonFilterKey(storeKey) && $sermonFilterParams.setKey(storeKey, v)) ||
  //     (isWritingsFilterKey(storeKey) &&
  //       $writingsFilterParams.setKey(storeKey, v));
  // };

  const handleSelect = (value: any) => {
    updateNanostore(value, storeKey);

    // update url
    const url = new URL(window.location.href);
    url.searchParams.set(storeKey, value);
    window.history.replaceState({}, "", url);

    // close select
    setOpen(false);
  };

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
              urlParamValue
                ? "text-foreground"
                : "text-muted-foreground font-normal italic",
            )}
          >
            {urlParamValue ? placeholder : `Filter by ${type}`}

            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-2">
          <Command>
            <CommandInput placeholder={`Search ${type}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options?.map(({ key, value, label }) => (
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
                        urlParamValue === value ? "opacity-100" : "opacity-0",
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

export default Combobox;
