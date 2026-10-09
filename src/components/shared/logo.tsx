"use client";

// Class-based props support has been added to make the component dynamic
interface LogoProps {
    className?: string;
}

export default function Logo({ className = "size-8" }: LogoProps) {
    return (
        <div className="flex items-center gap-2.5">
            {/* 1. Logo Mark (SVG Icon) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                fill="none"
                className={className} // To pass Tailwind size (Default: size-8)
            >
                {/* Rounded square gradient background */}
                <rect width="40" height="40" rx="10" fill="url(#codeshift-grad)" />

                {/* Code shift backslash and bracket elements */}
                <path
                    d="M14 13L9 20L14 27"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21 27L26 20L21 13"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Shifting cursor or forward dot element */}
                <circle cx="29" cy="20" r="2.5" fill="#22C55E" />

                {/* Color Gradient Definition (Modern Violet to Indigo Indigo) */}
                <defs>
                    <linearGradient id="codeshift-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#4F46E5" />
                    </linearGradient>
                </defs>
            </svg>

            {/* 2. Logo Text Branding */}
            <span className="text-lg font-bold tracking-tight text-slate-900">
                Code<span className="text-indigo-600">Shift</span>
            </span>
        </div>
    );
}
