"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorBoundary({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        console.error("Runtime Application Error Logged:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <AlertCircle className="mx-auto size-10 text-red-500" />

                <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                    Something went wrong!
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    An unexpected error occurred while parsing this application segment view.
                </p>

                {/* Retry Trigger Module */}
                <div className="mt-6">
                    <Button
                        onClick={() => reset()}
                        className="inline-flex items-center gap-2 font-semibold"
                    >
                        <RotateCcw className="size-4" />
                        Try Re-rendering View
                    </Button>
                </div>
            </div>
        </div>
    );
}
