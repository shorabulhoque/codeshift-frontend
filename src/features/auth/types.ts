import { User, CandidateProfile, RecruiterProfile, RecruiterProfileVersion, Account } from "@/types/models";


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

export interface SwitchRolePayload {
    targetRole: "CANDIDATE" | "RECRUITER";
}

export interface CurrentUser extends User {
    candidateProfile?: Omit<CandidateProfile, "userId"> | null;
    recruiterProfile?: (RecruiterProfile & {
        currentVersion?: Omit<RecruiterProfileVersion, "recruiterProfileId"> | null;
    }) | null;
    accounts?: Omit<Account, "userId" | "providerId">[];
}

export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
    activeRole?: "CANDIDATE" | "RECRUITER" | "ADMIN";
}