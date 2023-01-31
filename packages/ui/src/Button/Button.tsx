import React from "react";
import { Loader } from "../Loader/Loader";

type ButtonProps = {
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  icon,
  loading = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${className} flex flex-row px-3 py-2 text-xs text-black bg-white rounded-full justify-center min-w-[90px]`}
      {...props}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
