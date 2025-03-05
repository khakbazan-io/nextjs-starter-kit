import type { PropsWithChildren } from "react";

export type StepperContextProps = {
  activeStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
  sharedData?: any;
  goNextStep: () => void;
  goPrevStep: () => void;
  goToStep: (step: number) => void;
};

export type StepperProps = PropsWithChildren<{
  sharedData?: any;
  startStep?: number;
  onStepChange?: (step: number) => void;
}>;

export type InternalStepProps = PropsWithChildren<{
  isActive: boolean;
}>;

export type StepProps = PropsWithChildren<{
  stepId: string;
  title: string;
}>;
