export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: "discord" | "linkedin";
  href: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}
