import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recruiterProfileApi } from "./api";
import { authKeys } from "../../auth/hooks";
import type { UpdateRecruiterProfilePayload } from "./types";

export function useUpdateRecruiterProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateRecruiterProfilePayload) => recruiterProfileApi.updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useUpdateRecruiterLogo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => recruiterProfileApi.updateCompanyLogo(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useDeleteRecruiterLogo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: recruiterProfileApi.deleteCompanyLogo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}
