import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import { CandidateProfile } from "@/types/models";
import type { CandidateWithUserEmail, UpdateCandidateProfilePayload } from "./types";

export const candidateApi = {
    updateProfile: (payload: UpdateCandidateProfilePayload) =>
        apiClient<ApiResponse<CandidateProfile>>("/candidates/me", {
            method: "PATCH",
            body: payload,
        }),

    updateAvatar: (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);
        return apiClient<ApiResponse<CandidateProfile>>("/candidates/me/avatar", {
            method: "PATCH",
            body: formData,
        });
    },

    updateResume: (file: File) => {
        const formData = new FormData();
        formData.append("resume", file);
        return apiClient<ApiResponse<CandidateProfile>>("/candidates/me/resume", {
            method: "PATCH",
            body: formData,
        });
    },

    deleteAvatar: () =>
        apiClient<ApiResponse<CandidateProfile>>("/candidates/me/avatar", {
            method: "DELETE",
        }),

    deleteResume: () =>
        apiClient<ApiResponse<CandidateProfile>>("/candidates/me/resume", {
            method: "DELETE",
        }),

    getCandidateById: (id: string) =>
        apiClient<ApiResponse<CandidateWithUserEmail>>(`/candidates/${id}`, {
            method: "GET",
        }),
};
