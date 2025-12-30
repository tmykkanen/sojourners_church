import * as React from "react";
import { updateNanostore } from "@/lib/nanostores";
import { useStore } from "@nanostores/react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import type { HTMLProps } from "react";
import { $sermonFilterParams } from "@/lib/nanostoreSermons";
import { $writingsFilterParams } from "@/lib/nanostoreWritings";

interface SearchProps {
  type: "sermons" | "writings";
}

const Search: React.FC<HTMLProps<"div"> & SearchProps> = ({
  className,
  type,
}) => {
  let searchTerm, placeholder, storeKey: string;

  if (type === "sermons") {
    searchTerm = useStore($sermonFilterParams).searchTerm;
    placeholder = "Search sermons...";
    storeKey = "searchTerm";
  }

  if (type === "writings") {
    searchTerm = useStore($writingsFilterParams).searchTerm;
    placeholder = "Search posts...";
    storeKey = "searchTerm";
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const url = new URL(window.location.href);

    // Clear empty query strings
    value
      ? url.searchParams.set(storeKey, value)
      : url.searchParams.delete(storeKey);
    window.history.replaceState({}, "", url);

    updateNanostore(value, storeKey);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="text"
        value={searchTerm ?? ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="placeholder:text-muted-foreground text-foreground placeholder:italic"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default Search;
