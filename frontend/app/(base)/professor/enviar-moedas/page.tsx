"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Student {
    id: string;
    nome: string;
    cpf: string;
    curso: string;
}

export default function EnviarMoedas() {
    const [categoriaMerito, setCategoriaMerito] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [motivo, setMotivo] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // Saldo disponível mockado
    const saldoDisponivel = 1850;

    // Lista de estudantes mockada
    const students: Student[] = [
        { id: "1", nome: "Gabriel Assis", cpf: "123.456.789-00", curso: "Engenharia de Software" },
        { id: "2", nome: "João Pedro Peres", cpf: "234.567.890-11", curso: "Ciência da Computação" },
        { id: "3", nome: "Luís Henrique", cpf: "345.678.901-22", curso: "Sistemas de Informação" },
        { id: "4", nome: "Maria Silva", cpf: "456.789.012-33", curso: "Engenharia de Software" },
        { id: "5", nome: "Pedro Santos", cpf: "567.890.123-44", curso: "Ciência da Computação" },
    ];

    // Categorias de mérito
    const categorias = [
        "Participação e Engajamento",
        "Desempenho e Qualidade",
        "Superação e Esforço",
        "Iniciativa e Proatividade",
        "Colaboração e Trabalho em Equipe",
        "Criatividade e Inovação",
    ];

    // Filtrar estudantes baseado na busca
    const filteredStudents = students.filter(student => 
        student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.cpf.includes(searchTerm)
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudent || !categoriaMerito || !quantidade || !motivo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        if (parseInt(quantidade) > saldoDisponivel) {
            alert("Saldo insuficiente!");
            return;
        }
        // Aqui seria a lógica de envio
        console.log({
            aluno: selectedStudent,
            categoria: categoriaMerito,
            quantidade,
            motivo
        });
        alert("Moedas enviadas com sucesso!");
        // Limpar formulário
        setSelectedStudent(null);
        setCategoriaMerito("");
        setQuantidade("");
        setMotivo("");
        setSearchTerm("");
    };

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
                        <span className="text-gray-800 font-medium pb-0.5">ENVIO DE MOEDAS</span>
                    </div>

                    {/* Título */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6 flex-shrink-0">
                        Reconhecer Mérito Estudantil
                    </h1>

                    {/* Card Principal com scroll interno */}
                    <div className="bg-white rounded-lg shadow-sm flex-1 min-h-0 flex flex-col">
                        <div className="overflow-y-auto custom-scrollbar p-6 flex-1">
                    {/* Saldo Disponível */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Saldo Disponível</h2>
                        <p className="text-3xl font-bold text-teal-600">M$ {saldoDisponivel}</p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit}>
                        {/* Doar Moedas */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-pink-600 mb-2">Doar Moedas</h2>
                            <p className="text-gray-600 mb-6">
                                Deseja reconhecer alguém? Transfira algumas moedas para essa pessoa!
                            </p>

                            {/* Categoria do Mérito */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selecione qual o tipo de doação que você deseja fazer:
                                </label>
                                <div className="relative">
                                    <select
                                        value={categoriaMerito}
                                        onChange={(e) => setCategoriaMerito(e.target.value)}
                                        className="w-full appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700"
                                        required
                                    >
                                        <option value="">Categoria do Mérito</option>
                                        {categorias.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Procurar por usuário */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Procure por um usuário:
                                </label>
                                <div className="relative">
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Busque por um Nome, CPF ..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700"
                                    />
                                </div>

                                {/* Lista de resultados */}
                                {searchTerm && (
                                    <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto bg-white">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student) => (
                                                <div
                                                    key={student.id}
                                                    onClick={() => {
                                                        setSelectedStudent(student);
                                                        setSearchTerm(student.nome);
                                                    }}
                                                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                                >
                                                    <p className="font-medium text-gray-800">{student.nome}</p>
                                                    <p className="text-sm text-gray-600">CPF: {student.cpf}</p>
                                                    <p className="text-sm text-gray-500">{student.curso}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">
                                                Nenhum aluno encontrado
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Aluno selecionado */}
                                {selectedStudent && !searchTerm.includes(selectedStudent.nome) && (
                                    <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                                        <p className="font-medium text-gray-800">{selectedStudent.nome}</p>
                                        <p className="text-sm text-gray-600">CPF: {selectedStudent.cpf}</p>
                                    </div>
                                )}
                            </div>

                            {/* Quantidade de Moedas */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantidade de Moedas
                                </label>
                                <input
                                    type="number"
                                    placeholder="Valor"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    min="1"
                                    max={saldoDisponivel}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700"
                                    required
                                />
                            </div>

                            {/* Motivo da doação */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Escreva o Motivo da sua doação:
                                </label>
                                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                    {/* Barra de ferramentas do editor */}
                                    <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-white">
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Negrito">
                                            <span className="font-bold text-gray-600">B</span>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Itálico">
                                            <span className="italic text-gray-600">I</span>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Lista">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Lista numerada">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Código">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Link">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Imagem">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Vídeo">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Tabela">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Desfazer">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Refazer">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                                            </svg>
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded" title="Visualizar">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    {/* Textarea */}
                                    <textarea
                                        placeholder="Descreva sua dúvida de forma clara e detalhada para que nossa equipe possa te auxiliar de forma assertiva."
                                        value={motivo}
                                        onChange={(e) => setMotivo(e.target.value)}
                                        rows={8}
                                        className="w-full px-4 py-3 focus:outline-none resize-none text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    Enviar Moedas
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedStudent(null);
                                        setCategoriaMerito("");
                                        setQuantidade("");
                                        setMotivo("");
                                        setSearchTerm("");
                                    }}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
