import { NavigationItem, SocialLink, FooterLink } from "../types/sidebar";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "pc-builder",
    label: "PC Builder",
    href: "/builder",
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
  },
  {
    id: "my-builds",
    label: "My Builds",
    href: "/builds",
  },
  {
    id: "compare",
    label: "Compare",
    href: "/compare",
  },
  {
    id: "part-gallery",
    label: "Part Gallery",
    href: "/gallery",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "discord",
    href: "http://discordapp.com/users/950062965980299377",
    icon: "discord",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/in/muhamed-zimeri-1832262b2/",
    icon: "linkedin",
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "GitHub", href: "#" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
