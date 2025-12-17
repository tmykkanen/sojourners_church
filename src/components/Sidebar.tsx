import * as React from "react";
import { Spin as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { NavMenu } from "./NavMenu.tsx";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Drawer open={isOpen} direction="right" onOpenChange={setIsOpen}>
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <DrawerTrigger className="pointer-events-auto z-100 lg:hidden">
          <Hamburger
            toggled={isOpen}
            color="var(--muted-foreground)"
            // onToggle={setIsOpen}
          />
        </DrawerTrigger>
        <DrawerContent className="pt-24 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-full">
          <NavMenu />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { Sidebar };
