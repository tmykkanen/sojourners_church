import * as React from "react";
import { Input } from "./ui/input";
import { $searchTerm } from "@/lib/nanostores";
import { useStore } from "@nanostores/react";
import { Search, SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";

interface SermonSearchProps {}

const SermonSearch: React.FC<SermonSearchProps> = ({}) => {
  const searchTerm = useStore($searchTerm);

  // const debounced = useDebouncedCallback(handleInputChange(e);
  // }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $searchTerm.set(e.target.value);
  };

  return (
    <InputGroup className="bg-muted text-muted-foreground">
      <InputGroupInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search sermons..."
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SermonSearch;
