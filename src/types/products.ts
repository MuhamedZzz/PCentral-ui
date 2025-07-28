export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  properties: Record<string, any>;
}

export interface ProductsResponse {
  category: string;
  count: number;
  parts: Product[];
}

export interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
}

export interface FilterPanelProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  selectedCategory: string;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ProductsPageProps {
  className?: string;
}

// Filter types
export interface PriceFilter {
  min: number;
  max: number;
}

export interface FilterState {
  priceRange: PriceFilter;
  manufacturers: string[];
  searchQuery: string;
}

// Manufacturer mapping for logos
export interface ManufacturerInfo {
  name: string;
  logo: string;
  color: string;
}

export type ManufacturerMap = Record<string, ManufacturerInfo>;
