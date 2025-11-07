"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Vantagem {
    id: string;
    nome: string;
    descricao: string;
    custo: number;
    categoria: string;
    empresa: string;
    imagem: string;
    estoque: number;
}

export default function LojaVantagens() {
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [vantagemSelecionada, setVantagemSelecionada] = useState<Vantagem | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    // Saldo mockado do estudante
    const saldoEstudante = 100;

    // Categorias disponíveis
    const categorias = [
        "Todas",
        "Alimentação",
        "Educação",
        "Tecnologia",
        "Entretenimento",
        "Serviços",
        "Outros"
    ];

    // Vantagens mockadas
    const vantagens: Vantagem[] = [
        {
            id: "1",
            nome: "Desconto 20% no Restaurante Universitário",
            descricao: "Válido de segunda a sexta, no almoço ou jantar",
            custo: 50,
            categoria: "Alimentação",
            empresa: "Restaurante Universitário PUC",
            imagem: "🍽️",
            estoque: 50
        },
        {
            id: "2",
            nome: "Vale Cafeteria R$ 15",
            descricao: "Válido na cafeteria do campus",
            custo: 100,
            categoria: "Alimentação",
            empresa: "Cafeteria Campus",
            imagem: "☕",
            estoque: 30
        },
        {
            id: "3",
            nome: "Desconto 30% em Livros",
            descricao: "Aplicável em livros técnicos e acadêmicos",
            custo: 80,
            categoria: "Educação",
            empresa: "Livraria Acadêmica",
            imagem: "📚",
            estoque: 25
        },
        {
            id: "4",
            nome: "Curso Online Gratuito",
            descricao: "Acesso a 1 curso de sua escolha na plataforma",
            custo: 200,
            categoria: "Educação",
            empresa: "Plataforma EduTech",
            imagem: "💻",
            estoque: 15
        },
        {
            id: "5",
            nome: "Fone de Ouvido Bluetooth",
            descricao: "Fone wireless com cancelamento de ruído",
            custo: 500,
            categoria: "Tecnologia",
            empresa: "Tech Store",
            imagem: "🎧",
            estoque: 10
        },
        {
            id: "6",
            nome: "Mouse Gamer",
            descricao: "Mouse óptico com DPI ajustável",
            custo: 300,
            categoria: "Tecnologia",
            empresa: "Tech Store",
            imagem: "🖱️",
            estoque: 12
        },
        {
            id: "7",
            nome: "Ingresso Cinema",
            descricao: "Válido de segunda a quinta-feira",
            custo: 120,
            categoria: "Entretenimento",
            empresa: "Cinemark",
            imagem: "🎬",
            estoque: 40
        },
        {
            id: "8",
            nome: "Assinatura Streaming 1 Mês",
            descricao: "Acesso ilimitado por 30 dias",
            custo: 150,
            categoria: "Entretenimento",
            empresa: "StreamFlix",
            imagem: "📺",
            estoque: 20
        },
        {
            id: "9",
            nome: "Corte de Cabelo",
            descricao: "Inclui lavagem e finalização",
            custo: 75,
            categoria: "Serviços",
            empresa: "Barbearia Estilo",
            imagem: "✂️",
            estoque: 35
        },
        {
            id: "10",
            nome: "Vale Transporte",
            descricao: "10 passagens de ônibus",
            custo: 60,
            categoria: "Serviços",
            empresa: "Transporte Urbano",
            imagem: "🚌",
            estoque: 60
        },
        {
            id: "11",
            nome: "Bolsa Notebook 15.6''",
            descricao: "Bolsa resistente com compartimentos",
            custo: 180,
            categoria: "Tecnologia",
            empresa: "Tech Store",
            imagem: "💼",
            estoque: 18
        },
        {
            id: "12",
            nome: "Kit Papelaria Premium",
            descricao: "Cadernos, canetas e materiais de qualidade",
            custo: 90,
            categoria: "Educação",
            empresa: "Papelaria Central",
            imagem: "✏️",
            estoque: 45
        }
    ];

    // Filtrar vantagens
    const vantagensFiltradas = vantagens.filter(vantagem => {
        const matchCategoria = categoriaFiltro === "Todas" || vantagem.categoria === categoriaFiltro;
        const matchBusca = vantagem.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vantagem.empresa.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategoria && matchBusca;
    });

    const abrirModal = (vantagem: Vantagem) => {
        setVantagemSelecionada(vantagem);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setVantagemSelecionada(null);
    };

    const resgatar = () => {
        if (!vantagemSelecionada) return;

        if (saldoEstudante < vantagemSelecionada.custo) {
            alert("Saldo insuficiente!");
            return;
        }

        // Aqui seria a lógica de resgate
        console.log("Resgatando:", vantagemSelecionada);
        alert(`Vantagem "${vantagemSelecionada.nome}" resgatada com sucesso!`);
        fecharModal();
    };

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
                        {/* Categorias */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {categorias.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoriaFiltro(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${categoriaFiltro === cat
                                            ? "bg-teal-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

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
                        {vantagensFiltradas.length === 0 ? (
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
                                            {vantagem.imagem}
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                                    {vantagem.categoria}
                                                </span>
                                                <span className={`text-xs ${vantagem.estoque < 10 ? 'text-red-600' : 'text-gray-500'}`}>
                                                    {vantagem.estoque} disponíveis
                                                </span>
                                            </div>

                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
                                                {vantagem.nome}
                                            </h3>

                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                                                {vantagem.descricao}
                                            </p>

                                            <p className="text-xs text-gray-500 mb-3">
                                                {vantagem.empresa}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-teal-600">
                                                        {vantagem.custo}
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
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 text-center">
                            <div className="text-8xl mb-4">{vantagemSelecionada.imagem}</div>
                            <span className="inline-block text-xs font-medium text-teal-600 bg-white px-4 py-2 rounded-full">
                                {vantagemSelecionada.categoria}
                            </span>
                        </div>

                        {/* Conteúdo do Modal */}
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {vantagemSelecionada.nome}
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Descrição</p>
                                    <p className="text-gray-700">{vantagemSelecionada.descricao}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Empresa Parceira</p>
                                    <p className="text-gray-700">{vantagemSelecionada.empresa}</p>
                                </div>

                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Custo</p>
                                        <p className="text-2xl font-bold text-teal-600">
                                            {vantagemSelecionada.custo} 🪙
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Disponíveis</p>
                                        <p className={`text-2xl font-bold ${vantagemSelecionada.estoque < 10 ? 'text-red-600' : 'text-gray-700'}`}>
                                            {vantagemSelecionada.estoque}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-sm font-medium text-gray-500 mb-1">Seu Saldo</p>
                                    <p className="text-xl font-bold text-gray-700">{saldoEstudante} 🪙</p>
                                    {saldoEstudante < vantagemSelecionada.custo && (
                                        <p className="text-sm text-red-600 mt-2">
                                            ⚠️ Você precisa de mais {vantagemSelecionada.custo - saldoEstudante} moedas
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
                                    disabled={saldoEstudante < vantagemSelecionada.custo || vantagemSelecionada.estoque === 0}
                                    className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {vantagemSelecionada.estoque === 0 ? 'Esgotado' : 'Confirmar Resgate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
