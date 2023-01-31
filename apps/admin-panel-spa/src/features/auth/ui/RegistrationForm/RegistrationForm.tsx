import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../../../../shared/ui/Form/Form";
import { useRegisterUserMutation } from "../../api/authApi";
import {
  RegistrationFormSchema,
  RegistrationFormSchemaType,
} from "../../lib/validations";
import { toast } from "react-toastify";
import { Button } from "ui";

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
        onDark
      />

      <Form.PasswordInput<RegistrationFormSchemaType>
        placeholder="Password"
        name="password"
        onDark
      />

      <Form.PasswordInput<RegistrationFormSchemaType>
        placeholder="Confirm Password"
        name="confirmPassword"
        onDark
      />

      <Button type="submit" className="mt-8 mb-2" loading={isLoading}>
        Register
      </Button>
    </Form>
  );
}
