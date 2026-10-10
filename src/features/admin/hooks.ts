import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "./api";
import type { VerifyRecruiterPayload, UpdateUserStatusPayload } from "./types";

export const adminKeys = {
    all: ["admin"] as const,
    pendingRecruiters: () => [...adminKeys.all, "pending-recruiters"] as const,
    stats: () => [...adminKeys.all, "stats"] as const,
};

export function usePendingRecruiters() {
    return useQuery({
        queryKey: adminKeys.pendingRecruiters(),
        queryFn: async () => {
            const response = await adminApi.getPendingRecruiters();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function usePlatformStats() {
    return useQuery({
        queryKey: adminKeys.stats(),
        queryFn: async () => {
            const response = await adminApi.getPlatformStats();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function useVerifyRecruiter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: VerifyRecruiterPayload }) =>
            adminApi.verifyRecruiter(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.pendingRecruiters() });
            queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
        },
    });
}

export function useUpdateUserStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateUserStatusPayload }) =>
            adminApi.updateUserStatus(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
        },
    });
}