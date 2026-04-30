"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

const CONTACT_TRIGGER_ID = "homepage-contact-trigger";

export default function StickyContactBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const trigger = document.getElementById(CONTACT_TRIGGER_ID);

        if (!trigger) {
            return;
        }

        const updateVisibility = () => {
            const triggerRect = trigger.getBoundingClientRect();
            setIsVisible(triggerRect.bottom < 0);
        };
        let animationFrame = 0;

        const handleScroll = () => {
            if (animationFrame) {
                return;
            }

            animationFrame = window.requestAnimationFrame(() => {
                updateVisibility();
                animationFrame = 0;
            });
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(false);
                    return;
                }

                setIsVisible(entry.boundingClientRect.bottom < 0);
            },
            { threshold: 0 }
        );

        observer.observe(trigger);
        updateVisibility();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateVisibility);

        return () => {
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateVisibility);
        };
    }, []);

    return (
        <aside
            aria-label="Contact shortcut"
            className={`fixed inset-x-0 bottom-0 z-40 px-0 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-all duration-300 ease-out motion-reduce:transition-opacity motion-reduce:duration-150 md:px-3 ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-6 opacity-0"
            }`}
        >
            <div className="mx-auto flex w-full max-w-none items-center justify-between gap-3 border-t border-white/70 bg-white/75 px-5 py-3 shadow-[0_-16px_40px_-24px_rgba(15,23,42,0.55)] backdrop-blur-md sm:gap-4 md:max-w-2xl md:rounded-full md:border md:px-6">
                <p className="min-w-0 flex-1 text-left text-sm font-medium leading-snug text-primary-900 sm:text-base">
                    Let&apos;s build something great together.
                </p>
                <a
                    href="/contact"
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-end rounded-full bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-7"
                >
                    <Icon name="mail" className="h-[18px] w-[18px]" />
                    Contact Me
                </a>
            </div>
        </aside>
    );
}
