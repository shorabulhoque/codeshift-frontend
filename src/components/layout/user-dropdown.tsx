"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CurrentUser } from "@/features/auth/types";

interface UserDropdownProps {
    user: CurrentUser;
}

export function UserDropdown({ user }: UserDropdownProps) {
    const router = useRouter();

    const getInitials = (name?: string) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const dashboardUrl = user.activeRole
        ? `/dashboard/${user.activeRole.toLowerCase()}`
        : "/dashboard";

    const handleLogout = async () => {
        router.push("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative size-9 rounded-full outline-none">
                <Avatar className="size-9">
                    <AvatarImage src={user.candidateProfile?.avatar || ""} alt={user.email} />
                    <AvatarFallback className="bg-primary/10 font-medium text-primary">
                        {getInitials(user.candidateProfile?.fullName || user.email)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user.candidateProfile?.fullName || "User Account"}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground truncate">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push(dashboardUrl)} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 size-4" />
                    <span>Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push(`${dashboardUrl}/profile`)} className="cursor-pointer">
                    <UserIcon className="mr-2 size-4" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}