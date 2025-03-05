"use client";
import clsx from "clsx";
import { createElement } from "react";
import type { TextCmProps, TextElements } from "./types";
import { autoSizes, textVariants } from "./constants";

/**
 * A versatile and customizable text component that supports various HTML elements
 * and styling options such as color, weight, size, alignment, and leading.
 *
 * @template E - The type of HTML element to render, defaults to "p".
 * @param {Object} props - The properties to customize the Text component.
 * @param {E} [props.as="p"] - The HTML element to render, e.g., "p", "span", "h1", etc.
 * @param {string} [props.color] - The text color.
 * @param {string} [props.weight] - The font weight of the text.
 * @param {string} [props.size="auto"] - The size of the text, or "auto" for responsive sizing.
 * @param {React.ReactNode} [props.endContent] - Content to render at the end, such as an icon.
 * @param {React.ReactNode} [props.startContent] - Content to render at the start, such as an icon.
 * @param {string} [props.align] - The text alignment, e.g., "left", "right", "center".
 * @param {string} [props.className] - Additional custom class names for styling.
 * @param {string} [props.leading] - The line-height of the text.
 * @param {React.ReactNode} props.children - The content of the text element.
 * @returns {JSX.Element} The rendered text component, wrapped in a div if start or end content is provided.
 */
export const Text = <E extends TextElements = "p">({
  as = "p" as E,
  color,
  weight,
  size = "auto",
  endContent,
  startContent,
  align,
  className,
  leading,
  children,
  ...props
}: TextCmProps<E>) => {
  const textStyles = textVariants({
    size: size,
    color: color,
    weight: weight,
    align: align,
    className: className,
    leading: leading,
  });

  const Element = createElement(
    as,
    {
      ...props,
      className: clsx(textStyles, size === "auto" && autoSizes[as]),
    },
    children,
  );

  if (endContent || startContent) {
    return (
      <div className="flex items-center gap-x-2">
        {startContent && startContent}
        {Element}
        {endContent && endContent}
      </div>
    );
  }

  return Element;
};
