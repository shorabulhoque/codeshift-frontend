"use client";

import React, { useEffect } from "react";
import { ShieldAlert } from "lucide-react";

interface RootEmergencyErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function RootEmergencyError({ error, reset }: RootEmergencyErrorProps) {
    useEffect(() => {
        console.error("Critical Root Layout Crash Observed:", error);
    }, [error]);

    return (
        <html lang="en" className="h-full">
            <body className="flex h-full w-full flex-col items-center justify-center bg-slate-900 px-4 text-center">
                <div className="max-w-md">
                    <ShieldAlert className="mx-auto size-12 text-red-500" />

                    <h1 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
                        Critical System Failure
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        A fatal exception occurred inside the core layout engine. Please perform a hard refresh on your client browser.
                    </p>

                    <button
                        onClick={() => reset()}
                        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition-colors"
                    >
                        Attempt Engine Recovery
                    </button>
                </div>
            </body>
        </html>
    );
}
