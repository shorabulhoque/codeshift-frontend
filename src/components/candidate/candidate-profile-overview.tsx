"use client";

import React from "react";
import { useAuthUser } from "@/features/auth/hooks";
import { Loader2, Mail, User, ShieldCheck } from "lucide-react";

export default function CandidateProfileOverview() {
    const { data: user, isPending, isError } = useAuthUser();
    console.log(user);
    if (isPending) {
        return (
            <div className="flex h-48 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
                Failed to load profile data. Please refresh or log in again.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Heading Section */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
                <p className="text-sm text-slate-500">Welcome to your CodeShift assessment workspace</p>
            </div>

            {/* Profile Information Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Full Name Display */}
                    <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                        <User className="size-5 text-indigo-600 shrink-0" />
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Full Name</p>
                            <p className="text-sm font-semibold text-slate-800">
                                {user.candidateProfile?.fullName || "Candidate"}
                            </p>
                        </div>
                    </div>

                    {/* display email address */}
                    <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                        <Mail className="size-5 text-indigo-600 shrink-0" />
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</p>
                            <p className="text-sm font-semibold text-slate-800">{user.email}</p>
                        </div>
                    </div>

                    {/* Active Roll Display */}
                    <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                        <ShieldCheck className="size-5 text-indigo-600 shrink-0" />
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Workspace</p>
                            <p className="text-sm font-semibold text-slate-800">{user.activeRole}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
