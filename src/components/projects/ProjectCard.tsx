import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProjectCardProps {
    title: string;
    description: string;
    longDescription?: string;
    techStack: readonly string[];
    externalUrl: string | null;
    buttonText: string | null;
    conceptOnly?: boolean;
}

export default function ProjectCard({
    title,
    description,
    longDescription,
    techStack,
    externalUrl,
    buttonText,
    conceptOnly,
}: ProjectCardProps) {
    return (
        <article className="bg-white rounded-2xl shadow-soft overflow-hidden">
            {/* Decorative header gradient */}
            <div className="h-2 bg-gradient-to-r from-[var(--color-watercolor-lavender)] via-[var(--color-watercolor-sky)] to-[var(--color-watercolor-mint)]" />

            <div className="p-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {title}
                </h2>

                <p className="text-lg text-gray-600 mb-4">{description}</p>

                {longDescription && (
                    <p className="text-gray-500 mb-6">{longDescription}</p>
                )}



                {/* Action Button */}
                <div className="pt-4 border-t border-gray-100">
                    {conceptOnly ? (
                        <div className="flex flex-col items-start">
                            <span className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Personal Use Only
                            </span>
                            <span className="text-xs text-gray-400 mt-2 ml-1">This app is built exclusively for 2 users</span>
                        </div>
                    ) : externalUrl && buttonText ? (
                        <Button href={externalUrl} external variant="primary">
                            {buttonText}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Button>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
