"use client";

import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import AuthModal from "./auth/AuthModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e91e63",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#888888",
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});

const MainContainer = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#0a0a0a",
}));

const ContentContainer = styled(Box)(() => ({
  flexGrow: 1,
  marginLeft: "0px", // Match SIDEBAR_WIDTH in Sidebar.tsx
  minHeight: "100vh",
  backgroundColor: "#0a0a0a",
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleOpenAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleSwitchAuthMode = (mode: "login" | "signup") => {
    setAuthMode(mode);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainContainer>
        <Sidebar onOpenAuthModal={handleOpenAuthModal} />
        <ContentContainer>{children}</ContentContainer>

        <AuthModal
          open={authModalOpen}
          onClose={handleCloseAuthModal}
          mode={authMode}
          onSwitchMode={handleSwitchAuthMode}
        />
      </MainContainer>
    </ThemeProvider>
  );
};

export default Layout;
