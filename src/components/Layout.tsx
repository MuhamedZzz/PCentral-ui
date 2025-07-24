"use client";

import React from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";

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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainContainer>
        <Sidebar />
        <ContentContainer>{children}</ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default Layout;
