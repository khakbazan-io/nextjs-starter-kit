import { Chip as LibChip } from "@heroui/chip";
import type { ChipCmProps } from "./types";

export const Chip: React.FC<ChipCmProps> = ({ children, ...props }) => {
	return <LibChip {...props}>{children}</LibChip>;
};
