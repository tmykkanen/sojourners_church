import * as React from "react";
import { Spin as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { NavMenu } from "./NavMenu.tsx";
import { navEntries } from "@/lib/nav.ts";
import { ButtonLink } from "./ButtonLink.tsx";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right" modal>
        <DrawerTrigger
          className="z-100 lg:hidden"
          aria-label="Open sidebar menu"
        >
          <Hamburger
            toggled={isOpen}
            color="var(--muted-foreground)"
            label="Button to open sidebar menu"
          />
        </DrawerTrigger>
        <DrawerOverlay className="bg-background" />
        <DrawerContent className="mt-24 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:border-none data-[vaul-drawer-direction=right]:sm:max-w-full">
          <div className="overflow-y-auto">
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
            <DrawerDescription className="sr-only">
              Navigation Menu
            </DrawerDescription>
            <nav className="flex flex-col items-center px-4">
              <ul className="flex flex-col gap-4">
                {navEntries.map(({ label, path, subMenu }, index) =>
                  subMenu ? (
                    <li
                      key={index}
                      className="text-primary h-auto text-3xl font-bold whitespace-normal uppercase sm:text-5xl"
                    >
                      {label}

                      <ul className="border-muted ml-4 flex flex-col gap-2 border-l-4">
                        {subMenu.map((subMenuItem, index) => (
                          <li key={index}>
                            <ButtonLink
                              href={`/${path}/${subMenuItem.path}`}
                              variant="link"
                              className="text-muted-foreground font-bold uppercase sm:text-xl"
                              aria-label={`Link to ${subMenuItem.label}`}
                            >
                              {subMenuItem.label}
                            </ButtonLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={index}>
                      <ButtonLink
                        href={`/${path}`}
                        variant="link"
                        className="h-auto text-3xl font-bold whitespace-normal uppercase sm:text-5xl"
                        aria-label={`Link to ${label}`}
                      >
                        {label}
                      </ButtonLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { Sidebar };
