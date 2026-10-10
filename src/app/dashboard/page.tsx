"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/features/auth/hooks";
import { Loader2 } from "lucide-react";

export default function DashboardRootPage() {
    const router = useRouter();

    const { data: user, isPending, isError } = useAuthUser();

    useEffect(() => {
        if (isPending) return;

        if (isError || !user) {
            router.replace("/login");
            return;
        }

        const targetWorkspace = user.activeRole.toLowerCase();
        router.replace(`/dashboard/${targetWorkspace}`);

    }, [isPending, isError, user, router]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-slate-50">
            <Loader2 className="size-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-slate-500 tracking-wide">
                Resolving active workspace segment...
            </p>
        </div>
    );
}
