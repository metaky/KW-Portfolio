import Image from "next/image";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export default function HeroSection() {
    return (
        <section className="py-8 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Profile Image - Rotated Square Style */}
                    <div className="flex-shrink-0">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl rotate-3 bg-white p-2 relative">
                            <Image
                                src="/profile.png"
                                alt={SITE_CONFIG.name}
                                fill
                                className="object-cover rounded-xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight animate-slide-up">
                            {SITE_CONFIG.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl italic mb-6 animate-slide-up animation-delay-100">
                            Bridging the gap between{" "}
                            <span className="text-primary-500 font-semibold">Strategic Marketing</span>
                            {" "}and{" "}
                            <span className="text-primary-500 font-semibold italic underline decoration-accent-blue/50 underline-offset-4">
                                Disability-Empowering Software Development
                            </span>.
                        </p>

                        {/* Role Badges */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8 animate-slide-up animation-delay-200">
                            <span className="px-4 py-1.5 rounded-full bg-accent-yellow/20 text-yellow-800 border border-accent-yellow/30 text-sm font-medium">
                                Marketing Strategist
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-accent-blue/20 text-blue-800 border border-accent-blue/30 text-sm font-medium">
                                Indie Dev
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-accent-green/20 text-green-800 border border-accent-green/30 text-sm font-medium">
                                Product Visionary
                            </span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-slide-up animation-delay-300">
                            <a
                                href="#indie-projects"
                                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-500/60 text-primary-600 font-semibold text-lg rounded-full transition-all hover:bg-primary-50 hover:border-primary-600"
                            >
                                Explore Indie Projects
                                <span className="material-symbols-outlined text-xl">arrow_downward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
