export interface RegisterPayload {
    email: string;
    password: string;
    fullName: string;
}

export interface VerifyEmailPayload {
    email: string;
    otp: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface GoogleLoginPayload {
    idToken: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    otp: string;
    newPassword: string;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

export type UserRole = "ADMIN" | "CANDIDATE" | "RECRUITER";

export interface SwitchRolePayload {
    targetRole: "CANDIDATE" | "RECRUITER";
}

export interface CandidateProfile {
    id: string;
    fullName: string;
    avatar?: string | null;
}

export interface RecruiterProfile {
    id: string;
    companyName: string;
}

export interface CurrentUser {
    id: string;
    email: string;
    roles: UserRole[];
    activeRole: UserRole;
    status: "ACTIVE" | "BLOCKED" | "PENDING";
    isEmailVerified: boolean;
    candidateProfile?: CandidateProfile | null;
    recruiterProfile?: RecruiterProfile | null;
}