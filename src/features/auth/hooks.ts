import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "./api";
import type {
    LoginPayload,
    RegisterPayload,
    VerifyEmailPayload,
    ForgotPasswordPayload,
    ResetPasswordPayload,
    ChangePasswordPayload,
    SwitchRolePayload,
    CurrentUser
} from "./types";

export const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
};

export function useAuthUser() {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: async () => {
            const response = await authApi.getMe();
            return response.data;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: LoginPayload) => authApi.login(payload),
        onSuccess: async () => {
            const freshUser = await queryClient.fetchQuery<CurrentUser>({
                queryKey: authKeys.me(),
                queryFn: async () => {
                    const res = await authApi.getMe();
                    return res.data;
                }
            });

            const rolePath = freshUser.activeRole.toLowerCase();
            router.push(`/dashboard/${rolePath}`);
            router.refresh();
        },
    });
}

export function useGoogleLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: { idToken: string }) => authApi.googleLogin(payload),
        onSuccess: async () => {
            const freshUser = await queryClient.fetchQuery<CurrentUser>({
                queryKey: authKeys.me(),
                queryFn: async () => {
                    const res = await authApi.getMe();
                    return res.data;
                }
            });
            const rolePath = freshUser.activeRole.toLowerCase();
            router.push(`/dashboard/${rolePath}`);
            router.refresh();
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    });
}

export function useVerifyEmail() {
    return useMutation({
        mutationFn: (payload: VerifyEmailPayload) => authApi.verifyEmail(payload),
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    });
}

export function useChangePassword() {
    return useMutation({
        mutationFn: (payload: ChangePasswordPayload) => authApi.changePassword(payload),
    });
}

export function useSwitchRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SwitchRolePayload) => authApi.switchRole(payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });

            const targetRole = response.data?.activeRole || "CANDIDATE";
            window.location.href = `/dashboard/${targetRole.toLowerCase()}`;
        },
    });
}
