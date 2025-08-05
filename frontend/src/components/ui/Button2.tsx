import React from "react";
import { cn } from "../../lib/utils";

type Variant = "default" | "outline" | "ghost" | "link" | "secondary";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-indigo-600 text-white hover:bg-indigo-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  link: "text-indigo-600 underline hover:text-indigo-800",
  secondary: "text-indigo-600 underline hover:text-indigo-800",
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-all",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
