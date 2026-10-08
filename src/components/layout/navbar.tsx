"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {

    const routes = [
        { name: "Home", url: "/" },
        { name: "Jobs", url: "/jobs" },
        { name: "About", url: "/about" },
        { name: "Contact", url: "/contact" },
    ]
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Left: Logo and Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            CodeShift
                        </span>
                    </Link>
                </div>

                {/* Middle: Desktop Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.url}
                            href={route.url}
                            className="transition-colors hover:text-primary text-foreground/80"
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>

                {/* Right: Auth Button or Profile Icon */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        "user"
                    ) : (
                        <Button size="sm" className="bg-blue-600">
                            Login
                        </Button>
                    )}
                </div>

            </div>
        </header>
    );
}
