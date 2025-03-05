"use client";
import { Pagination as LibPagination } from "@heroui/pagination";
import type { PaginationCmProps } from "./types";

export const Pagination: React.FC<PaginationCmProps> = ({ ...props }) => {
  if (props.total <= 1) {
    return null;
  }

  return (
    <div className="flex w-full justify-center">
      <LibPagination
        isCompact
        showControls
        showShadow
        radius="sm"
        size="lg"
        classNames={{
          chevronNext: "rotate-0",
          prev: "chevron-prev-custom",
        }}
        {...props}
        page={props?.page ? props?.page + 1 : undefined}
      />
    </div>
  );
};
