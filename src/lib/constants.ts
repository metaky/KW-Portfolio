// Site-wide constants and content data

export const SITE_CONFIG = {
    name: "Kyle Wegner",
    title: "Kyle Wegner | Strategy & Software Development",
    description: "Marketing strategist and indie software developer creating thoughtful digital products.",
    tagline: "Marketing Strategist & Indie Developer",
    email: "hello@kylewegner.com",
};

export const NAVIGATION_LINKS = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
] as const;

export const EXPERTISE_AREAS = [
    {
        title: "Brand Strategy",
        description: "Defining identity and positioning for market leaders.",
        icon: "campaign",
        color: "primary",
    },
    {
        title: "CRM & Loyalty",
        description: "Fostering deep, lasting customer connections.",
        icon: "loyalty",
        color: "blue",
    },
    {
        title: "Omnichannel Growth",
        description: "Seamlessly integrating experiences across all platforms.",
        icon: "hub",
        color: "green",
    },
    {
        title: "Data Analytics",
        description: "Translating complex datasets into actionable insights.",
        icon: "query_stats",
        color: "yellow",
    },
] as const;

export const INDUSTRY_VERTICALS = [
    {
        name: "CPG",
        icon: "shopping_basket",
        description: "Driving brand preference & purchase for premier brands like P&G and Altria through omnichannel strategy.",
        color: "yellow",
    },
    {
        name: "Financial Services",
        icon: "account_balance",
        description: "Navigating complex regulations to deliver customer-centric digital banking experiences for Wells Fargo and Equifax.",
        color: "blue",
    },
    {
        name: "Pharmaceutical",
        icon: "prescriptions",
        description: "Synthesizing clinical data into patient-first narratives for Lilly and Merck that build trust and drive outcomes.",
        color: "green",
    },
    {
        name: "US Army",
        icon: "military_tech",
        description: "Built our strategic practice from the ground up at RAPP to support national recruiting efforts that use connected CRM for diverse US Army prospecting.",
        color: "primary",
    },
    {
        name: "Retail",
        icon: "storefront",
        description: "Optimizing customer journeys and digital experiences for 7-Eleven and AT&T to increase conversion and lifetime value across storefronts.",
        color: "yellow",
    },
    {
        name: "Technology",
        icon: "devices",
        description: "Bridging the gap between engineering and end-users for Samsung with intuitive product communication design.",
        color: "blue",
    },
] as const;

export const OPEN_TO_WORK = [
    {
        title: "Strategic Consulting",
        icon: "lightbulb",
        description: "High-level marketing and product roadmaps designed for sustainable growth.",
        color: "blue",
    },
    {
        title: "Freelance Projects",
        icon: "terminal",
        description: "On-demand strategic support at leadership & individual contributor levels.",
        color: "green",
    },
    {
        title: "Board Positions",
        icon: "gavel",
        description: "Lending strategic oversight and industry expertise to mission-driven boards.",
        color: "yellow",
    },
    {
        title: "Fractional Leadership",
        icon: "groups",
        description: "Acting CMO, Product Head or similar leadership for nimble teams needing executive-level guidance.",
        color: "primary",
    },
    {
        title: "Advisory Roles",
        icon: "forum",
        description: "Ongoing guidance for founders navigating the intersection of tech and marketing.",
        color: "blue",
    },
    {
        title: "Speaking & Workshops",
        icon: "record_voice_over",
        description: "Engaging sessions on brand strategy, indie development, and digital innovation.",
        color: "yellow",
    },
    {
        title: "Audit & Assessment",
        icon: "analytics",
        description: "Deep-dive evaluations of current marketing tech stacks and brand performance.",
        color: "green",
    },
    {
        title: "Executive Coaching",
        icon: "psychology",
        description: "1-on-1 mentorship for marketing leaders looking to sharpen their technical edge.",
        color: "primary",
    },
] as const;

export const PROJECTS = [
    {
        id: "declarative",
        title: "Declarative App",
        description: "A communication app designed to help caregivers and support teams connect more effectively with PDA Autistic individuals.",
        longDescription: "Declarative app was inspired by my own need for a tool to help friends, family and providers better connect with my own son. It was my first major vibe coding project and continues to service the community.",
        techStack: ["React Native", "TypeScript", "Expo", "Firebase"],
        externalUrl: "https://declarativeapp.org",
        buttonText: "Visit app",
        conceptOnly: false,
        featured: true,
        category: "Language Accommodations",
        categoryIcon: "translate",
        categoryColor: "blue",
        image: "/projects/declarative-showcase.png",
    },
    {
        id: "pda-your-iep",
        title: "PDA Your IEP",
        description: "A support toolkit empowering families to advocate for educational accommodations tailored to PDA profile autistic children.",
        longDescription: "Created to help families advocate effectively for their children's educational needs. Provides templates, guidance, and community support for navigating the often complex IEP process.",
        techStack: ["Next.js", "Tailwind CSS", "Supabase"],
        externalUrl: "https://PDAyourIEP.org",
        buttonText: "See the site",
        conceptOnly: false,
        featured: true,
        category: "Advocacy",
        categoryIcon: "school",
        categoryColor: "green",
        image: "/projects/pda-iep-showcase.png",
    },
    {
        id: "watch-match",
        title: "Watch Match",
        description: "A family-friendly media discovery tool that matches viewing preferences across the household to surface shows and movies everyone agrees on.",
        longDescription: "Watch Match is a testbed for my own vibe coding skills. While building a valuable tool for my family, I got to learn how to implement account verification & sign in flows, multiple API integrations, tagging taxonomies and novel UX experiences.",
        techStack: ["SwiftUI", "TMDB API", "Firebase"],
        externalUrl: null,
        buttonText: "See details",
        internalUrl: "/projects#watch-match",
        conceptOnly: true,
        featured: true,
        category: "Entertainment",
        categoryIcon: "movie",
        categoryColor: "yellow",
        image: "/projects/watch-match-showcase.png",
    },
] as const;

export const CONTACT_SUBJECTS = [
    "Consulting Inquiry",
    "Fractional Leadership",
    "Speaking Opportunity",
    "Collaboration",
    "General Question",
    "Other",
] as const;
