import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "ui";
import { Form } from "../../../../shared/ui/Form/Form";
import { useLoginUserMutation } from "../../api/authApi";
import { LoginFormSchema, LoginFormSchemaType } from "../../lib/validations";

export function LoginForm() {
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    loginUser(data);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const from =
    ((location.state as any)?.from.pathname as string) || "/dashboard";

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in");
      navigate(from);
    }
    if (isError) {
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

  const someDefaultValues: LoginFormSchemaType = {
    email: "",
    password: "",
  };

  return (
    <Form<LoginFormSchemaType, typeof LoginFormSchema>
      onSubmit={onSubmit}
      schema={LoginFormSchema}
      defaultValues={someDefaultValues}
    >
      <Form.Input<LoginFormSchemaType>
        placeholder="Email"
        name="email"
        type="email"
        onDark
      />
      <Form.PasswordInput<LoginFormSchemaType>
        placeholder="Password"
        name="password"
        onDark
      />

      <Button type="submit" className="mt-8 mb-2" loading={isLoading}>
        Login
      </Button>
    </Form>
  );
}
