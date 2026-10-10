import React from "react";
import Link from "next/link";
import { Mail, MapPin, MessageSquare, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
    return (
        <main className="w-full min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header Context */}
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft className="size-3.5" /> Back to workspace root
                    </Link>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Get in touch with us</h1>
                    <p className="text-base text-slate-500 max-w-xl">
                        Have an issue regarding subscription pricing plans, transactional billing, or technical workspace environments? Drop us a note.
                    </p>
                </div>

                {/* Main Content Layout Grid */}
                <div className="grid gap-8 md:grid-cols-5">

                    {/* Left Hand Context Info Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5 shadow-sm">

                            {/* Contact Block 1 */}
                            <div className="flex gap-4">
                                <div className="size-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <Mail className="size-4.5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Support Desks</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">support@codeshift.com</p>
                                </div>
                            </div>

                            {/* Contact Block 2 */}
                            <div className="flex gap-4">
                                <div className="size-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <MessageSquare className="size-4.5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Platform Feedback</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">dev-relations@codeshift.com</p>
                                </div>
                            </div>

                            {/* Contact Block 3 */}
                            <div className="flex gap-4">
                                <div className="size-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <MapPin className="size-4.5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Headquarters</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Hinwil, Switzerland</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Hand Static Form Presentation Column */}
                    <div className="md:col-span-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="John" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Doe" type="text" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" placeholder="john@example.com" type="email" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="message">Message Context</Label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="How can our technical team assist you?"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-indigo-600 text-white font-semibold">
                                    Dispatch Message
                                </Button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
