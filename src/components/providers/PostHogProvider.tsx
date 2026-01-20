'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Initialize PostHog
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false, // We capture pageviews manually for Next.js
        capture_pageleave: true,
    });
}

// Component to track page views
function PostHogPageView(): null {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    useEffect(() => {
        if (pathname && posthog) {
            let url = window.origin + pathname;
            if (searchParams.toString()) {
                url = url + '?' + searchParams.toString();
            }
            posthog.capture('$pageview', { $current_url: url });
        }
    }, [pathname, searchParams, posthog]);

    return null;
}

// Wrapper component for Suspense boundary
function SuspendedPostHogPageView() {
    return (
        <Suspense fallback={null}>
            <PostHogPageView />
        </Suspense>
    );
}

export default function PostHogProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView />
            {children}
        </PHProvider>
    );
}
