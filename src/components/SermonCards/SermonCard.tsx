import * as React from "react";
import { type SermonData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { StyledText } from "../StyledText";
import Meta from "@/components/Meta";

interface SermonCardProps {
  baseUrl: string;
  sermon: SermonData;
}

const SermonCard: React.FC<SermonCardProps> = ({ baseUrl, sermon }) => {
  const {
    id,
    data: { title, date, scripture },
    series: {
      data: { imageSquare },
    },
    preacher: {
      data: { name },
    },
  } = sermon;

  return (
    <Card className="bg-muted rounded-sm border-none py-0 shadow-sm">
      <CardContent className="flex flex-row p-0">
        <a href={`${baseUrl}${id}`} className="flex max-h-48 w-full flex-row">
          <img
            src={imageSquare}
            alt="series"
            className="my-4 ml-4 h-20 self-center rounded-sm md:m-0 md:h-full md:rounded-none md:rounded-l-sm"
          />
          <div className="flex flex-2/3 flex-col justify-center gap-2 p-4 md:p-8">
            <StyledText as="h3" variant="subheading">
              {title}
            </StyledText>
            <Meta
              date={date}
              scripture={scripture}
              preacher={name}
              variant="outline"
            />
          </div>
        </a>
      </CardContent>
    </Card>
  );
};

export { SermonCard };
