"use client";

import { useAuthUser } from "@/features/auth/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";


export default function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { data: user, isPending, isError } = useAuthUser();

    useEffect(() => {
        if (isPending) {
            return
        }

        if (isError || !user) {
            router.replace("/login");
        }
    }, [isPending, isError, user, router]);

    if (isPending) {
        return <AuthLoading />;
    }

    if (isError || !user) {
        return <AuthLoading label="Redirecting..." />;
    }

    return (<>{children}</>);
}