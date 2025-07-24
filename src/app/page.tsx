// app/page.tsx or pages/index.tsx (depending on your Next.js version)
"use client";

import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/Home";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <HeroSection />
    </Box>
  );
};

export default HomePage;
