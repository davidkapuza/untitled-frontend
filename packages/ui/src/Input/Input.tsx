import React from "react";

type InputProps = {
  name: string;
  register: (name: string) => Record<string, unknown>;
  label?: string;
  onDark?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  register,
  name,
  label,
  onDark = false,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          className={`${label ? "visible" : "invisible"} block text-xs font-medium ${
            onDark ? "text-white" : "text-black"
          }`}
        >
          {label}
        </label>
      )}
      <input
        className={`bg-transparent border-b text-sm outline-none block w-full px-2.5 py-3 placeholder-gray-400 ${
          onDark
            ? "text-white border-white border-opacity-10 "
            : "text-black border-black border-opacity-10"
        } `}
        {...register(name)}
        {...props}
      />
    </div>
  );
}
