import type { ReactNode, SVGProps } from "react";

export type IconName =
    | "accessibility_new"
    | "account_balance"
    | "analytics"
    | "arrow_downward"
    | "arrow_forward"
    | "business_center"
    | "campaign"
    | "devices"
    | "forum"
    | "gavel"
    | "groups"
    | "handshake"
    | "hub"
    | "lightbulb"
    | "loyalty"
    | "mail"
    | "military_tech"
    | "movie"
    | "prescriptions"
    | "psychology"
    | "query_stats"
    | "record_voice_over"
    | "school"
    | "shopping_basket"
    | "storefront"
    | "terminal"
    | "translate"
    | "volunteer_activism";

type IconProps = SVGProps<SVGSVGElement> & {
    name: IconName;
};

function BaseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        />
    );
}

const iconPaths: Record<IconName, ReactNode> = {
    accessibility_new: (
        <>
            <circle cx="12" cy="4.5" r="2.2" />
            <path d="M6.5 10.5h11" />
            <path d="m12 8.5-2.5 5.5" />
            <path d="m12 8.5 2.5 5.5" />
            <path d="m9.5 21 1.4-6" />
            <path d="m14.5 21-1.4-6" />
        </>
    ),
    account_balance: (
        <>
            <path d="M3 9h18" />
            <path d="M5 9v8" />
            <path d="M10 9v8" />
            <path d="M14 9v8" />
            <path d="M19 9v8" />
            <path d="M2 20h20" />
            <path d="m12 3 9 4H3l9-4Z" />
        </>
    ),
    analytics: (
        <>
            <path d="M4 19h16" />
            <path d="M7 16V10" />
            <path d="M12 16V6" />
            <path d="M17 16v-3" />
        </>
    ),
    arrow_downward: <path d="M12 5v14m0 0 5-5m-5 5-5-5" />,
    arrow_forward: <path d="M5 12h14m0 0-5-5m5 5-5 5" />,
    business_center: (
        <>
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
            <path d="M3 12h18" />
        </>
    ),
    campaign: (
        <>
            <path d="m4 12 10-5v10L4 12Z" />
            <path d="M14 10h2a3 3 0 0 1 0 6h-2" />
            <path d="m7 14 1.5 5" />
        </>
    ),
    devices: (
        <>
            <rect x="3" y="5" width="14" height="10" rx="1.5" />
            <path d="M8 19h4" />
            <rect x="18" y="8" width="3" height="9" rx="1" />
        </>
    ),
    forum: (
        <>
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5v5A2.5 2.5 0 0 1 14.5 14H9l-4 3v-3.5A2.5 2.5 0 0 1 4 11.5Z" />
            <path d="M13 8h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2l-3 2v-2" />
        </>
    ),
    gavel: (
        <>
            <path d="m13 5 6 6" />
            <rect x="11" y="3" width="5" height="3" rx="1" transform="rotate(45 13.5 4.5)" />
            <rect x="6" y="8" width="5" height="3" rx="1" transform="rotate(45 8.5 9.5)" />
            <path d="M4 20h8" />
            <path d="m9 10-5 5" />
        </>
    ),
    groups: (
        <>
            <circle cx="9" cy="8" r="2.5" />
            <circle cx="16.5" cy="9.5" r="2" />
            <path d="M4 18a5 5 0 0 1 10 0" />
            <path d="M14 18a3.5 3.5 0 0 1 7 0" />
        </>
    ),
    handshake: (
        <>
            <path d="m4.5 11.5 3-3a2.5 2.5 0 0 1 3.5 0l1 1" />
            <path d="m19.5 11.5-3-3a2.5 2.5 0 0 0-3.5 0l-1 1" />
            <path d="m8 12 2.2 2.2a1.5 1.5 0 0 0 2.1 0l1.7-1.7a1.5 1.5 0 0 1 2.1 0L18 14.4" />
            <path d="m6 13.5 2 2" />
        </>
    ),
    hub: (
        <>
            <circle cx="12" cy="12" r="2.2" />
            <circle cx="5" cy="7" r="1.6" />
            <circle cx="19" cy="7" r="1.6" />
            <circle cx="5" cy="17" r="1.6" />
            <circle cx="19" cy="17" r="1.6" />
            <path d="M10.3 10.7 6.4 8.3" />
            <path d="m13.7 10.7 3.9-2.4" />
            <path d="m10.3 13.3-3.9 2.4" />
            <path d="m13.7 13.3 3.9 2.4" />
        </>
    ),
    lightbulb: (
        <>
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M8.5 14.5A5.5 5.5 0 1 1 15.5 14.5c-.8.7-1.5 1.8-1.5 3h-4c0-1.2-.7-2.3-1.5-3Z" />
        </>
    ),
    loyalty: (
        <>
            <path d="m12 21-7-7a4.5 4.5 0 1 1 6.4-6.3L12 8.3l.6-.6A4.5 4.5 0 1 1 19 14l-7 7Z" />
        </>
    ),
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </>
    ),
    military_tech: (
        <>
            <path d="m12 3 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3Z" />
            <path d="M12 14v7" />
            <path d="M9 21h6" />
        </>
    ),
    movie: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 5v14" />
            <path d="M17 5v14" />
            <path d="M3 9h4" />
            <path d="M17 9h4" />
            <path d="M3 15h4" />
            <path d="M17 15h4" />
        </>
    ),
    prescriptions: (
        <>
            <path d="m8 5 8 8" />
            <path d="m16 5-8 8" />
            <path d="M9 15h6a3 3 0 0 1 0 6H9a3 3 0 0 1 0-6Z" />
            <path d="M9 3h6a3 3 0 0 1 0 6H9a3 3 0 0 1 0-6Z" />
        </>
    ),
    psychology: (
        <>
            <path d="M9 18a6 6 0 1 1 6.8-9.9A5 5 0 1 1 15 18" />
            <path d="M10 10a2 2 0 1 1 4 0c0 1.3-1 1.7-1.7 2.2-.5.3-.8.7-.8 1.3" />
            <circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none" />
        </>
    ),
    query_stats: (
        <>
            <path d="M4 19h16" />
            <path d="m6 15 4-4 3 3 5-6" />
            <path d="m15 8 3-.2-.2 3" />
        </>
    ),
    record_voice_over: (
        <>
            <circle cx="9" cy="8" r="2.5" />
            <path d="M4 18a5 5 0 0 1 10 0" />
            <path d="M17 9a3 3 0 0 1 0 6" />
            <path d="M19.5 7a5.5 5.5 0 0 1 0 10" />
        </>
    ),
    school: (
        <>
            <path d="m3 9 9-5 9 5-9 5-9-5Z" />
            <path d="M7 11.5V15c0 1.5 2.2 3 5 3s5-1.5 5-3v-3.5" />
        </>
    ),
    shopping_basket: (
        <>
            <path d="M5 10h14l-1.5 9h-11Z" />
            <path d="M9 10 12 5l3 5" />
        </>
    ),
    storefront: (
        <>
            <path d="M4 8h16" />
            <path d="M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
            <path d="M6 10v9" />
            <path d="M18 10v9" />
            <path d="M9 19v-5h6v5" />
        </>
    ),
    terminal: (
        <>
            <path d="m5 7 4 4-4 4" />
            <path d="M11 15h8" />
        </>
    ),
    translate: (
        <>
            <path d="M4 6h10" />
            <path d="M9 4v2a9 9 0 0 1-4 7" />
            <path d="m6 9 3 3 3-3" />
            <path d="M14 18h6" />
            <path d="m17 8 4 10" />
            <path d="m15.5 14h3" />
        </>
    ),
    volunteer_activism: (
        <>
            <path d="m12 20-6.2-6.1a3.9 3.9 0 0 1 5.5-5.5L12 9l.7-.7a3.9 3.9 0 0 1 5.5 5.5Z" />
            <path d="M4 18c1.5-1.8 3.3-2.7 5.3-2.7" />
            <path d="M20 18c-1.5-1.8-3.3-2.7-5.3-2.7" />
        </>
    ),
};

export default function Icon({ name, className, ...props }: IconProps) {
    return (
        <BaseIcon
            className={["inline-block shrink-0", className].filter(Boolean).join(" ")}
            {...props}
        >
            {iconPaths[name]}
        </BaseIcon>
    );
}
