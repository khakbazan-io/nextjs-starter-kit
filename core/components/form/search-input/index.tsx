"use client";
import { TbSearch } from "react-icons/tb";
import type { SearchInputCmProps } from "./types";
import { digitsFaToEn } from "@persian-tools/persian-tools";
import { useDebounce } from "@/core/hooks";
import { Input } from "@/core/common";

export const SearchInput: React.FC<SearchInputCmProps> = ({
  onSearchAction,
  placeholder = "جستجو...",
}) => {
  const [searchValue, debouncedSearchValue, handleSearch] = useDebounce(
    "",
    500,
    (value) => onSearchAction(value),
  );

  return (
    <Input
      startContent={<TbSearch size={21} className="text-foreground-500" />}
      placeholder={placeholder}
      className="w-80 pb-4"
      classNames={{
        inputWrapper:
          "bg-content1 hover:!bg-content1 focus-within:!bg-content1 focus:!bg-content1 border border-divider focus-within:border-primary",
      }}
      value={searchValue}
      onChange={(event) => handleSearch(digitsFaToEn(event.target.value))}
    />
  );
};
