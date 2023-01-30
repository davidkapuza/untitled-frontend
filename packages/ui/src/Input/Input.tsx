import React from "react";

type InputProps = {
  name: string;
  register: (name: string) => Record<string, unknown>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ register, name, ...props }: InputProps) {
  return <input className="border-2 border-b-red-600" {...register(name)} {...props} />;
}
