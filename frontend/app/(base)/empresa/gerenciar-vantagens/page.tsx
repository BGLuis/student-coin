"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, CadastrarVantagemModal } from "@/components";
import { advantageService, type Advantage } from "@/services/advantageService";
import { enterpriseService } from "@/services/enterpriseService";

export default function GerenciarVantagensPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vantagens, setVantagens] = useState<Advantage[]>([]);
    const [loading, setLoading] = useState(true);
    const [_enterpriseId, setEnterpriseId] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const enterprise = await enterpriseService.getMe();
            setEnterpriseId(enterprise.id);

            const response = await advantageService.getByEnterprise(enterprise.id);
            setVantagens(response.content);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            // Fallback: tenta carregar todas se falhar o endpoint específico (opcional)
            // const response = await advantageService.getAll();
            // setVantagens(response.content);
        } finally {
            setLoading(false);
        }
    };

    const handleNovaVantagem = async (vantagemData: { nome: string; descricao: string; custo: number; imagem?: File }) => {
        try {
            const newAdvantage = await advantageService.create({
                name: vantagemData.nome,
                description: vantagemData.descricao,
                price: vantagemData.custo,
                image: vantagemData.imagem
            });

            setVantagens([...vantagens, newAdvantage]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao criar vantagem:", error);
            alert("Erro ao criar vantagem. Tente novamente.");
        }
    };

    const handleExcluirVantagem = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta vantagem?")) {
            try {
                await advantageService.delete(id);
                setVantagens(vantagens.filter(v => v.id !== id));
            } catch (error) {
                console.error("Erro ao excluir vantagem:", error);
                alert("Erro ao excluir vantagem. Tente novamente.");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header da página */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Gerenciar Vantagens
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Cadastre e gerencie as vantagens oferecidas pela sua empresa
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Cadastrar Vantagem
                    </Button>
                </div>

                {/* Lista de vantagens */}
                {vantagens.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                            Nenhuma vantagem cadastrada
                        </h3>
                        <p className="mt-1 text-gray-500">
                            Comece cadastrando sua primeira vantagem.
                        </p>
                        <div className="mt-6">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Cadastrar Primeira Vantagem
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vantagens.map((vantagem) => (
                            <div
                                key={vantagem.id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                {/* Imagem da vantagem */}
                                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                                    {vantagem.imageUrl ? (
                                        <Image
                                            src={vantagem.imageUrl}
                                            alt={vantagem.name || "Imagem da vantagem"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <svg
                                            className="w-16 h-16 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    )}
                                </div>

                                {/* Conteúdo */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {vantagem.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {vantagem.description}
                                    </p>

                                    {/* Custo em moedas */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-6 h-6 text-yellow-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-2xl font-bold text-gray-900">
                                                {vantagem.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ações */}
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleExcluirVantagem(vantagem.id)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                                        >
                                            Excluir
                                        </Button>
                                        <Button
                                            onClick={() => {/* TODO: Editar */ }}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
                                        >
                                            Editar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de cadastro */}
            <CadastrarVantagemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleNovaVantagem}
            />
        </div>
    );
}
