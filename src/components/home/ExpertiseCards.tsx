import { EXPERTISE_AREAS } from "@/lib/constants";

const iconColorMap: Record<string, string> = {
    primary: "text-primary-500",
    blue: "text-accent-blue",
    green: "text-accent-green",
    yellow: "text-yellow-600",
};

export default function ExpertiseCards() {
    return (
        <section className="py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-6">
                    <span className="material-symbols-outlined text-primary-500">business_center</span>
                    <h2 className="text-4xl font-serif italic text-gray-900">
                        Marketing Expertise
                    </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-4xl">
                    With nearly two decades of marketing & advertising experience across high-stakes industries, I blend strategic consumer-centric thinking with data-driven execution. My path has been shaped by diverse sectors where clarity and impact are paramount.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-12">
                    <a
                        href="https://www.linkedin.com/in/kylewegner/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 transition-all flex items-center gap-2 text-base"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        View LinkedIn
                    </a>
                    <a
                        href="/contact"
                        className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 transition-all flex items-center gap-2 text-base"
                    >
                        <span className="material-symbols-outlined text-lg">mail</span>
                        Contact Me
                    </a>
                </div>

                {/* Core Capabilities */}
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-8">
                    Core Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                    {EXPERTISE_AREAS.map((area) => (
                        <div key={area.title} className="capability-card">
                            <span className={`material-symbols-outlined ${iconColorMap[area.color]} mb-3`}>
                                {area.icon}
                            </span>
                            <h4 className="font-bold text-gray-900 mb-1 text-lg">{area.title}</h4>
                            <p className="text-sm text-gray-500">{area.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
