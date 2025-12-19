import * as React from "react";
import { type SermonData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { StyledText } from "../StyledText";
import formatOsis from "@/lib/Bible-Reference-Formatter/en";

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
            className="h-full rounded-l-sm max-sm:flex-1/3"
          />
          <div className="xs:p-4 flex flex-2/3 flex-col justify-center p-2 sm:p-8">
            <StyledText as="h3" variant="subheading">
              {title}
            </StyledText>
            <StyledText as="span" variant="meta">
              {format(
                new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000),
                "LLLL dd, yyyy",
              )}
              <br />
              {scripture && scripture.map((ref) => formatOsis("esv-long", ref))}
              <br />
              {name}
            </StyledText>
          </div>
        </a>
      </CardContent>
    </Card>
  );
};

export { SermonCard };
