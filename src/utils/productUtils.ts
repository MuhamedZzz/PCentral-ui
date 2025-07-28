// utils/productUtils.ts

import { Product } from "../types/products";
import { MANUFACTURER_INFO } from "../constants/products";

// Extract manufacturer from product name
export const extractManufacturer = (productName: string): string => {
  const name = productName.toLowerCase();

  // Common manufacturer patterns
  const manufacturers = Object.keys(MANUFACTURER_INFO);

  for (const manufacturer of manufacturers) {
    if (name.includes(manufacturer.toLowerCase())) {
      return manufacturer;
    }
  }

  // Try to extract first word as manufacturer
  const firstWord = productName.split(" ")[0].toLowerCase();
  if (MANUFACTURER_INFO[firstWord]) {
    return firstWord;
  }

  return "unknown";
};

// Get manufacturer info
export const getManufacturerInfo = (productName: string) => {
  const manufacturer = extractManufacturer(productName);
  return MANUFACTURER_INFO[manufacturer] || MANUFACTURER_INFO.unknown;
};

// Format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Format property key for display
export const formatPropertyKey = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Format property value for display
export const formatPropertyValue = (key: string, value: any): string => {
  if (value === null || value === undefined) return "N/A";

  // Handle boolean values
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  // Handle numeric values with units
  if (typeof value === "number") {
    switch (key) {
      case "price":
        return formatPrice(value);
      case "base_clock":
      case "boost_clock":
        return `${value} GHz`;
      case "memory":
        return `${value} GB`;
      case "wattage":
        return `${value}W`;
      case "capacity_w":
        return `${value}W`;
      case "capacity_va":
        return `${value}VA`;
      case "screen_size":
        return `${value}"`;
      case "max_dpi":
        return `${value} DPI`;
      case "refresh_rate":
        return `${value}Hz`;
      case "response_time":
        return `${value}ms`;
      case "noise_level":
        return `${value}dB`;
      case "height":
        return `${value}mm`;
      case "length":
        return `${value}mm`;
      case "tdp":
        return `${value}W`;
      case "amount":
        return `${value}g`;
      default:
        return value.toString();
    }
  }

  return value.toString();
};

// Filter products by search query
export const filterProductsBySearch = (
  products: Product[],
  query: string
): Product[] => {
  if (!query.trim()) return products;

  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      extractManufacturer(product.name).toLowerCase().includes(lowercaseQuery)
  );
};

// Filter products by price range
export const filterProductsByPrice = (
  products: Product[],
  min: number,
  max: number
): Product[] => {
  return products.filter(
    (product) => product.price >= min && product.price <= max
  );
};

// Filter products by manufacturers
export const filterProductsByManufacturers = (
  products: Product[],
  manufacturers: string[]
): Product[] => {
  if (manufacturers.length === 0) return products;

  return products.filter((product) => {
    const productManufacturer = extractManufacturer(product.name);
    return manufacturers.includes(productManufacturer);
  });
};

// Get unique manufacturers from products
export const getUniqueManufacturers = (products: Product[]): string[] => {
  const manufacturers = new Set<string>();
  products.forEach((product) => {
    manufacturers.add(extractManufacturer(product.name));
  });
  return Array.from(manufacturers).sort();
};

// Sort products
export const sortProducts = (
  products: Product[],
  sortBy: "name" | "price-low" | "price-high"
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
};

// Paginate products
export const paginateProducts = (
  products: Product[],
  page: number,
  itemsPerPage: number
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    items: products.slice(startIndex, endIndex),
    totalPages: Math.ceil(products.length / itemsPerPage),
    totalItems: products.length,
  };
};

// Generate fallback image for product
export const generateProductImage = (product: Product): string => {
  // Use category-specific images
  const categoryImages: Record<string, string> = {
    cpu: "/product-images/cpu.png",
    memory: "/product-images/memory.png",
    videocard: "/product-images/videocard.png",
    motherboard: "/product-images/motherboard.png",
    powersupply: "/product-images/powersupply.png",
    case: "/product-images/case.png",
    monitor: "/product-images/monitor.png",
    cpucooler: "/product-images/cpucooler.png",
    internalharddrive: "/product-images/internalharddrive.png",
    externalharddrive: "/product-images/externalharddrive.png",
    mouse: "/product-images/mouse.png",
    keyboard: "/product-images/keyboard.png",
    headphones: "/product-images/headphones.png",
    speakers: "/product-images/speakers.png",
    webcam: "/product-images/webcam.png",
    casefan: "/product-images/casefan.png",
    caseaccessory: "/product-images/caseaccessory.png",
    fancontroller: "/product-images/fancontroller.png",
    opticaldrive: "/product-images/opticaldrive.png",
    os: "/product-images/os.png",
    soundcard: "/product-images/soundcard.png",
    thermalpaste: "/product-images/thermalpaste.png",
    ups: "/product-images/ups.png",
    wirednetworkcard: "/product-images/wirednetworkcard.png",
    wirelessnetworkcard: "/product-images/wirelessnetworkcard.png",
  };

  // Return category-specific image or fallback
  return categoryImages[product.category] || "/images/default.png";
};
