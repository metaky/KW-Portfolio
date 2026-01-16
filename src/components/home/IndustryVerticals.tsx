import { INDUSTRY_VERTICALS } from "@/lib/constants";

const splashColorMap: Record<string, string> = {
    yellow: "splash-yellow",
    blue: "splash-blue",
    green: "splash-green",
    primary: "splash-primary",
};

const iconColorMap: Record<string, string> = {
    yellow: "text-yellow-700",
    blue: "text-blue-700",
    green: "text-green-700",
    primary: "text-primary-600",
};

export default function IndustryVerticals() {
    return (
        <section className="py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-10">
                    Industry Vertical Experience
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8 max-w-4xl">
                    {INDUSTRY_VERTICALS.map((vertical) => (
                        <div key={vertical.name} className="relative group p-6 overflow-visible">
                            {/* Watercolor splash background */}
                            <div
                                className={`absolute inset-0 watercolor-splash ${splashColorMap[vertical.color]} opacity-40 group-hover:opacity-60 transition-opacity paint-drip -z-10 transform scale-110 rotate-3`}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`material-symbols-outlined ${iconColorMap[vertical.color]}`}>
                                        {vertical.icon}
                                    </span>
                                    <h4 className="font-bold text-gray-900 text-lg">{vertical.name}</h4>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                    {vertical.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
