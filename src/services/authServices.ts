import api from "../utils/axios"; // Assuming you have this setup
import { AuthFormData, AuthResponse } from "../types/auth";
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
};
