"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import DesignServicesIcon from "@mui/icons-material/DesignServices"; // pen+ruler
import InventoryIcon from "@mui/icons-material/Inventory"; // stack/products
import ComputerIcon from "@mui/icons-material/Computer";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FaDiscord } from "react-icons/fa";
import { SidebarProps } from "../types/sidebar";
import {
  NAVIGATION_ITEMS,
  SOCIAL_LINKS,
  FOOTER_LINKS,
} from "../constants/sidebar";

// Styled components
const SIDEBAR_WIDTH = 320;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: SIDEBAR_WIDTH,
    boxSizing: "border-box",
    backgroundColor: "#1a1a1a",
    borderRight: "1px solid #333",
    color: "#ffffff",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const LogoPlaceholder = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: "#e91e63",
  borderRadius: "6px",
  marginRight: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: "bold",
}));

const BrandContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const BrandTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 600,
  color: "#ffffff",
  lineHeight: 1.2,
}));

const BrandSlogan = styled(Typography)(() => ({
  fontSize: "11px",
  color: "#888",
  fontWeight: 400,
  marginTop: "2px",
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SocialButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  borderRadius: "999px",
  minWidth: 0,
  padding: theme.spacing(0.8, 5),
  fontWeight: 500,
  fontSize: "15px",
  boxShadow: "none",
  textTransform: "none",
  color: "#fff", // Always white text
  "& .MuiSvgIcon-root, & svg": {
    // Icon color per platform
    color: "inherit",
  },
  "&.discord": {
    backgroundColor: "rgba(88,101,242,0.18)", // Discord icon color, low opacity
    "& .MuiSvgIcon-root, & svg": {
      color: "#5865F2", // Discord icon color
    },
    "&:hover": {
      backgroundColor: "rgba(88,101,242,0.32)",
    },
  },
  "&.linkedin": {
    backgroundColor: "rgba(0,119,181,0.18)", // LinkedIn icon color, low opacity
    "& .MuiSvgIcon-root, & svg": {
      color: "#0077B5", // LinkedIn icon color
    },
    "&:hover": {
      backgroundColor: "rgba(0,119,181,0.32)",
    },
  },
}));

const NavigationList = styled(List)(() => ({
  padding: 0,
  "& .MuiListItem-root": {
    padding: 0,
  },
}));

const NavigationButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  margin: `0 ${theme.spacing(1)}`,
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#333",
  },
  "& .MuiListItemText-primary": {
    fontSize: "15px",
    fontWeight: 500,
    color: "#ffffff",
  },
}));

const AuthButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: theme.spacing(1, 2),
}));

const SignUpButton = styled(AuthButton)(() => ({
  backgroundColor: "#e91e63",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#c2185b",
  },
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const LoginButton = styled(AuthButton)(() => ({
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "1px solid #444",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const FooterLink = styled(Link)(() => ({
  fontSize: "12px",
  color: "#888",
  textDecoration: "none",
  "&:hover": {
    color: "#fff",
    textDecoration: "underline",
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const theme = useTheme();

  // Map navigation item id to icon
  const getNavIcon = (id: string) => {
    switch (id) {
      case "pc-builder":
        return <DesignServicesIcon sx={{ fontSize: 22 }} />;
      case "products":
        return <InventoryIcon sx={{ fontSize: 22 }} />;
      case "my-build":
        return <ComputerIcon sx={{ fontSize: 22 }} />;
      case "compare":
        return <CompareArrowsIcon sx={{ fontSize: 22 }} />;
      case "part-gallery":
        return <PhotoLibraryIcon sx={{ fontSize: 22 }} />;
      default:
        return null;
    }
  };

  // Social icon mapping
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "discord":
        return <FaDiscord />;
      case "linkedin":
        return <LinkedInIcon sx={{ fontSize: 28 }} />;
      default:
        return null;
    }
  };

  // Social button label mapping
  const getSocialLabel = (platform: string) => {
    switch (platform) {
      case "discord":
        return "Discord";
      case "linkedin":
        return "LinkedIn";
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  // Ensure required navigation items exist
  const requiredNavIds = [
    "pc-builder",
    "products",
    "my-build",
    "compare",
    "part-gallery",
  ];
  const navItems = requiredNavIds
    .map(
      (id) =>
        NAVIGATION_ITEMS.find((item) => item.id === id) ||
        (id === "my-build"
          ? { id: "my-build", label: "My Build", href: "/my-build" }
          : null)
    )
    .filter(Boolean);

  return (
    <StyledDrawer variant="permanent" anchor="left" open={isOpen}>
      {/* Logo and Brand */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <LogoContainer sx={{ cursor: "pointer" }}>
          <Box
            sx={{
              width: 42,
              height: 32,
              marginRight: theme.spacing(1.5),
              marginLeft: theme.spacing(1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/PCentral-logo.png"
              alt="PCentral Logo"
              width={60}
              height={60}
              style={{ borderRadius: "6px" }}
            />
          </Box>
          <BrandContainer>
            <BrandTitle>PCentral</BrandTitle>
            <BrandSlogan>Assemble. Test. Thrive</BrandSlogan>
          </BrandContainer>
        </LogoContainer>
      </Link>

      {/* Social Links */}
      <SocialContainer>
        {SOCIAL_LINKS.map((social) => (
          <SocialButton
            key={social.platform}
            className={social.platform}
            component={Link}
            href={social.href}
            startIcon={getSocialIcon(social.platform)}
            {...(social.platform === "discord" || social.platform === "linkedin"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {getSocialLabel(social.platform)}
          </SocialButton>
        ))}
      </SocialContainer>

      {/* Navigation Links */}
      <NavigationList>
        {navItems.map((item) => (
          <ListItem key={item!.id}>
            <NavigationButton
              component="a"
              href={item!.href}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {getNavIcon(item!.id)}
              <ListItemText primary={item!.label} />
            </NavigationButton>
          </ListItem>
        ))}
      </NavigationList>

      {/* Auth Buttons */}
      <AuthButtonContainer>
        <SignUpButton variant="contained" startIcon={<PersonIcon />}>
          Sign Up
        </SignUpButton>
        <LoginButton variant="outlined">Log In</LoginButton>
      </AuthButtonContainer>

      {/* Footer Links */}
      <FooterContainer>
        {FOOTER_LINKS.map((link, index) => (
          <React.Fragment key={link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
            {index < FOOTER_LINKS.length - 1 && (
              <Typography variant="caption" sx={{ color: "#555" }}>
                •
              </Typography>
            )}
          </React.Fragment>
        ))}
      </FooterContainer>
    </StyledDrawer>
  );
};

export default Sidebar;
