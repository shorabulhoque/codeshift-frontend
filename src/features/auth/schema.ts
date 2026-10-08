import { z } from "zod";

const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address");

const otpSchema = z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be exactly 6 characters");

const basePasswordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character");

export const registerSchema = z.object({
    email: emailSchema,
    password: basePasswordSchema,
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name cannot exceed 50 characters"),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({
    email: emailSchema,
    otp: otpSchema,
});
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    email: emailSchema,
    otp: otpSchema,
    newPassword: basePasswordSchema,
});
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: basePasswordSchema,
}).refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
});
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const switchRoleSchema = z.object({
    targetRole: z.enum(["CANDIDATE", "RECRUITER"], {
        message: "Target role must be either CANDIDATE or RECRUITER",
    }),
});
export type SwitchRoleFormValues = z.infer<typeof switchRoleSchema>;
