export interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
}

export interface ProfileFormData {
  username: string;
  bio: string;
}

export interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

export interface EditingState {
  username: boolean;
  bio: boolean;
  avatar: boolean;
}

export interface TempValues {
  username: string;
  bio: string;
}
