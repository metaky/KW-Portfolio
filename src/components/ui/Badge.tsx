import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "primary" | "success" | "warning";
    className?: string;
}

const variantStyles = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
    success: "bg-[var(--color-watercolor-mint)] text-green-700",
    warning: "bg-[var(--color-watercolor-peach)] text-orange-700",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        ${variantStyles[variant]}
        ${className}
      `}
        >
            {children}
        </span>
    );
}
