import { Job, JobStatus } from "@/types/models";

export interface CreateJobPayload {
    title: string;
    description: string;
    assignmentDetails: string;
    requirements?: string;
    responsibilities?: string;
    deadline?: string;
    status?: JobStatus;
}

export interface UpdateJobPayload {
    title?: string;
    description?: string;
    assignmentDetails?: string;
    requirements?: string;
    responsibilities?: string;
    deadline?: string;
    status?: JobStatus;
}

export interface JobWithRecruiter extends Job {
    recruiter?: {
        currentVersion?: {
            companyName: string;
            location: string | null;
            companyLogo: string | null;
        } | null;
    } | null;
}

export interface MyJobWithApplicationCount extends Job {
    _count?: {
        applications: number;
    };
}

export interface GetJobsQueryParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}