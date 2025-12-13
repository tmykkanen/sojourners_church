import * as React from "react";
import { ButtonLink, type ButtonLinkProps } from "@/components/ButtonLink";

interface NavMenuProps {}

interface NavItem {
  label: string;
  href: ButtonLinkProps["href"];
  variant?: ButtonLinkProps["variant"];
}

const NavMenu: React.FC<React.ComponentProps<"ul">> = ({ ...props }) => {
  const navItems: NavItem[] = [
    { label: "About Us", href: "/about" },
    { label: "Life Together", href: "/life" },
    { label: "Sermons", href: "/sermons" },
    { label: "Writings", href: "/writings" },
    { label: "What is the Gospel?", href: "/gospel", variant: "secondary" },
  ];

  const navList = navItems.map(({ label, href, variant = "ghost" }, index) => (
    <li key={index}>
      <ButtonLink
        href={href}
        variant={variant}
        className="w-full text-xs tracking-widest uppercase sm:text-sm"
      >
        {label}
      </ButtonLink>
    </li>
  ));

  return <ul {...props}>{navList}</ul>;
};

export { NavMenu };
