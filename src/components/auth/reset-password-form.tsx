"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { resetPasswordSchema, type ResetPasswordFormValues } from "@/features/auth/schema";
import { useResetPassword } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { ResetPasswordPayload } from "@/features/auth/types";

type ResetPasswordFormProps = Pick<ResetPasswordPayload, "email">;

export default function ResetPasswordForm({ email }: ResetPasswordFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const resetPasswordMutation = useResetPassword();

    const form = useForm({
        defaultValues: {
            email: email,
            otp: "",
            newPassword: "",
        } as ResetPasswordFormValues,
        validators: {
            onSubmit: resetPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                await resetPasswordMutation.mutateAsync(value);

                toast.add({
                    title: "Password Reset Successful",
                    description: "Your password has been changed. Redirecting to login...",
                    type: "success",
                });

                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } catch (error) {
                toast.add({
                    title: "Reset Failed",
                    description: getErrorMessage(error),
                    type: "error",
                });
            }
        },
    });

    return (
        <Card className="w-full max-w-md shadow-md bg-white">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Reset Password
                </CardTitle>
                <CardDescription>
                    Enter the 6-digit OTP code sent to your email and choose a strong new password
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
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
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
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
                                    {hasError && (
                                        <p className="text-xs font-medium text-destructive">
                                            {field.state.meta.errors[0]?.message}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    />

                    {/* New password input field */}
                    <form.Field
                        name="newPassword"
                        children={(field) => {
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="pr-10"
                                            aria-invalid={hasError}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                    {hasError && (
                                        <p className="text-xs font-medium text-destructive">
                                            {field.state.meta.errors[0]?.message}
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
                        disabled={resetPasswordMutation.isPending}
                    >
                        {resetPasswordMutation.isPending ? (
                            <><Loader2 className="mr-2 size-4 animate-spin" /> Resetting...</>
                        ) : (
                            "Reset Password"
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

// Helper function to handle back-end error responses
function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "data" in error) {
        const data = (error as any).data;
        if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
            return data.message;
        }
    }
    return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
