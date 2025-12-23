import config from "@/_site-config.json";
import slugify from "slugify";

export interface NavEntry {
  label: string;
  order: number | null;
  path: string;
  subMenu?: NavEntry[];
}

const prepNavEntry = (item: any): NavEntry => {
  return item.subMenu
    ? {
        label: item.title,
        order: item.order || null,
        path: slugify(item.title, { lower: true, strict: true }),
        subMenu: item.subMenu.map((subItem: any) => prepNavEntry(subItem)),
      }
    : {
        label: item.title,
        order: item.order || "",
        path: slugify(item.title, { lower: true, strict: true }),
      };
};

export const navEntries: NavEntry[] = config.menu.map((item) =>
  prepNavEntry(item),
);
