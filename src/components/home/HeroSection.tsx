import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import profileHero from "@/assets/profile-hero.webp";
import Icon from "@/components/ui/Icon";

const roleMarkers = [
    {
        label: "Marketing Strategist",
        markerClass: "bg-accent-yellow/80 ring-accent-yellow/25",
    },
    {
        label: "Indie Dev",
        markerClass: "bg-accent-blue/80 ring-accent-blue/25",
    },
    {
        label: "Disabilities Advocate",
        markerClass: "bg-accent-green/80 ring-accent-green/25",
    },
];

export default function HeroSection() {
    return (
        <section className="py-8 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Profile Image - Rotated Square Style */}
                    <div className="flex-shrink-0">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl rotate-3 bg-white p-2">
                            <Image
                                src={profileHero}
                                alt={SITE_CONFIG.name}
                                priority
                                placeholder="blur"
                                sizes="(min-width: 768px) 256px, 192px"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight animate-slide-up">
                            {SITE_CONFIG.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl italic mb-6 animate-slide-up animation-delay-100">
                            Deeply passionate about{" "}
                            <span className="text-primary-500 font-semibold">Strategic Marketing</span>
                            {" "}and{" "}
                            <span className="text-primary-500 font-semibold italic underline decoration-accent-blue/50 underline-offset-4">
                                Disability-Empowering Software Development
                            </span>.
                        </p>

                        <ul
                            aria-label="Professional identifiers"
                            className="flex flex-wrap gap-x-5 gap-y-2 justify-center md:justify-start mb-8 animate-slide-up animation-delay-200 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-gray-600"
                        >
                            {roleMarkers.map((role) => (
                                <li key={role.label} className="inline-flex items-center gap-2">
                                    <span
                                        aria-hidden="true"
                                        className={`h-2.5 w-2.5 shrink-0 rounded-[45%_55%_60%_40%] ring-4 ${role.markerClass}`}
                                    />
                                    <span>{role.label}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-slide-up animation-delay-300">
                            <a
                                href="#indie-projects"
                                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-500/60 text-primary-600 font-semibold text-lg rounded-full transition-all hover:bg-primary-50 hover:border-primary-600"
                            >
                                Explore Indie Projects
                                <Icon name="arrow_downward" className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
