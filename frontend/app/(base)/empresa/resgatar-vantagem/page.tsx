"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { enterpriseService } from "@/services/enterpriseService";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

function RedeemContent() {
    const searchParams = useSearchParams();
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            setCoupon(code);
        }
    }, [searchParams]);

    const handleRedeem = async () => {
        if (!coupon) return;
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await enterpriseService.validateRedeem(coupon);
            setSuccess("Vantagem resgatada com sucesso!");
            // We do not clear the coupon so the user can see what was redeemed, 
            // or in case they double clicked, the success message persists.
            // To reset, they can manually clear or reload.
        } catch (err: any) {
            const msg = err.response?.data?.message || "Erro ao validar o cupom. Verifique se o código está correto.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Resgatar Vantagem</h1>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Digite o código do cupom apresentado pelo aluno ou leia o QR Code.
                    </p>
                    <Input
                        label="Código do Cupom"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Digite o código aqui"
                        error={error || undefined}
                    />
                </div>

                {success && (
                    <div className="p-4 bg-green-100 border border-green-200 text-green-700 rounded-md text-center font-medium">
                        {success}
                    </div>
                )}

                <Button
                    onClick={handleRedeem}
                    disabled={loading || !coupon}
                    className="w-full"
                    variant="primary"
                >
                    {loading ? "Validando..." : "Validar Resgate"}
                </Button>
            </div>
        </div>
    );
}

export default function ResgatarVantagemPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
            <RedeemContent />
        </Suspense>
    );
}
