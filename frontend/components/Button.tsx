"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, disabled, ...props }, ref) => {
    const baseClasses =
      "font-heading uppercase tracking-wide font-bold transition-none focus-win95 btn-active";

    const sizeClasses = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const variantClasses = {
      default: `
        bg-[#c0c0c0] text-black
        border-2 [border-color:#fff_#808080_#808080_#fff]
        [box-shadow:inset_-1px_-1px_0_#404040,inset_1px_1px_0_#dfdfdf]
        hover:bg-[#d0d0d0]
      `,
      primary: `
        bg-[#0000ff] text-white
        border-2 [border-color:#5555ff_#000080_#000080_#5555ff]
        [box-shadow:inset_-1px_-1px_0_#000040,inset_1px_1px_0_#8080ff]
        hover:bg-[#0000cc]
      `,
      danger: `
        bg-[#ff0000] text-white
        border-2 [border-color:#ff5555_#800000_#800000_#ff5555]
        [box-shadow:inset_-1px_-1px_0_#400000,inset_1px_1px_0_#ff8080]
        hover:bg-[#cc0000]
      `,
      success: `
        bg-[#00aa00] text-white
        border-2 [border-color:#00ff00_#006600_#006600_#00ff00]
        [box-shadow:inset_-1px_-1px_0_#003300,inset_1px_1px_0_#80ff80]
        hover:bg-[#008800]
      `,
    };

    const disabledClasses = disabled
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

