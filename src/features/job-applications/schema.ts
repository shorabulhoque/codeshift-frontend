import { z } from "zod";

export const applyJobSchema = z.object({
    jobId: z
        .string({ message: "Job ID is required" })
        .min(1, "Job ID is required"),
    submissionCode: z
        .string({ message: "Submission code is required" })
        .trim()
        .min(1, "Submission code is required"),
});

export type ApplyJobFormValues = z.infer<typeof applyJobSchema>;

export const reviewApplicationSchema = z.object({
    marks: z.number({ message: "Marks must be a number" }).optional(),
    reviewerFeedback: z.string().trim().optional(),
    interviewDate: z.string().optional(),
    status: z.enum([
        "SUBMITTED",
        "UNDER_REVIEW",
        "SHORTLISTED",
        "INTERVIEW_SCHEDULED",
        "REJECTED",
    ] as const).optional(),
});

export type ReviewApplicationFormValues = z.infer<typeof reviewApplicationSchema>;