"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Transaction {
    id: string;
    data: string;
    transacao: string;
    parceiro: string;
    valor: number;
    motivoItem: string;
}

export default function MeuExtrato() {
    const [periodo, setPeriodo] = useState("Todos");
    const [tipoTransacao, setTipoTransacao] = useState("Todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [mostrarDatas, setMostrarDatas] = useState(false);

    // Dados mockados de exemplo
    const transactions: Transaction[] = [
        {
            id: "1",
            data: "30/10/2025",
            transacao: "Recebimento de Moedas",
            parceiro: "Prof. João Paulo Aramuni",
            valor: 500,
            motivoItem: "Participação e Engajamento"
        },
        {
            id: "2",
            data: "25/10/2025",
            transacao: "Resgate de Vantagens",
            parceiro: "Café Universitário",
            valor: -500,
            motivoItem: "Desconto no Lanche"
        },
        {
            id: "3",
            data: "28/08/2025",
            transacao: "Recebimento de Moedas",
            parceiro: "Prof. Lesandro Ponciano",
            valor: 500,
            motivoItem: "Iniciativa e Proatividade"
        }
    ];

    const filteredTransactions = transactions.filter(t => {
        // Filtro de busca
        const matchesSearch = t.parceiro.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.motivoItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.data.includes(searchTerm);
        
        // Filtro de período
        let matchesPeriod = true;
        if (periodo === "Personalizado" && (dataInicio || dataFim)) {
            const [dia, mes, ano] = t.data.split('/').map(Number);
            const dataTransacao = new Date(ano, mes - 1, dia);
            
            if (dataInicio && dataFim) {
                const inicio = new Date(dataInicio);
                const fim = new Date(dataFim);
                matchesPeriod = dataTransacao >= inicio && dataTransacao <= fim;
            } else if (dataInicio) {
                const inicio = new Date(dataInicio);
                matchesPeriod = dataTransacao >= inicio;
            } else if (dataFim) {
                const fim = new Date(dataFim);
                matchesPeriod = dataTransacao <= fim;
            }
        } else if (periodo !== "Todos") {
            const [dia, mes, ano] = t.data.split('/').map(Number);
            const dataTransacao = new Date(ano, mes - 1, dia);
            const hoje = new Date();
            const diffDias = Math.floor((hoje.getTime() - dataTransacao.getTime()) / (1000 * 60 * 60 * 24));
            
            if (periodo === "30dias") {
                matchesPeriod = diffDias <= 30;
            } else if (periodo === "90dias") {
                matchesPeriod = diffDias <= 90;
            } else if (periodo === "ano") {
                matchesPeriod = diffDias <= 365;
            }
        }
        
        // Filtro de tipo de transação
        let matchesTipo = true;
        if (tipoTransacao !== "Todas") {
            if (tipoTransacao === "Recebimento") {
                matchesTipo = t.valor > 0;
            } else if (tipoTransacao === "Resgate") {
                matchesTipo = t.valor < 0;
            }
        }
        
        return matchesSearch && matchesPeriod && matchesTipo;
    });

    return (
        <>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #14b8a6;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0d9488;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #14b8a6 transparent;
                }
            `}</style>
            <div className="bg-gray-50 h-full overflow-hidden py-4 px-6 pt-10">
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    {/* Breadcrumb */}
                    <div className="flex items-end gap-3 mb-6 text-base text-gray-600 flex-shrink-0 -ml-24">
                        <Link href="/" className="hover:text-teal-600">
                            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
                        <span className="pb-0.5">›</span>
                        <span className="text-gray-800 font-medium pb-0.5">MEU EXTRATO</span>
                    </div>

                    {/* Título */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6 flex-shrink-0">
                        Meu Extrato de Moedas Estudantis
                    </h1>

                    {/* Card Principal com scroll interno */}
                    <div className="bg-white rounded-lg shadow-sm flex-1 min-h-0 flex flex-col">
                        <div className="overflow-y-auto custom-scrollbar p-6 flex-1">
                    {/* Filtros e Busca */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Filtros */}
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold text-gray-700">Filtrar por:</span>
                            
                            {/* Período */}
                            <div className="relative">
                                <select
                                    value={periodo}
                                    onChange={(e) => {
                                        setPeriodo(e.target.value);
                                        setMostrarDatas(e.target.value === "Personalizado");
                                        if (e.target.value !== "Personalizado") {
                                            setDataInicio("");
                                            setDataFim("");
                                        }
                                    }}
                                    className="appearance-none text-sm px-3 py-1.5 pr-7 cursor-pointer transition-all focus:outline-none border"
                                    style={{ 
                                        backgroundColor: 'transparent',
                                        color: '#666666',
                                        borderColor: '#DDDDDD',
                                        borderRadius: '6px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#999999'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#DDDDDD'}
                                >
                                    <option value="Todos">Período: Todos</option>
                                    <option value="30dias">Últimos 30 dias</option>
                                    <option value="90dias">Últimos 90 dias</option>
                                    <option value="ano">Último ano</option>
                                    <option value="Personalizado">Personalizado</option>
                                </select>
                                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#666666' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Seletor de Datas */}
                            {mostrarDatas && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="date"
                                        value={dataInicio}
                                        onChange={(e) => setDataInicio(e.target.value)}
                                        className="text-sm px-3 py-1.5 cursor-pointer transition-all focus:outline-none border"
                                        style={{ 
                                            backgroundColor: 'transparent',
                                            color: '#666666',
                                            borderColor: '#DDDDDD',
                                            borderRadius: '6px'
                                        }}
                                        placeholder="Data inicial"
                                    />
                                    <span className="text-gray-400">até</span>
                                    <input
                                        type="date"
                                        value={dataFim}
                                        onChange={(e) => setDataFim(e.target.value)}
                                        className="text-sm px-3 py-1.5 cursor-pointer transition-all focus:outline-none border"
                                        style={{ 
                                            backgroundColor: 'transparent',
                                            color: '#666666',
                                            borderColor: '#DDDDDD',
                                            borderRadius: '6px'
                                        }}
                                        placeholder="Data final"
                                    />
                                </div>
                            )}

                            {/* Tipo de Transação */}
                            <div className="relative">
                                <select
                                    value={tipoTransacao}
                                    onChange={(e) => setTipoTransacao(e.target.value)}
                                    className="appearance-none text-sm px-3 py-1.5 pr-7 cursor-pointer transition-all focus:outline-none border"
                                    style={{ 
                                        backgroundColor: 'transparent',
                                        color: '#666666',
                                        borderColor: '#DDDDDD',
                                        borderRadius: '6px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#999999'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#DDDDDD'}
                                >
                                    <option value="Todas">Tipo de Transação: Todas</option>
                                    <option value="Recebimento">Recebimento</option>
                                    <option value="Resgate">Resgate</option>
                                </select>
                                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#666666' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Busca */}
                        <div className="flex-1 lg:max-w-md ml-auto">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar por Parceiro, Data..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    style={{ 
                                        color: '#333333',
                                        borderRadius: '20px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transação</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Parceiro</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Valor (M$)</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Motivo/Item</th>
                                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.data}</td>
                                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.transacao}</td>
                                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.parceiro}</td>
                                        <td className={`py-4 px-4 text-sm font-medium ${transaction.valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.valor > 0 ? '+ ' : '- '}
                                            {Math.abs(transaction.valor)}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-700">{transaction.motivoItem}</td>
                                        <td className="py-4 px-4 text-center">
                                            <button className="text-gray-600 hover:text-gray-800 inline-flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mensagem quando não há transações */}
                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            Nenhuma transação encontrada
                        </div>
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
