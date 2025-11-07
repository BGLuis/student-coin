import api from "@/lib/api";

export interface Account {
    id: number;
    balance: number;
    person: {
        id: number;
        name: string;
        email: string;
    };
}

export interface Transaction {
    id: number;
    uuid: string;
    value: number;
    createTime: string;
    motive?: string; // Apenas para RewardTransaction
    origin?: Account; // Pode ser null para recarga semestral
    destination: Account;
}

export interface BalanceResponse {
    balance: number;
    transactions: {
        content: Transaction[];
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        first: boolean;
        last: boolean;
        empty: boolean;
    };
}

export interface RewardTransactionRequest {
    value: number;
    motive: string;
    studentId: number;
}

export interface RewardTransactionResponse {
    id: number;
    value: number;
    motive: string;
    date: string;
    sender: {
        id: number;
        name: string;
        email: string;
    };
    receiver: {
        id: number;
        name: string;
        email: string;
    };
}

export const transactionService = {
    // Buscar saldo e transações com paginação
    getBalance: async (page: number = 0, size: number = 10): Promise<BalanceResponse> => {
        try {
            console.log('[TransactionService] Buscando saldo e transações:', { page, size });
            const response = await api.get<BalanceResponse>("/account/balance", {
                params: {
                    page,
                    size,
                    sort: "date,desc" // Ordenar por data, mais recente primeiro
                }
            });
            console.log('[TransactionService] Dados recebidos:', {
                balance: response.data.balance,
                totalTransactions: response.data.transactions.totalElements,
                currentPage: response.data.transactions.number
            });
            return response.data;
        } catch (error: any) {
            console.error('[TransactionService] Erro ao buscar saldo:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Enviar moedas para um estudante (professor/teacher)
    rewardStudent: async (studentUuid: string, data: RewardTransactionRequest): Promise<RewardTransactionResponse> => {
        try {
            console.log('[TransactionService] Enviando moedas para estudante:', {
                studentUuid,
                value: data.value,
                motive: data.motive
            });
            const response = await api.put<RewardTransactionResponse>(`/account/reward/${studentUuid}`, data);
            console.log('[TransactionService] Moedas enviadas com sucesso:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('[TransactionService] Erro ao enviar moedas:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },
};
