// types/auth.ts
export interface AuthFormData {
  email: string;
  password: string;
}

// Response from login/register endpoints
export interface AuthResponse {
  token: string;
  email: string;
}

// Response from /api/users/me endpoint
export interface UserData {
  id: number;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onSwitchMode: (mode: "login" | "signup") => void;
}

export interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: AuthFormData) => Promise<void>;
  onSwitchMode: (mode: "login" | "signup") => void;
  loading?: boolean;
}
