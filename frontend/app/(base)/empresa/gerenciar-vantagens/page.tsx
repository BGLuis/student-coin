"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, CadastrarVantagemModal, Input } from "@/components";

interface Vantagem {
    id: number;
    nome: string;
    descricao: string;
    custo: number;
    imagem?: string;
}

interface Resgate {
    id: number;
    codigoCupom: string;
    vantagem: string;
    aluno: string;
    email: string;
    dataResgate: string;
}

export default function GerenciarVantagensPage() {
    const [activeTab, setActiveTab] = useState<"vantagens" | "cupons" | "historico">("vantagens");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [codigoCupom, setCodigoCupom] = useState("");
    const [cupomVerificado, setCupomVerificado] = useState<Resgate | null>(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [filtroVantagem, setFiltroVantagem] = useState<string>("todas");
    const [vantagens, setVantagens] = useState<Vantagem[]>([
        {
            id: 1,
            nome: "Desconto em Livros",
            descricao: "20% de desconto em livros técnicos",
            custo: 50
        },
        {
            id: 2,
            nome: "Vale Café",
            descricao: "Vale de R$ 10 para café na cantina",
            custo: 30
        }
    ]);

    const handleNovaVantagem = (vantagem: Omit<Vantagem, "id">) => {
        const novaVantagem: Vantagem = {
            id: vantagens.length + 1,
            ...vantagem
        };
        setVantagens([...vantagens, novaVantagem]);
    };

    const handleExcluirVantagem = (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta vantagem?")) {
            setVantagens(vantagens.filter(v => v.id !== id));
        }
    };

    // Dados mockados de resgates
    const resgates: Resgate[] = [
        {
            id: 1,
            codigoCupom: "CUPOM-2024-001",
            vantagem: "Desconto em Livros",
            aluno: "João Silva",
            email: "joao.silva@email.com",
            dataResgate: "2024-11-10T14:30:00"
        },
        {
            id: 2,
            codigoCupom: "CUPOM-2024-002",
            vantagem: "Vale Café",
            aluno: "Maria Santos",
            email: "maria.santos@email.com",
            dataResgate: "2024-11-12T09:20:00"
        },
        {
            id: 3,
            codigoCupom: "CUPOM-2024-003",
            vantagem: "Desconto em Livros",
            aluno: "Pedro Oliveira",
            email: "pedro.oliveira@email.com",
            dataResgate: "2024-11-13T16:45:00"
        },
        {
            id: 4,
            codigoCupom: "CUPOM-2024-004",
            vantagem: "Vale Café",
            aluno: "Ana Costa",
            email: "ana.costa@email.com",
            dataResgate: "2024-11-13T08:15:00"
        }
    ];

    const resgatesFiltrados = filtroVantagem === "todas" 
        ? resgates 
        : resgates.filter(r => r.vantagem === filtroVantagem);

    const vantagensUnicas = Array.from(new Set(resgates.map(r => r.vantagem)));

    const handleVerificarCupom = () => {
        setMostrarResultado(false);
        const cupom = resgates.find(r => r.codigoCupom === codigoCupom.toUpperCase());
        setCupomVerificado(cupom || null);
        setMostrarResultado(true);
    };

    const formatarData = (dataISO: string) => {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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
                    {activeTab === "vantagens" && (
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
                    )}
                </div>

                {/* Tabs de navegação */}
                <div className="mb-8 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab("vantagens")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "vantagens"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                Vantagens
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("cupons")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "cupons"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Conferir Cupom
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("historico")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === "historico"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Histórico de Resgates
                            </div>
                        </button>
                    </nav>
                </div>

                {/* Conteúdo das tabs */}
                {activeTab === "vantagens" && (
                    <div>
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
                                    {vantagem.imagem ? (
                                        <Image
                                            src={vantagem.imagem}
                                            alt={vantagem.nome}
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
                                        {vantagem.nome}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {vantagem.descricao}
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
                                                {vantagem.custo}
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
                                            onClick={() => {/* TODO: Editar */}}
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
                )}

                {/* Tab Conferir Cupom */}
                {activeTab === "cupons" && (
                    <div className="bg-white rounded-lg shadow p-8">
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Verificar Cupom
                                </h2>
                                <p className="text-gray-600">
                                    Digite o código do cupom para verificar se já foi resgatado
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <Input
                                        label="Código do Cupom"
                                        placeholder="Ex: CUPOM-2024-001"
                                        value={codigoCupom}
                                        onChange={(e) => {
                                            setCodigoCupom(e.target.value.toUpperCase());
                                            setMostrarResultado(false);
                                        }}
                                        className="text-center text-lg font-mono"
                                    />
                                </div>

                                <Button
                                    onClick={handleVerificarCupom}
                                    disabled={!codigoCupom.trim()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Verificar Cupom
                                </Button>

                                {mostrarResultado && (
                                    <div className="mt-6">
                                        {cupomVerificado ? (
                                            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold mb-3 text-green-900">
                                                            Cupom Encontrado
                                                        </h3>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Código:</span>
                                                                <span className="font-mono font-medium text-gray-900">{cupomVerificado.codigoCupom}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Vantagem:</span>
                                                                <span className="font-medium text-gray-900">{cupomVerificado.vantagem}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Aluno:</span>
                                                                <span className="font-medium text-gray-900">{cupomVerificado.aluno}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Email:</span>
                                                                <span className="font-medium text-gray-900">{cupomVerificado.email}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Data do Resgate:</span>
                                                                <span className="font-medium text-gray-900">{formatarData(cupomVerificado.dataResgate)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                            <p className="text-sm text-blue-800">
                                                                <span className="font-semibold">💡 Informação:</span> Este cupom foi resgatado pelo aluno. Confira os dados acima antes de validar o benefício.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-gray-200 bg-gray-50 rounded-lg p-6 text-center">
                                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    Cupom não encontrado
                                                </h3>
                                                <p className="text-gray-600">
                                                    O código informado não corresponde a nenhum cupom resgatado.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Histórico de Resgates */}
                {activeTab === "historico" && (
                    <div>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Histórico de Resgates
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Total de {resgates.length} cupons resgatados
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="text-sm text-gray-600">Filtrar por:</label>
                                        <select
                                            value={filtroVantagem}
                                            onChange={(e) => setFiltroVantagem(e.target.value)}
                                            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="todas">Todas as vantagens</option>
                                            {vantagensUnicas.map(vantagem => (
                                                <option key={vantagem} value={vantagem}>{vantagem}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Código Cupom
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vantagem
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aluno
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Data do Resgate
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {resgatesFiltrados.length > 0 ? (
                                            resgatesFiltrados.map((resgate) => (
                                                <tr key={resgate.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-mono font-medium text-gray-900">
                                                            {resgate.codigoCupom}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{resgate.vantagem}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{resgate.aluno}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{resgate.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {formatarData(resgate.dataResgate)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center">
                                                    <div className="text-gray-500">
                                                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <p className="text-sm">Nenhum resgate encontrado para este filtro.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
