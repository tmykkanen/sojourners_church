import * as React from "react";
import { CardCustom } from "./CardCustom";
import {
  isSermonCollection,
  isWritingsCollection,
  type SermonData,
  type WritingsData,
} from "@/lib/types";
import { useStore } from "@nanostores/react";
import {
  $allSermonData,
  $filteredSermons,
  $allWritingsData,
  $filteredWritings,
} from "@/lib/nanostores";

interface CardDisplayProps {
  data: SermonData[] | WritingsData[];
}

const CardDisplay: React.FC<CardDisplayProps> = ({ data }) => {
  let filteredPosts, baseUrl: string;

  if (isSermonCollection(data)) {
    $allSermonData.set(data);
    filteredPosts = useStore($filteredSermons);
    baseUrl = "/sermons/";
  }

  if (isWritingsCollection(data)) {
    $allWritingsData.set(data);
    filteredPosts = useStore($filteredWritings);
    baseUrl = "/writings/";
  }

  return (
    <div className="flex flex-col gap-8 pt-8 lg:grid lg:grid-cols-2">
      {filteredPosts?.map((item) => (
        <CardCustom key={item.id} baseUrl={baseUrl} data={item} />
      ))}
    </div>
  );
};

export { CardDisplay };
