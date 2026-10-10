import { JobApplication, ApplicationStatus } from "@/types/models";

export interface ApplyJobPayload {
    jobId: string;
    submissionCode: string;
}

export interface ReviewApplicationPayload {
    marks?: number;
    reviewerFeedback?: string;
    interviewDate?: string;
    status?: ApplicationStatus;
}

export interface CandidateJobApplication extends JobApplication {
    job?: {
        id: string;
        title: string;
        description: string;
        assignmentDetails: string;
        deadline: string | null;
        recruiter?: {
            currentVersion?: {
                companyName: string;
                companyLogo: string | null;
                location: string | null;
            } | null;
        } | null;
    };
}

export interface JobApplicationWithCandidate extends JobApplication {
    candidate?: {
        id: string;
        fullName: string;
        phone: string | null;
        headline: string | null;
        githubUrl: string | null;
        linkedinUrl: string | null;
        resumeUrl: string | null;
        skills: string[];
        user?: {
            email: string;
        };
    };
}