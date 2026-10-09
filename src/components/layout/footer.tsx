"use client";

import Link from "next/link";
import Logo from "@/assets/svg/Logo";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerNavigation = {
        platform: [
            { name: "Browse Jobs", href: "/jobs" },
            { name: "Companies", href: "/about" },
            { name: "Candidates", href: "/about" },
            { name: "Pricing", href: "/contact" },
        ],
        resources: [
            { name: "Documentation", href: "#" },
            { name: "Career Blog", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Contact Us", href: "/contact" },
            { name: "Careers", href: "#" },
            { name: "Press", href: "#" },
        ],
    };

    return (
        <footer className="w-full border-t border-border bg-background/95 text-foreground/80">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Logo />
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                CodeShift
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Connecting world-class engineering talent with high-growth technology companies worldwide.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                            Platform
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerNavigation.platform.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                            Resources
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerNavigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerNavigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright Area */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {currentYear} CodeShift Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}