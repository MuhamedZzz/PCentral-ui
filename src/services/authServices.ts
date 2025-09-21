import api from "../utils/axios";
import { AuthFormData, AuthResponse, UserData } from "../types/auth";
import { AUTH_ENDPOINTS } from "../constants/auth";

export const authService = {
  login: async (data: AuthFormData): Promise<AuthResponse> => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  register: async (data: AuthFormData): Promise<AuthResponse> => {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  getUserData: async (token?: string): Promise<UserData> => {
    if (token) {
      const response = await api.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      const response = await api.get("/api/users/me");
      return response.data;
    }
  },
};
