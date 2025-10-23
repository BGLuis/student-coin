"use client";

import { useState, useEffect } from "react";
import { authService, type AuthResponse, type LoginCredentials } from "@/services";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await authService.login(credentials);
            setIsAuthenticated(true);
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
