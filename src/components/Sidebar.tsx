import * as React from "react";
import { Spin as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { NavMenu } from "./NavMenu.tsx";
import { set } from "astro/zod";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerTrigger className="z-100 lg:hidden">
          <Hamburger toggled={isOpen} color="var(--muted-foreground)" />
        </DrawerTrigger>
        <DrawerOverlay className="bg-background" />
        <DrawerContent className="mt-24 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:border-none data-[vaul-drawer-direction=right]:sm:max-w-full">
          <DrawerTitle className="sr-only">Menu</DrawerTitle>
          <NavMenu />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { Sidebar };
