import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
  outline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Button = ({
  label,
  outline,
  className,
  size = "md",
  ...props
}: Props) => {
  const sizeMap = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };
  return (
    <button
      className={`${className} ${
        sizeMap[size]
      } m-0.5 rounded px-2 py-1 border border-violet-500
      text-sm ${
        outline
          ? "bg-white text-violet-500 hover:bg-violet-100"
          : "text-white  bg-violet-500 hover:bg-violet-800"
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
