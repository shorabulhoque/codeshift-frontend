"use client";

import { useAuthUser } from "@/features/auth/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { UserRole } from "@/types/models";
import AuthLoading from "./auth-loading";
import AccessDenied from "./access-denied";

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const router = useRouter();
    const { data: user, isPending, isError } = useAuthUser();
    const isAuthorized = !!user && allowedRoles.includes(user.activeRole);

    useEffect(() => {
        if (isPending) return;

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

    if (isAuthorized) {
        return <>{children}</>;
    }

    return <AccessDenied />;
}
