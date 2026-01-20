import HeroSection from "@/components/home/HeroSection";
import ExpertiseCards from "@/components/home/ExpertiseCards";
import IndustryVerticals from "@/components/home/IndustryVerticals";
import OpenToWork from "@/components/home/OpenToWork";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
            <HeroSection />

            <ExpertiseCards />

            <IndustryVerticals />

            {/* Section Divider */}
            <div className="section-divider-h w-full max-w-4xl mx-auto" />

            <OpenToWork />

            {/* Section Divider */}
            <div className="section-divider-h w-full max-w-4xl mx-auto" />

            <ProjectsPreview />

            {/* About Me Section */}
            <section className="max-w-4xl mx-auto text-center border-t border-gray-200 pt-12">
                <h2 className="text-3xl font-serif italic text-gray-900 mb-8">
                    A Little More About Me
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-12">
                    I believe that great marketing isn&apos;t just about selling—it&apos;s about telling stories and creating utility.
                    This same philosophy guides my app development. I build tools that solve real problems, designed with the
                    user at the very center. Whether it&apos;s crafting a national brand campaign or pushing code for a niche
                    productivity tool, my goal is always the same: clarity, beauty, and impact.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <a
                        href="/contact"
                        className="bg-primary-600 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 transition-all flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined text-2xl">mail</span>
                        Get In Touch
                    </a>
                    <div className="flex gap-4">
                        <a
                            href="https://www.linkedin.com/in/kylewegner/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm hover:shadow-md"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/metaky"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm hover:shadow-md"
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
