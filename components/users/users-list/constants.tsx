import type { TableActionItem } from "@/core/components/table-action/types";
import { TbEdit } from "react-icons/tb";

export const usersTableActions: TableActionItem<"edit">[] = [
  {
    key: "edit",
    title: "ویرایش",
    icon: <TbEdit size={16} />,
  },
];
