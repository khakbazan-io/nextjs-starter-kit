"use client";
import { type FieldValues, FormProvider } from "react-hook-form";
import type { FormCmProps } from "./types";

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  ...props
}: FormCmProps<TFieldValues>) => {
  return (
    <FormProvider {...props}>
      <form
        className="contents"
        autoCorrect="off"
        autoComplete="off"
        onSubmit={(event) => {
          event?.preventDefault();
          onSubmit?.(event);
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
};
