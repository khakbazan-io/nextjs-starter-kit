"use client";
import { Modal, Text } from "@/core/common";
import { UserForm } from "../user-form";
import type { EditUserModalCmProps } from "./types";
import {
  getUserOptions,
  getUsersListOptions,
  useGetUser,
  type GetUserResponse,
} from "@/models/users";
import { useDataPromise, useInvalidateQuery } from "@/core/hooks";
import { useCallback } from "react";
import { finalizeError } from "@/core/config";
import { addToast } from "@heroui/toast";

export const EditUserModal: React.FC<EditUserModalCmProps> = ({
  isVisible,
  userId,
  onCloseAction,
}) => {
  const user = useGetUser({
    params: {
      id: userId,
    },
  });

  const { getPromise: getUserPromise, isDone } =
    useDataPromise<GetUserResponse>(user?.data, user?.isError);

  const {
    invalidateQuery: refreshUserCache,
    isInvalidating: isRefreshingUserCache,
  } = useInvalidateQuery(getUserOptions({ params: { id: userId } }).queryKey);

  const {
    invalidateQuery: refreshUsersListCache,
    isInvalidating: isRefreshingUsersListCache,
  } = useInvalidateQuery(getUsersListOptions().queryKey);

  // bellow function should be actually your mutation onSuccess
  const handleSubmit = useCallback(async () => {
    try {
      await refreshUsersListCache();

      await refreshUserCache();

      addToast({
        title: "کاربر باموفقیت ویرایش شد",
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
          ویرایش کاربر
        </Text>
      }
    >
      <UserForm
        isLoading={isRefreshingUserCache || isRefreshingUsersListCache}
        onSubmitAction={(values) => {
          handleSubmit();
        }}
        onCancelAction={onCloseAction}
        initializerPromise={getUserPromise}
        isInitialized={isDone}
      />
    </Modal>
  );
};
