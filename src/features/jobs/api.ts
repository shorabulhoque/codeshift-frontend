import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import { Job } from "@/types/models";
import type {
    CreateJobPayload,
    GetJobsQueryParams,
    JobWithRecruiter,
    MyJobWithApplicationCount,
} from "./types";

export const jobApi = {
    createJob: (payload: CreateJobPayload) =>
        apiClient<ApiResponse<Job>>("/jobs", {
            method: "POST",
            body: payload,
        }),

    getAllJobs: (params?: GetJobsQueryParams) => {
        const queryParams = new URLSearchParams();

        if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `/jobs?${queryString}` : "/jobs";

        return apiClient<ApiResponse<JobWithRecruiter[]>>(endpoint, {
            method: "GET",
        });
    },

    getMyJobs: () =>
        apiClient<ApiResponse<MyJobWithApplicationCount[]>>("/jobs/my-jobs", {
            method: "GET",
        }),
};