import type { InputOtpProps } from "@heroui/input-otp";

export type InputOtpCmProps = {
  onChangeCustom?: (value: string) => void;
} & InputOtpProps;
