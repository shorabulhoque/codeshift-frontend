// Global Enums ---
export type UserRole = "ADMIN" | "RECRUITER" | "CANDIDATE";
export type UserStatus = "ACTIVE" | "BLOCKED" | "PENDING";
export type AuthProvider = "CREDENTIALS" | "GOOGLE" | "GITHUB";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type SubmissionStatus = "PENDING" | "PASSED" | "FAILED" | "ERROR";
export type ApplicationStatus = "SUBMITTED" | "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEW_SCHEDULED" | "REJECTED";
export type JobStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
export type PaymentGateway = "STRIPE";
export type RecruiterVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type RecruiterApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SubscriptionPlan = "FREE" | "PREMIUM";

// Pure Database Table Models ---
export interface Account {
    id: string;
    userId: string;
    provider: AuthProvider;
    providerId: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    email: string;
    roles: UserRole[];
    activeRole: UserRole;
    status: UserStatus;
    isEmailVerified: boolean;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfile {
    id: string;
    userId: string;
    fullName: string;
    phone: string | null;
    headline: string | null;
    bio: string | null;
    experienceYears: number | null;
    address: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    skills: string[];
    avatar: string | null;
    avatarPublicId: string | null;
    resumeUrl: string | null;
    resumePublicId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface RecruiterProfile {
    id: string;
    userId: string;
    currentVersionId: string | null;
    verificationStatus: RecruiterVerificationStatus;
    subscriptionPlan: SubscriptionPlan;
    createdAt: string;
    updatedAt: string;
}

export interface RecruiterProfileVersion {
    id: string;
    recruiterProfileId: string;
    version: number;
    fullName: string | null;
    designation: string | null;
    companyName: string;
    companyWebsite: string | null;
    companySize: string | null;
    businessRegistrationNo: string;
    location: string | null;
    companyLogo: string | null;
    companyLogoPublicId: string | null;
    createdAt: string;
}

export interface Job {
    id: string;
    recruiterId: string;
    title: string;
    description: string;
    requirements: string | null;
    responsibilities: string | null;
    assignmentDetails: string;
    deadline: string | null;
    status: JobStatus;
    createdAt: string;
    updatedAt: string;
}

export interface JobApplication {
    id: string;
    jobId: string;
    candidateId: string;
    submissionCode: string;
    status: ApplicationStatus;
    marks: number | null;
    reviewerFeedback: string | null;
    interviewDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Payment {
    id: string;
    transactionId: string;
    amount: string;
    currency: string;
    gateway: PaymentGateway;
    status: PaymentStatus;
    paidAt: string | null;
    recruiterId: string;
    createdAt: string;
    updatedAt: string;
}

export interface RecruiterApplication {
    id: string;
    applicantId: string;
    fullName: string;
    designation: string | null;
    companyName: string;
    companyWebsite: string | null;
    companySize: string | null;
    businessRegistrationNo: string;
    location: string | null;
    companyLogo: string | null;
    companyLogoPublicId: string | null;
    status: RecruiterApplicationStatus;
    rejectionReason: string | null;
    reviewedById: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
