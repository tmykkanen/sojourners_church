import { useEffect, type FC, type HTMLProps } from "react";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

import { useNanostoreURLSync } from "@/lib/hooks/useNanostoreURLSync";
import { useDebounce } from "@/lib/hooks/useDebounce";

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */
interface SearchProps {
  type: "sermons" | "writings";
}

/* -------------------------------------------------------------------------- */
/*                                Search Component                             */
/* -------------------------------------------------------------------------- */
const Search: FC<HTMLProps<HTMLDivElement> & SearchProps> = ({
  className,
  type,
}) => {
  // Determine the nanostore key based on type
  const storeKey =
    type === "sermons" ? "sermonSearchTerm" : "writingsSearchTerm";

  const { value: storeValue, setValue } = useNanostoreURLSync<string>(storeKey);

  // Debounce the store value to avoid too many updates
  const debouncedValue = useDebounce(storeValue ?? "", 500);

  // Sync debounced value back to Nanostore + URL
  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  const placeholder =
    type === "sermons" ? "Search sermons..." : "Search posts...";

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="text"
        value={storeValue ?? ""}
        onChange={(e) => {
          setValue(e.target.value);
        }}
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
