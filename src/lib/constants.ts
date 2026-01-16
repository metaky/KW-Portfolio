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
        description: "Driving brand loyalty in fast-paced Consumer Packaged Goods through omnichannel strategy.",
        color: "yellow",
    },
    {
        name: "Financial Services",
        icon: "account_balance",
        description: "Navigating complex regulations to deliver customer-centric digital banking experiences.",
        color: "blue",
    },
    {
        name: "Pharmaceutical",
        icon: "prescriptions",
        description: "Synthesizing clinical data into patient-first narratives that build trust and drive outcomes.",
        color: "green",
    },
    {
        name: "US Army",
        icon: "military_tech",
        description: "Honorable service instilling leadership and strategic planning under high-pressure conditions.",
        color: "primary",
    },
    {
        name: "Retail",
        icon: "storefront",
        description: "Optimizing customer journeys to increase conversion and lifetime value across storefronts.",
        color: "yellow",
    },
    {
        name: "Technology",
        icon: "devices",
        description: "Bridging the gap between engineering and end-users with intuitive product design.",
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
        description: "Custom app development and campaign execution for specific initiatives.",
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
        description: "Acting CMO or Product Head for startups needing executive-level guidance.",
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
        description: "A thoughtful approach to personal goal-setting and habit tracking. Built for the neurodivergent community with a focus on flexibility over rigid scheduling.",
        longDescription: "Declarative reimagines productivity for minds that don't fit the mold. Instead of prescriptive schedules and guilt-inducing streaks, it focuses on intentions and celebrates progress in all its forms.",
        techStack: ["React Native", "TypeScript", "Expo", "Firebase"],
        externalUrl: "https://declarativeapp.org",
        buttonText: "See App",
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
        description: "An advocacy resource for parents navigating the IEP process for children with PDA (Pathological Demand Avoidance) profile autism.",
        longDescription: "Created to help families advocate effectively for their children's educational needs. Provides templates, guidance, and community support for navigating the often complex IEP process.",
        techStack: ["Next.js", "Tailwind CSS", "Supabase"],
        externalUrl: "https://PDAyourIEP.org",
        buttonText: "View Site",
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
        description: "A social entertainment app that helps groups decide what to watch together by finding the perfect match based on everyone's preferences.",
        longDescription: "Tired of spending more time deciding what to watch than actually watching? Watch Match solves the group decision paralysis by aggregating preferences and surfacing content everyone will enjoy.",
        techStack: ["SwiftUI", "TMDB API", "Firebase"],
        externalUrl: null,
        buttonText: null,
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
