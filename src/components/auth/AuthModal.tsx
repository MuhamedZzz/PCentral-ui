// components/auth/AuthModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { AuthModalProps, AuthFormData } from "../../types/auth";
import { authService } from "../../services/authServices";
import { cookieUtils } from "../../utils/cookies";
import AuthForm from "./AuthForm";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    backgroundColor: "transparent",
    boxShadow: "none",
    maxWidth: "none",
    margin: 0,
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(4px)",
  },
}));

const ModalContainer = styled(Box)(() => ({
  width: 400,
  backgroundColor: "#2a2a2a",
  borderRadius: "16px",
  padding: "32px",
  position: "relative",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
}));

const CloseButton = styled(IconButton)(() => ({
  position: "absolute",
  top: "16px",
  right: "16px",
  color: "#888888",
  "&:hover": {
    color: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  mode,
  onSwitchMode,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (data: AuthFormData) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (mode === "login") {
        response = await authService.login(data);
      } else {
        response = await authService.register(data);
      }

      // Store token in cookies
      cookieUtils.set("authToken", response.token, 7);

      setSuccess(
        mode === "login"
          ? "Logged in successfully!"
          : "Account created successfully!"
      );

      // Close modal after success
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    onClose();
  };

  return (
    <>
      <StyledDialog open={open} onClose={handleClose} maxWidth={false}>
        <DialogContent sx={{ padding: 0 }}>
          <ModalContainer>
            <CloseButton onClick={handleClose}>
              <CloseIcon />
            </CloseButton>

            <AuthForm
              mode={mode}
              onSubmit={handleSubmit}
              onSwitchMode={onSwitchMode}
              loading={loading}
            />
          </ModalContainer>
        </DialogContent>
      </StyledDialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthModal;
