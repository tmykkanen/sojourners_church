import * as React from "react";
import { SermonCard } from "./SermonCard";
import { type SermonData } from "@/lib/types";
// import { $filteredSermons } from "@/lib/nanostores";
import { useStore } from "@nanostores/react";
import { $allSermonData, $filteredSermons } from "@/lib/nanostores";

interface SermonCardDisplayProps {
  allSermonData: SermonData[];
}

const SermonCardDisplay: React.FC<SermonCardDisplayProps> = ({
  allSermonData,
}) => {
  $allSermonData.set(allSermonData);
  const filteredSermons = useStore($filteredSermons);

  return (
    <div className="flex flex-col gap-8 pt-8 lg:grid lg:grid-cols-2">
      {filteredSermons?.map((sermon) => (
        <SermonCard key={sermon.id} baseUrl="/sermons/" sermon={sermon} />
      ))}
    </div>
  );
};

export { SermonCardDisplay };
