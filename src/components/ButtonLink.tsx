import { Button } from "./ui/button";
import * as React from "react";

type BaseButtonProps = Parameters<typeof Button>[0];
type ButtonProps = Omit<BaseButtonProps, "asChild">;

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Button asChild {...props}>
      <a href={href}>{children}</a>
    </Button>
  );
};

export { ButtonLink, type ButtonLinkProps };
