"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { transactionService, type Transaction, type BalanceResponse } from "@/services";

// Ícones para a interface
const ArrowDownIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8l-8 8-8-8" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m-8 8l8-8 8 8" />
    </svg>
);

const CoinsIcon = () => (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 0V4m0 16v-4" />
    </svg>
);

export default function MeuExtrato() {
    const [periodo, setPeriodo] = useState("Todos");
    const [tipoTransacao, setTipoTransacao] = useState("Todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [mostrarDatas, setMostrarDatas] = useState(false);

    const [balanceData, setBalanceData] = useState<BalanceResponse | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [visibleCoupons, setVisibleCoupons] = useState<Set<string>>(new Set());

    const toggleCouponVisibility = (uuid: string) => {
        const newSet = new Set(visibleCoupons);
        if (newSet.has(uuid)) {
            newSet.delete(uuid);
        } else {
            newSet.add(uuid);
        }
        setVisibleCoupons(newSet);
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await transactionService.getBalance(0, pageSize);
                setBalanceData(data);
                setTransactions(data.transactions.content);
                setCurrentPage(1);
            } catch (err) {
                console.error("Erro ao buscar extrato:", err);
                setError("Erro ao carregar o extrato. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, [pageSize]);

    const loadMoreTransactions = async () => {
        if (loadingMore || balanceData?.transactions.last) return;

        setLoadingMore(true);
        try {
            const data = await transactionService.getBalance(currentPage, pageSize);
            setTransactions(prev => [...prev, ...data.transactions.content]);
            setBalanceData(prev => prev ? { ...prev, transactions: data.transactions } : data);
            setCurrentPage(prev => prev + 1);
        } catch (err) {
            console.error("Erro ao carregar mais transações:", err);
            setError("Erro ao carregar mais transações. Tente novamente.");
        } finally {
            setLoadingMore(false);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const getTransactionTypeDetails = (transaction: Transaction) => {
        const isPositive = transaction.value >= 0;
        
        if (transaction.coupon) {
            return { type: "Resgate", icon: <ArrowUpIcon />, isPositive: false };
        }
        
        if (isPositive) {
            if (transaction.motive) {
                return { type: "Recebimento", icon: <ArrowDownIcon />, isPositive: true };
            }
            return { type: "Recarga Semestral", icon: <CoinsIcon />, isPositive: true };
        }
        
        return { type: "Envio", icon: <ArrowUpIcon />, isPositive: false };
    };

    const getPartner = (transaction: Transaction): string => {
        if (transaction.coupon) {
            // Ideally we would show enterprise name, but we don't have it in the simplified response
            return "Empresa Parceira";
        }
        if (transaction.value >= 0) {
             return !transaction.motive ? "Sistema" : "Professor";
        }
        return "Transferência";
    };

    const filteredTransactions = transactions.filter(t => {
        const partner = getPartner(t);
        const { type } = getTransactionTypeDetails(t);
        const formattedDate = formatDate(t.createdAt);

        const matchesSearch = partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.motive && t.motive.toLowerCase().includes(searchTerm.toLowerCase())) ||
            formattedDate.includes(searchTerm);

        let matchesPeriod = true;
        if (periodo !== "Todos") {
            const dataTransacao = new Date(t.createdAt);
            if (periodo === "Personalizado" && (dataInicio || dataFim)) {
                const inicio = dataInicio ? new Date(dataInicio) : null;
                const fim = dataFim ? new Date(dataFim) : null;
                if (inicio && fim) matchesPeriod = dataTransacao >= inicio && dataTransacao <= fim;
                else if (inicio) matchesPeriod = dataTransacao >= inicio;
                else if (fim) matchesPeriod = dataTransacao <= fim;
            } else {
                const hoje = new Date();
                const diffDias = Math.floor((hoje.getTime() - dataTransacao.getTime()) / (1000 * 60 * 60 * 24));
                if (periodo === "30dias") matchesPeriod = diffDias <= 30;
                else if (periodo === "90dias") matchesPeriod = diffDias <= 90;
                else if (periodo === "ano") matchesPeriod = diffDias <= 365;
            }
        }

        let matchesTipo = true;
        if (tipoTransacao !== "Todas") {
            if (tipoTransacao === "Recebimento") matchesTipo = type === "Recebimento" || type === "Recarga Semestral";
            else if (tipoTransacao === "Resgate") matchesTipo = type === "Resgate" || type === "Envio";
        }

        return matchesSearch && matchesPeriod && matchesTipo;
    });

    if (loading && !balanceData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando extrato...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <Link href="/" className="hover:text-teal-600">Início</Link>
                    <span>/</span>
                    <span className="font-medium text-gray-700">Meu Extrato</span>
                </div>

                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Extrato de Moedas</h1>
                    <p className="text-gray-600">Acompanhe suas transações e saldo de moedas estudantis.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna de Filtros e Saldo */}
                    <aside className="lg:col-span-1 space-y-8">
                        {balanceData && (
                            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Saldo Atual</h2>
                                <p className="text-5xl font-bold text-teal-600">M$ {balanceData.balance.toFixed(2)}</p>
                            </div>
                        )}

                        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Filtros</h3>
                            <div className="space-y-6">
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    <input
                                        type="text"
                                        placeholder="Buscar por parceiro ou motivo"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">Período</label>
                                    <select value={periodo} onChange={(e) => { setPeriodo(e.target.value); setMostrarDatas(e.target.value === "Personalizado"); }} className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option value="Todos">Todos</option>
                                        <option value="30dias">Últimos 30 dias</option>
                                        <option value="90dias">Últimos 90 dias</option>
                                        <option value="ano">Último ano</option>
                                        <option value="Personalizado">Personalizado</option>
                                    </select>
                                </div>
                                {mostrarDatas && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-2 block">De</label>
                                            <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-2 block">Até</label>
                                            <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">Tipo de Transação</label>
                                    <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option value="Todas">Todas</option>
                                        <option value="Recebimento">Entradas</option>
                                        <option value="Resgate">Saídas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Coluna de Transações */}
                    <main className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">Histórico de Transações</h3>
                            </div>
                            <div className="space-y-2 px-6 pb-6">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map(transaction => {
                                        const { icon, isPositive } = getTransactionTypeDetails(transaction);
                                        const partner = getPartner(transaction);
                                        const value = transaction.value;
                                        const isCouponVisible = visibleCoupons.has(transaction.uuid);

                                        return (
                                            <div key={transaction.uuid} className="flex items-center p-4 rounded-lg hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                                                    {icon}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold text-gray-800">{partner}</p>
                                                    {transaction.coupon ? (
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <span>Resgate (Cupom:</span>
                                                            <span className={`font-mono bg-gray-100 px-1 rounded ${!isCouponVisible ? 'blur-sm select-none' : ''}`}>
                                                                {transaction.coupon}
                                                            </span>
                                                            <span>)</span>
                                                            <button
                                                                onClick={() => toggleCouponVisibility(transaction.uuid)}
                                                                className="ml-1 text-gray-400 hover:text-teal-600 focus:outline-none"
                                                                title={isCouponVisible ? "Ocultar cupom" : "Mostrar cupom"}
                                                            >
                                                                {isCouponVisible ? (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-500">{transaction.motive || "Transação geral"}</p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-bold text-lg ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                        {isPositive ? '+' : '-'} M$ {Math.abs(value).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-16">
                                        <CoinsIcon />
                                        <h4 className="mt-4 text-xl font-semibold text-gray-700">Nenhuma transação</h4>
                                        <p className="mt-1 text-gray-500">Ainda não há transações para exibir com os filtros selecionados.</p>
                                    </div>
                                )}
                            </div>

                            {balanceData && !balanceData.transactions.last && (
                                <div className="p-6 border-t border-gray-200">
                                    <button
                                        onClick={loadMoreTransactions}
                                        disabled={loadingMore}
                                        className="w-full py-2.5 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-wait"
                                    >
                                        {loadingMore ? 'Carregando...' : 'Carregar Mais'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
