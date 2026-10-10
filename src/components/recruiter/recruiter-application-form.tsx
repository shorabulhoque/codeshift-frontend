"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Loader2, Building2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

import { CreateRecruiterApplicationFormValues, createRecruiterApplicationSchema } from "@/features/recruiter/application/schema";
import { useCreateRecruiterApplication } from "@/features/recruiter/application/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function RecruiterApplicationForm() {
    const router = useRouter();
    const createApplicationMutation = useCreateRecruiterApplication();

    const [selectedLogo, setSelectedLogo] = useState<File | undefined>(undefined);

    const form = useForm({
        defaultValues: {
            fullName: "",
            companyName: "",
            businessRegistrationNo: "",
            designation: "",
            companyWebsite: "",
            companySize: "",
            location: "",
        } as CreateRecruiterApplicationFormValues,
        validators: {
            onSubmit: createRecruiterApplicationSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                await createApplicationMutation.mutateAsync({
                    payload: value,
                    file: selectedLogo,
                });

                toast.add({
                    title: "Application Submitted",
                    description: "Your recruiter credentials are under review. Please await administrative verification.",
                    type: "success",
                });

                router.push("/dashboard/candidate");
            } catch (error) {
                toast.add({
                    title: "Submission Blocked",
                    description: getErrorMessage(error),
                    type: "error",
                });
            }
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            setSelectedLogo(fileList[0]);
        }
    };

    return (
        <Card className="w-full max-w-2xl shadow-md bg-white border border-slate-200">
            <CardHeader className="space-y-1.5 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-indigo-600">
                    <Building2 className="size-5" />
                    <CardTitle className="text-xl font-bold tracking-tight">Enterprise Verification</CardTitle>
                </div>
                <CardDescription>
                    Provide verified corporate details to activate specialized technical job posting workspaces.
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-5"
                >
                    {/* Full Name & Company Name Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <form.Field
                            name="fullName"
                            children={(field) => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>Applicant Full Name *</Label>
                                        <Input
                                            id={field.name}
                                            placeholder="Jane Doe"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={hasError}
                                        />
                                        {hasError && (
                                            <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <form.Field
                            name="companyName"
                            children={(field) => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>Registered Company Name *</Label>
                                        <Input
                                            id={field.name}
                                            placeholder="Acme Corp LLC"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={hasError}
                                        />
                                        {hasError && (
                                            <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </div>

                    {/* Business Registration No & Designation Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <form.Field
                            name="businessRegistrationNo"
                            children={(field) => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>Business Registration No *</Label>
                                        <Input
                                            id={field.name}
                                            placeholder="BRN-9923841-X"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={hasError}
                                        />
                                        {hasError && (
                                            <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <form.Field
                            name="designation"
                            children={(field) => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>Your Designation (Optional)</Label>
                                        <Input
                                            id={field.name}
                                            placeholder="Lead Talent Acquisition"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={hasError}
                                        />
                                        {hasError && (
                                            <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </div>

                    {/* Company Website & Company Size Fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <form.Field
                            name="companyWebsite"
                            children={(field) => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>Company Website (Optional)</Label>
                                        <Input
                                            id={field.name}
                                            type="url"
                                            placeholder="https://acme.com"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={hasError}
                                        />
                                        {hasError && (
                                            <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <form.Field
                            name="companySize"
                            children={(field) => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>Company Size (Optional)</Label>
                                        <Input
                                            id={field.name}
                                            placeholder="e.g. 50-200 Employees"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={hasError}
                                        />
                                        {hasError && (
                                            <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </div>

                    {/* Location Field */}
                    <form.Field
                        name="location"
                        children={(field) => {
                            const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="space-y-1.5">
                                    <Label htmlFor={field.name}>Location (Optional)</Label>
                                    <Input
                                        id={field.name}
                                        placeholder="e.g. Geneva, Switzerland"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={hasError}
                                    />
                                    {hasError && (
                                        <p className="text-xs font-medium text-destructive">{field.state.meta.errors[0]?.message}</p>
                                    )}
                                </div>
                            );
                        }}
                    />

                    {/* Company Logo Upload Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="company-logo">Company Logo (Optional)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="company-logo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                        </div>
                        {selectedLogo && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Selected file: <span className="font-medium text-foreground">{selectedLogo.name}</span>
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={createApplicationMutation.isPending}
                    >
                        {createApplicationMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Submitting application...
                            </>
                        ) : (
                            "Submit Application for Administrative Audit"
                        )}
                    </Button>
                </form>
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
    return error instanceof Error ? error.message : "Something went wrong during data validation logs.";
}