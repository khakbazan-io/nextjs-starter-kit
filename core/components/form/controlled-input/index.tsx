"use client";
import { Controller, useFormContext } from "react-hook-form";
import type {
  ControlledInputCmProps,
  ControlledNumberInputCmProps,
} from "./types";
import { digitsFaToEn, numberToWords } from "@persian-tools/persian-tools";
import { Input, Text } from "@/core/common";

export const ControlledInput: React.FC<ControlledInputCmProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          isInvalid={fieldState.invalid}
          errorMessage={fieldState?.error?.message}
          {...field}
          onChange={(e) => {
            field.onChange(digitsFaToEn(e.target.value));
          }}
          {...props}
        />
      )}
    />
  );
};

export const ControlledNumberInput: React.FC<ControlledNumberInputCmProps> = ({
  name,
  showNumberToWordLabel,
  numberToWordLabelPrefix = "ریال",
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Input
            isInvalid={fieldState.invalid}
            errorMessage={fieldState?.error?.message}
            {...field}
            onChange={(e) => {
              const numberValue =
                e.target.value === ""
                  ? ""
                  : Number(digitsFaToEn(e.target.value));

              field.onChange(numberValue);
            }}
            inputMode="numeric"
            type="number"
            {...props}
          />
          {showNumberToWordLabel && field?.value && (
            <Text className="mt-1" size="xs" color="foreGroundLight">
              {typeof numberToWords(field.value) === "string"
                ? `${numberToWords(field.value)} ${numberToWordLabelPrefix}`
                : "عدد نامعتبر"}
            </Text>
          )}
        </div>
      )}
    />
  );
};
