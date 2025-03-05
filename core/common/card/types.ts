import type { CardFooterProps, CardProps } from "@heroui/card";
import type { HTMLHeroUIProps } from "@heroui/system";
import type { PropsWithChildren } from "react";

export type CardCmProps = PropsWithChildren<CardProps>;

export type CardHeaderCmProps = PropsWithChildren<
  HTMLHeroUIProps<"div", never>
>;

export type CardBodyCmProps = PropsWithChildren<HTMLHeroUIProps<"div", never>>;

export type CardFooterCmProps = PropsWithChildren<CardFooterProps>;
