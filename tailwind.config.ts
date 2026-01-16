import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand color - Forest Green
                primary: {
                    50: '#f0f7f2',
                    100: '#dceee1',
                    200: '#bbdcc6',
                    300: '#8ec4a0',
                    400: '#5fa676',
                    500: '#4A7C59',  // Main primary
                    600: '#3d6849',
                    700: '#32533c',
                    800: '#2a4332',
                    900: '#24382b',
                    950: '#111f17',
                },
                // Stitch accent colors
                accent: {
                    blue: '#7FB3D5',
                    yellow: '#F9E79F',
                    green: '#A9DFBF',
                },
                // Background colors
                background: {
                    light: '#FAFAF9',
                    dark: '#0F172A',
                },
                // Watercolor-inspired accent palette (keep for compatibility)
                watercolor: {
                    rose: '#fce7f3',
                    peach: '#ffedd5',
                    lavender: '#ede9fe',
                    mint: '#d1fae5',
                    sky: '#e0f2fe',
                    cream: '#fefce8',
                },
                // Neutral tones
                surface: {
                    light: '#fafafa',
                    DEFAULT: '#f5f5f5',
                    dark: '#171717',
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'Georgia', 'serif'],
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                'hover': '0 20px 50px -12px rgba(0, 0, 0, 0.15), 0 30px 40px -10px rgba(0, 0, 0, 0.1)',
            },
            backgroundImage: {
                'watercolor-gradient': 'radial-gradient(ellipse at top left, rgba(252, 231, 243, 0.5) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(224, 242, 254, 0.5) 0%, transparent 50%), radial-gradient(ellipse at bottom center, rgba(237, 233, 254, 0.5) 0%, transparent 50%)',
                'hero-gradient': 'linear-gradient(135deg, rgba(250, 250, 250, 1) 0%, rgba(245, 245, 245, 1) 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
