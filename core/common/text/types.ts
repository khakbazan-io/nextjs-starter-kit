import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactNode,
} from "react";

export type TextElements =
  | "p"
  | "span"
  | "strong"
  | "time"
  | "a"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type TextColors =
  | "primary"
  | "foreground"
  | "foreGroundLight"
  | "foreGroundExtraLight"
  | "success"
  | "error"
  | "warning";

export type TextWeights =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TextSizes =
  | "auto"
  | "xs"
  | "sm"
  | "md"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

type Breakpoints = "initial" | "sm" | "md" | "lg" | "xl" | "2xl";

export type TextAlign = "left" | "center" | "right";

export type TextLeadings =
  | "none"
  | "normal"
  | "tight"
  | "snug"
  | "relaxed"
  | "loose";

export type TextCmProps<E extends TextElements = "p"> = PropsWithChildren<
  {
    as?: E;
    color?: TextColors;
    weight?: TextWeights;
    align?: TextAlign;
    size?: TextSizes | Partial<Record<Breakpoints, TextSizes>>;
    leading?: TextLeadings;
    endContent?: ReactNode;
    startContent?: ReactNode;
  } & Omit<ComponentPropsWithoutRef<E>, "as">
>;
