"use client";

import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

import { useVerifyEmail } from "@/features/auth/hooks";
import { verifyEmailSchema, type VerifyEmailFormValues } from "@/features/auth/schema";
import { VerifyEmailPayload } from "@/features/auth/types";

type VerifyAccountFormProps = Pick<VerifyEmailPayload, "email">;

export function VerifyAccountForm({ email }: VerifyAccountFormProps) {
    // To prepare Navigation and API Mutation Hook
    const router = useRouter();
    const verifyEmailMutation = useVerifyEmail();

    // Initializing TanStack Form
    const form = useForm({
        defaultValues: {
            email: email,
            otp: "",
        } as VerifyEmailFormValues,

        // Form validation using Zod Schema
        validators: {
            onSubmit: verifyEmailSchema,
        },

        // Form submit handler
        onSubmit: async ({ value }) => {
            try {
                // Calling the verification API
                await verifyEmailMutation.mutateAsync(value);

                // Displaying successful verification notification
                toast.add({
                    title: "Email Verified",
                    description: "Your account has been verified successfully. Redirecting to login...",
                    type: "success",
                });

                // Navigating to the login page with a 2-second delay
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } catch (error) {
                // Show error message as a toast if it fails
                toast.add({
                    title: "Verification Failed",
                    description: getErrorMessage(error),
                    type: "error",
                });
            }
        },
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-4"
        >
            {/* OTP input field */}
            <form.Field
                name="otp"
                children={(field) => {
                    // Checking error state
                    const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    const errorMessage = field.state.meta.errors[0]?.message;

                    return (
                        <div className="space-y-2">
                            <Label htmlFor={field.name}>Verification Code (OTP)</Label>

                            <Input
                                id={field.name}
                                name={field.name}
                                type="text"
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="text-center tracking-widest text-lg font-mono"
                                aria-invalid={hasError}
                            />

                            {/* Display error message */}
                            {hasError && (
                                <p className="text-xs font-medium text-destructive">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    );
                }}
            />

            {/* Submit button */}
            <Button
                type="submit"
                className="w-full font-semibold"
                disabled={verifyEmailMutation.isPending}
            >
                {verifyEmailMutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    "Verify Email"
                )}
            </Button>
        </form>
    );
}

// Helper function to extract backend error messages
function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "data" in error) {
        const data = (error as any).data;
        if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
            return data.message;
        }
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Failed to verify OTP. Please try again.";
}