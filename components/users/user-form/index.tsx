"use client";
import { ControlledInput, Form } from "@/core/components/form";
import { useForm } from "react-hook-form";
import {
  UserFormFields,
  type UserFormCmProps,
  type UserFormType,
} from "./types";
import { Button } from "@/core/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "./schema";
import { Skeleton } from "@heroui/skeleton";

export const UserForm: React.FC<UserFormCmProps> = ({
  onSubmitAction,
  onCancelAction,
  initializerPromise,
  isInitialized = true,
  isLoading,
}) => {
  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: async () => {
      if (initializerPromise) {
        return initializerPromise()
          .then((res) => ({
            name: res?.data?.name ?? "",
            family: res?.data?.family ?? "",
            phone: res?.data?.phone ?? "",
          }))
          .catch(() => ({
            name: "",
            family: "",
            phone: "",
          }));
      }

      return {
        name: "",
        family: "",
        phone: "",
      };
    },
  });

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmitAction)}>
      <div className="space-y-4 overflow-hidden pb-2">
        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledInput
            name={UserFormFields.Name}
            label="نام"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledInput
            name={UserFormFields.Family}
            label="نام خانوادگی"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledInput
            name={UserFormFields.Phone}
            label="شماره تماس"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <div className="grid grid-cols-12 gap-2 pt-5">
          <div className="col-span-4">
            <Skeleton isLoaded={isInitialized} className="rounded-lg">
              <Button
                radius="md"
                type="button"
                fullWidth
                onPress={onCancelAction}
              >
                انصراف
              </Button>
            </Skeleton>
          </div>

          <div className="col-span-8">
            <Skeleton isLoaded={isInitialized} className="rounded-lg">
              <Button
                isLoading={isLoading}
                radius="md"
                type="submit"
                fullWidth
                color="primary"
              >
                {initializerPromise ? "ویرایش کاربر" : "ایجاد کاربر"}
              </Button>
            </Skeleton>
          </div>
        </div>
      </div>
    </Form>
  );
};
