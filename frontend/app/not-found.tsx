"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.push("/auth/login");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
                <p className="text-gray-600">Redirecionando para o login...</p>
            </div>
        </div>
    );
}
