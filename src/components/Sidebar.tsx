"use client";

import React, { useState, useEffect } from "react";
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
  Menu,
  MenuItem,
  Avatar,
  ButtonProps,
  ListItemButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import InventoryIcon from "@mui/icons-material/Inventory";
import ComputerIcon from "@mui/icons-material/Computer";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SidebarProps } from "../types/sidebar";
import { authService } from "../services/authServices";
import { cookieUtils } from "../utils/cookies";
import {
  NAVIGATION_ITEMS,
  SOCIAL_LINKS,
  FOOTER_LINKS,
} from "../constants/sidebar";

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

const SocialButton = styled(Button)<ButtonProps>(({ theme }) => ({
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
  color: "#fff",
  "& .MuiSvgIcon-root, & svg": {
    color: "inherit",
  },
  "&.github": {
    backgroundColor: "#3b3f44",
    "& .MuiSvgIcon-root, & svg": {
      color: "#24292e",
    },
    "&:hover": {
      backgroundColor: "#444b52",
    },
  },
  "&.linkedin": {
    backgroundColor: "rgba(0,119,181,0.18)",
    "& .MuiSvgIcon-root, & svg": {
      color: "#0077B5",
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

const NavigationButton = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
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
  })
);

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

const ProfileButton = styled(Button)(({ theme }) => ({
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "1px solid #444",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  width: "100%",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#2a2a2a",
    color: "#ffffff",
    border: "1px solid #444",
    borderRadius: "8px",
    minWidth: "200px",
    marginTop: theme.spacing(0.5),
  },
  "& .MuiMenuItem-root": {
    padding: theme.spacing(1.5, 2),
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#333",
    },
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

interface ExtendedSidebarProps extends SidebarProps {
  onOpenAuthModal: (mode: "login" | "signup") => void;
}

const Sidebar: React.FC<ExtendedSidebarProps> = ({
  isOpen = true,
  onToggle,
  onOpenAuthModal,
}) => {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const fetchUserData = async () => {
    try {
      const userData = await authService.getUserData();

      cookieUtils.set("id", userData.id.toString(), 7);
      cookieUtils.set("username", userData.username, 7);
      cookieUtils.set("bio", userData.bio || "", 7);
      cookieUtils.set("avatarUrl", userData.avatarUrl || "", 7);

      setUsername(userData.username);
      setUserDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      const storedUsername = cookieUtils.get("userName") || "";
      setUsername(storedUsername);
      setUserDataLoaded(true);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authToken = cookieUtils.get("authToken");
      if (authToken) {
        if (!isAuthenticated) {
          setIsAuthenticated(true);
          await fetchUserData();
        }
      } else {
        if (isAuthenticated) {
          setIsAuthenticated(false);
          setUserDataLoaded(false);
          setUsername("");
        }
      }
    };

    checkAuthStatus();

    const interval = setInterval(checkAuthStatus, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    cookieUtils.remove("authToken");
    cookieUtils.remove("username");
    cookieUtils.remove("id");
    cookieUtils.remove("email");
    cookieUtils.remove("bio");
    cookieUtils.remove("avatarUrl");
    setIsAuthenticated(false);
    setUsername("");
    setUserDataLoaded(false);
    handleProfileMenuClose();
    window.location.href = "/";
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
    handleProfileMenuClose();
  };

  const getNavIcon = (id: string) => {
    switch (id) {
      case "pc-builder":
        return <DesignServicesIcon sx={{ fontSize: 22 }} />;
      case "products":
        return <InventoryIcon sx={{ fontSize: 22 }} />;
      case "my-builds":
        return <ComputerIcon sx={{ fontSize: 22 }} />;
      case "compare":
        return <CompareArrowsIcon sx={{ fontSize: 22 }} />;
      case "part-gallery":
        return <PhotoLibraryIcon sx={{ fontSize: 22 }} />;
      default:
        return null;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <GithubIcon />;
      case "linkedin":
        return <LinkedInIcon sx={{ fontSize: 28 }} />;
      default:
        return null;
    }
  };

  const getSocialLabel = (platform: string) => {
    switch (platform) {
      case "github":
        return "GitHub";
      case "linkedin":
        return "LinkedIn";
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };

  const requiredNavIds = [
    "pc-builder",
    "products",
    "my-builds",
    "compare",
    "part-gallery",
  ];
  const navItems = requiredNavIds
    .map((id) => NAVIGATION_ITEMS.find((item) => item.id === id)!)
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

      {/* SOCIAL LINKS */}
      <SocialContainer>
        {SOCIAL_LINKS.map((social) => (
          <SocialButton
            key={social.platform}
            component={Link}
            href={social.href}
            rel="noopener noreferrer"
            className={social.platform}
            startIcon={getSocialIcon(social.platform)}
            sx={{ textDecoration: "none" }}
          >
            {getSocialLabel(social.platform)}
          </SocialButton>
        ))}
      </SocialContainer>

      {/* NAVIGATION LINKS */}
      <NavigationList>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <NavigationButton
              component={Link}
              href={item.href}
              disabled={
                !isAuthenticated &&
                ["my‑builds", "compare", "part-gallery"].includes(item.id)
              }
              sx={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              {getNavIcon(item.id)}
              <ListItemText primary={item.label} />
            </NavigationButton>
          </ListItem>
        ))}
      </NavigationList>

      {/* Auth Section - Conditional Rendering */}
      <AuthButtonContainer>
        {isAuthenticated ? (
          <>
            {/* Profile Button with Dropdown */}
            <ProfileButton
              onClick={handleProfileMenuOpen}
              endIcon={<KeyboardArrowDownIcon />}
              disabled={!userDataLoaded}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: "#e91e63",
                    fontSize: "12px",
                  }}
                >
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </Avatar>
                {username || "User"}
              </Box>
            </ProfileButton>

            {/* Profile Menu */}
            <StyledMenu
              anchorEl={profileMenuAnchorEl}
              open={Boolean(profileMenuAnchorEl)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleProfileClick}>
                <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <FavoriteIcon sx={{ mr: 1, fontSize: 20 }} />
                Favorites
              </MenuItem>
              <Divider sx={{ backgroundColor: "#444" }} />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                Log out
              </MenuItem>
            </StyledMenu>
          </>
        ) : (
          <>
            {/* Login/Signup Buttons */}
            <SignUpButton
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => onOpenAuthModal("signup")}
            >
              Sign Up
            </SignUpButton>
            <LoginButton
              variant="outlined"
              onClick={() => onOpenAuthModal("login")}
            >
              Log In
            </LoginButton>
          </>
        )}
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
