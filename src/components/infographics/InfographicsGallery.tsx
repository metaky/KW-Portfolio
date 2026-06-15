"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

export type InfographicItem = {
    id: string;
    template: string;
    title: string;
    shortTitle?: string;
    domain: string;
    tags: string[];
    description: string;
    alt: string;
    image: string;
    download: string;
    thumbnail?: string;
    accent: "green" | "blue" | "yellow" | string;
    thesis?: string;
    shift?: {
        label: string;
        from: string;
        to: string;
        note: string;
    };
    steps?: Array<{
        title: string;
        body: string;
    }>;
    values?: string[];
    starter?: string;
    note?: string;
};

type InfographicsGalleryProps = {
    items: InfographicItem[];
};

const accentClasses: Record<string, { tag: string; glow: string; ring: string }> = {
    green: {
        tag: "bg-primary-50 text-primary-700 border-primary-100",
        glow: "from-primary-200/50 via-accent-green/30 to-transparent",
        ring: "focus-visible:ring-primary-500",
    },
    blue: {
        tag: "bg-blue-50 text-blue-700 border-blue-100",
        glow: "from-accent-blue/40 via-sky-100/50 to-transparent",
        ring: "focus-visible:ring-blue-500",
    },
    yellow: {
        tag: "bg-yellow-50 text-yellow-800 border-yellow-100",
        glow: "from-accent-yellow/50 via-amber-100/40 to-transparent",
        ring: "focus-visible:ring-yellow-600",
    },
};

function getAccent(accent: string) {
    return accentClasses[accent] || accentClasses.green;
}

function buildShareUrl(id: string) {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}#${id}`;
}

export default function InfographicsGallery({ items }: InfographicsGalleryProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [status, setStatus] = useState("");
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    const activeIndex = useMemo(
        () => items.findIndex((item) => item.id === activeId),
        [activeId, items],
    );
    const activeItem = activeIndex >= 0 ? items[activeIndex] : null;

    const openItem = useCallback((id: string) => {
        setActiveId(id);
        setStatus("");
        window.history.replaceState(null, "", `#${id}`);
    }, []);

    const closeLightbox = useCallback(() => {
        setActiveId(null);
        setStatus("");
        window.history.replaceState(null, "", window.location.pathname);
    }, []);

    const move = useCallback(
        (direction: -1 | 1) => {
            if (!activeItem) return;
            const nextIndex = (activeIndex + direction + items.length) % items.length;
            openItem(items[nextIndex].id);
        },
        [activeIndex, activeItem, items, openItem],
    );

    const copyLink = useCallback(async (item: InfographicItem) => {
        const url = buildShareUrl(item.id);
        await navigator.clipboard.writeText(url);
        setStatus("Copied page link");
    }, []);

    const copyImage = useCallback(async (item: InfographicItem) => {
        try {
            const response = await fetch(item.download);
            const blob = await response.blob();
            const ClipboardItemCtor = window.ClipboardItem;

            if (!ClipboardItemCtor || !navigator.clipboard?.write) {
                await navigator.clipboard.writeText(`${window.location.origin}${item.download}`);
                setStatus("Copied image URL");
                return;
            }

            await navigator.clipboard.write([
                new ClipboardItemCtor({
                    [blob.type]: blob,
                }),
            ]);
            setStatus("Copied image");
        } catch {
            await navigator.clipboard.writeText(`${window.location.origin}${item.download}`);
            setStatus("Copied image URL");
        }
    }, []);

    useEffect(() => {
        const idFromHash = window.location.hash.replace("#", "");
        if (idFromHash && items.some((item) => item.id === idFromHash)) {
            setActiveId(idFromHash);
        }
    }, [items]);

    useEffect(() => {
        if (!activeItem) return;

        closeButtonRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") move(-1);
            if (event.key === "ArrowRight") move(1);
            if (event.key === "Tab") {
                const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
                );
                if (!focusable?.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [activeItem, closeLightbox, move]);

    return (
        <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item, index) => {
                    const accent = getAccent(item.accent);
                    const previewImage = item.thumbnail || item.image.replace(".png", "-thumb.png");
                    return (
                        <article
                            key={item.id}
                            id={item.id}
                            className={`group relative ${index % 3 === 1 ? "xl:mt-10" : index % 3 === 2 ? "xl:mt-4" : ""}`}
                        >
                            <div
                                className={`absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-br ${accent.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100`}
                                aria-hidden="true"
                            />
                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-[0.35deg] group-hover:shadow-hover">
                                <button
                                    type="button"
                                    onClick={() => openItem(item.id)}
                                    className={`block w-full text-left focus-visible:outline-none focus-visible:ring-4 ${accent.ring}`}
                                    aria-label={`View ${item.title}`}
                                >
                                    <div className="relative aspect-[2/3] overflow-hidden bg-stone-100">
                                        <Image
                                            src={previewImage}
                                            alt={item.alt}
                                            width={800}
                                            height={1200}
                                            loading="eager"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                                            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 92vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/18 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    </div>
                                </button>

                                <div className="space-y-4 p-5">
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${accent.tag}`}>
                                            {item.domain}
                                        </span>
                                        {item.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div>
                                        <h2 className="font-serif text-2xl font-semibold text-gray-950">
                                            {item.shortTitle || item.title}
                                        </h2>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => openItem(item.id)}
                                            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/30"
                                        >
                                            View
                                            <Icon name="arrow_forward" className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => copyImage(item)}
                                            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20"
                                        >
                                            Copy image
                                        </button>
                                        <a
                                            href={item.download}
                                            download
                                            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {activeItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="infographic-lightbox-title"
                    ref={dialogRef}
                    className="fixed inset-0 z-[80] flex flex-col bg-stone-950/70 p-3 backdrop-blur-sm sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeLightbox();
                    }}
                >
                    <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-2xl border border-white/40 bg-[#fffaf0] shadow-hover">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white/80 px-4 py-3 sm:px-5">
                            <div className="min-w-0">
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-700">
                                    {activeItem.domain}
                                </p>
                                <h2
                                    id="infographic-lightbox-title"
                                    className="truncate font-serif text-xl font-semibold text-gray-950 sm:text-2xl"
                                >
                                    {activeItem.title}
                                </h2>
                            </div>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={closeLightbox}
                                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/25"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid min-h-0 flex-1 gap-4 overflow-auto p-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:overflow-hidden lg:p-5">
                            <div className="relative flex min-h-[60vh] items-center justify-center overflow-auto rounded-xl bg-stone-100/70 p-3">
                                <Image
                                    src={activeItem.image}
                                    alt={activeItem.alt}
                                    width={1600}
                                    height={2400}
                                    className="h-auto max-h-[78vh] w-auto rounded-lg shadow-soft-lg"
                                    priority
                                />
                            </div>

                            <aside className="flex flex-col gap-4 lg:overflow-auto">
                                <p className="text-base leading-7 text-gray-700">
                                    {activeItem.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {activeItem.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {activeItem.thesis && (
                                    <section className="rounded-xl border border-primary-100 bg-white/70 p-4">
                                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                                            Core Idea
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-gray-700">
                                            {activeItem.thesis}
                                        </p>
                                    </section>
                                )}
                                {activeItem.shift && (
                                    <section className="rounded-xl border border-gray-200 bg-white/70 p-4">
                                        <h3 className="font-serif text-lg font-semibold text-gray-950">
                                            {activeItem.shift.label}
                                        </h3>
                                        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
                                            <div className="rounded-lg bg-stone-50 p-3">
                                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                                                    From
                                                </p>
                                                <p className="mt-1 leading-5 text-gray-700">
                                                    {activeItem.shift.from}
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-primary-50 p-3">
                                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">
                                                    To
                                                </p>
                                                <p className="mt-1 leading-5 text-gray-700">
                                                    {activeItem.shift.to}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm font-semibold leading-6 text-gray-700">
                                            {activeItem.shift.note}
                                        </p>
                                    </section>
                                )}
                                {activeItem.steps?.length ? (
                                    <section className="rounded-xl border border-gray-200 bg-white/70 p-4">
                                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                                            Steps
                                        </h3>
                                        <ol className="mt-3 space-y-3">
                                            {activeItem.steps.map((step, index) => (
                                                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3 text-sm">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-950 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                    <span>
                                                        <span className="block font-bold text-gray-950">{step.title}</span>
                                                        <span className="mt-1 block leading-5 text-gray-600">{step.body}</span>
                                                    </span>
                                                </li>
                                            ))}
                                        </ol>
                                    </section>
                                ) : null}
                                {(activeItem.starter || activeItem.note) && (
                                    <section className="rounded-xl border border-primary-100 bg-primary-50/70 p-4">
                                        {activeItem.starter && (
                                            <>
                                                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                                                    Try This First
                                                </h3>
                                                <p className="mt-2 text-sm font-semibold leading-6 text-gray-800">
                                                    {activeItem.starter}
                                                </p>
                                            </>
                                        )}
                                        {activeItem.note && (
                                            <p className="mt-3 border-t border-primary-100 pt-3 text-sm leading-6 text-gray-700">
                                                {activeItem.note}
                                            </p>
                                        )}
                                    </section>
                                )}
                                <div className="grid gap-2">
                                    <a
                                        href={activeItem.download}
                                        download
                                        className="inline-flex justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/30"
                                    >
                                        Download infographic
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => copyImage(activeItem)}
                                        className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20"
                                    >
                                        Copy image
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => copyLink(activeItem)}
                                        className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20"
                                    >
                                        Copy page link
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => move(-1)}
                                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => move(1)}
                                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20"
                                    >
                                        Next
                                    </button>
                                </div>
                                <p className="min-h-6 text-sm font-semibold text-primary-700" aria-live="polite">
                                    {status}
                                </p>
                            </aside>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
