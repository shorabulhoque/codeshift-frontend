"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, BriefcasePlus } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types/models";
import { adminRoutes, candidateRoutes, recruiterRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.type";
import Logo from "../shared/logo";
import { authApi } from "@/features/auth/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
    ADMIN: adminRoutes,
    RECRUITER: recruiterRoutes,
    CANDIDATE: candidateRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
    const pathname = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient();

    const routes: SidebarItems = sidebarRoutes[role] || [];

    const handleLogout = async () => {
        try {
            await authApi.logout();

            queryClient.clear();

            toast.add({
                title: "Logged Out",
                description: "You have been securely signed out.",
                type: "success",
            });

            router.push("/login");
            router.refresh();
        } catch (error) {
            toast.add({
                title: "Logout Failed",
                description: "Could not clear security session. Try again.",
                type: "error",
            });
        }
    };

    return (
        <Sidebar>
            {/* sidebar header: logo area */}
            <SidebarHeader>
                <Link href="/">
                    <div className="flex items-center gap-2 p-1">
                        <Logo />
                    </div>
                </Link>
            </SidebarHeader>

            {/* Sidebar content: Main menu items */}
            <SidebarContent>
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={pathname === item.url}
                                        >
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Sidebar Footer: "Become a Recruiter" and "Logout" button area */}
            <SidebarFooter className="p-4 border-t border-slate-100 space-y-2">
                <SidebarMenu>

                    {/* Conditional Button: This option will show only if the candidate is logged in */}
                    {role === "CANDIDATE" && (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                render={<Link href="/dashboard/candidate/apply-recruiter" />}
                                isActive={pathname === "/dashboard/candidate/apply-recruiter"}
                                className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium transition-colors"
                            >
                                <BriefcasePlus className="size-4 shrink-0" />
                                <span>Become a Recruiter</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}

                    {/* Global logout button (common for everyone) */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium transition-colors"
                        >
                            <LogOut className="size-4 shrink-0" />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
