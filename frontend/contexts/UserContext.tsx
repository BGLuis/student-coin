"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'aluno' | 'professor' | 'empresa';

interface UserContextType {
    userType: UserType;
    setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userType, setUserType] = useState<UserType>('aluno');

    return (
        <UserContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
