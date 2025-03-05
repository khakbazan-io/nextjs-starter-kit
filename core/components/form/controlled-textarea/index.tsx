"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { ControlledTextareaCmProps } from "./types";
import { Textarea } from "@/core/common";

export const ControlledTextarea: React.FC<ControlledTextareaCmProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <Textarea
          isInvalid={fieldState.invalid}
          errorMessage={fieldState?.error?.message}
          {...field}
          {...props}
        />
      )}
    />
  );
};
