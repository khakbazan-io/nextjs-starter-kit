"use client";
import {
  Accordion as LibAccordion,
  AccordionItem as LibAccordionItem,
} from "@heroui/accordion";
import type { AccordionCmProps, AccordionItemCmProps } from "./types";

export const Accordion: React.FC<AccordionCmProps> = ({
  children,
  ...props
}) => {
  return <LibAccordion {...props}>{children}</LibAccordion>;
};

export const AccordionItem: React.FC<AccordionItemCmProps> = ({
  children,
  ...props
}) => {
  return <LibAccordionItem {...props}>{children}</LibAccordionItem>;
};
