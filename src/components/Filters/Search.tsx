import * as React from "react";
import { $sermonsSearchTerm, $writingsSearchTerm } from "@/lib/nanostores";
import { useStore } from "@nanostores/react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import type { HTMLProps } from "react";

interface SearchProps {
  type: "sermons" | "writings";
}

const Search: React.FC<HTMLProps<"div"> & SearchProps> = ({
  className,
  type,
}) => {
  let searchTerm, handleInputChange, placeholder;

  if (type === "sermons") {
    searchTerm = useStore($sermonsSearchTerm);
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      $sermonsSearchTerm.set(e.target.value);
    };
    placeholder = "Search sermons...";
  }

  if (type === "writings") {
    searchTerm = useStore($writingsSearchTerm);
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      $writingsSearchTerm.set(e.target.value);
    };
    placeholder = "Search posts...";
  }

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="placeholder:italic"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default Search;
