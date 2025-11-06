import { Footer, Header } from "@/components";
import React, { ReactNode } from "react";

interface BaseLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
    backgroundColor?: string;
    className?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
    children,
    showHeader = true,
    showFooter = true,
    backgroundColor = "bg-white",
    className = "",
}) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Header */}
            {showHeader && <Header />}

            {/* Main Content */}
            <main className={`flex-1 overflow-hidden ${backgroundColor} ${className}`}>
                {children}
            </main>

            {/* Footer */}
            {showFooter && <Footer />}
        </div>
    );
};

export default BaseLayout;
