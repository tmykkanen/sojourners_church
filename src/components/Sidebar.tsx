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
        <DrawerTrigger className="z-100 lg:hidden">
          <Hamburger toggled={isOpen} color="var(--muted-foreground)" />
        </DrawerTrigger>
        <DrawerOverlay className="bg-background" />
        <DrawerContent className="mt-24 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:border-none data-[vaul-drawer-direction=right]:sm:max-w-full">
          <DrawerTitle className="sr-only">Menu</DrawerTitle>
          <DrawerDescription className="sr-only">
            Navigation Menu
          </DrawerDescription>
          <nav className="flex flex-col items-center px-4">
            <ul className="flex flex-col gap-4">
              {navEntries.map(({ label, path, subMenu, order }, index) =>
                subMenu ? (
                  <li key={index}>
                    <ButtonLink
                      href="#"
                      variant="link"
                      className="h-auto text-4xl font-bold whitespace-normal uppercase sm:text-5xl"
                    >
                      {label}
                    </ButtonLink>
                    <ul className="border-muted ml-4 flex flex-col gap-2 border-l-4">
                      {subMenu.map((subMenuItem, index) => (
                        <li key={index}>
                          <ButtonLink
                            href={`/${path}/${subMenuItem.path}`}
                            variant="link"
                            className="text-muted-foreground text-lg font-bold uppercase sm:text-xl"
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
                      className="h-auto text-4xl font-bold whitespace-normal uppercase sm:text-5xl"
                    >
                      {label}
                    </ButtonLink>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { Sidebar };
