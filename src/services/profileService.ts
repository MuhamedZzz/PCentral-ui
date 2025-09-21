import api from "../utils/axios";
import { UserProfile, UpdateProfileRequest } from "@/types/profile";
import { API_ENDPOINTS } from "@/constants/profile";

class ProfileService {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await api.get(API_ENDPOINTS.PROFILE.GET);
      const data = response.data;

      return {
        id: data.id,
        username: data.username,
        email: data.email,
        bio: data.bio || "",
        avatarUrl: data.avatarUrl || null,
      };
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw new Error("Failed to fetch profile data");
    }
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<UserProfile> {
    try {
      const response = await api.put(API_ENDPOINTS.PROFILE.UPDATE, updates);
      const data = response.data;

      return {
        id: data.id,
        username: data.username,
        email: data.email,
        bio: data.bio || "",
        avatarUrl: data.avatarUrl || null,
      };
    } catch (error: any) {
      console.error("Error updating profile:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      throw new Error(errorMessage);
    }
  }

  async uploadAvatar(file: File): Promise<UserProfile> {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await api.post(
        API_ENDPOINTS.PROFILE.UPLOAD_AVATAR,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        bio: data.bio || "",
        avatarUrl: data.avatarUrl || null,
      };
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to upload avatar";
      throw new Error(errorMessage);
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await api.delete(API_ENDPOINTS.PROFILE.DELETE);
    } catch (error: any) {
      console.error("Error deleting account:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      throw new Error(errorMessage);
    }
  }
}

export const profileService = new ProfileService();
