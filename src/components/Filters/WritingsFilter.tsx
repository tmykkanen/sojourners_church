import { useState, type FC } from "react";
import type { WritingsData } from "@/lib/types";
import Search from "@/components/Filters/Search";
import { $writingsSearchTerm } from "@/lib/nanostores";
import { useStore } from "@nanostores/react";
import { StyledText } from "@/components/StyledText";
import { Button } from "@/components/ui/button";
import { Settings2, Undo2 } from "lucide-react";
import { Combobox } from "@/components/Filters/Combobox";
import { $writingsTag } from "@/lib/nanostores";

interface WritingsFilterProps {
  allWritings: WritingsData[];
  allTags?: string[] | null;
}

const WritingsFilter: FC<WritingsFilterProps> = ({ allWritings, allTags }) => {
  const [isShowFilters, setIsShowFilters] = useState(false);

  const searchTerm = useStore($writingsSearchTerm);
  const tag = useStore($writingsTag);

  const resetFilters = () => {
    $writingsTag.set(undefined);
    $writingsSearchTerm.set("");
    setIsShowFilters(false);
  };

  console.log(allTags);

  return (
    <div className="flex flex-col gap-4">
      <StyledText as="h2" variant="heading">
        {tag
          ? `Posts tagged ${tag}`
          : searchTerm
            ? `Posts matching ${searchTerm}`
            : `All posts`}
      </StyledText>
      <div className="flex flex-col gap-4 md:flex-row">
        <Search className="bg-muted text-muted-foreground" type="writings" />
        {allTags && allTags.length > 0 && (
          <div className="flex content-between justify-between self-end">
            <Button
              variant="link"
              onClick={() => setIsShowFilters(!isShowFilters)}
              className={isShowFilters ? "" : "text-muted-foreground"}
            >
              <Settings2 />
              {isShowFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            {tag && (
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
        )}
      </div>
      {isShowFilters && allTags && (
        <div className="flex flex-col gap-x-8 gap-y-4 lg:grid lg:grid-cols-2">
          <Combobox data={allTags} type="tag" />
        </div>
      )}
    </div>
  );
};

export default WritingsFilter;
