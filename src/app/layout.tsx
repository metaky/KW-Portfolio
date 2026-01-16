import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kyle Wegner | Strategy & Software Development",
    description:
        "Portfolio of Kyle Wegner - Marketing strategist and indie software developer. Specializing in brand strategy, CRM, and creating thoughtful digital products.",
    keywords: [
        "Kyle Wegner",
        "Marketing Strategy",
        "Software Development",
        "Brand Strategy",
        "CRM",
        "Fractional Leadership",
    ],
    authors: [{ name: "Kyle Wegner" }],
    openGraph: {
        title: "Kyle Wegner | Strategy & Software Development",
        description:
            "Marketing strategist and indie software developer creating thoughtful digital products.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kyle Wegner | Strategy & Software Development",
        description:
            "Marketing strategist and indie software developer creating thoughtful digital products.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <head>
                {/* Material Symbols Outlined font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col bg-background-light" suppressHydrationWarning>
                {/* SVG Filters for watercolor effects */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="liquid">
                            <feTurbulence baseFrequency="0.02" numOctaves={3} result="noise" type="fractalNoise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale={15} />
                        </filter>
                    </defs>
                </svg>

                {/* Fixed watercolor background */}
                <div className="fixed inset-0 watercolor-bg pointer-events-none" aria-hidden="true" />

                <Header />
                <main className="flex-1 relative">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
