"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { HeroProps } from "../types/home";
import {
  FLOATING_PARTS,
  SHOWCASE_BUILDS,
  HERO_CONTENT,
} from "../constants/home";

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(2deg); }
  50% { transform: translateY(-10px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(1deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(233, 30, 99, 0.3); }
  50% { box-shadow: 0 0 40px rgba(233, 30, 99, 0.6), 0 0 60px rgba(233, 30, 99, 0.4); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const HeroContainer = styled(Box)(() => ({
  minHeight: "100vh",
  background: `
    radial-gradient(circle at 25% 25%, rgba(233, 30, 99, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(33, 150, 243, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
  `,
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20px 20px, rgba(255,255,255,0.15) 1px, transparent 0),
      radial-gradient(circle at 80px 80px, rgba(255,255,255,0.1) 1px, transparent 0)
    `,
    backgroundSize: "100px 100px, 160px 160px",
    opacity: 0.3,
    pointerEvents: "none",
  },
}));

const FloatingPart = styled(Box)<{
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $duration: string;
  $delay: string;
}>(({ $top, $left, $right, $bottom, $duration, $delay }) => ({
  position: "absolute",
  ...($top && { top: $top }),
  ...($left && { left: $left }),
  ...($right && { right: $right }),
  ...($bottom && { bottom: $bottom }),
  animation: `${float} ${$duration} ease-in-out infinite`,
  animationDelay: $delay,
  zIndex: 1,
  opacity: 0.8,
  transition: "all 0.3s ease",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.1)",
  },
  "& img": {
    filter: "drop-shadow(0 0 10px rgba(233, 30, 99, 0.3))",
  },
}));

const ContentContainer = styled(Container)(() => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  maxWidth: "800px !important",
}));

const BadgeContainer = styled(Box)(() => ({
  marginBottom: "24px",
  display: "flex",
  justifyContent: "center",
}));

const Badge = styled(Chip)(() => ({
  backgroundColor: "rgba(233, 30, 99, 0.15)",
  color: "#ffffff",
  border: "1px solid rgba(233, 30, 99, 0.3)",
  fontSize: "14px",
  fontWeight: 500,
  padding: "8px 16px",
  height: "auto",
  animation: `${glow} 10s ease-in-out infinite`,
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

const MainTitle = styled(Typography)(() => ({
  fontSize: "clamp(3rem, 8vw, 4rem)",
  fontWeight: 700,
  background: "linear-gradient(135deg, #ffffff 0%, #e91e63 50%, #ffffff 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundSize: "200% 100%",
  animation: `${shimmer} 3s ease-in-out infinite`,
  marginBottom: "24px",
  lineHeight: 1.1,
}));

const SubtitleContainer = styled(Box)(() => ({
  marginBottom: "48px",
}));

const SubtitleText = styled(Typography)(() => ({
  fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
  color: "#cccccc",
  marginBottom: "16px",
  "& .feature": {
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&:hover": {
      textShadow: "0 0 10px currentColor",
    },
  },
}));

const ButtonContainer = styled(Box)(() => ({
  display: "flex",
  gap: "24px",
  justifyContent: "center",
  marginBottom: "40px",
  flexWrap: "wrap",
}));

const PrimaryButton = styled(Button)(() => ({
  backgroundColor: "#e91e63",
  color: "#ffffff",
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "12px",
  textTransform: "none",
  boxShadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#c2185b",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 40px rgba(233, 30, 99, 0.4)",
  },
}));

const SecondaryButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  padding: "14px 30px",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "12px",
  textTransform: "none",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(233, 30, 99, 0.5)",
    transform: "translateY(-2px)",
  },
}));

const ShowcaseSection = styled(Box)(() => ({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
}));

const ShowcaseTitle = styled(Typography)(() => ({
  fontSize: "1rem",
  fontWeight: 300,
  color: "#ffffff",
  textAlign: "center",
  marginBottom: "20px",
}));

const ShowcaseGrid = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "24px",
  padding: "0 24px",
  justifyContent: "center",
  alignItems: "stretch",
  overflowX: "auto",
  width: "100%",
}));

const ShowcaseCard = styled(Card)(() => ({
  backgroundColor: "rgba(26, 26, 26, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
    borderColor: "rgba(233, 30, 99, 0.3)",
  },
}));

const ShowcaseImage = styled(CardMedia)(() => ({
  height: 200,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, transparent 0%, rgba(26, 26, 26, 0.8) 100%)",
  },
}));

const ShowcaseContent = styled(CardContent)(() => ({
  padding: "20px",
  "& .MuiTypography-h6": {
    color: "#ffffff",
    fontWeight: 600,
    marginBottom: "8px",
  },
  "& .MuiTypography-body2": {
    color: "#888888",
  },
}));

const HeroSection: React.FC<HeroProps> = ({ className }) => {
  const router = useRouter();

  const handleStartBuilding = () => {
    router.push("/builder");
  };

  return (
    <HeroContainer className={className}>
      {/* Floating PC Parts */}
      {FLOATING_PARTS.map((part) => (
        <FloatingPart
          key={part.id}
          top={part.position.top}
          left={part.position.left}
          right={(part.position as any).right}
          bottom={part.position.bottom}
          $duration={part.animation.duration}
          delay={part.animation.delay}
        >
          <Box
            component="img"
            src={part.image}
            alt={part.name}
            sx={{
              width: part.size.width,
              height: part.size.height,
              objectFit: "contain",
            }}
            onError={(e) => {
              // Fallback to a colored box if image fails to load
              const img = e.target as HTMLImageElement;
              img.style.display = "none";
              const fallback = document.createElement("div");
              fallback.style.width = `${part.size.width}px`;
              fallback.style.height = `${part.size.height}px`;
              fallback.style.backgroundColor = "#e91e63";
              fallback.style.borderRadius = "8px";
              fallback.style.display = "flex";
              fallback.style.alignItems = "center";
              fallback.style.justifyContent = "center";
              fallback.style.color = "white";
              fallback.style.fontSize = "12px";
              fallback.style.fontWeight = "bold";
              fallback.textContent = part.name;
              img.parentElement?.appendChild(fallback);
            }}
          />
        </FloatingPart>
      ))}

      <ContentContainer>
        {/* Badge */}
        <BadgeContainer>
          <Badge
            label={`${HERO_CONTENT.badge.icon} ${HERO_CONTENT.badge.text}`}
            variant="outlined"
          />
        </BadgeContainer>

        {/* Main Title */}
        <MainTitle variant="h1">{HERO_CONTENT.title}</MainTitle>

        {/* Subtitle */}
        <SubtitleContainer>
          <SubtitleText>
            {HERO_CONTENT.subtitle.prefix}{" "}
            {HERO_CONTENT.subtitle.features.map((feature, index) => (
              <React.Fragment key={feature.text}>
                <span className="feature" style={{ color: feature.color }}>
                  {feature.text}
                </span>
                {feature.text === "Live Prices" && <br />}
                {index < HERO_CONTENT.subtitle.features.length - 1 &&
                  feature.text !== "Live Prices" &&
                  ", "}
              </React.Fragment>
            ))}{" "}
            {HERO_CONTENT.subtitle.suffix}
          </SubtitleText>
        </SubtitleContainer>

        {/* Action Buttons */}
        <ButtonContainer>
          <PrimaryButton
            startIcon={<DesignServicesIcon />}
            onClick={handleStartBuilding}
            size="large"
          >
            {HERO_CONTENT.buttons.primary.text}
          </PrimaryButton>
          <SecondaryButton
            startIcon={<SearchIcon />}
            href={HERO_CONTENT.buttons.secondary.href}
            size="large"
          >
            {HERO_CONTENT.buttons.secondary.text}
          </SecondaryButton>
        </ButtonContainer>

        {/* Showcase Section */}
        <ShowcaseSection>
          <ShowcaseTitle variant="h2">
            {HERO_CONTENT.showcase.title}
          </ShowcaseTitle>
          <ShowcaseGrid>
            {SHOWCASE_BUILDS.map((build) => (
              <ShowcaseCard key={build.id}>
                <ShowcaseImage
                  image={build.image}
                  title={build.name}
                  onError={(e) => {
                    // Fallback background for missing images
                    const element = e.target as HTMLElement;
                    element.style.background = `linear-gradient(135deg, #e91e63, #1a1a1a)`;
                  }}
                />
                <ShowcaseContent>
                  <Typography variant="h6">{build.name}</Typography>
                  <Typography variant="body2">{build.description}</Typography>
                </ShowcaseContent>
              </ShowcaseCard>
            ))}
          </ShowcaseGrid>
        </ShowcaseSection>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection;
