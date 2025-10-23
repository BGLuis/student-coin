import api from "@/lib/api";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface StudentRegisterData {
    name: string;
    email: string;
    password: string;
    cpf: string;
    university?: string;
}

export interface EnterpriseRegisterData {
    name: string;
    email: string;
    password: string;
    cnpj: string;
    companyName: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in?: number;
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/login", credentials);

        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
        }
        if (response.data.refresh_token) {
            localStorage.setItem("refresh_token", response.data.refresh_token);
        }

        return response.data;
    },

    registerStudent: async (data: StudentRegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/register/student", data);

        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
        }
        if (response.data.refresh_token) {
            localStorage.setItem("refresh_token", response.data.refresh_token);
        }

        return response.data;
    },

    registerEnterprise: async (data: EnterpriseRegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/register/enterprise", data);

        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
        }
        if (response.data.refresh_token) {
            localStorage.setItem("refresh_token", response.data.refresh_token);
        }

        return response.data;
    },

    logout: async (): Promise<void> => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            throw new Error("Refresh token não encontrado");
        }

        const response = await api.post<AuthResponse>("/auth/refresh", {
            refresh_token: refreshToken,
        });

        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
        }
        if (response.data.refresh_token) {
            localStorage.setItem("refresh_token", response.data.refresh_token);
        }

        return response.data;
    },

    isAuthenticated: (): boolean => {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem("access_token");
    },

    getToken: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("access_token");
    },
};
