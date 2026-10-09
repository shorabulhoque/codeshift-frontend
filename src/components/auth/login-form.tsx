"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { loginSchema, type LoginFormValues } from "@/features/auth/schema";
import { useLogin } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        } as LoginFormValues,
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                await loginMutation.mutateAsync(value);

                toast.add({
                    title: "Login Successful",
                    description: "Welcome back to CodeShift!",
                    type: "success",
                });
            } catch (error) {
                toast.add({
                    title: "Authorization Failure",
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
                    Login to your account
                </CardTitle>
                <CardDescription>
                    Enter your email and password to access your account
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
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor={field.name}>Password</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs text-primary underline-offset-4 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
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
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Register
                    </Link>
                </div>
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