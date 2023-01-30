import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "../../../../shared/ui/Form/Form";
import { useRegisterUserMutation } from "../../api/authApi";
import {
  RegistrationFormSchema,
  RegistrationFormSchemaType,
} from "../../lib/validations";
import { toast } from "react-toastify";
import { ErrorResponse } from "../../../../tmptypes";

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
      const { message, error: errReason } = (error as ErrorResponse).data;
      toast.error(
        <div>
          {message}
          <br />
          {errReason}
        </div>,
        {
          theme: "colored",
        }
      );
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
        displayName="Email"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Form.Input<RegistrationFormSchemaType>
        displayName="Password"
        placeholder="Password"
        name="password"
        type="password"
      />
      <Form.Input<RegistrationFormSchemaType>
        displayName="Confirm Password"
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
      />

      <button type="submit">Register</button>
    </Form>
  );
}
