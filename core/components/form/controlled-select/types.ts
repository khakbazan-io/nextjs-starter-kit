import type { FieldValues, Path } from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string;
};

export type ControlledSelectCmProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  options: SelectOption[];
  label: string;
  onSearch?: (value: string) => void;
  offlineSearch?: boolean;
  isLoading?: boolean;
  emptyStateMessage?: string;
  onAfterSelect?: (value: SelectOption) => void;
  isSearchAble?: boolean;
  size?: "sm" | "md" | "lg";
};
