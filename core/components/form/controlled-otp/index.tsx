"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { ControlledOtpCmProps } from "./types";
import { digitsFaToEn } from "@persian-tools/persian-tools";
import { InputOtp } from "@heroui/input-otp";

export const ControlledOtp: React.FC<ControlledOtpCmProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <InputOtp
          isInvalid={fieldState.invalid}
          errorMessage={fieldState?.error?.message}
          {...field}
          onValueChange={(value) => {
            const numberValue = value === "" ? "" : Number(digitsFaToEn(value));

            field.onChange(numberValue);
          }}
          inputMode="numeric"
          type="number"
          {...props}
        />
      )}
    />
  );
};
