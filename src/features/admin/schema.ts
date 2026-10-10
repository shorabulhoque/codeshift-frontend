import { z } from "zod";

// রিক্রুটার ভেরিফিকেশন ভ্যালিডেশন স্কিমা
export const verifyRecruiterSchema = z.object({
    status: z.enum(["APPROVED", "REJECTED"], {
        message: "Status must be either APPROVED or REJECTED",
    }),
    rejectionReason: z.string().trim().optional(),
}).refine(
    (data) => {
        if (data.status === "REJECTED" && !data.rejectionReason) {
            return false;
        }
        return true;
    },
    {
        message: "Rejection reason is required when rejecting an application!",
        path: ["rejectionReason"],
    }
);

export type VerifyRecruiterFormValues = z.infer<typeof verifyRecruiterSchema>;

// ইউজার স্ট্যাটাস আপডেট ভ্যালিডেশন স্কিমা
export const updateUserStatusSchema = z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "PENDING"], {
        message: "Invalid user status provided!",
    }),
});

export type updateUserStatusFormValues = z.infer<typeof updateUserStatusSchema>;