"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { ControlledInputCmProps } from "./types";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { digitsFaToEn } from "@persian-tools/persian-tools";
import { useToggle } from "@/core/hooks";
import { Input } from "@/core/common";

export const ControlledPasswordInput: React.FC<ControlledInputCmProps> = ({
  name,
  ...props
}) => {
  const [showPassword, toggleShowPassword] = useToggle();
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          isInvalid={fieldState.invalid}
          errorMessage={fieldState?.error?.message}
          type={showPassword ? "text" : "password"}
          classNames={{
            input: "ltr",
          }}
          endContent={
            <div className="flex flex-col items-center justify-center h-full ">
              {showPassword ? (
                <TbEyeOff
                  onClick={() => toggleShowPassword(false)}
                  className="size-5 text-foreground-500 cursor-pointer"
                />
              ) : (
                <TbEye
                  onClick={() => toggleShowPassword(true)}
                  className="size-5 text-foreground-500 cursor-pointer"
                />
              )}
            </div>
          }
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
