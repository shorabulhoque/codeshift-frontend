import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { candidateApi } from "./api";
import { authKeys } from "../auth/hooks";
import type { UpdateCandidateProfilePayload } from "./types"

export const candidateKeys = {
    all: ["candidate"] as const,
    detail: (id: string) => [...candidateKeys.all, "detail", id] as const,
};

export function useUpdateCandidateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateCandidateProfilePayload) => candidateApi.updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useUpdateCandidateAvatar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (file: File) => candidateApi.updateAvatar(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useUpdateCandidateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (file: File) => candidateApi.updateResume(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useDeleteCandidateAvatar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: candidateApi.deleteAvatar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useDeleteCandidateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: candidateApi.deleteResume,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useCandidateProfile(id: string) {
    return useQuery({
        queryKey: candidateKeys.detail(id),
        queryFn: async () => {
            const response = await candidateApi.getCandidateById(id);
            return response.data;
        },
        enabled: !!id,
    });
}
