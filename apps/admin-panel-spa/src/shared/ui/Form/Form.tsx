import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input as StyledInput } from "ui";
import { Icons } from "../Icons/Icons";

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
  label?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

Form.Input = function Input<Model extends Record<string, any>>({
  name,
  label,
  type,
  ...props
}: FormInputType<Model>) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <>
      <StyledInput
        type={type}
        name={name}
        label={label}
        register={register}
        disabled={isSubmitting}
        {...props}
      />
      {errors[name as string] && (
        <span className="text-sm font-medium text-red-500 pt-2">
          <Icons.AlertTriangle size={11} className="inline-block mr-1" />
          <small>{errors[name as string]?.message}</small>
        </span>
      )}
    </>
  );
};

Form.PasswordInput = function PasswordInput<Model extends Record<string, any>>({
  name,
  label,
  ...props
}: FormInputType<Model>) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const [visible, toggleVisible] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => toggleVisible(!visible)}
        >
          {visible ? <Icons.EyeOff size={14} /> : <Icons.Eye size={14} />}
        </button>
        <StyledInput
          {...props}
          name={name}
          label={label}
          register={register}
          disabled={isSubmitting}
          type={visible ? "text" : "password"}
        />
      </div>

      {errors[name as string] && (
        <span className="text-sm font-medium text-red-500 pt-2">
          <Icons.AlertTriangle size={11} className="inline-block mr-1" />
          <small>{errors[name as string]?.message}</small>
        </span>
      )}
    </>
  );
};
