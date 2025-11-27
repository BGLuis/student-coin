"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { advantageService, transactionService, type Advantage } from "@/services";

interface VantagemDisplay extends Advantage {
    empresaName?: string;
}

export default function LojaVantagens() {
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [vantagemSelecionada, setVantagemSelecionada] = useState<VantagemDisplay | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(true);

    const [saldoEstudante, setSaldoEstudante] = useState(0);
    const [vantagens, setVantagens] = useState<VantagemDisplay[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [advResponse, balanceResponse] = await Promise.all([
                    advantageService.getAll(0, 100),
                    transactionService.getBalance(0, 1)
                ]);
                
                setVantagens(advResponse.content);
                setSaldoEstudante(balanceResponse.balance);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const abrirModal = async (vantagem: VantagemDisplay) => {
        setVantagemSelecionada(vantagem);
        setModalAberto(true);
        
        // Fetch enterprise info if not already present
        if (!vantagem.empresaName) {
             try {
                 const enterprise = await advantageService.getEnterprise(vantagem.id);
                 setVantagemSelecionada(prev => prev ? { ...prev, empresaName: enterprise.name } : null);
             } catch (e) {
                 console.error(e);
             }
        }
    };

    const fecharModal = () => {
        setModalAberto(false);
        setVantagemSelecionada(null);
    };

    const resgatar = async () => {
        if (!vantagemSelecionada) return;

        if (saldoEstudante < vantagemSelecionada.price) {
            alert("Saldo insuficiente!");
            return;
        }

        try {
            const uuid = crypto.randomUUID();
            await transactionService.redeemAdvantage(uuid, vantageSelecionada.id);
            alert(`Vantagem resgatada com sucesso!`);
            setSaldoEstudante(prev => prev - vantageSelecionada.price);
            fecharModal();
        } catch (error: any) {
            console.error(error);
            alert("Erro ao resgatar vantagem: " + (error.response?.data?.message || "Erro desconhecido"));
        }
    };
    
    // Categorias placeholder since backend doesn't have them yet
    const categorias = ["Todas"]; 

    const vantagensFiltradas = vantagens.filter(vantagem => {
        const matchBusca = vantagem.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchBusca;
    });

    return (
        <>
            <div className="bg-gray-50 min-h-full py-4 px-6 pt-10">
                <div className="max-w-7xl mx-auto pb-6">
                    {/* Breadcrumb */}
                    <div className="flex items-end gap-3 mb-6 text-base text-gray-600 -ml-24">
                        <Link href="/" className="hover:text-teal-600">
                            Início
                        </Link>
                        <span className="text-teal-600">›</span>
                        <span className="text-teal-600 font-medium">Loja de Vantagens</span>
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Loja de Vantagens</h1>
                            <p className="text-gray-600 mt-2">Troque suas moedas por benefícios exclusivos</p>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-600">Seu saldo</p>
                            <p className="text-3xl font-bold text-teal-600">{saldoEstudante} 🪙</p>
                        </div>
                    </div>

                    {/* Filtros e Busca */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                        {/* Busca */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar vantagens..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-5 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                                🔍
                            </span>
                        </div>
                    </div>

                    {/* Grid de Vantagens */}
                    <div className="pb-6">
                        {loading ? (
                            <div className="text-center py-20">Carregando...</div>
                        ) : vantagensFiltradas.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-6xl mb-4">🔍</p>
                                <p className="text-xl">Nenhuma vantagem encontrada</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {vantagensFiltradas.map((vantagem) => (
                                    <div
                                        key={vantagem.id}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 overflow-hidden group"
                                        onClick={() => abrirModal(vantagem)}
                                    >
                                        {/* Imagem/Emoji */}
                                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 h-40 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform">
                                            {vantagem.imageUrl ? <img src={vantagem.imageUrl} alt={vantagem.description} className="h-full w-full object-cover" /> : "🎁"}
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="p-5">
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
                                                {vantagem.description}
                                            </h3>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-teal-600">
                                                        {vantagem.price}
                                                    </span>
                                                    <span className="text-xl">🪙</span>
                                                </div>
                                                <button
                                                    className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-600 transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        abrirModal(vantagem);
                                                    }}
                                                >
                                                    Resgatar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Detalhes */}
            {modalAberto && vantagemSelecionada && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={fecharModal}>
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header do Modal */}
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 text-center relative h-48 flex items-center justify-center">
                            {vantagemSelecionada.imageUrl ? 
                                <img src={vantagemSelecionada.imageUrl} alt={vantagemSelecionada.description} className="h-full object-contain" /> :
                                <div className="text-8xl">🎁</div>
                            }
                        </div>

                        {/* Conteúdo do Modal */}
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Vantagem
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Descrição</p>
                                    <p className="text-gray-700">{vantagemSelecionada.description}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Empresa Parceira</p>
                                    <p className="text-gray-700">{vantagemSelecionada.empresaName || "Carregando..."}</p>
                                </div>

                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Custo</p>
                                        <p className="text-2xl font-bold text-teal-600">
                                            {vantagemSelecionada.price} 🪙
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-sm font-medium text-gray-500 mb-1">Seu Saldo</p>
                                    <p className="text-xl font-bold text-gray-700">{saldoEstudante} 🪙</p>
                                    {saldoEstudante < vantagemSelecionada.price && (
                                        <p className="text-sm text-red-600 mt-2">
                                            ⚠️ Você precisa de mais {vantagemSelecionada.price - saldoEstudante} moedas
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex gap-4">
                                <button
                                    onClick={fecharModal}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={resgatar}
                                    disabled={saldoEstudante < vantagemSelecionada.price}
                                    className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Confirmar Resgate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
