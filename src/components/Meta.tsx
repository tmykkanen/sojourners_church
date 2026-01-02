import * as React from "react";
import { format as datefnsFormat, type FormatDateOptions } from "date-fns";
import { Badge } from "@/components/ui/badge";
import formatOsis from "@/lib/Bible-Reference-Formatter/en";
import useIsMobile from "@/lib/hooks/useIsMobile";
import slugify from "slugify";

interface MetaProps {
  date?: Date;
  dateFormat?: "MM/dd/yy" | "LLLL do, yyyy";
  scripture?: string[];
  preacher?: string;
  series?: string;
  tags?: string[];
  variant?: "muted" | "outline";
  compact?: true | false | undefined;
  linked?: true | false;
}

const Meta: React.FC<MetaProps> = ({
  date,
  dateFormat = "MM/dd/yy",
  scripture,
  preacher,
  series,
  tags,
  variant = "muted",
  compact = undefined,
  linked = false,
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
  if (preacher) {
    linked
      ? metaItems.push(
          <a
            href={`/sermons/?preacher=${slugify(preacher, { strict: true }).toLowerCase()}`}
          >
            {preacher}
          </a>,
        )
      : metaItems.push(preacher);
  }
  if (series) {
    linked
      ? metaItems.push(
          <a
            href={`/sermons/?series=${slugify(series, { strict: true }).toLowerCase()}`}
          >
            {series}
          </a>,
        )
      : metaItems.push(series);
  }

  if (tags)
    linked
      ? tags.map((tag) =>
          metaItems.push(
            <a href={`/writings/?tag=${tag}`} className="not-prose">
              {tag}
            </a>,
          ),
        )
      : (metaItems = [...metaItems, ...tags]);

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
