import api from "@/lib/api";

export interface Advantage {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface AdvantageCreateData {
    name: string;
    description: string;
    price: number;
    image?: File;
    imageUrl?: string;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const advantageService = {
    getAll: async (page: number = 0, size: number = 100): Promise<Page<Advantage>> => {
        try {
            const response = await api.get<Page<Advantage>>("/advantages", {
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar vantagens:", error);
            throw error;
        }
    },

    getByEnterprise: async (enterpriseId: number, page: number = 0, size: number = 100): Promise<Page<Advantage>> => {
        try {
            // Tentando endpoint específico primeiro, se falhar, tentamos filtro na listagem geral
            // Assumindo /enterprises/{id}/advantages
            const response = await api.get<Page<Advantage>>(`/enterprises/${enterpriseId}/advantages`, {
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar vantagens da empresa:", error);
            throw error;
        }
    },

    create: async (data: AdvantageCreateData): Promise<Advantage> => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price.toString());
            
            if (data.image) {
                formData.append("image", data.image);
            }

            const response = await api.post<Advantage>("/advantages", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao criar vantagem:", error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<AdvantageCreateData>): Promise<Advantage> => {
        try {
            const formData = new FormData();
            if (data.name) formData.append("name", data.name);
            if (data.description) formData.append("description", data.description);
            if (data.price) formData.append("price", data.price.toString());
            if (data.image) formData.append("image", data.image);

            const response = await api.put<Advantage>(`/advantages/${id}`, formData, {
                 headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar vantagem:", error);
            throw error;
        }
    },

    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/advantages/${id}`);
        } catch (error) {
            console.error("Erro ao deletar vantagem:", error);
            throw error;
        }
    },
    
    getEnterprise: async (advantageId: number) => {
         try {
            const response = await api.get(`/advantages/${advantageId}/enterprise`);
            return response.data;
        } catch (error) {
             console.error("Erro ao buscar empresa da vantagem:", error);
            throw error;
        }
    }
};
