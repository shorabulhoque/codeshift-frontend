"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/features/auth/schema";
import { useForgotPassword } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const forgotPasswordMutation = useForgotPassword();

    const form = useForm({
        defaultValues: {
            email: "",
        } as ForgotPasswordFormValues,
        validators: {
            onSubmit: forgotPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                await forgotPasswordMutation.mutateAsync(value);

                toast.add({
                    title: "Reset Link Sent",
                    description: "A password reset OTP code has been sent to your email.",
                    type: "success",
                });

                router.push(`/reset-password?email=${encodeURIComponent(value.email)}`);
            } catch (error) {
                toast.add({
                    title: "Request Failed",
                    description: getErrorMessage(error),
                    type: "error",
                });
            }
        },
    });

    return (
        <Card className="w-full max-w-md shadow-md bg-white">
            {/* Card Header Section */}
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Forgot Password?
                </CardTitle>
                <CardDescription>
                    Enter your email address and we will send you a 6-digit OTP to reset your password
                </CardDescription>
            </CardHeader>

            {/* Card Body and Form Section */}
            <CardContent className="space-y-4">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Email input field */}
                    <form.Field
                        name="email"
                        children={(field) => {
                            // Checking the field's error state
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>Email Address</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        placeholder="name@example.com"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={hasError}
                                    />
                                    {hasError && (
                                        <p className="text-xs font-medium text-destructive">
                                            {field.state.meta.errors[0]?.message}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    />

                    {/* Submit button field */}
                    <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={forgotPasswordMutation.isPending}
                    >
                        {forgotPasswordMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Sending OTP...
                            </>
                        ) : (
                            "Send OTP Code"
                        )}
                    </Button>
                </form>

                {/* Link to return to the login page */}
                <div className="text-center text-sm">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

// A clean helper function for parsing back-end error responses
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
    return "Something went wrong. Please try again.";
}
