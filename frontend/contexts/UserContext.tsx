"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService, transactionService } from "@/services";
import { usePathname } from "next/navigation";

type UserType = 'aluno' | 'professor' | 'empresa';

interface UserContextType {
    userType: UserType;
    setUserType: (type: UserType) => void;
    checkUserRole: () => void;
    coinBalance: number;
    updateBalance: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userType, setUserType] = useState<UserType>('aluno');
    const [coinBalance, setCoinBalance] = useState<number>(0);
    const pathname = usePathname();

    const updateBalance = async () => {
        try {
            if (authService.isAuthenticated()) {
                const data = await transactionService.getBalance();
                setCoinBalance(data.balance);
            }
        } catch (error) {
            console.error('[UserContext] Erro ao atualizar saldo:', error);
        }
    };

    const checkUserRole = () => {
        const role = authService.getUserRole();

        if (role) {
            switch (role) {
                case 'ROLE_STUDENT':
                    setUserType('aluno');
                    updateBalance();
                    break;
                case 'ROLE_TEACHER':
                    setUserType('professor');
                    updateBalance();
                    break;
                case 'ROLE_ENTERPRISE':
                    setUserType('empresa');
                    setCoinBalance(0);
                    break;
            }
        }
    };

    useEffect(() => {
        checkUserRole();
    }, [pathname]);

    return (
        <UserContext.Provider value={{ userType, setUserType, checkUserRole, coinBalance, updateBalance }}>
            {children}
        </UserContext.Provider>
    );
}; export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
