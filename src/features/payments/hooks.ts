import { useMutation } from "@tanstack/react-query";
import { paymentApi } from "./api";
import type { CreateCheckoutSessionPayload } from "./types";

export function useCreateCheckoutSession() {
    return useMutation({
        mutationFn: (payload?: CreateCheckoutSessionPayload) => paymentApi.createCheckoutSession(payload),
        onSuccess: (response) => {
            const paymentUrl = response.data?.paymentUrl;
            if (paymentUrl) {
                window.location.href = paymentUrl;
            }
        },
    });
}