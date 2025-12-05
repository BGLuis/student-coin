"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { transactionService, type Transaction } from "@/services";

export default function MinhasVantagensPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await transactionService.getBalance(0, 100);
                // Filter transactions that have an advantage (redeems)
                const redeemed = response.transactions.content.filter(t => t.advantage);
                setTransactions(redeemed);
            } catch (error) {
                console.error("Erro ao carregar vantagens:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleOpenModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-end gap-3 mb-6 text-base text-gray-600 -ml-2">
                    <Link href="/" className="hover:text-teal-600">
                        Início
                    </Link>
                    <span className="text-gray-400">›</span>
                    <span className="text-teal-600 font-medium">Minhas Vantagens</span>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Minhas Vantagens
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Vantagens que você já resgatou. Clique para ver o QR Code.
                    </p>
                </div>

                {transactions.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">🛍️</div>
                        <h3 className="text-lg font-medium text-gray-900">
                            Nenhuma vantagem resgatada
                        </h3>
                        <p className="mt-1 text-gray-500 mb-6">
                            Você ainda não resgatou nenhuma vantagem.
                        </p>
                        <Link
                            href="/loja-vantagens"
                            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Ir para Loja
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {transactions.map((t) => (
                            <div
                                key={t.uuid}
                                onClick={() => handleOpenModal(t)}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
                            >
                                <div className="h-48 bg-gray-100 relative flex items-center justify-center">
                                    {t.advantage?.imageUrl ? (
                                        <Image
                                            src={t.advantage.imageUrl}
                                            alt={t.advantage.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <span className="text-4xl">🎁</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                        {t.advantage?.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Resgatado em: {formatDate(t.createdAt)}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-teal-600 font-bold">
                                            {t.value < 0 ? -t.value : t.value} 🪙
                                        </span>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                            Ver QR Code
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal QR Code */}
            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {selectedTransaction.advantage?.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Apresente este código para a empresa parceira
                            </p>

                            <div className="bg-white p-4 rounded-xl border-2 border-gray-100 inline-block mb-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${window.location.origin}/empresa/resgatar-vantagem?code=${selectedTransaction.coupon || ""}`)}`}
                                    alt="QR Code"
                                    className="w-48 h-48"
                                />
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-1">Código do Cupom</p>
                                <p className="text-2xl font-mono font-bold text-teal-600 tracking-wider">
                                    {selectedTransaction.coupon}
                                </p>
                            </div>

                            <div className="text-sm text-gray-400">
                                Resgatado em {formatDate(selectedTransaction.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
