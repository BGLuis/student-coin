import { Footer, Header } from "@/components";
import React, { ReactNode } from "react";

export default function BaseLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-white">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}