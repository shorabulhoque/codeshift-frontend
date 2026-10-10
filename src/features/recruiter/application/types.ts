import { RecruiterApplication } from "@/types/models";

export interface CreateRecruiterApplicationPayload {
    fullName: string;
    companyName: string;
    businessRegistrationNo: string;
    designation?: string;
    companyWebsite?: string;
    companySize?: string;
    location?: string;
}

export interface UploadCompanyLogoPayload {
    companyLogo: File;
}

export type RecruiterApplicationData = RecruiterApplication;
