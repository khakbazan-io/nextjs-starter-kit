import { User as LibUser } from "@heroui/user";
import type { UserCmProps } from "./types";

export const User: React.FC<UserCmProps> = ({ ...props }) => {
	return <LibUser {...props} />;
};
