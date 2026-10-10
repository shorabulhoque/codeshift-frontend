import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobApplicationApi } from "./api";
import type { ApplyJobPayload, ReviewApplicationPayload } from "./types";

export const jobApplicationKeys = {
    all: ["job-applications"] as const,
    myApplications: () => [...jobApplicationKeys.all, "my-applications"] as const,
    jobApplications: (jobId: string) => [...jobApplicationKeys.all, "job", jobId] as const,
};

export function useApplyJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ApplyJobPayload) => jobApplicationApi.applyJob(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobApplicationKeys.myApplications() });
        },
    });
}

export function useReviewApplication() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: ReviewApplicationPayload }) =>
            jobApplicationApi.reviewApplication(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobApplicationKeys.all });
        },
    });
}

export function useMyApplications() {
    return useQuery({
        queryKey: jobApplicationKeys.myApplications(),
        queryFn: async () => {
            const response = await jobApplicationApi.getMyApplications();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function useJobApplications(jobId: string) {
    return useQuery({
        queryKey: jobApplicationKeys.jobApplications(jobId),
        queryFn: async () => {
            const response = await jobApplicationApi.getJobApplications(jobId);
            return response.data;
        },
        enabled: !!jobId,
        staleTime: 1000 * 60 * 5,
    });
}