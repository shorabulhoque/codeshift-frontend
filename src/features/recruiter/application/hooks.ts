import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recruiterApplicationApi } from "./api";
import { authKeys } from "../../auth/hooks";
import type { CreateRecruiterApplicationPayload } from "./types";

export const recruiterAppKeys = {
    all: ["recruiter-applications"] as const,
    list: () => [...recruiterAppKeys.all, "list"] as const,
};

export function useCreateRecruiterApplication() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ payload, file }: { payload: CreateRecruiterApplicationPayload; file?: File }) =>
            recruiterApplicationApi.createApplication(payload, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: recruiterAppKeys.list() });
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useMyRecruiterApplications() {
    return useQuery({
        queryKey: recruiterAppKeys.list(),
        queryFn: async () => {
            const response = await recruiterApplicationApi.getMyApplications();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
}
