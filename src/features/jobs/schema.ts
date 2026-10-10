import { z } from "zod";

const jobStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createJobSchema = z.object({
    title: z
        .string({ message: "Job title is required" })
        .trim()
        .min(3, "Title must be at least 3 characters"),
    description: z
        .string({ message: "Job description is required" })
        .trim()
        .min(10, "Description must be at least 10 characters"),
    assignmentDetails: z
        .string({ message: "Assignment details are required" })
        .trim()
        .min(10, "Assignment details must be at least 10 characters"),
    requirements: z.string().trim().optional().or(z.literal("")),
    responsibilities: z.string().trim().optional().or(z.literal("")),
    deadline: z.string().optional().or(z.literal("")),
    status: jobStatusEnum.optional().default("PUBLISHED"),
});

export type CreateJobFormValues = z.infer<typeof createJobSchema>;

export const updateJobSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").optional().or(z.literal("")),
    description: z.string().trim().min(10, "Description must be at least 10 characters").optional().or(z.literal("")),
    assignmentDetails: z.string().trim().min(10, "Assignment details must be at least 10 characters").optional().or(z.literal("")),
    requirements: z.string().trim().optional().or(z.literal("")),
    responsibilities: z.string().trim().optional().or(z.literal("")),
    deadline: z.string().optional().or(z.literal("")),
    status: jobStatusEnum.optional(),
});

export type UpdateJobFormValues = z.infer<typeof updateJobSchema>;