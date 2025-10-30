"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "./index";
import { useUser } from "@/contexts/UserContext";

export const Header: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const { userType } = useUser();

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200); 
    };

    const handleConfigClick = () => {
        setIsDropdownOpen(false);
        setIsConfigOpen(true);
    };

    const handleLogout = () => {
        router.push("/auth/login");
    };

    // Configuração específica por tipo de usuário
    const getUserConfig = () => {
        switch(userType) {
            case 'aluno':
                return {
                    links: [
                        { href: '/', label: 'Home' },
                        { href: '/loja-vantagens', label: 'Loja de Vantagens' },
                        { href: '/meu-extrato', label: 'Meu Extrato' }
                    ],
                    showCoins: true,
                    coinBalance: 100
                };
            case 'professor':
                return {
                    links: [
                        { href: '/', label: 'Home' },
                        { href: '/professor/enviar-moedas', label: 'Enviar Moeda' },
                        { href: '/professor/meu-extrato', label: 'Meu Extrato' }
                    ],
                    showCoins: true,
                    coinBalance: 100
                };
            case 'empresa':
                return {
                    links: [
                        { href: '/', label: 'Home' },
                        { href: '/gerenciar-vantagens', label: 'Gerenciar Vantagens' },
                        { href: '/conferencia', label: 'Conferência' }
                    ],
                    showCoins: false,
                    coinBalance: 0
                };
        }
    };

    const config = getUserConfig();

    return (
        <>
            <header className="w-full bg-white border-b border-gray-200">
                <div className="py-4 px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="inline-block">
                        <Image
                            src="/image/logo.png"
                            alt="Student Coin Logo"
                            width={40}
                            height={40}
                            priority
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        {/* Navigation Links */}
                        <nav className="flex gap-6">
                            {config.links.map((link) => (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Coin Balance */}
                        {config.showCoins && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-400">
                                <Image
                                    src="/image/logo.png"
                                    alt="Coin"
                                    width={28}
                                    height={28}
                                />
                                <span className="font-normal text-gray-800">{config.coinBalance}</span>
                            </div>
                        )}

                        {/* Notifications */}
                        <button 
                            className="flex items-center justify-center rounded-lg transition-colors" 
                            style={{ backgroundColor: '#FFEED1', width: '40px', height: '40px' }}
                        >
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="#FFA412"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="avatar.svg"
                                    alt="User Avatar"
                                    width={40}
                                    height={40}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                                >
                                    <button
                                        onClick={handleConfigClick}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
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
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        Configurações
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
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
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Modal */}
            <Modal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
            />
        </>
    );
};
