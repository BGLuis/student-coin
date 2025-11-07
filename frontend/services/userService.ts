import { authService } from "./authService";
import { studentService, Student, StudentUpdateRequest } from "./studentService";
import { enterpriseService, Enterprise, EnterpriseUpdateRequest } from "./enterpriseService";

export type UserProfile = Student | Enterprise;

export type UpdateProfileData = StudentUpdateRequest | EnterpriseUpdateRequest;

export const userService = {
    // Obtém o perfil do usuário baseado no role do token
    getProfile: async (userId: number): Promise<UserProfile> => {
        const role = authService.getUserRole();

        if (role === "ROLE_STUDENT" || role === "ROLE_TEACHER") {
            return await studentService.getById(userId);
        } else if (role === "ROLE_ENTERPRISE") {
            return await enterpriseService.getById(userId);
        }

        throw new Error("Role não identificado no token");
    },

    // Atualiza o perfil baseado no role
    updateProfile: async (userId: number, data: UpdateProfileData): Promise<UserProfile> => {
        const role = authService.getUserRole();

        if (role === "ROLE_STUDENT" || role === "ROLE_TEACHER") {
            return await studentService.update(userId, data as StudentUpdateRequest);
        } else if (role === "ROLE_ENTERPRISE") {
            return await enterpriseService.update(userId, data as EnterpriseUpdateRequest);
        }

        throw new Error("Role não identificado no token");
    },

    // Obtém usuário por ID (genérico)
    getUserById: async (id: number): Promise<UserProfile> => {
        const role = authService.getUserRole();

        if (role === "ROLE_STUDENT" || role === "ROLE_TEACHER") {
            return await studentService.getById(id);
        } else if (role === "ROLE_ENTERPRISE") {
            return await enterpriseService.getById(id);
        }

        throw new Error("Role não identificado no token");
    },

    // Deleta a conta baseado no role
    deleteAccount: async (): Promise<void> => {
        const role = authService.getUserRole();

        if (role === "ROLE_STUDENT" || role === "ROLE_TEACHER") {
            await studentService.deleteAccount();
        } else if (role === "ROLE_ENTERPRISE") {
            await enterpriseService.deleteAccount();
        } else {
            throw new Error("Role não identificado no token");
        }
    },

    // Obtém informações do token
    getTokenInfo: () => {
        return authService.decodeToken();
    },

    // Verifica se é estudante
    isStudent: (): boolean => {
        return authService.getUserRole() === "ROLE_STUDENT";
    },

    // Verifica se é professor
    isTeacher: (): boolean => {
        return authService.getUserRole() === "ROLE_TEACHER";
    },

    // Verifica se é empresa
    isEnterprise: (): boolean => {
        return authService.getUserRole() === "ROLE_ENTERPRISE";
    },
};
