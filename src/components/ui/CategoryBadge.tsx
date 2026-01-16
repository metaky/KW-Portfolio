interface CategoryBadgeProps {
    name: string;
    icon: string;
    color: "blue" | "green" | "yellow" | "primary";
}

const colorClasses = {
    blue: "bg-accent-blue/20 text-accent-blue",
    green: "bg-accent-green/20 text-primary-600",
    yellow: "bg-accent-yellow/30 text-yellow-700",
    primary: "bg-primary-100 text-primary-600",
};

export default function CategoryBadge({ name, icon, color }: CategoryBadgeProps) {
    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider ${colorClasses[color]}`}
        >
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
            {name}
        </div>
    );
}
