"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { makeQueryClient } from "@/lib/query-client";

let browserQueryClient: ReturnType<typeof makeQueryClient> | undefined;

function getQueryClient() {
    if (typeof window === "undefined") {
        return makeQueryClient();
    }

    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
}

export default function QueryProvider({
    children,
}: {
    children: ReactNode;
}) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}