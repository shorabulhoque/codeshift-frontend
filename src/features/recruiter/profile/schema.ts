import { z } from "zod";

export const updateRecruiterProfileSchema = z.object({
    companyName: z
        .string({ message: "Company name is required" })
        .trim()
        .min(2, "Company name must be at least 2 characters"),

    businessRegistrationNo: z
        .string({ message: "Business registration number is required" })
        .trim()
        .min(2, "Business registration number must be at least 2 characters"),

    fullName: z.string().optional().nullable(),
    designation: z.string().optional().nullable(),
    companySize: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    companyWebsite: z
        .string()
        .trim()
        .url("Invalid URL format")
        .optional()
        .nullable()
        .or(z.literal("")),
});

export type UpdateRecruiterProfileFormValues = z.infer<typeof updateRecruiterProfileSchema>;
