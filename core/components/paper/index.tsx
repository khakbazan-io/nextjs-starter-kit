"use client";
import { Text } from "@/core/common";
import { Box } from "../box";
import type { PaperCmProps, PaperGroupCmProps, PaperRowCmProps } from "./types";
import { Skeleton } from "@heroui/skeleton";

export const Paper: React.FC<PaperCmProps> = ({
  addon,
  hint,
  title,
  isLoading,
  bordered = true,
  children,
}) => {
  if (isLoading) {
    return (
      <Box isBordered={bordered} className="space-y-3.5">
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md" />
      </Box>
    );
  }

  return (
    <Box isBordered={bordered} hint={hint} title={title} titleAddon={addon}>
      {children}
    </Box>
  );
};

export const PaperRow: React.FC<PaperRowCmProps> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between border-b border-b-divider last:border-none last:pb-0 first:pt-0  first:mt-0 last:mb-0 pt-3 pb-3">
      <Text weight="medium" color="foreGroundExtraLight">
        {title}:
      </Text>

      <div>{children}</div>
    </div>
  );
};

export const PaperGroup: React.FC<PaperGroupCmProps> = ({
  title,
  children,
}) => {
  return (
    <div className="pt-2 border-b border-b-divider pb-2 mb-3">
      <Text weight="bold" size="base" color="foreGroundLight">
        {title}
      </Text>

      <div className="pt-2">{children}</div>
    </div>
  );
};
