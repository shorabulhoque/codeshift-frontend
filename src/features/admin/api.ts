import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import type {
    PendingRecruiterApplication,
    VerifyRecruiterPayload,
    UpdateUserStatusPayload,
    PlatformStats,
    UpdatedUserResponse,
} from "./types";
import { RecruiterApplication } from "@/types/models";

export const adminApi = {
    getPendingRecruiters: () =>
        apiClient<ApiResponse<PendingRecruiterApplication[]>>("/admins/recruiters/pending", {
            method: "GET",
        }),

    verifyRecruiter: (id: string, payload: VerifyRecruiterPayload) =>
        apiClient<ApiResponse<RecruiterApplication>>(`/admins/recruiters/${id}/verify`, {
            method: "PATCH",
            body: payload,
        }),

    updateUserStatus: (id: string, payload: UpdateUserStatusPayload) =>
        apiClient<ApiResponse<UpdatedUserResponse>>(`/admins/users/${id}/status`, {
            method: "PATCH",
            body: payload,
        }),

    getPlatformStats: () =>
        apiClient<ApiResponse<PlatformStats>>("/admins/stats", {
            method: "GET",
        }),
};