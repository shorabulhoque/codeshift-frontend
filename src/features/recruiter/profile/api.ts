import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import type { UpdateRecruiterProfilePayload, RecruiterProfileWithVersion } from "./types";

export const recruiterProfileApi = {
    updateProfile: (payload: UpdateRecruiterProfilePayload) =>
        apiClient<ApiResponse<RecruiterProfileWithVersion>>("/recruiters/profile/me", {
            method: "PATCH",
            body: payload,
        }),

    updateCompanyLogo: (file: File) => {
        const formData = new FormData();
        formData.append("logo", file);
        return apiClient<ApiResponse<RecruiterProfileWithVersion>>("/recruiters/profile/me/logo", {
            method: "PATCH",
            body: formData,
        });
    },

    deleteCompanyLogo: () =>
        apiClient<ApiResponse<RecruiterProfileWithVersion>>("/recruiters/profile/me/logo", {
            method: "DELETE",
        }),
};
