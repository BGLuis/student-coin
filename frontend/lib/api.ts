import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

interface ApiErrorResponse {
    message: string;
    status: number;
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");

        console.log('[API] Fazendo requisição:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            hasToken: !!token
        });

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        console.error('[API] Erro no request interceptor:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('[API] Resposta recebida:', {
            status: response.status,
            url: response.config.url,
            dataType: typeof response.data
        });
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        console.error('[API] Erro na resposta:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.response?.data?.message || error.message,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            console.warn('[API] Erro 401 - Não autorizado. Redirecionando para login...');
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
        }

        if (error.response?.status === 403) {
            console.error('[API] Erro 403 - Acesso negado');
        }

        if (error.response?.status === 500) {
            console.error('[API] Erro 500 - Erro interno do servidor');
        }

        return Promise.reject(error);
    }
);

export default api;
