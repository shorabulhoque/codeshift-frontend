"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { RegisterFormValues, registerSchema } from "@/features/auth/schema";
import { useRegister } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import GoogleLoginButton from "./google-login-button";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const registerMutation = useRegister();

    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        } as RegisterFormValues,
        validators: {
            onSubmit: registerSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                await registerMutation.mutateAsync(value);

                toast.add({
                    title: "Registration Successful",
                    description: "An OTP code has been sent to your email.",
                    type: "success",
                });

                router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
            } catch (error) {
                toast.add({
                    title: "Account Creation Failed",
                    description: getErrorMessage(error),
                    type: "error",
                });
            }
        },
    });

    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Create an account
                </CardTitle>
                <CardDescription>
                    Enter your details below to create your CodeShift account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Full Name Field */}
                    <form.Field
                        name="fullName"
                        children={(field) => {
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>Full Name</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        placeholder="John Doe"
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

                    {/* Email Field */}
                    <form.Field
                        name="email"
                        children={(field) => {
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>Email</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        placeholder="you@example.com"
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

                    {/* Password Field */}
                    <form.Field
                        name="password"
                        children={(field) => {
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>Password</Label>
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Login
                    </Link>
                </div>
                <GoogleLoginButton />
            </CardContent>
        </Card>
    );
}

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