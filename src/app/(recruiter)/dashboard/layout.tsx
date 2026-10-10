import AuthGuard from "@/components/auth/auth-guard";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function RecruiterDashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <RoleGuard allowedRoles={["RECRUITER"]}>
                <DashboardShell role="RECRUITER">
                    {children}
                </DashboardShell>
            </RoleGuard>
        </AuthGuard>
    );
}