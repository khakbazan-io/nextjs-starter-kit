"use client";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, useFormContext } from "react-hook-form";
import "react-multi-date-picker/styles/colors/teal.css";
import type { ControlledDatePickerCmProps } from "./types";
import { Input } from "@/core/common";

export const ControlledDatePicker: React.FC<ControlledDatePickerCmProps> = ({
  label,
  name,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <>
          <DatePicker
            render={
              <Input
                isInvalid={fieldState.invalid}
                errorMessage={fieldState?.error?.message}
                variant="bordered"
                size="md"
                label={label}
                type="text"
                inputMode="text"
              />
            }
            className="w-full !shadow-none border border-divider teal"
            containerClassName="w-full"
            containerStyle={{
              accentColor: "ThreeDFace",
            }}
            value={field.value || ""}
            onChange={(date) => {
              field.onChange(date?.isValid ? date?.toDate().toISOString() : "");
            }}
            format={"YYYY/MM/DD"}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            inputMode="text"
          />
        </>
      )}
    />
  );
};
