"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-[#0F5A37] text-white hover:bg-[#0c472c] shadow-md hover:shadow-lg",
      secondary: "bg-[#F9C80E] text-stone-900 hover:bg-[#e6b70b] shadow-md hover:shadow-lg",
      outline: "border-2 border-stone-200 bg-transparent hover:border-[#0F5A37] text-stone-900",
      ghost: "bg-transparent hover:bg-stone-100 text-stone-700",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-12 w-12 flex items-center justify-center p-0",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-[24px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F5A37] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
