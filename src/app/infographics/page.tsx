import type { Metadata } from "next";
import InfographicsGallery, { type InfographicItem } from "@/components/infographics/InfographicsGallery";
import infographics from "@/data/infographics.json";

const items = infographics as InfographicItem[];

export const metadata: Metadata = {
    title: "Infographics | Kyle Wegner",
    description:
        "Instructional infographics from Kyle Wegner on practical AI use across marketing strategy, accessibility, disability advocacy, parenting, research, and workflow design.",
    alternates: {
        canonical: "/infographics",
    },
    openGraph: {
        title: "Infographics | Kyle Wegner",
        description:
            "Practical visual guides for using AI with more care, strategy, and imagination.",
        type: "website",
        url: "/infographics",
    },
};

export default function InfographicsPage() {
    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-28 pt-10 sm:px-6 lg:px-8">
            <section className="relative overflow-hidden py-6 sm:py-10">
                <div
                    className="absolute left-1/2 top-8 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(169,223,191,0.36),rgba(127,179,213,0.24),transparent_68%)] blur-3xl"
                    aria-hidden="true"
                />
                <div className="max-w-4xl">
                    <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-primary-700">
                        Visual Field Guides
                    </p>
                    <h1 className="font-serif text-5xl font-semibold leading-tight text-gray-950 sm:text-6xl lg:text-7xl">
                        Infographics for useful, human-centered AI.
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                        Practical visual guides for using AI with more care, strategy, and imagination across marketing, parenting, accessibility, advocacy, research, and builder workflows.
                    </p>
                </div>

                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                    <div className="border-l-2 border-primary-500 bg-white/45 px-5 py-4">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                            For Marketers
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                            Sharpen briefs, research, campaign decisions, and accessible content.
                        </p>
                    </div>
                    <div className="border-l-2 border-accent-blue bg-white/45 px-5 py-4">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                            For Parents
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                            Prepare support, advocacy, transitions, and care conversations.
                        </p>
                    </div>
                    <div className="border-l-2 border-accent-yellow bg-white/45 px-5 py-4">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-800">
                            For Builders
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                            Turn ideas into artifacts with privacy checks and human review.
                        </p>
                    </div>
                </div>
            </section>

            <div className="section-divider-h w-full" />

            <InfographicsGallery items={items} />
        </div>
    );
}
