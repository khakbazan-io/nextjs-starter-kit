import { Divider as LibDivider } from "@heroui/divider";
import type { DividerCmProps } from "./types";

export const Divider: React.FC<DividerCmProps> = ({ ...props }) => {
  return <LibDivider {...props} />;
};
