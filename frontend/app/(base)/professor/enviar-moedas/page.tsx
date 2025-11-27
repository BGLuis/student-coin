"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { studentService, transactionService, type Student } from "@/services";

export default function EnviarMoedas() {
    const [categoriaMerito, setCategoriaMerito] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [motivo, setMotivo] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // Estados para dados do backend
    const [students, setStudents] = useState<Student[]>([]);
    const [saldoDisponivel, setSaldoDisponivel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Buscar estudantes e saldo ao carregar a página
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Buscar lista de estudantes
                const studentsData = await studentService.getAll();
                setStudents(studentsData);

                // Buscar saldo do professor (primeira página para pegar o saldo)
                const balanceData = await transactionService.getBalance(0, 1);
                setSaldoDisponivel(balanceData.balance);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError("Erro ao carregar dados. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Categorias de mérito
    const categorias = [
        "Participação e Engajamento",
        "Desempenho e Qualidade",
        "Iniciativa e Proatividade",
        "Colaboração e Auxílio",
        "Comportamento e Ética",
        "Superação e Esforço",
        "Outros/Geral",
    ];

    // Filtrar estudantes baseado na busca
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.cpf.includes(searchTerm) ||
        (student.course && student.course.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedStudent || !categoriaMerito || !quantidade || !motivo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const valor = parseInt(quantidade);
        if (valor <= 0) {
            alert("A quantidade deve ser maior que zero!");
            return;
        }

        if (valor > saldoDisponivel) {
            alert("Saldo insuficiente!");
            return;
        }

        try {
            setSending(true);
            setError(null);

            // Enviar moedas para o estudante
            // O backend espera um UUID para a transação (idempotência) na URL
            const transactionUuid = crypto.randomUUID();
            
            await transactionService.rewardStudent(
                transactionUuid,
                {
                    value: valor,
                    motive: `${categoriaMerito}: ${motivo}`,
                    studentId: selectedStudent.id
                }
            );

            alert("Moedas enviadas com sucesso!");

            // Atualizar saldo local
            setSaldoDisponivel(prev => prev - valor);

            // Limpar formulário
            setSelectedStudent(null);
            setCategoriaMerito("");
            setQuantidade("");
            setMotivo("");
            setSearchTerm("");
        } catch (err) {
            console.error("Erro ao enviar moedas:", err);
            alert("Erro ao enviar moedas. Por favor, tente novamente.");
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

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
                                                                setSearchTerm(student.name);
                                                            }}
                                                            className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                                        >
                                                            <p className="font-medium text-gray-800">{student.name}</p>
                                                            <p className="text-sm text-gray-600">CPF: {student.cpf}</p>
                                                            <p className="text-sm text-gray-500">{student.course || "Curso não informado"}</p>
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
                                        {selectedStudent && !searchTerm.includes(selectedStudent.name) && (
                                            <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                                                <p className="font-medium text-gray-800">{selectedStudent.name}</p>
                                                <p className="text-sm text-gray-600">CPF: {selectedStudent.cpf}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quantidade de Moedas */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantidade de moedas
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
                                            Escreva o motivo da sua doação: <span className="text-gray-500 text-xs">({motivo.length}/100 caracteres)</span>
                                        </label>
                                        <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                            {/* Barra de ferramentas do editor */}
                                            <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-white">
                                                <button
                                                    type="button"
                                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                    title="Negrito"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('motivo-textarea') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = motivo.substring(start, end);
                                                        const before = motivo.substring(0, start);
                                                        const after = motivo.substring(end);
                                                        const newText = before + '**' + selectedText + '**' + after;
                                                        if (newText.length <= 100) {
                                                            setMotivo(newText);
                                                            setTimeout(() => {
                                                                textarea.focus();
                                                                textarea.setSelectionRange(start + 2, end + 2);
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <span className="font-bold text-gray-600">B</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                    title="Itálico"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('motivo-textarea') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const selectedText = motivo.substring(start, end);
                                                        const before = motivo.substring(0, start);
                                                        const after = motivo.substring(end);
                                                        const newText = before + '*' + selectedText + '*' + after;
                                                        if (newText.length <= 100) {
                                                            setMotivo(newText);
                                                            setTimeout(() => {
                                                                textarea.focus();
                                                                textarea.setSelectionRange(start + 1, end + 1);
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <span className="italic text-gray-600">I</span>
                                                </button>
                                                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                                                <button
                                                    type="button"
                                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                    title="Lista com pontos"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('motivo-textarea') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const before = motivo.substring(0, start);
                                                        const after = motivo.substring(end);
                                                        const newText = before + '\n• ' + after;
                                                        if (newText.length <= 100) {
                                                            setMotivo(newText);
                                                            setTimeout(() => {
                                                                textarea.focus();
                                                                textarea.setSelectionRange(start + 3, start + 3);
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                                        <circle cx="4" cy="6" r="1.5" />
                                                        <line x1="8" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" fill="none" />
                                                        <circle cx="4" cy="12" r="1.5" />
                                                        <line x1="8" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" fill="none" />
                                                        <circle cx="4" cy="18" r="1.5" />
                                                        <line x1="8" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                                    title="Lista numerada"
                                                    onClick={() => {
                                                        const textarea = document.getElementById('motivo-textarea') as HTMLTextAreaElement;
                                                        const start = textarea.selectionStart;
                                                        const end = textarea.selectionEnd;
                                                        const before = motivo.substring(0, start);
                                                        const after = motivo.substring(end);
                                                        const newText = before + '\n1. ' + after;
                                                        if (newText.length <= 100) {
                                                            setMotivo(newText);
                                                            setTimeout(() => {
                                                                textarea.focus();
                                                                textarea.setSelectionRange(start + 4, start + 4);
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <text x="2" y="7.5" fontSize="5" fontWeight="bold" fill="currentColor">1.</text>
                                                        <line x1="8" y1="6" x2="20" y2="6" strokeWidth="2" />
                                                        <text x="2" y="13.5" fontSize="5" fontWeight="bold" fill="currentColor">2.</text>
                                                        <line x1="8" y1="12" x2="20" y2="12" strokeWidth="2" />
                                                        <text x="2" y="19.5" fontSize="5" fontWeight="bold" fill="currentColor">3.</text>
                                                        <line x1="8" y1="18" x2="20" y2="18" strokeWidth="2" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Textarea */}
                                            <textarea
                                                id="motivo-textarea"
                                                placeholder="Descreva o motivo de sua doação de forma detalhada."
                                                value={motivo}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 100) {
                                                        setMotivo(e.target.value);
                                                    }
                                                }}
                                                rows={8}
                                                maxLength={100}
                                                className="w-full px-4 py-3 focus:outline-none resize-none text-gray-700"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Botões */}
                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {sending ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    Enviando...
                                                </>
                                            ) : (
                                                "Enviar Moedas"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={sending}
                                            onClick={() => {
                                                setSelectedStudent(null);
                                                setCategoriaMerito("");
                                                setQuantidade("");
                                                setMotivo("");
                                                setSearchTerm("");
                                            }}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
