export const API_ENDPOINTS = {
  // Profile endpoints
  PROFILE: {
    GET: "/api/users/me",
    UPDATE: "/api/users/me",
    DELETE: "/api/users/me",
    UPLOAD_AVATAR: "/api/users/me/avatar",
  },
} as const;
