import { z } from "zod";

export const updateCandidateProfileSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .optional(),
    phone: z.string().trim().optional(),
    headline: z
        .string()
        .trim()
        .max(100, "Headline cannot exceed 100 characters")
        .optional(),
    bio: z
        .string()
        .trim()
        .max(500, "Bio cannot exceed 500 characters")
        .optional(),
    experienceYears: z
        .number({ message: "Experience years must be a number" })
        .min(0, "Experience years cannot be negative")
        .optional(),
    address: z.string().trim().optional(),
    githubUrl: z
        .string()
        .url("Invalid GitHub URL format")
        .optional()
        .or(z.literal("")),
    linkedinUrl: z
        .string()
        .url("Invalid LinkedIn URL format")
        .optional()
        .or(z.literal("")),
    skills: z.array(z.string()).optional(),
});

export type UpdateCandidateProfileFormValues = z.infer<typeof updateCandidateProfileSchema>;
