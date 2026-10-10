import AuthGuard from "@/components/auth/auth-guard";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function CandidateDashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <RoleGuard allowedRoles={["CANDIDATE"]}>
                <DashboardShell role="CANDIDATE">
                    {children}
                </DashboardShell>
            </RoleGuard>
        </AuthGuard>
    );
}