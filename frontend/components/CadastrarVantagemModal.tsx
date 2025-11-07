"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Textarea } from "./index";

interface CadastrarVantagemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vantagem: {
        nome: string;
        descricao: string;
        custo: number;
        imagem?: string;
    }) => void;
}

export default function CadastrarVantagemModal({
    isOpen,
    onClose,
    onSave,
}: CadastrarVantagemModalProps) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [custo, setCusto] = useState("");
    const [imagem, setImagem] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Limpar formulário ao fechar
    useEffect(() => {
        if (!isOpen) {
            setNome("");
            setDescricao("");
            setCusto("");
            setImagem("");
            setErrors({});
        }
    }, [isOpen]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!nome.trim()) {
            newErrors.nome = "Nome da vantagem é obrigatório";
        }

        if (!descricao.trim()) {
            newErrors.descricao = "Descrição é obrigatória";
        }

        if (!custo || parseFloat(custo) <= 0) {
            newErrors.custo = "Custo deve ser maior que zero";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSave({
                nome,
                descricao,
                custo: parseFloat(custo),
                imagem: imagem || undefined,
            });
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                onClose();
            }, 2000);
        }
    };

    const handleCancel = () => {
        if (nome || descricao || custo || imagem) {
            if (confirm("Deseja descartar as alterações?")) {
                onClose();
            }
        } else {
            onClose();
        }
    };

    if (!isOpen && !showSuccessModal) return null;

    // Modal de sucesso
    if (showSuccessModal) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="relative bg-white rounded-lg p-8 max-w-sm mx-4 shadow-xl">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Vantagem cadastrada!
                        </h3>
                        <p className="text-sm text-gray-500">
                            A vantagem foi cadastrada com sucesso.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleCancel}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Cadastrar Nova Vantagem
                    </h2>
                    <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        {/* Nome da vantagem */}
                        <div>
                            <label
                                htmlFor="nome"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nome da Vantagem *
                            </label>
                            <Input
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Ex: Desconto em Livros"
                                error={errors.nome}
                                className="w-full"
                            />
                            {errors.nome && (
                                <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                            )}
                        </div>

                        {/* Descrição */}
                        <div>
                            <label
                                htmlFor="descricao"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Descrição *
                            </label>
                            <Textarea
                                id="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva os detalhes da vantagem..."
                                rows={4}
                                error={errors.descricao}
                                className="w-full"
                            />
                            {errors.descricao && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.descricao}
                                </p>
                            )}
                        </div>

                        {/* Custo em moedas */}
                        <div>
                            <label
                                htmlFor="custo"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Custo (em moedas) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-yellow-500"
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
                                </div>
                                <Input
                                    id="custo"
                                    type="number"
                                    value={custo}
                                    onChange={(e) => setCusto(e.target.value)}
                                    placeholder="0"
                                    min="1"
                                    step="1"
                                    error={errors.custo}
                                    className="pl-10 w-full"
                                />
                            </div>
                            {errors.custo && (
                                <p className="mt-1 text-sm text-red-600">{errors.custo}</p>
                            )}
                        </div>

                        {/* URL da imagem */}
                        <div>
                            <label
                                htmlFor="imagem"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                URL da Imagem (opcional)
                            </label>
                            <Input
                                id="imagem"
                                type="url"
                                value={imagem}
                                onChange={(e) => setImagem(e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="w-full"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Cole o link de uma imagem para representar a vantagem
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            Cadastrar Vantagem
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
