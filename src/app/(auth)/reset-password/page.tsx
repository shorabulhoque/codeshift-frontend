"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";

function ResetPasswordContent() {
    // Extracting the email parameter from the URL
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    // Send to forget-password page for security if no email
    useEffect(() => {
        if (!email) {
            router.replace("/forgot-password");
        }
    }, [email, router]);

    if (!email) {
        return null;
    }

    return <ResetPasswordForm email={email} />;
}

export default function ResetPasswordPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            {/* Use of Suspense boundary is mandatory according to Next-JS rules for using searchParams */}
            <Suspense fallback={<div className="text-center font-medium">Loading Form Context...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </main>
    );
}
