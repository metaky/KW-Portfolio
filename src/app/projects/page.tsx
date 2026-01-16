import { Metadata } from "next";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import { PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Projects | Kyle Wegner",
    description: "Indie development projects by Kyle Wegner - apps built for the neurodivergent community and beyond.",
};

export default function ProjectsPage() {
    return (
        <div className="py-16 md:py-24">
            {/* Hero Header */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 gradient-text">
                    Crafting Tools for <br />
                    <span className="italic">Meaningful Change</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Where marketing strategy meets indie development. I build software that bridges communication gaps and simplifies complex lives.
                </p>
            </header>

            {/* Projects Showcase */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
                {PROJECTS.map((project, index) => (
                    <ProjectShowcase
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        longDescription={project.longDescription}
                        techStack={project.techStack}
                        externalUrl={project.externalUrl}
                        buttonText={project.buttonText}
                        conceptOnly={project.conceptOnly}
                        category={project.category}
                        categoryIcon={project.categoryIcon}
                        categoryColor={project.categoryColor}
                        image={project.image}
                        imagePosition={index % 2 === 0 ? "right" : "left"}
                    />
                ))}
            </main>
        </div>
    );
}
