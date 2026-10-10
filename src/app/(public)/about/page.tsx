import React from "react";
import Link from "next/link";
import { Terminal, Users, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <main className="w-full min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
                        <Terminal className="size-3.5" /> Core Mission
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Empowering the next generation of <span className="text-indigo-600">Backend Engineering</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        CodeShift is a highly technical developer assessment platform engineered to bridge the gap between abstract talent benchmarks and real-world execution.
                    </p>
                </div>

                {/* Core Values / Features Grid */}
                <div className="grid gap-6 sm:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
                        <div className="size-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <ShieldCheck className="size-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Production Environments</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            We don&apos;t just test for syntax. Candidates implement clean relational code bases against sandboxed deployment boundaries.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
                        <div className="size-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Users className="size-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Recruiter Visibility</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Recruiters leverage atomic transaction metrics, explicit version histories, and code snapshots to screen talent efficiently.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
                        <div className="size-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Trophy className="size-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Transparent Grading</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Automated checking suites combined with direct reviewer feedback loops establish a robust ecosystem for growth.
                        </p>
                    </div>
                </div>

                {/* Call to Action Container */}
                <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-md">
                    <div className="relative z-10 space-y-3">
                        <h2 className="text-2xl font-bold sm:text-3xl">Ready to evaluate your skills?</h2>
                        <p className="text-slate-400 text-sm max-w-lg mx-auto">
                            Join thousands of candidates proving their capability through standardized modular assignments today.
                        </p>
                        <div className="pt-4">
                            <Link href="/login">
                                <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold inline-flex items-center gap-2">
                                    Get Started <ArrowRight className="size-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Subtle decorative background gradient mesh */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
                </div>

            </div>
        </main>
    );
}
