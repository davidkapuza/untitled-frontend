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
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters")
      .regex(
        /\d|[A-Z]/gm,
        "Password has to contain at least one Uppercase and numeric characters"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegistrationFormSchemaType = z.infer<typeof RegistrationFormSchema>;
