import React from "react";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-slate-50">
            <Loader2 className="size-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-slate-500 tracking-wide">
                Loading CodeShift workspace...
            </p>
        </div>
    );
}
