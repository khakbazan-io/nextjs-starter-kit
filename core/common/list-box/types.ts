export type ListBoxCmProps<T extends string> = {
  onActions: Partial<Record<T, () => void>>;
  items: {
    key: T;
    label: string;
  }[];
};
