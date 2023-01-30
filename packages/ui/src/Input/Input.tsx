import React from "react";

type InputProps = {
  name: string;
  register: (name: string) => Record<string, unknown>;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ register, name, label, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <input
        className="border-b border-gray-300 text-gray-900 text-sm outline-none block w-full px-2.5 py-3 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-b-blue-500"
        {...register(name)}
        {...props}
      />

    </div>
  );
}
