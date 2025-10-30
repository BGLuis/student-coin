"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useUser } from "@/contexts/UserContext";

export const Footer: React.FC = () => {
    const [showSwitcher, setShowSwitcher] = useState(false);
    const { userType, setUserType } = useUser();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <nav className="flex justify-center space-x-4 py-4 flex-wrap items-center relative">
                <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    Ajuda
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    Termos de Serviço
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    Política de Privacidade
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    @scoin
                </Link>
                
                {/* Botão discreto para alternar tipo de usuário (apenas dev) */}
                <button
                    onClick={() => setShowSwitcher(!showSwitcher)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-xs ml-2"
                    title="Dev: Alternar tipo de usuário"
                >
                    •••
                </button>

                {/* Switcher de tipo de usuário */}
                {showSwitcher && (
                    <div className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
                        <div className="flex flex-col gap-1.5">
                            <button
                                onClick={() => {
                                    setUserType('aluno');
                                    setShowSwitcher(false);
                                }}
                                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                                    userType === 'aluno' 
                                        ? 'bg-teal-500 text-white' 
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Aluno
                            </button>
                            <button
                                onClick={() => {
                                    setUserType('professor');
                                    setShowSwitcher(false);
                                }}
                                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                                    userType === 'professor' 
                                        ? 'bg-teal-500 text-white' 
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Professor
                            </button>
                            <button
                                onClick={() => {
                                    setUserType('empresa');
                                    setShowSwitcher(false);
                                }}
                                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                                    userType === 'empresa' 
                                        ? 'bg-teal-500 text-white' 
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Empresa
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </footer>
    );
};

export default Footer;
