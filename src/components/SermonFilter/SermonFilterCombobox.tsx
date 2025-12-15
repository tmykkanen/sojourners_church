import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $series, $preacher } from "@/lib/nanostores";

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
import { isSeries, type PreacherData, type SeriesData } from "@/lib/types";
import { Label } from "../ui/label";

interface SermonFilterComboboxProps {
  data: SeriesData[] | PreacherData[];
  type: "series" | "preacher";
}

const SermonFilterCombobox: React.FC<SermonFilterComboboxProps> = ({
  data,
  type,
}) => {
  // Set variables according to type
  let label, store: string | undefined;

  if (type === "series") {
    label = "Series";
    store = useStore($series);
  }
  if (type === "preacher") {
    label = "Preacher";
    store = useStore($preacher);
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
            {store
              ? isSeries(data)
                ? data.find((data) => data.id === store)?.data.title
                : data.find((data) => data.id === store)?.data.name
              : `Filter by ${type}`}

            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-2">
          <Command value={store}>
            <CommandInput placeholder={`Search ${type}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {isSeries(data)
                  ? data.map((option) => (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onSelect={(v) => {
                          $series.set(v);
                          setOpen(false);
                        }}
                        className="px-4"
                      >
                        {option.data.title}
                        <Check
                          className={cn(
                            "ml-auto",
                            store === option.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))
                  : data.map((option) => (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onSelect={(v) => {
                          $preacher.set(v);
                          setOpen(false);
                        }}
                        className="px-4"
                      >
                        {option.data.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            store === option.id ? "opacity-100" : "opacity-0",
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

export { SermonFilterCombobox };
