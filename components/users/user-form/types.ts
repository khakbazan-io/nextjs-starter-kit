import type { z } from "zod";
import type { userFormSchema } from "./schema";
import type { User } from "@/types/users";
import type { GetUserResponse } from "@/models/users";

export type UserFormType = z.infer<typeof userFormSchema>;

export type UserFormCmProps = {
  onSubmitAction: (values: UserFormType) => void;
  onCancelAction: VoidFunction;
  initializerPromise?: () => Promise<GetUserResponse>;
  isInitialized?: boolean;
  isLoading?: boolean;
};

export enum UserFormFields {
  Name = "name",
  Family = "family",
  Phone = "phone",
}
