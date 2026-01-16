import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
    return (
        <div
            className={`
        bg-white rounded-2xl p-6 shadow-soft
        ${hover ? "card-hover cursor-pointer" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    icon?: string;
    title: string;
    subtitle?: string;
}

export function CardHeader({ icon, title, subtitle }: CardHeaderProps) {
    return (
        <div className="mb-4">
            {icon && <span className="text-3xl mb-3 block">{icon}</span>}
            <h3 className="font-serif text-xl font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return <div className={`text-gray-600 ${className}`}>{children}</div>;
}
