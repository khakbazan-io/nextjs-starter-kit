"use client";
import {
  Children,
  type ReactElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  InternalStepProps,
  StepProps,
  StepperContextProps,
  StepperProps,
} from "./types";
import clsx from "clsx";
import { Text } from "@/core/common";

const StepperContext = createContext<StepperContextProps>(
  {} as StepperContextProps,
);

const InternalStep: React.FC<InternalStepProps> = ({ children, isActive }) => {
  if (!isActive) {
    return null;
  }

  return <>{children}</>;
};

export const Step: React.FC<StepProps> = ({ stepId, title, children }) => {
  return <>{children}</>;
};

export function Stepper({
  startStep = 1,
  onStepChange,
  sharedData: data,
  children,
}: StepperProps) {
  const [activeStep, setActiveStep] = useState(startStep);

  const [sharedData, setSharedData] = useState<any | undefined>(undefined);

  const childrenArray = Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> =>
      isValidElement(child) && child.type === Step,
  );

  const totalSteps = childrenArray.length;

  const goNextStep = useCallback(() => {
    onStepChange?.(Math.min(activeStep + 1, totalSteps));

    setActiveStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps, onStepChange, activeStep]);

  const goPrevStep = useCallback(() => {
    onStepChange?.(Math.max(activeStep - 1, 1));

    setActiveStep((prev) => Math.max(prev - 1, 1));
  }, [onStepChange, activeStep]);

  const goToStep = useCallback(
    (step: number) => {
      setActiveStep(Math.max(0, Math.min(step, totalSteps - 1)));
    },
    [totalSteps],
  );

  useEffect(() => {
    if (data) {
      setSharedData(data);
    }
  }, [data]);

  return (
    <StepperContext.Provider
      value={{
        activeStep: activeStep,
        isFirstStep: activeStep === 0,
        isLastStep: activeStep === totalSteps - 1,
        totalSteps: childrenArray.length,
        sharedData,
        goNextStep,
        goPrevStep,
        goToStep,
      }}
    >
      <div className="w-full flex items-center gap-x-6 overflow-x-auto">
        {childrenArray.map((child, index) => (
          <div
            key={`stepper-stepps-${child.props.stepId}`}
            className={clsx(
              "flex items-center gap-x-2 pb-6",
              index !== totalSteps - 1 ? "w-full" : "w-auto",
            )}
          >
            <div className="flex items-center gap-x-2">
              <div
                className={clsx(
                  "flex items-center justify-center  size-8 rounded-full",
                  activeStep === index + 1 ? "bg-primary" : "bg-default-400/80",
                )}
              >
                <Text className="text-white mt-0.5" weight="normal">
                  {index + 1}
                </Text>
              </div>

              <Text
                weight="medium"
                className="whitespace-nowrap"
                color={activeStep === index + 1 ? "primary" : "foreground"}
              >
                {child.props.title}
              </Text>
            </div>

            {index !== totalSteps - 1 ? (
              <div className="w-full h-0.5 bg-divider" />
            ) : null}
          </div>
        ))}
      </div>

      {childrenArray?.map((child, index) => (
        <InternalStep
          key={child.props.stepId}
          isActive={index + 1 === activeStep}
        >
          {child.props.children}
        </InternalStep>
      ))}
    </StepperContext.Provider>
  );
}

export function useStepper<T = unknown>() {
  const context = useContext(StepperContext);

  if (!Object.keys(context ?? {}).length) {
    throw new Error("useStepper must be used within a Stepper");
  }

  return {
    ...context,
    sharedData: context?.sharedData as T,
  };
}
