import { z } from "zod";

export const createCheckoutSessionSchema = z.object({
    amount: z
        .number({ message: "Amount must be a number" })
        .positive("Amount must be greater than zero")
        .optional(),
});

export type CreateCheckoutSessionFormValues = z.infer<typeof createCheckoutSessionSchema>;