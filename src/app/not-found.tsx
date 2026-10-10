import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function GlobalNotFound() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md text-center">
                <FileQuestion className="mx-auto size-14 text-indigo-600 animate-bounce" />

                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
                    404 - Page Not Found
                </h1>

                <p className="mt-3 text-base text-slate-500">
                    The requested page address does not exist or has been shifted permanently onto another context.
                </p>

                {/* Workspace Redirect Route Link */}
                <div className="mt-8">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Return back to Authentication Space
                    </Link>
                </div>
            </div>
        </div>
    );
}
