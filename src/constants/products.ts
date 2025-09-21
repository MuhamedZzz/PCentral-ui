import { ManufacturerMap } from "../types/products";

export const DEFAULT_CATEGORY = "videocard";

export const ITEMS_PER_PAGE = 12;

export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  caseaccessory: "Case Accessories",
  casefan: "Case Fans",
  case: "Cases",
  cpucooler: "CPU Coolers",
  cpu: "CPU",
  externalharddrive: "External HDDs",
  fancontroller: "Fan Controllers",
  headphones: "Headphones",
  internalharddrive: "Internal HDDs",
  keyboard: "Keyboards",
  memory: "Memory (RAM)",
  monitor: "Monitors",
  motherboard: "Motherboards",
  mouse: "Mice",
  opticaldrive: "Optical Drives",
  os: "Operating Systems",
  powersupply: "Power Supplies",
  soundcard: "Sound Cards",
  speakers: "Speakers",
  thermalpaste: "Thermal Paste",
  ups: "UPS Systems",
  videocard: "GPU",
  webcam: "Webcams",
  wirednetworkcard: "Network Cards",
  wirelessnetworkcard: "Wireless Cards",
};

export const MANUFACTURER_INFO: ManufacturerMap = {
  intel: {
    name: "Intel",
    logo: "🔵",
    color: "#0071c5",
  },
  amd: {
    name: "AMD",
    logo: "🔴",
    color: "#ed1c24",
  },

  nvidia: {
    name: "NVIDIA",
    logo: "🟢",
    color: "#76b900",
  },
  radeon: {
    name: "AMD Radeon",
    logo: "🔴",
    color: "#ed1c24",
  },

  corsair: {
    name: "Corsair",
    logo: "⚫",
    color: "#ffcc00",
  },
  "g.skill": {
    name: "G.Skill",
    logo: "🔸",
    color: "#ff6600",
  },
  kingston: {
    name: "Kingston",
    logo: "🔵",
    color: "#e31e24",
  },
  asus: {
    name: "ASUS",
    logo: "🟡",
    color: "#0066cc",
  },
  msi: {
    name: "MSI",
    logo: "🔴",
    color: "#ff0000",
  },
  gigabyte: {
    name: "Gigabyte",
    logo: "🟠",
    color: "#ff8800",
  },
  asrock: {
    name: "ASRock",
    logo: "⚪",
    color: "#666666",
  },

  evga: {
    name: "EVGA",
    logo: "🟢",
    color: "#7cb518",
  },
  seasonic: {
    name: "Seasonic",
    logo: "🔵",
    color: "#1e4d6b",
  },
  samsung: {
    name: "Samsung",
    logo: "🔵",
    color: "#1428a0",
  },
  "western digital": {
    name: "Western Digital",
    logo: "🔵",
    color: "#0067b1",
  },
  seagate: {
    name: "Seagate",
    logo: "🟢",
    color: "#00b04f",
  },
  noctua: {
    name: "Noctua",
    logo: "🤎",
    color: "#8b4513",
  },
  "cooler master": {
    name: "Cooler Master",
    logo: "🔵",
    color: "#662d91",
  },
  logitech: {
    name: "Logitech",
    logo: "🔵",
    color: "#00b8fc",
  },
  razer: {
    name: "Razer",
    logo: "🟢",
    color: "#00ff00",
  },
  steelseries: {
    name: "SteelSeries",
    logo: "🟠",
    color: "#ff6900",
  },
  unknown: {
    name: "Unknown",
    logo: "⚪",
    color: "#666666",
  },
};

export const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $250", min: 100, max: 250 },
  { label: "$250 - $500", min: 250, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000+", min: 1000, max: Infinity },
];

export const IMPORTANT_PROPERTIES: Record<string, string[]> = {
  cpu: ["cores", "threads", "base_clock", "boost_clock", "tdp", "socket"],
  memory: ["speed", "modules", "color", "first_word_latency", "cas_latency"],
  videocard: ["chipset", "memory", "core_clock", "boost_clock", "length"],
  motherboard: ["socket", "form_factor", "max_memory", "memory_slots"],
  powersupply: ["wattage", "modular", "efficiency", "color"],
  case: ["type", "color", "side_panel", "external_volume"],
  monitor: ["screen_size", "resolution", "refresh_rate", "response_time"],
  cpucooler: ["fan_rpm", "noise_level", "color", "height"],
  internalharddrive: ["capacity", "type", "cache", "form_factor"],
  mouse: ["tracking_method", "connection_type", "max_dpi", "hand_orientation"],
  keyboard: ["style", "switches", "backlit", "tenkeyless"],
};
