import api from "@/lib/api";

export interface Enterprise {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    roles: string;
}

export interface EnterpriseUpdateRequest {
    name?: string;
    email?: string;
}

export const enterpriseService = {
    // Buscar todas as empresas
    getAll: async (): Promise<Enterprise[]> => {
        try {
            console.log('[EnterpriseService] Buscando todas as empresas');
            const response = await api.get<Enterprise[]>("/enterprises");
            console.log('[EnterpriseService] Empresas encontradas:', response.data.length);
            return response.data;
        } catch (error: any) {
            console.error('[EnterpriseService] Erro ao buscar empresas:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Buscar empresa por ID
    getById: async (id: number): Promise<Enterprise> => {
        try {
            console.log('[EnterpriseService] Buscando empresa por ID:', id);
            const response = await api.get<Enterprise>(`/enterprises/${id}`);
            console.log('[EnterpriseService] Empresa encontrada:', response.data.name);
            return response.data;
        } catch (error: any) {
            console.error('[EnterpriseService] Erro ao buscar empresa:', {
                id,
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Atualizar empresa
    update: async (id: number, data: EnterpriseUpdateRequest): Promise<Enterprise> => {
        try {
            console.log('[EnterpriseService] Atualizando empresa:', id, data);
            const response = await api.patch<Enterprise>(`/enterprises/${id}`, data);
            console.log('[EnterpriseService] Empresa atualizada com sucesso');
            return response.data;
        } catch (error: any) {
            console.error('[EnterpriseService] Erro ao atualizar empresa:', {
                id,
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Deletar conta (da própria empresa logada)
    deleteAccount: async (): Promise<void> => {
        try {
            console.log('[EnterpriseService] Deletando conta da empresa');
            await api.delete("/enterprises/me");
            console.log('[EnterpriseService] Conta deletada com sucesso');
        } catch (error: any) {
            console.error('[EnterpriseService] Erro ao deletar conta:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },
};
