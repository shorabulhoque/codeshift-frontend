import RecruiterApplicationForm from "@/components/recruiter/recruiter-application-form";

export default function ApplyRecruiterPage() {
    return (
        <main className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Apply for Recruiter Workspace
                </h1>
                <p className="text-sm text-slate-500">
                    Submit your enterprise credentials to unlock recruitment challenges and talent checking management dashboards.
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-400 text-center py-8">
                    <RecruiterApplicationForm />
                </p>
            </div>
        </main>
    );
}
