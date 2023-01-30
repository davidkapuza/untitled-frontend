import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input as StyledInput } from "ui";

type GenericOnSubmit = (
  data: Record<string, any>,
  event?: React.BaseSyntheticEvent
) => void;

export function Form<
  DataSchema extends Record<string, any>,
  Schema extends z.Schema
>({
  schema,
  onSubmit,
  children,
  defaultValues,
}: {
  schema: Schema;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
  children: any;
  defaultValues?: Record<string, any>;
}) {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset, formState } = methods;

  useEffect(() => {
    formState.isSubmitSuccessful && reset();
  }, [formState, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as GenericOnSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

type FormInputType<T> = {
  name: keyof T;
  displayName: string;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

Form.Input = function Input<Model extends Record<string, any>>({
  name,
  displayName,
  type,
  ...props
}: FormInputType<Model>) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <div>
      <label>
        <span>{displayName}</span>
        <StyledInput
          type={type}
          name={name}
          register={register}
          disabled={isSubmitting}
          {...props}
        />
      </label>
      {errors[name as string] && (
        <p className="error">{errors[name as string]?.message}</p>
      )}
    </div>
  );
};
