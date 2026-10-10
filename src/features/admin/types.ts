import { RecruiterApplication, User } from "@/types/models";

// ব্যাকএন্ড এনাম বা স্ট্যাটাসের সাথে সামঞ্জস্যপূর্ণ টাইপস
export type RecruiterApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type UserStatus = "ACTIVE" | "BLOCKED" | "PENDING";

// পেন্ডিং রিক্রুটার অ্যাপ্লিকেশনের সাথে ইউজারের তথ্য
export interface PendingRecruiterApplication extends RecruiterApplication {
    applicant: {
        id: string;
        email: string;
        status: UserStatus;
        createdAt: string;
    };
}

// রিক্রুটার ভেরিফিকেশন পেলোড
export interface VerifyRecruiterPayload {
    status: RecruiterApplicationStatus;
    rejectionReason?: string;
}

// ইউজার স্ট্যাটাস আপডেট পেলোড
export interface UpdateUserStatusPayload {
    status: UserStatus;
}

// প্ল্যাটফর্ম স্ট্যাটিস্টিকস ডেটা টাইপ
export interface PlatformStats {
    totalUsers: number;
    totalRecruiters: number;
    totalCandidates: number;
    pendingRecruiterApplications: number;
    totalJobs: number;
    totalJobApplications: number;
    successfulPaymentsCount: number;
    totalRevenue: number;
}

// ইউজার স্ট্যাটাস আপডেটের পর রেসপন্স ইউজার অবজেক্ট
export interface UpdatedUserResponse {
    id: string;
    email: string;
    roles: string[];
    activeRole: string;
    status: UserStatus;
    updatedAt: string;
}