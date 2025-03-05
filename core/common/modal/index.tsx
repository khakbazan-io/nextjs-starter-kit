import {
  Modal as LibModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import type { ModalCmProps } from "./types";

export const Modal: React.FC<ModalCmProps> = ({
  children,
  header,
  footer,
  baseOverflow = "hidden",
  ...props
}) => {
  return (
    <LibModal
      classNames={{
        wrapper: "!z-[999999]",
        closeButton: "text-lg",
        base: baseOverflow === "visible" ? "!overflow-visible" : undefined,
        backdrop: "!z-[999999]",
      }}
      {...props}
    >
      <ModalContent {...props?.contentProps}>
        {() => (
          <>
            {header ? (
              <ModalHeader {...props?.headerProps}>{header}</ModalHeader>
            ) : null}

            <ModalBody {...props?.bodyProps}>{children}</ModalBody>

            {footer ? (
              <ModalFooter {...props?.footerProps}>{footer}</ModalFooter>
            ) : null}
          </>
        )}
      </ModalContent>
    </LibModal>
  );
};
