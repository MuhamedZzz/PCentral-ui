import { FloatingPart, ShowcaseBuild } from "../types/home";

export const FLOATING_PARTS: FloatingPart[] = [
  {
    id: "motherboard",
    name: "Motherboard",
    image: "/parts/motherboard.png", // You'll need to add these images
    position: { top: "15%", left: "15%", bottom: "", right: "" },
    animation: { duration: "6s", delay: "0s" },
    size: { width: 200, height: 180 }, // increased size
  },
  {
    id: "gpu",
    name: "Graphics Card",
    image: "/parts/gpu.png",
    position: { top: "25%", right: "14%", bottom: "", left: "" },
    animation: { duration: "8s", delay: "1s" },
    size: { width: 230, height: 185 }, // increased size
  },
  {
    id: "cpu-cooler",
    name: "CPU Cooler",
    image: "/parts/cpu-cooler.png",
    position: { bottom: "25%", right: "18%", top: "", left: "" },
    animation: { duration: "7s", delay: "2s" },
    size: { width: 170, height: 200 }, // increased size
  },
  {
    id: "ram",
    name: "RAM",
    image: "/parts/psu.png",
    position: { bottom: "15%", left: "15%", top: "", right: "" },
    animation: { duration: "5s", delay: "1.5s" },
    size: { width: 240, height: 250 }, // increased size
  },
];

export const SHOWCASE_BUILDS: ShowcaseBuild[] = [
  {
    id: "gaming-beast",
    name: "Gaming Beast",
    image: "/builds/gaming-beast.png", // You'll need to add these images
    description: "High-end gaming setup",
  },
  {
    id: "budget-builder",
    name: "Budget Builder",
    image: "/builds/budget-builder.jpg",
    description: "Affordable performance",
  },
  {
    id: "workstation-pro",
    name: "Workstation Pro",
    image: "/builds/workstation-pro.jpg",
    description: "Professional workstation",
  },
];

export const HERO_CONTENT = {
  badge: {
    text: "Made by Muhamed Zimeri",
    icon: "",
  },
  title: "PC Building Made Simple",
  subtitle: {
    prefix: "Featuring",
    features: [
      { text: "Save Your Builds", color: "#4CAF50" },
      { text: "Live Prices", color: "#2196F3" },
      { text: "60,000+ Products", color: "#e91e63" },
    ],
    suffix: "and more.",
  },
  buttons: {
    primary: {
      text: "Start Building",
      href: "/builder",
    },
    secondary: {
      text: "Explore Parts",
      href: "/products",
    },
  },
  showcase: {
    title: "Featured Builds",
  },
};
