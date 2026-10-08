import { apiClient } from "@/lib/api-client";

import type {
    ChangePasswordPayload,
    ForgotPasswordPayload,
    GoogleLoginPayload,
    LoginPayload,
    RegisterPayload,
    ResetPasswordPayload,
    SwitchRolePayload,
    VerifyEmailPayload,
    CurrentUser,
} from "./types";

interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data: T;
}

export const authApi = {
    register: (payload: RegisterPayload) =>
        apiClient<ApiResponse>("/auth/register", {
            method: "POST",
            body: payload,
        }),

    verifyEmail: (payload: VerifyEmailPayload) =>
        apiClient<ApiResponse>("/auth/verify-email", {
            method: "POST",
            body: payload,
        }),

    login: (payload: LoginPayload) =>
        apiClient<ApiResponse>("/auth/login", {
            method: "POST",
            body: payload,
        }),

    googleLogin: (payload: GoogleLoginPayload) =>
        apiClient<ApiResponse>("/auth/google", {
            method: "POST",
            body: payload,
        }),

    refreshToken: () =>
        apiClient<ApiResponse>("/auth/refresh-token", {
            method: "POST",
        }),

    getMe: () =>
        apiClient<ApiResponse<CurrentUser>>("/auth/me", {
            method: "GET",
        }),

    forgotPassword: (payload: ForgotPasswordPayload) =>
        apiClient<ApiResponse>("/auth/forgot-password", {
            method: "POST",
            body: payload,
        }),

    resetPassword: (payload: ResetPasswordPayload) =>
        apiClient<ApiResponse>("/auth/reset-password", {
            method: "POST",
            body: payload,
        }),

    changePassword: (payload: ChangePasswordPayload) =>
        apiClient<ApiResponse>("/auth/change-password", {
            method: "PATCH",
            body: payload,
        }),

    switchRole: (payload: SwitchRolePayload) =>
        apiClient<ApiResponse>("/auth/switch-role", {
            method: "POST",
            body: payload,
        }),
};