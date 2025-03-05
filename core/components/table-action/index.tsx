"use client";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { TbDotsVertical } from "react-icons/tb";
import type { TableActionCmProps } from "./types";

export function TableAction<T extends string>({
  items,
  onAction,
  customTitles,
}: TableActionCmProps<T>) {
  return (
    <div>
      <Dropdown
        shadow="sm"
        radius="sm"
        className="p-0.5 shadow-none border border-foreground-200"
      >
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <TbDotsVertical size={22} className="text-foreground-500" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          items={items}
          onAction={(key) => {
            const selectedAction = key as T;

            onAction?.[selectedAction]?.();
          }}
          emptyContent="موردی یافت نشد"
        >
          {(item) => {
            return (
              <DropdownItem
                key={item.key}
                startContent={item.icon}
                href={item.href}
              >
                {customTitles && item.key in customTitles
                  ? customTitles?.[item?.key]
                  : item.title}
              </DropdownItem>
            );
          }}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
