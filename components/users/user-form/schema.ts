import { z } from "zod";
import { UserFormFields } from "./types";
import { phoneNumberValidator } from "@persian-tools/persian-tools";

export const userFormSchema = z.object({
  [UserFormFields.Name]: z.string().min(1, "نام را وارد کنید"),
  [UserFormFields.Family]: z.string().min(1, "نام خانوادگی را وارد کنید"),
  [UserFormFields.Phone]: z.string().refine(phoneNumberValidator, {
    message: "شماره تماس وارد شده نامعتبر است",
  }),
});
