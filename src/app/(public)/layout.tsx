import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}