"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { enterpriseService } from "@/services/enterpriseService";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { QrCodeReader } from "@/components";
import { useToast } from "@/contexts/ToastContext";

function RedeemContent() {
    const searchParams = useSearchParams();
    const { addToast } = useToast();
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
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
            addToast("Vantagem resgatada com sucesso!", "success");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Erro ao validar o cupom. Verifique se o código está correto.";
            setError(msg);
            addToast(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleScan = (decodedText: string) => {
        try {
            // Check if it is a URL and extract code
            const url = new URL(decodedText);
            const code = url.searchParams.get("code");
            if (code) {
                setCoupon(code);
            } else {
                setCoupon(decodedText);
            }
        } catch {
            // Not a URL, use raw text
            setCoupon(decodedText);
        }
        setShowScanner(false);
        addToast("Código QR lido com sucesso!", "info");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Resgatar Vantagem</h1>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Digite o código do cupom apresentado pelo aluno ou leia o QR Code.
                    </p>
                    
                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <Input
                                label="Código do Cupom"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Digite o código aqui"
                                error={error || undefined}
                            />
                        </div>
                        <Button 
                            type="button" 
                            onClick={() => setShowScanner(!showScanner)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 mb-[2px] h-[42px] px-3"
                            title="Ler QR Code"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </Button>
                    </div>
                </div>

                {showScanner && (
                    <div className="border rounded-lg overflow-hidden bg-black">
                        <QrCodeReader 
                            onScanSuccess={handleScan} 
                            onScanFailure={(err) => console.warn(err)}
                        />
                        <button 
                            onClick={() => setShowScanner(false)}
                            className="w-full py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
                        >
                            Fechar Câmera
                        </button>
                    </div>
                )}

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
