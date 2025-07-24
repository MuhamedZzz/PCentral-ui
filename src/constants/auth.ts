export const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
} as const;

export const AUTH_CONTENT = {
  LOGIN: {
    title: "Log In",
    subtitle: "Enter your credentials to access your account",
    submitButton: "Log In",
    switchText: "Don't have an account?",
    switchLink: "Sign Up",
    forgotPassword: "Forgot password?",
  },
  SIGNUP: {
    title: "Sign Up",
    subtitle: "Save your builds and interact with the community!",
    submitButton: "Create account",
    switchText: "Already have an account?",
    switchLink: "Log In",
  },
} as const;

export const AUTH_PLACEHOLDERS = {
  EMAIL: "linus@gmail.com",
  PASSWORD: "",
} as const;
