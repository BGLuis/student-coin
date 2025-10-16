"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components";
import { useAuth } from "@/hooks";
import { AxiosError } from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await login({ email, password });
            router.push("/perfil");
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    setError("Email ou senha incorretos");
                } else if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Erro ao fazer login. Tente novamente.");
                }
            } else {
                setError("Erro inesperado. Tente novamente.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Não tem uma conta?{" "}
                        <a
                            href="/auth/register/student"
                            className="text-blue-600 hover:underline"
                        >
                            Registre-se como estudante
                        </a>
                    </p>
                    <p className="mt-2">
                        <a
                            href="/auth/register/enterprise"
                            className="text-blue-600 hover:underline"
                        >
                            Registre-se como empresa
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
