import { tv } from "tailwind-variants";
import type { TextElements } from "./types";

export const textVariants = tv(
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        auto: undefined,
      },
      leading: {
        none: "leading-none",
        normal: "leading-normal",
        tight: "leading-tight",
        snug: "leading-snug",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
      },
      color: {
        primary: "text-primary",
        foreground: "text-foreground-700",
        foreGroundLight: "text-foreground-600",
        foreGroundExtraLight: "text-foreground-500",
        success: "text-success",
        error: "text-danger",
        warning: "text-warning",
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },

    defaultVariants: {
      color: "foreground",
      size: "auto",
      leading: "normal",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
  },
);

export const autoSizes: Record<TextElements, string> = {
  p: "text-sm",
  span: "text-sm",
  a: "text-sm",
  strong: "text-sm sm:text-base",
  time: "text-sm",
  h1: "text-2xl md:text-3xl",
  h2: "text-xl md:text-2xl",
  h3: "text-lg md:text-xl",
  h4: "text-base md:text-lg",
  h5: "text-sm md:text-base",
  h6: "text-xs md:text-sm",
};
