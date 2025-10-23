"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input, Button } from "@/components";
import { useAuth } from "@/hooks";
import { AxiosError } from "axios";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password: string) => {
        return password.length >= 8;
    };

    const isFormValid = isEmailValid(email) && isPasswordValid(password);

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
        <div className="flex items-center justify-center flex-col gap-6 w-xl">
            <div className=" w-full p-8 bg-white rounded-xl shadow">
                <div>
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/image/logo.png"
                            alt="Student Coin Logo"
                            width={72}
                            height={72}
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-medium text-center mb-6 text-[#333333]">Acesso ao Sistema de Moeda Estudantil</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
                    <Input
                        label="Email ou CPF"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Sua Senha"
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

                    <div className="flex flex-col gap-2">
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </Button>
                        <p className="text-[#333333] text-center text-sm">Ao entrar, você concorda com os <Link href="/terms" className="underline">Termos de Uso</Link> e <Link href="/privacy" className="underline">Política de Privacidade</Link>.</p>
                    </div>
                    <Link href="/auth/forgot-password" className="text-center text-sm text-black underline">Esqueci minha senha</Link>
                </form>
            </div>
            <div className="flex w-full items-center gap-3">
                <div className="w-full h-0.5 bg-[#FFFFFF]"></div>
                <p className="flex-none text-[#FFFFFF] text-xl">Novo na Nossa Comunidade</p>
                <div className="w-full h-0.5 bg-[#FFFFFF]"></div>
            </div>
            <Link href="/auth/register" className="rounded-full bg-white w-full py-4 text-center text-black">Criar uma Conta</Link>
        </div>
    );
}
