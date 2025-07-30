"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { cookieUtils } from "../utils/cookies";
import { profileService } from "@/services/profileService";
import { UserProfile } from "@/types/profile";

const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  padding: theme.spacing(4),
  backgroundColor: "#0a0a0a",
  minHeight: "100vh",
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  borderRadius: "12px",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: "1px solid #333",
}));

const FieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  "&:last-child": {
    marginBottom: 0,
  },
}));

const FieldContent = styled(Box)(() => ({
  flex: 1,
  marginRight: "16px",
}));

const FieldLabel = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 600,
  color: "#888",
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

const FieldValue = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#ffffff",
  fontWeight: 500,
}));

const EditButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(1),
  borderRadius: "6px",
  color: "#888",
  "&:hover": {
    backgroundColor: "#333",
    color: "#fff",
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  marginLeft: theme.spacing(0.5),
  marginTop: theme.spacing(3.5),
  "&.save": {
    color: "#4caf50",
    "&:hover": {
      backgroundColor: "rgba(76, 175, 80, 0.1)",
    },
  },
  "&.cancel": {
    color: "#f44336",
    "&:hover": {
      backgroundColor: "rgba(244, 67, 54, 0.1)",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#0a0a0a",
    borderRadius: "6px",
    color: "#ffffff",
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e91e63",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#888",
    "&.Mui-focused": {
      color: "#e91e63",
    },
  },
}));

const AvatarSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const ProfileAvatar = styled(Avatar)(() => ({
  width: 80,
  height: 80,
  backgroundColor: "#e91e63",
  fontSize: "32px",
  fontWeight: 600,
}));

const DeleteButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  color: "#f44336",
  border: "1px solid #f44336",
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "8px 16px",
  marginTop: "14px",
  marginLeft: "10px",
  "&:hover": {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
}));

const SignOutButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "1px solid #444",
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "8px 16px",
  marginTop: "12px",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (error) {
      const cookieProfile: UserProfile = {
        id: parseInt(cookieUtils.get("id") || "0"),
        username: cookieUtils.get("username") || "",
        email: cookieUtils.get("email") || "",
        bio: cookieUtils.get("bio") || "",
        avatarUrl: cookieUtils.get("avatarUrl") || null,
      };
      setProfile(cookieProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUsername = () => {
    setTempUsername(profile?.username || "");
    setEditingUsername(true);
  };

  const handleEditBio = () => {
    setTempBio(profile?.bio || "");
    setEditingBio(true);
  };

  const handleSaveUsername = async () => {
    if (!profile || tempUsername.trim() === "") return;

    try {
      setUpdating(true);
      setError(null);

      const updatedProfile = await profileService.updateProfile({
        username: tempUsername.trim(),
      });

      setProfile(updatedProfile);
      setEditingUsername(false);
      setSuccess("Username updated successfully!");

      cookieUtils.set("username", updatedProfile.username, 7);

      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      setError(error.message || "Failed to update username");
      setTimeout(() => setError(null), 5000);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveBio = async () => {
    if (!profile) return;

    try {
      setUpdating(true);
      setError(null);

      const updatedProfile = await profileService.updateProfile({
        bio: tempBio.trim(),
      });

      setProfile(updatedProfile);
      setEditingBio(false);
      setSuccess("Bio updated successfully!");

      cookieUtils.set("bio", updatedProfile.bio || "", 7);

      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      setError(error.message || "Failed to update bio");
      setTimeout(() => setError(null), 5000);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelUsername = () => {
    setEditingUsername(false);
    setTempUsername("");
  };

  const handleCancelBio = () => {
    setEditingBio(false);
    setTempBio("");
  };

  const handleSignOut = () => {
    cookieUtils.remove("authToken");
    cookieUtils.remove("username");
    cookieUtils.remove("id");
    cookieUtils.remove("email");
    cookieUtils.remove("bio");
    cookieUtils.remove("avatarUrl");
    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account functionality
    console.log("Delete account clicked");
  };

  const handleEditAvatar = () => {
    // TODO: Implement avatar upload functionality
    console.log("Edit avatar clicked");
  };

  if (loading) {
    return (
      <ProfileContainer>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress sx={{ color: "#e91e63" }} />
        </Box>
      </ProfileContainer>
    );
  }

  if (!profile) {
    return (
      <ProfileContainer>
        <Alert severity="error">Failed to load profile data</Alert>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <HeaderSection>
        <Typography
          variant="h4"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            marginBottom: 1,
          }}
        >
          Profile
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#888",
          }}
        >
          Manage your account settings and preferences
        </Typography>
      </HeaderSection>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          {success}
        </Alert>
      )}

      <ProfileSection>
        {/* Email Field (Non-editable) */}
        <FieldContainer>
          <FieldContent>
            <FieldLabel>Email</FieldLabel>
            <FieldValue>{profile.email}</FieldValue>
          </FieldContent>
        </FieldContainer>

        <Divider sx={{ backgroundColor: "#333", margin: "24px 0" }} />

        {/* Username Field */}
        <FieldContainer>
          <FieldContent>
            <FieldLabel>Username</FieldLabel>
            {editingUsername ? (
              <StyledTextField
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                disabled={updating}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSaveUsername();
                  } else if (e.key === "Escape") {
                    handleCancelUsername();
                  }
                }}
                autoFocus
              />
            ) : (
              <FieldValue>{profile.username}</FieldValue>
            )}
          </FieldContent>
          {editingUsername ? (
            <Box>
              <ActionButton
                className="save"
                onClick={handleSaveUsername}
                disabled={updating || tempUsername.trim() === ""}
              >
                {updating ? <CircularProgress size={16} /> : <CheckIcon />}
              </ActionButton>
              <ActionButton
                className="cancel"
                onClick={handleCancelUsername}
                disabled={updating}
              >
                <CloseIcon />
              </ActionButton>
            </Box>
          ) : (
            <EditButton onClick={handleEditUsername} startIcon={<EditIcon />}>
              Edit
            </EditButton>
          )}
        </FieldContainer>

        <Divider sx={{ backgroundColor: "#333", margin: "24px 0" }} />

        {/* Bio Field */}
        <FieldContainer>
          <FieldContent>
            <FieldLabel>Bio</FieldLabel>
            {editingBio ? (
              <StyledTextField
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                disabled={updating}
                placeholder="Tell us about yourself..."
                autoFocus
              />
            ) : (
              <FieldValue>{profile.bio || "No bio added yet"}</FieldValue>
            )}
          </FieldContent>
          {editingBio ? (
            <Box>
              <ActionButton
                className="save"
                onClick={handleSaveBio}
                disabled={updating}
              >
                {updating ? <CircularProgress size={16} /> : <CheckIcon />}
              </ActionButton>
              <ActionButton
                className="cancel"
                onClick={handleCancelBio}
                disabled={updating}
              >
                <CloseIcon />
              </ActionButton>
            </Box>
          ) : (
            <EditButton onClick={handleEditBio} startIcon={<EditIcon />}>
              Edit
            </EditButton>
          )}
        </FieldContainer>

        <Divider sx={{ backgroundColor: "#333", margin: "24px 0" }} />

        {/* Avatar Field */}
        <FieldContainer>
          <FieldContent>
            <FieldLabel>Profile Picture</FieldLabel>
            <AvatarSection>
              <ProfileAvatar>
                {profile.username
                  ? profile.username.charAt(0).toUpperCase()
                  : "U"}
              </ProfileAvatar>
            </AvatarSection>
          </FieldContent>
          <EditButton onClick={handleEditAvatar} startIcon={<EditIcon />}>
            Edit
          </EditButton>
        </FieldContainer>
      </ProfileSection>

      <ProfileSection>
        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Account Actions
        </Typography>

        <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>

        <DeleteButton onClick={handleDeleteAccount}>
          Delete Account
        </DeleteButton>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;
