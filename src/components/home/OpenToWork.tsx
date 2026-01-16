import { OPEN_TO_WORK } from "@/lib/constants";

const dabColorMap: Record<string, string> = {
    blue: "dab-blue",
    green: "dab-green",
    yellow: "dab-yellow",
    primary: "dab-primary",
};

const iconColorMap: Record<string, string> = {
    blue: "text-blue-800",
    green: "text-green-800",
    yellow: "text-yellow-800",
    primary: "text-primary-700",
};

export default function OpenToWork() {
    return (
        <section className="py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-6">
                    <span className="material-symbols-outlined text-primary-500">handshake</span>
                    <h2 className="text-4xl font-serif italic text-gray-900">
                        Open to Work
                    </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg mb-12 max-w-4xl">
                    I am currently available for new professional engagements. Here is how we can collaborate to drive impact for your organization or project.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                    {OPEN_TO_WORK.map((item) => (
                        <div key={item.title} className="otw-card group">
                            <div className="flex items-center gap-4 mb-3">
                                {/* Icon with watercolor dab */}
                                <div className="relative h-10 w-10 flex items-center justify-center">
                                    <div className={`watercolor-dab ${dabColorMap[item.color]}`} />
                                    <span className={`material-symbols-outlined ${iconColorMap[item.color]} relative z-10 text-2xl`}>
                                        {item.icon}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed italic ml-14">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
