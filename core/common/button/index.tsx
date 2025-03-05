import { Button as LibButton } from "@heroui/button";
import type { ButtonCmProps } from "./types";

export const Button: React.FC<ButtonCmProps> = ({ children, ...props }) => {
  return <LibButton {...props}>{children}</LibButton>;
};
