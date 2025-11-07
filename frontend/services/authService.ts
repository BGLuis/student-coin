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
            console.log('[AuthService] Registrando estudante:', data.email);

            // Backend usa POST /auth e detecta automaticamente por CPF
            // Nota: O backend não retorna token no registro, apenas os dados do usuário
            const registerResponse = await api.post("/auth", data);
            console.log('[AuthService] Estudante registrado com sucesso:', registerResponse.data);

            // Fazer login automaticamente após o registro
            console.log('[AuthService] Fazendo login automático após registro');
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
            console.log('[AuthService] Registrando empresa:', data.email);

            // Backend usa POST /auth e detecta automaticamente por CNPJ
            // Nota: O backend não retorna token no registro, apenas os dados do usuário
            const registerResponse = await api.post("/auth", data);
            console.log('[AuthService] Empresa registrada com sucesso:', registerResponse.data);

            // Fazer login automaticamente após o registro
            console.log('[AuthService] Fazendo login automático após registro');
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
        console.log('[AuthService] Fazendo logout');
        // Logout apenas no frontend removendo tokens
        localStorage.removeItem("access_token");
    },

    isAuthenticated: (): boolean => {
        if (typeof window === "undefined") return false;
        return !!localStorage.getItem("access_token");
    },

    getToken: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("access_token");
    },

    // Decodifica o token JWT para extrair informações
    decodeToken: (): { name: string; email: string; roles: string } | null => {
        if (typeof window === "undefined") return null;

        const token = localStorage.getItem("access_token");
        if (!token) {
            console.log('[AuthService] Nenhum token encontrado para decodificar');
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
            console.error('[AuthService] Erro ao decodificar token:', error);
            return null;
        }
    },

    getUserRole: (): "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ENTERPRISE" | null => {
        const decoded = authService.decodeToken();
        const role = decoded?.roles as "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ENTERPRISE" | null;
        console.log('[AuthService] Role do usuário:', role);
        return role;
    },
};
