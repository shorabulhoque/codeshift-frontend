import { CandidateProfile } from "@/types/models";

export interface UpdateCandidateProfilePayload {
    fullName?: string;
    phone?: string;
    headline?: string;
    bio?: string;
    experienceYears?: number;
    address?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    skills?: string[];
}

export interface UploadAvatarPayload {
    avatar: File;
}

export interface UploadResumePayload {
    resume: File;
}

export interface CandidateWithUserEmail extends CandidateProfile {
    user: {
        email: string;
    };
}
