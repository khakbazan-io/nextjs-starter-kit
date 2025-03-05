"use client";
import { Box, TableAction, TableLoading } from "@/core/components";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/core/common";
import { TbPlus } from "react-icons/tb";
import { Fragment, useCallback, useState } from "react";
import { NewUserModal } from "../new-user-modal";
import { useToggle } from "@/core/hooks";
import { useGetUsersList } from "@/models/users";
import { EditUserModal } from "../edit-user-modal";
import type { Nullable } from "@/core/types";
import type { User } from "@/types/users";
import { usersTableActions } from "./constants";

export const UsersList: React.FC = () => {
  const [isNewUserModalVisible, toggleNewUserModal] = useToggle(false);

  const [isEditUserModalVisible, toggleEditUserModal] = useToggle(false);

  const [selectedUser, setSelectedUser] = useState<Nullable<User>>(null);

  const usersList = useGetUsersList();

  const handleEditUser = useCallback(
    (user: User) => {
      setSelectedUser(user);
      toggleEditUserModal(true);
    },
    [toggleEditUserModal],
  );

  return (
    <Fragment>
      <Box
        title="کاربران"
        titleAddon={
          <Button
            color="primary"
            size="sm"
            startContent={<TbPlus size={16} />}
            onPress={() => toggleNewUserModal(true)}
          >
            کاربر جدید
          </Button>
        }
      >
        <Table
          removeWrapper
          classNames={{
            base: "flex flex-col justify-between min-h-96",
          }}
          bottomContent={<Pagination total={10} page={1} />}
        >
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>نام</TableColumn>
            <TableColumn>نام خانوادگی</TableColumn>
            <TableColumn>شماره تماس</TableColumn>
            <TableColumn width={50}>عملیات</TableColumn>
          </TableHeader>

          <TableBody
            isLoading={usersList?.isFetching}
            loadingContent={<TableLoading />}
          >
            {!usersList?.data?.data?.length
              ? []
              : usersList?.data?.data?.map((user, idx) => {
                  return (
                    <TableRow key={user?.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell>{user?.family}</TableCell>
                      <TableCell>{user?.phone}</TableCell>
                      <TableCell>
                        <TableAction
                          items={usersTableActions}
                          onAction={{
                            edit: () => handleEditUser(user),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </Box>

      <NewUserModal
        isVisible={isNewUserModalVisible}
        onCloseAction={() => toggleNewUserModal(false)}
      />

      <EditUserModal
        userId={selectedUser?.id}
        isVisible={isEditUserModalVisible}
        onCloseAction={() => toggleEditUserModal(false)}
      />
    </Fragment>
  );
};
