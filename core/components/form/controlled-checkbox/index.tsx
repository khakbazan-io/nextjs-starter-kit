"use client";
import { Checkbox } from "@heroui/checkbox";
import { Controller, useFormContext } from "react-hook-form";
import type { ControlledCheckboxCmProps } from "./types";

export const ControlledCheckbox: React.FC<ControlledCheckboxCmProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...field}
          classNames={{
            label: "text-foreground-600 text-sm",
          }}
          {...props}
        >
          {label}
        </Checkbox>
      )}
    />
  );
};
