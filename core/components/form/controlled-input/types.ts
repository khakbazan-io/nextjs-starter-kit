import type { InputCmProps } from "@/core/common";

export type ControlledInputCmProps = InputCmProps;

export type ControlledNumberInputCmProps = {
  showNumberToWordLabel?: boolean;
  numberToWordLabelPrefix?: string;
} & InputCmProps;
