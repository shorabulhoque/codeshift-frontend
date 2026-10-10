import AuthGuard from "@/components/auth/auth-guard";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardShell role="ADMIN">
                    {children}
                </DashboardShell>
            </RoleGuard>
        </AuthGuard>
    );
}