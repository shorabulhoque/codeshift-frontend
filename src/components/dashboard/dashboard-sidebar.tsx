"use client"
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
    SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/svg/Logo"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/models";
import { adminRoutes, candidateRoutes, recruiterRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.type";

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
    ADMIN: adminRoutes,
    RECRUITER: recruiterRoutes,
    CANDIDATE: candidateRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
    const pathname = usePathname();
    const routes: SidebarItems = sidebarRoutes[role] || [];

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <span className="shimmer-color-blue-400">PH Healthcare</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={pathname === item.url}>
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};
