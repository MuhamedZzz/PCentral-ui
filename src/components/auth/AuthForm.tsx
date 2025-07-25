// components/auth/AuthForm.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { AuthFormProps, AuthFormData } from "../../types/auth";
import { AUTH_CONTENT, AUTH_PLACEHOLDERS } from "../../constants/auth";

const FormContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Title = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "8px",
  textAlign: "left",
}));

const Subtitle = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#888888",
  marginBottom: "32px",
  textAlign: "left",
}));

const SocialButton = styled(Button)(() => ({
  backgroundColor: "#404040",
  color: "#ffffff",
  padding: "8px 16px",
  marginBottom: "12px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  border: "1px solid #555555",
  "&:hover": {
    backgroundColor: "#4a4a4a",
  },
  "&:last-of-type": {
    marginBottom: "24px",
  },
}));

const Divider = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  margin: "10px 0",
  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: "1px",
    backgroundColor: "#555555",
  },
}));

const DividerText = styled(Typography)(() => ({
  color: "#888888",
  fontSize: "12px",
  margin: "0 16px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "10px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    color: "#ffffff",
    "& fieldset": {
      borderColor: "#404040",
    },
    "&:hover fieldset": {
      borderColor: "#555555",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e91e63",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0px 1000px #1a1a1a inset !important",
      WebkitTextFillColor: "#ffffff !important",
    },
    "& input:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0px 1000px #1a1a1a inset !important",
    },
    "& input:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0px 1000px #1a1a1a inset !important",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#888888",
    "&.Mui-focused": {
      color: "#e91e63",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px",
    fontSize: "14px",
    "&::placeholder": {
      color: "#666666",
      opacity: 1,
    },
  },
}));

const PasswordContainer = styled(Box)(() => ({
  position: "relative",
  marginBottom: "8px",
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0px 1000px #1a1a1a inset !important",
    WebkitTextFillColor: "#ffffff !important",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: "0 0 0px 1000px #1a1a1a inset !important",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: "0 0 0px 1000px #1a1a1a inset !important",
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: "#e91e63",
  color: "#ffffff",
  padding: "9px 16px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "24px",
  "&:hover": {
    backgroundColor: "#ff397b",
  },
  "&:disabled": {
    backgroundColor: "#8d123b",
    color: "#888888",
  },
}));

const SwitchContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "4px",
}));

const SwitchText = styled(Typography)(() => ({
  color: "#888888",
  fontSize: "14px",
}));

const SwitchLink = styled(Link)(() => ({
  color: "#4a9eff",
  fontSize: "14px",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onSwitchMode,
  loading = false,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const content = AUTH_CONTENT[mode.toUpperCase() as keyof typeof AUTH_CONTENT];

  const handleInputChange =
    (field: keyof AuthFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  const handleSwitchMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    onSwitchMode(newMode);
  };

  return (
    <FormContainer>
      <Title>{content.title}</Title>
      <Subtitle>{content.subtitle}</Subtitle>

      <SocialButton startIcon={<GoogleIcon />} fullWidth disabled={loading}>
        Continue with Google
      </SocialButton>

      <SocialButton startIcon={<AppleIcon />} fullWidth disabled={loading}>
        Continue with Apple
      </SocialButton>

      <Divider>
        <DividerText>Or continue with email</DividerText>
      </Divider>

      <form onSubmit={handleSubmit}>
        <Typography
          variant="body2"
          sx={{ color: "#ffffff", marginBottom: "8px", fontSize: "14px" }}
        >
          Email
        </Typography>
        <StyledTextField
          fullWidth
          placeholder={AUTH_PLACEHOLDERS.EMAIL}
          value={formData.email}
          onChange={handleInputChange("email")}
          required
          type="email"
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#666666", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            Password
          </Typography>
        </Box>

        <PasswordContainer>
          <StyledTextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder={AUTH_PLACEHOLDERS.PASSWORD}
            value={formData.password}
            onChange={handleInputChange("password")}
            required
            disabled={loading}
            sx={{ marginBottom: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#666666", fontSize: 18 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#666666" }}
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </PasswordContainer>

        <Box sx={{ height: "24px" }} />

        <SubmitButton
          type="submit"
          fullWidth
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? "Loading..." : content.submitButton}
        </SubmitButton>
      </form>

      <SwitchContainer>
        <SwitchText>{content.switchText}</SwitchText>
        <SwitchLink onClick={handleSwitchMode}>{content.switchLink}</SwitchLink>
      </SwitchContainer>
    </FormContainer>
  );
};

export default AuthForm;
