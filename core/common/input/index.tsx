import { Input as LibInput, Textarea as LibTextarea } from "@heroui/input";
import type { InputCmProps, TextareaCmProps } from "./types";

export const Input: React.FC<InputCmProps> = ({ ...props }) => {
  return (
    <LibInput
      radius="sm"
      classNames={{
        inputWrapper:
          "focus:!border-primary focus-within:!border-primary !border",
      }}
      {...props}
      autoComplete="off"
      autoCorrect="off"
    />
  );
};

export const Textarea: React.FC<TextareaCmProps> = ({ ...props }) => {
  return (
    <LibTextarea
      radius="sm"
      classNames={{
        inputWrapper:
          "focus:!border-primary focus-within:!border-primary !border",
      }}
      {...props}
    />
  );
};
