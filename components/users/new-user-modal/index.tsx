"use client";
import { Modal, Text } from "@/core/common";
import { UserForm } from "../user-form";
import type { NewUserModalCmProps } from "./types";
import { useCallback } from "react";
import { useInvalidateQuery } from "@/core/hooks";
import { getUsersListOptions } from "@/models/users";
import { finalizeError } from "@/core/config";
import { addToast } from "@heroui/toast";

export const NewUserModal: React.FC<NewUserModalCmProps> = ({
  isVisible,
  onCloseAction,
}) => {
  const { invalidateQuery: refreshUsersCache, isInvalidating } =
    useInvalidateQuery(getUsersListOptions().queryKey);

  // bellow function should be actually your mutation onSuccess
  const handleSubmit = useCallback(async () => {
    try {
      await refreshUsersCache();

      addToast({
        title: "کاربر جدید باموفقیت ایجاد شد",
        color: "success",
      });

      onCloseAction();
    } catch (error) {
      addToast({
        title: finalizeError(error).message,
        color: "danger",
      });
    }
  }, [onCloseAction]);

  return (
    <Modal
      isOpen={isVisible}
      onClose={onCloseAction}
      header={
        <Text size="base" weight="medium">
          کاربر جدید
        </Text>
      }
    >
      <UserForm
        isLoading={isInvalidating}
        onSubmitAction={(values) => {
          handleSubmit();
        }}
        onCancelAction={onCloseAction}
      />
    </Modal>
  );
};
