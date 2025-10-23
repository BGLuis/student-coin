import api from "@/lib/api";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    cpf?: string;
    cnpj?: string;
    university?: string;
    companyName?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileData {
    name?: string;
    email?: string;
    avatar?: string;
    university?: string;
    companyName?: string;
}

export const userService = {
    getProfile: async (): Promise<UserProfile> => {
        const response = await api.get<UserProfile>("/users/profile");
        return response.data;
    },

    updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
        const response = await api.put<UserProfile>("/users/profile", data);
        return response.data;
    },

    getUserById: async (id: string): Promise<UserProfile> => {
        const response = await api.get<UserProfile>(`/users/${id}`);
        return response.data;
    },

    changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
        await api.put("/users/password", {
            oldPassword,
            newPassword,
        });
    },

    deleteAccount: async (): Promise<void> => {
        await api.delete("/users/profile");
    },
};
