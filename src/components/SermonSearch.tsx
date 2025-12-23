import * as React from "react";
import { $searchTerm } from "@/lib/nanostores";
import { useStore } from "@nanostores/react";
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import type { HTMLProps } from "react";

interface SermonSearchProps {}

const SermonSearch: React.FC<HTMLProps<"div">> = ({ className }) => {
  const searchTerm = useStore($searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $searchTerm.set(e.target.value);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search sermons..."
        className="placeholder:italic"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SermonSearch;
