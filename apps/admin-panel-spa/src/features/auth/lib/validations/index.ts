import * as z from "zod";

export const LoginFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "Field is required")
      .email("Email Address is invalid"),
    password: z.string().min(1, "Field is required"),
  })
  .required();

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const RegistrationFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "Field is required")
      .email("Email Address is invalid"),
    password: z
      .string()
      .min(1, "Field is required")
      .min(8, "Too short")
      .max(32, "Too long")
      .regex(
        /^\S(.+)\S$/gm,
        "Password must not contain Whitespaces in the end or beginning of the password"
      )
      .regex(/\d/gm, "Password must contain at least one Digit.")
      .regex(/[A-Z]/gm, "Password must have at least one Uppercase Character."),
    confirmPassword: z.string().min(1, "Field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegistrationFormSchemaType = z.infer<typeof RegistrationFormSchema>;
