import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../../../../shared/ui/Form/Form";
import { useRegisterUserMutation } from "../../api/authApi";
import {
  RegistrationFormSchema,
  RegistrationFormSchemaType,
} from "../../lib/validations";
import { toast } from "react-toastify";

export function RegistrationForm() {
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();
  const onSubmit: SubmitHandler<RegistrationFormSchemaType> = async ({
    email,
    password,
  }) => {
    registerUser({ email, password });
  };

  const someDefaultValues: RegistrationFormSchemaType = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Form<RegistrationFormSchemaType, typeof RegistrationFormSchema>
      onSubmit={onSubmit}
      schema={RegistrationFormSchema}
      defaultValues={someDefaultValues}
    >
      <Form.Input<RegistrationFormSchemaType>
        placeholder="Email"
        name="email"
        type="email"
      />

      <Form.PasswordInput<RegistrationFormSchemaType>
        placeholder="Password"
        name="password"
      />

      <Form.PasswordInput<RegistrationFormSchemaType>
        placeholder="Confirm Password"
        name="confirmPassword"
      />

      <button type="submit">Register</button>
    </Form>
  );
}
