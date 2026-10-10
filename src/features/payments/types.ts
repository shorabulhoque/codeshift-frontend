import { Payment } from "@/types/models";

export interface CreateCheckoutSessionPayload {
    amount?: number;
}

export interface CheckoutSessionResponseData {
    payment: Payment;
    paymentUrl: string;
}