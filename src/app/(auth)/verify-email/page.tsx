"use client";

import { VerifyAccountForm } from "@/components/auth/verify-account-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    useEffect(() => {
        if (!email) {
            router.replace("/register");
        }
    }, [email, router]);

    if (!email) {
        return null;
    }

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
                <p className="text-sm text-muted-foreground mt-2">
                    We have sent a 6-digit verification code to{" "}
                    <span className="font-semibold text-foreground">{email}</span>
                </p>
            </div>
            <VerifyAccountForm email={email} />
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}