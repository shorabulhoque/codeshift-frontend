import { RecruiterProfile, RecruiterProfileVersion } from "@/types/models";

export interface UpdateRecruiterProfilePayload {
    fullName?: string | null;
    designation?: string | null;
    companyName?: string;
    companyWebsite?: string | null;
    companySize?: string | null;
    businessRegistrationNo?: string;
    location?: string | null;
}

export interface RecruiterProfileWithVersion extends RecruiterProfile {
    currentVersion?: RecruiterProfileVersion | null;
}
