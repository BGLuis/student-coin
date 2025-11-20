"use client";

import { useState, useEffect } from "react";
import { authService, type AuthResponse, type LoginCredentials } from "@/services";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();
    const { checkUserRole } = useUser();

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            setIsAuthenticated(authenticated);
            setIsLoading(false);

            if (!authenticated && !pathname.startsWith("/auth")) {
                router.push("/auth/login");
            }
        };

        checkAuth();
    }, [pathname, router]);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await authService.login(credentials);
            setIsAuthenticated(true);
            checkUserRole();
            return response;
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await authService.logout();
            setIsAuthenticated(false);
            router.push("/auth/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            throw error;
        }
    };

    const checkAuthentication = (): boolean => {
        const authenticated = authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        return authenticated;
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuthentication,
    };
};
