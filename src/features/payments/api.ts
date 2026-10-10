import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.type";
import type { CreateCheckoutSessionPayload, CheckoutSessionResponseData } from "./types";

export const paymentApi = {
    createCheckoutSession: (payload?: CreateCheckoutSessionPayload) =>
        apiClient<ApiResponse<CheckoutSessionResponseData>>("/payments/create-checkout-session", {
            method: "POST",
            body: payload,
        }),
};