export interface FloatingPart {
  id: string;
  name: string;
  image: string;
  position: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  animation: {
    duration: string;
    delay: string;
  };
  size: {
    width: number;
    height: number;
  };
}

export interface ShowcaseBuild {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface HeroProps {
  className?: string;
}
