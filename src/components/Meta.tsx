import * as React from "react";
import { format as datefnsFormat, type FormatDateOptions } from "date-fns";
import { Badge } from "@/components/ui/badge";
import formatOsis from "@/lib/Bible-Reference-Formatter/en";
import useIsMobile from "@/lib/useIsMobile";

interface MetaProps {
  date?: Date;
  dateFormat?: "MM/dd/yy" | "LLLL do, yyyy";
  scripture?: string[];
  preacher?: string;
  tags?: string[];
  variant?: "muted" | "outline";
  compact?: true | false | undefined;
}

const Meta: React.FC<MetaProps> = ({
  date,
  dateFormat = "MM/dd/yy",
  scripture,
  preacher,
  tags,
  variant = "muted",
  compact = undefined,
}) => {
  const isMobile = useIsMobile();
  const isCompact = compact || (compact === undefined && isMobile);

  const formattedDate =
    date &&
    datefnsFormat(
      new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000),
      isCompact ? "MM/dd/yy" : "LLLL do, yyyy",
    );

  let metaItems = [];

  if (formattedDate) metaItems.push(formattedDate);
  if (scripture)
    scripture.forEach((ref) =>
      metaItems.push(formatOsis(isCompact ? "esv-short" : "esv-long", ref)),
    );
  if (preacher) metaItems.push(preacher);
  if (tags) metaItems = [...metaItems, ...tags];

  return (
    <div className="flex flex-wrap gap-2">
      {metaItems.map((item, index) => (
        <Badge
          variant={variant}
          className={variant === "outline" ? "text-muted-foreground" : ""}
          key={index}
        >
          {item}
        </Badge>
      ))}
    </div>
  );
};

export default Meta;
