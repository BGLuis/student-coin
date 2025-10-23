import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

interface ApiErrorResponse {
    message: string;
    status: number;
    error?: string;
}

const API_BASE_URL = process.env.API_URL || "http://localhost:8080";

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

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
        }

        if (error.response?.status === 403) {
            console.error("Acesso negado");
        }

        if (error.response?.status === 500) {
            console.error("Erro interno do servidor");
        }

        return Promise.reject(error);
    }
);

export default api;
