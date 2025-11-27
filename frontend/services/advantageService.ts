import api from "@/lib/api";

export interface Advantage {
    id: number;
    description: string;
    price: number;
    imageUrl: string;
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
