import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "./api";
import type { CreateJobPayload, GetJobsQueryParams } from "./types";

export const jobKeys = {
    all: ["jobs"] as const,
    list: (params?: GetJobsQueryParams) => [...jobKeys.all, "list", params] as const,
    myJobs: () => [...jobKeys.all, "my-jobs"] as const,
};

export function useAllJobs(params?: GetJobsQueryParams) {
    return useQuery({
        queryKey: jobKeys.list(params),
        queryFn: async () => {
            const response = await jobApi.getAllJobs(params);
            return response;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function useMyJobs() {
    return useQuery({
        queryKey: jobKeys.myJobs(),
        queryFn: async () => {
            const response = await jobApi.getMyJobs();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateJobPayload) => jobApi.createJob(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobKeys.all });
        },
    });
}