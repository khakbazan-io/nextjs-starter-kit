import { Listbox as LibListBox, ListboxItem } from "@heroui/listbox";
import { useCallback } from "react";
import type { ListBoxCmProps } from "./types";

/**
 * A flexible and interactive ListBox component that displays a list of items
 * and allows for customizable actions associated with each item. It can be
 * used with various menu items and supports specific actions based on item keys.
 *
 * @template T - The type of items in the list.
 * @param {Array<T>} props.items - The list of items to display in the ListBox.
 * Each item should have a `key` and `label`.
 * @param {Object<string, Function>} props.onActions - An object containing callback
 * functions for each possible action. Keys should correspond to item keys, e.g., "view"
 * or "rename", and values should be functions to execute the action.
 *
 * @example
 * // Usage example
 * type ItemKeys = "view" | "rename";
 *
 * type Items = {
 *  key: ItemKeys;
 *  label: string;
 * }[];
 *
 *
 * const items: Items = [
 * { key: "view", label: "View" },
 *  { key: "rename", label: "Rename" },
 * ];
 *
 * <ListBox
 *   items={items}
 *   onActions={{
 *   }}
 * />
 */
export function ListBox<T extends string>({
  onActions,
  items,
}: ListBoxCmProps<T>) {
  const onAction = useCallback(
    (key: T) => {
      onActions?.[key]?.();
    },
    [onActions]
  );

  return (
    <LibListBox items={items} onAction={(key) => onAction(key as T)}>
      {(item) => (
        <ListboxItem
          key={item.key}
          color={item.key === "delete" ? "danger" : "default"}
          className={item.key === "delete" ? "text-danger" : ""}
        >
          {item.label}
        </ListboxItem>
      )}
    </LibListBox>
  );
}
