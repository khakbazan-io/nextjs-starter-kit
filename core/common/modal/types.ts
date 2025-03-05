import type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from "@heroui/modal";
import type { ReactNode } from "react";

export type ModalCmProps = {
  header?: ReactNode;
  footer?: ReactNode;
  footerProps?: ModalFooterProps;
  headerProps?: ModalHeaderProps;
  bodyProps?: ModalBodyProps;
  contentProps?: ModalContentProps;
  baseOverflow?: "visible" | "hidden";
} & ModalProps;
