"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/features/auth/hooks";
import { toast } from "@/components/ui/toast";

export default function GoogleLoginButton() {
    const googleLoginMutation = useGoogleLogin();

    return (
        <div className="flex w-full justify-center">
            {/* Google's official built-in ready-made button component */}
            <GoogleLogin
                theme="outline"
                size="large"
                shape="rectangular"
                width="1000"
                onSuccess={async (credentialResponse) => {
                    try {
                        // The library returns the 'credential' (JWT ID Token) directly after a successful login
                        if (credentialResponse.credential) {
                            await googleLoginMutation.mutateAsync({
                                idToken: credentialResponse.credential,
                            });

                            // Notification of successful authentication
                            toast.add({
                                title: "Google Login Successful",
                                description: "Welcome back to CodeShift!",
                                type: "success",
                            });
                        }
                    } catch (error) {
                        // Handle any validation errors from the back-end
                        toast.add({
                            title: "Google Authentication Failed",
                            description: getErrorMessage(error),
                            type: "error",
                        });
                    }
                }}
                onError={() => {
                    toast.add({
                        title: "Google Sign-In Failed",
                        description: "An error occurred during Google OAuth configuration.",
                        type: "error",
                    });
                }}
            />
        </div>
    );
}

// A clean helper function to parse back-end error responses
function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "data" in error) {
        const data = (error as any).data;
        if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
            return data.message;
        }
    }
    return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
