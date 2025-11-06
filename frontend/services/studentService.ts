import api from "@/lib/api";

export interface Student {
    id: number;
    name: string;
    cpf: string;
    rg?: string;
    course?: string;
    address?: string;
    email: string;
    educationalInstitute?: string;
    roles: string;
}

export interface StudentUpdateRequest {
    name?: string;
    email?: string;
    rg?: string;
    course?: string;
    address?: string;
    educationalInstitute?: string;
}

export const studentService = {
    // Buscar todos os estudantes
    getAll: async (): Promise<Student[]> => {
        try {
            console.log('[StudentService] Buscando todos os estudantes');
            const response = await api.get<Student[]>("/students");
            console.log('[StudentService] Estudantes encontrados:', response.data.length);
            return response.data;
        } catch (error: any) {
            console.error('[StudentService] Erro ao buscar estudantes:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Buscar estudante por ID
    getById: async (id: number): Promise<Student> => {
        try {
            console.log('[StudentService] Buscando estudante por ID:', id);
            const response = await api.get<Student>(`/students/${id}`);
            console.log('[StudentService] Estudante encontrado:', response.data.name);
            return response.data;
        } catch (error: any) {
            console.error('[StudentService] Erro ao buscar estudante:', {
                id,
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Atualizar estudante
    update: async (id: number, data: StudentUpdateRequest): Promise<Student> => {
        try {
            console.log('[StudentService] Atualizando estudante:', id, data);
            const response = await api.patch<Student>(`/students/${id}`, data);
            console.log('[StudentService] Estudante atualizado com sucesso');
            return response.data;
        } catch (error: any) {
            console.error('[StudentService] Erro ao atualizar estudante:', {
                id,
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    // Deletar conta (do próprio usuário logado)
    deleteAccount: async (): Promise<void> => {
        try {
            console.log('[StudentService] Deletando conta do estudante');
            await api.delete("/students/me");
            console.log('[StudentService] Conta deletada com sucesso');
        } catch (error: any) {
            console.error('[StudentService] Erro ao deletar conta:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },
};
