import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import { JobApplication } from "@/types/models";
import type {
    ApplyJobPayload,
    ReviewApplicationPayload,
    CandidateJobApplication,
    JobApplicationWithCandidate,
} from "./types";

export const jobApplicationApi = {
    applyJob: (payload: ApplyJobPayload) =>
        apiClient<ApiResponse<JobApplication>>("/job-applications", {
            method: "POST",
            body: payload,
        }),

    reviewApplication: (id: string, payload: ReviewApplicationPayload) =>
        apiClient<ApiResponse<JobApplication>>(`/job-applications/${id}/review`, {
            method: "PATCH",
            body: payload,
        }),

    getMyApplications: () =>
        apiClient<ApiResponse<CandidateJobApplication[]>>("/job-applications/my-applications", {
            method: "GET",
        }),

    getJobApplications: (jobId: string) =>
        apiClient<ApiResponse<JobApplicationWithCandidate[]>>(`/job-applications/job/${jobId}`, {
            method: "GET",
        }),
};