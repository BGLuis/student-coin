"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = authService.isAuthenticated();
        if (isAuthenticated) {
            router.push("/");
        } else {
            router.push("/auth/login");
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecionando...</p>
            </div>
        </div>
    );
}
