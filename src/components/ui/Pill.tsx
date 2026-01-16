import { ReactNode } from "react";

type PillVariant = "rose" | "peach" | "lavender" | "mint" | "sky" | "cream";

interface PillProps {
    children: ReactNode;
    variant?: PillVariant;
    className?: string;
}

const variantStyles: Record<PillVariant, string> = {
    rose: "bg-gradient-to-r from-[var(--color-watercolor-rose)] to-pink-100",
    peach: "bg-gradient-to-r from-[var(--color-watercolor-peach)] to-orange-100",
    lavender: "bg-gradient-to-r from-[var(--color-watercolor-lavender)] to-purple-100",
    mint: "bg-gradient-to-r from-[var(--color-watercolor-mint)] to-emerald-100",
    sky: "bg-gradient-to-r from-[var(--color-watercolor-sky)] to-blue-100",
    cream: "bg-gradient-to-r from-[var(--color-watercolor-cream)] to-yellow-100",
};

export default function Pill({ children, variant = "lavender", className = "" }: PillProps) {
    return (
        <span
            className={`
        inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-gray-700
        ${variantStyles[variant]}
        ${className}
      `}
        >
            {children}
        </span>
    );
}
