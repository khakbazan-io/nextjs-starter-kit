"use client";
import { Text } from "@/core/common";
import type { UserRoles } from "@/types/users";
import { PropsWithChildren } from "react";
import { BsShieldFillExclamation } from "react-icons/bs";

type Props = PropsWithChildren<{
  visibleFor: Array<UserRoles | "NOBODY">;
  showDeniedMessage?: boolean;
}>;

export const AccessGaurd: React.FC<Props> = ({
  visibleFor,
  showDeniedMessage = false,
  children,
}) => {
  const user = {
    role: "user",
  };

  const haveRoleAccess = visibleFor.join(" ").includes(user?.role);

  if (!haveRoleAccess) {
    if (showDeniedMessage) {
      return (
        <div className="flex flex-col items-center justify-center gap-2">
          <BsShieldFillExclamation size={50} className="text-danger" />

          <Text color="error" size="xl" weight="bold">
            شما دسترسی لازم برای این صفحه را ندارید!
          </Text>
        </div>
      );
    }
    return null;
  }

  return children;
};
