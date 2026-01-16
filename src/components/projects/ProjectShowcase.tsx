import CategoryBadge from "@/components/ui/CategoryBadge";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface ProjectShowcaseProps {
    title: string;
    description: string;
    longDescription?: string;
    techStack: readonly string[];
    externalUrl: string | null;
    buttonText: string | null;
    conceptOnly?: boolean;
    category: string;
    categoryIcon: string;
    categoryColor: "blue" | "green" | "yellow" | "primary";
    imagePosition?: "left" | "right";
    image?: string;
}

export default function ProjectShowcase({
    title,
    description,
    longDescription,
    techStack,
    externalUrl,
    buttonText,
    conceptOnly,
    category,
    categoryIcon,
    categoryColor,
    imagePosition = "right",
    image,
}: ProjectShowcaseProps) {
    // Color mapping for different project colors
    const colorConfig = {
        blue: {
            gradient: "from-accent-blue to-primary-500",
            blur: "bg-accent-blue/20",
            button: "bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/30",
        },
        green: {
            gradient: "from-accent-green to-primary-600",
            blur: "bg-accent-green/20",
            button: "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/30",
        },
        yellow: {
            gradient: "from-accent-yellow to-yellow-500",
            blur: "bg-accent-yellow/20",
            button: "bg-yellow-500 hover:bg-yellow-600 hover:shadow-yellow-500/30",
        },
        primary: {
            gradient: "from-primary-400 to-primary-700",
            blur: "bg-primary-500/20",
            button: "bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/30",
        },
    };

    const colors = colorConfig[categoryColor];

    const contentSection = (
        <div className="space-y-6">
            <CategoryBadge name={category} icon={categoryIcon} color={categoryColor} />

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                {title}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

            {longDescription && (
                <p className="text-gray-500">{longDescription}</p>
            )}



            {/* Action Button */}
            <div className="pt-2">
                {conceptOnly ? (
                    <div className="flex flex-col items-start">
                        <span className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">
                            <span className="material-symbols-outlined text-[18px] mr-2">lightbulb</span>
                            Personal Use Only
                        </span>
                        <span className="text-xs text-gray-400 mt-2 ml-1">This app is built exclusively for 2 users</span>
                    </div>
                ) : externalUrl && buttonText ? (
                    <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-lg ${colors.button}`}
                    >
                        {buttonText}
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                ) : null}
            </div>
        </div>
    );

    const imageSection = (
        <div className="relative aspect-square">
            {/* Blur background decoration */}
            <div
                className={`absolute inset-0 ${colors.blur} rounded-xl transform ${imagePosition === "right" ? "rotate-3" : "-rotate-3"
                    } scale-95 blur-xl`}
            />

            {/* Project mockup */}
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl group">
                <div
                    className={`w-full h-full bg-gradient-to-br ${colors.gradient} p-8 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.02]`}
                >
                    {image ? (
                        <div className="relative w-full h-full bg-white rounded-lg overflow-hidden shadow-inner">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        /* Placeholder mockup UI */
                        <div className="bg-white w-full h-full rounded-lg shadow-inner flex flex-col p-6 gap-4">
                            <div className={`h-8 w-1/2 bg-gray-100 rounded`} />
                            <div className="space-y-3 flex-1">
                                <div className="h-16 w-full bg-gray-50 rounded border-l-4 border-accent-blue" />
                                <div className="h-16 w-full bg-gray-50 rounded border-l-4 border-accent-green" />
                                <div className="h-16 w-full bg-gray-50 rounded border-l-4 border-accent-yellow" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <section className="grid md:grid-cols-2 gap-12 items-center">
            {imagePosition === "left" ? (
                <>
                    {imageSection}
                    {contentSection}
                </>
            ) : (
                <>
                    <div className="order-2 md:order-1">{contentSection}</div>
                    <div className="order-1 md:order-2">{imageSection}</div>
                </>
            )}
        </section>
    );
}
