import { InputOtp as LibInputOtp } from "@heroui/input-otp";
import type { InputOtpCmProps } from "./types";

export const InputOtp: React.FC<InputOtpCmProps> = ({
  onChangeCustom,
  ...props
}) => {
  return <LibInputOtp {...props} autoComplete="off" autoCorrect="off" />;
};
