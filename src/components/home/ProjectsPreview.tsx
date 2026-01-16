import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/constants";

// Color schemes for each project accent color
const colorSchemes: Record<string, { iconBg: string; iconText: string; badgeBg: string; badgeText: string }> = {
    blue: {
        iconBg: "bg-accent-blue/30",
        iconText: "text-blue-700",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-700",
    },
    green: {
        iconBg: "bg-accent-green/30",
        iconText: "text-green-700",
        badgeBg: "bg-green-100",
        badgeText: "text-green-700",
    },
    yellow: {
        iconBg: "bg-accent-yellow/40",
        iconText: "text-yellow-700",
        badgeBg: "bg-yellow-100",
        badgeText: "text-yellow-700",
    },
    primary: {
        iconBg: "bg-primary-100",
        iconText: "text-primary-600",
        badgeBg: "bg-primary-50",
        badgeText: "text-primary-600",
    },
};

// Icon mapping for each project
const projectIcons: Record<string, string> = {
    declarative: "accessibility_new",
    "pda-your-iep": "volunteer_activism",
    "watch-match": "movie",
};

export default function ProjectsPreview() {
    const featuredProjects = PROJECTS.filter((p) => p.featured);

    return (
        <section className="py-8" id="indie-projects">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <span className="material-symbols-outlined text-primary-500">terminal</span>
                    <h2 className="text-4xl font-serif italic text-gray-900">
                        Indie Projects
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-10 max-w-4xl">
                    {featuredProjects.map((project) => {
                        const colors = colorSchemes[project.categoryColor] || colorSchemes.primary;
                        const icon = projectIcons[project.id] || "code";

                        return (
                            <div
                                key={project.id}
                                className="group relative bg-white/60 border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg">{project.description}</p>
                                    </div>
                                    <div className={`w-14 h-14 ${colors.iconBg} ${colors.iconText} flex items-center justify-center rounded-lg flex-shrink-0 ml-4`}>
                                        <span className="material-symbols-outlined text-3xl">
                                            {icon}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-8">
                                    {project.techStack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className={`text-[10px] uppercase font-bold tracking-widest ${colors.badgeText} ${colors.badgeBg} px-2 py-1 rounded`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {project.externalUrl ? (
                                    <a
                                        href={project.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-base font-semibold hover:text-primary-600 transition-colors gap-2"
                                    >
                                        View Project
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center text-base font-semibold text-gray-400 gap-2">
                                        Concept Only
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/projects"
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2 transition-colors"
                    >
                        View All Projects
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

