import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import type { CreateRecruiterApplicationPayload, RecruiterApplicationData } from "./types";

export const recruiterApplicationApi = {
    createApplication: (payload: CreateRecruiterApplicationPayload, file?: File) => {
        const formData = new FormData();

        formData.append("data", JSON.stringify(payload));

        if (file) {
            formData.append("companyLogo", file);
        }

        return apiClient<ApiResponse<RecruiterApplicationData>>("/recruiters/applications", {
            method: "POST",
            body: formData,
        });
    },

    getMyApplications: () =>
        apiClient<ApiResponse<RecruiterApplicationData[]>>("/recruiters/applications/me", {
            method: "GET",
        }),
};
