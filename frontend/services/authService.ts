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
    rg?: string;
    course?: string;
    address?: string;
    educationalInstitute?: string;
}

export interface EnterpriseRegisterData {
    name: string;
    email: string;
    password: string;
    cnpj: string;
}

export interface AuthResponse {
    token: string;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            console.log('[AuthService] Tentando login com email:', credentials.email);
            const response = await api.post<AuthResponse>("/auth/login", credentials);

            console.log('[AuthService] Resposta do login recebida:', {
                status: response.status,
                hasToken: !!response.data.token
            });

            if (response.data.token) {
                localStorage.setItem("access_token", response.data.token);
                console.log('[AuthService] Token salvo no localStorage');
            } else {
                console.error('[AuthService] Resposta não contém token:', response.data);
            }

            return response.data;
        } catch (error: any) {
            console.error('[AuthService] Erro no login:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    registerStudent: async (data: StudentRegisterData): Promise<AuthResponse> => {
        try {

            const registerResponse = await api.post("/auth", data);

            return await authService.login({ email: data.email, password: data.password });
        } catch (error: any) {
            console.error('[AuthService] Erro no registro de estudante:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    registerEnterprise: async (data: EnterpriseRegisterData): Promise<AuthResponse> => {
        try {
            const registerResponse = await api.post("/auth", data);

            return await authService.login({ email: data.email, password: data.password });
        } catch (error: any) {
            console.error('[AuthService] Erro no registro de empresa:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    logout: (): void => {
        localStorage.removeItem("access_token");
    },

    isAuthenticated: (): boolean => {
        if (typeof window === "undefined") return false;

        const token = localStorage.getItem("access_token");
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload.exp && Date.now() >= payload.exp * 1000) {
                authService.logout();
                return false;
            }

            return true;
        } catch (error) {
            authService.logout();
            return false;
        }
    },

    getToken: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("access_token");
    },

    decodeToken: (): { name: string; email: string; roles: string } | null => {
        if (typeof window === "undefined") return null;

        const token = localStorage.getItem("access_token");
        if (!token) {
            return null;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('[AuthService] Token decodificado com sucesso:', {
                name: payload.name,
                email: payload.email,
                roles: payload.roles
            });
            return {
                name: payload.name,
                email: payload.email,
                roles: payload.roles
            };
        } catch (error) {
            return null;
        }
    },

    getUserRole: (): "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ENTERPRISE" | null => {
        const decoded = authService.decodeToken();
        const role = decoded?.roles as "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ENTERPRISE" | null;
        return role;
    },
};
