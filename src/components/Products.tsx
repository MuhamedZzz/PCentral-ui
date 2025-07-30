"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  CircularProgress,
  Alert,
  Pagination,
  Modal,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Product,
  ProductsResponse,
  FilterState,
  ProductsPageProps,
} from "../types/products";
import {
  DEFAULT_CATEGORY,
  ITEMS_PER_PAGE,
  CATEGORY_DISPLAY_NAMES,
  PRICE_RANGES,
  IMPORTANT_PROPERTIES,
} from "../constants/products";
import {
  formatPrice,
  formatPropertyKey,
  formatPropertyValue,
  getManufacturerInfo,
  generateProductImage,
  filterProductsBySearch,
  filterProductsByPrice,
  filterProductsByManufacturers,
  getUniqueManufacturers,
  sortProducts,
  paginateProducts,
} from "../utils/productUtils";
import api from "@/utils/axios";

const PageContainer = styled(Box)(() => ({
  minHeight: "100vh",
  background: `
    radial-gradient(circle at 25% 25%, rgba(233, 30, 99, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(33, 150, 243, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
  `,
  paddingTop: "40px",
  paddingBottom: "40px",
}));

const HeaderSection = styled(Box)(() => ({
  marginBottom: "40px",
  textAlign: "center",
}));

const PageTitle = styled(Typography)(() => ({
  fontSize: "clamp(2rem, 5vw, 3rem)",
  fontWeight: 700,
  background: "linear-gradient(135deg, #ffffff 0%, #e91e63 50%, #ffffff 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "16px",
}));

const MainContent = styled(Box)(() => ({
  display: "flex",
  gap: "32px",
  alignItems: "flex-start",
}));

const FilterPanel = styled(Card)(() => ({
  backgroundColor: "rgba(26, 26, 26, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: "24px",
  width: "320px",
  position: "sticky",
  top: "20px",
  maxHeight: "calc(100vh - 40px)",
  overflowY: "auto",
}));

const ProductsSection = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));

const ControlsSection = styled(Box)(() => ({
  display: "flex",
  gap: "16px",
  marginBottom: "24px",
  flexWrap: "wrap",
  alignItems: "center",
}));

const StyledFormControl = styled(FormControl)(() => ({
  minWidth: "180px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(233, 30, 99, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e91e63",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#cccccc",
  },
  "& .MuiSelect-select": {
    color: "#ffffff",
  },
}));

const SearchField = styled(TextField)(() => ({
  flex: 1,
  minWidth: "200px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(233, 30, 99, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e91e63",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#cccccc",
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
  },
}));

const ProductCard = styled(Card)(() => ({
  backgroundColor: "rgba(26, 26, 26, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  height: "400px",
  width: "250px",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
    borderColor: "rgba(233, 30, 99, 0.3)",
  },
}));

const ProductImage = styled(CardMedia)(() => ({
  height: 200,
  backgroundSize: "contain",
  backgroundPosition: "center",
  margin: "16px",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
}));

const ProductContent = styled(CardContent)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  "& .MuiTypography-h6": {
    color: "#ffffff",
    fontWeight: 600,
    marginBottom: "8px",
    fontSize: "1rem",
    lineHeight: 1.3,
  },
  "& .MuiTypography-body2": {
    color: "#888888",
    marginBottom: "16px",
    flex: 1,
  },
}));

const PriceChip = styled(Chip)(() => ({
  backgroundColor: "rgba(233, 30, 99, 0.15)",
  color: "#e91e63",
  border: "1px solid rgba(233, 30, 99, 0.3)",
  fontWeight: 600,
  fontSize: "1rem",
}));

const ManufacturerChip = styled(Chip)(() => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#ffffff",
  fontSize: "0.75rem",
  height: "24px",
}));

const ProductModal = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
}));

const ModalContent = styled(Box)(() => ({
  backgroundColor: "rgba(26, 26, 26, 0.95)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  maxWidth: "800px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  outline: "none",
}));

const ModalHeader = styled(Box)(() => ({
  padding: "24px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

const ModalBody = styled(Box)(() => ({
  padding: "24px",
}));

const LoadingContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
}));

const EmptyState = styled(Box)(() => ({
  textAlign: "center",
  padding: "60px 20px",
  color: "#888888",
}));

const FilterSection = styled(Box)(() => ({
  marginBottom: "24px",
  "& .MuiTypography-h6": {
    color: "#ffffff",
    fontWeight: 600,
    marginBottom: "16px",
    fontSize: "1rem",
  },
}));

const ResultsInfo = styled(Typography)(() => ({
  color: "#cccccc",
  marginBottom: "16px",
  fontSize: "0.9rem",
}));

const ProductsPage: React.FC<ProductsPageProps> = ({ className }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">(
    "name"
  );

  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: Infinity },
    manufacturers: [],
    searchQuery: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await api.get("/api/StaticParts/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ProductsResponse>(
        `/api/StaticParts/${category}`
      );
      const data = response.data;
      setProducts(data.parts);
      setCurrentPage(1);
    } catch (err) {
      setError(
        `Failed to load ${
          CATEGORY_DISPLAY_NAMES[category] || category
        } products`
      );
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory, fetchProducts]);

  useEffect(() => {
    let filtered = [...products];

    filtered = filterProductsBySearch(filtered, filters.searchQuery);

    filtered = filterProductsByPrice(
      filtered,
      filters.priceRange.min,
      filters.priceRange.max
    );

    filtered = filterProductsByManufacturers(filtered, filters.manufacturers);

    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilters({
      priceRange: { min: 0, max: Infinity },
      manufacturers: [],
      searchQuery: "",
    });
  };

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: { min, max } }));
  };

  const handleManufacturerToggle = (manufacturer: string) => {
    setFilters((prev) => ({
      ...prev,
      manufacturers: prev.manufacturers.includes(manufacturer)
        ? prev.manufacturers.filter((m) => m !== manufacturer)
        : [...prev.manufacturers, manufacturer],
    }));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const paginationResult = paginateProducts(
    filteredProducts,
    currentPage,
    ITEMS_PER_PAGE
  );
  const displayedProducts = paginationResult.items;
  const totalPages = paginationResult.totalPages;

  const availableManufacturers = getUniqueManufacturers(products);

  if (categoriesLoading) {
    return (
      <PageContainer className={className}>
        <Container maxWidth="xl">
          <LoadingContainer>
            <CircularProgress sx={{ color: "#e91e63" }} />
          </LoadingContainer>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer className={className}>
      <Container maxWidth="xl">
        {/* Header */}
        <HeaderSection>
          <PageTitle variant="h1">Browse PC Parts</PageTitle>
          <Typography variant="h6" sx={{ color: "#cccccc" }}>
            Discover from thousands of high-quality components
          </Typography>
        </HeaderSection>

        {/* Main Content */}
        <MainContent>
          {/* Filter Panel */}
          <FilterPanel>
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FilterListIcon /> Filters
            </Typography>

            {/* Category Filter */}
            <FilterSection>
              <Typography variant="h6">Category</Typography>
              <StyledFormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Select Category"
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {CATEGORY_DISPLAY_NAMES[category] || category}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </FilterSection>

            {/* Price Filter */}
            <FilterSection>
              <Typography variant="h6">Price Range</Typography>
              <Box sx={{ mt: 2 }}>
                {PRICE_RANGES.map((range, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={
                          filters.priceRange.min === range.min &&
                          filters.priceRange.max === range.max
                        }
                        onChange={() =>
                          handlePriceRangeChange(range.min, range.max)
                        }
                        sx={{ color: "#e91e63" }}
                      />
                    }
                    label={range.label}
                    sx={{ color: "#cccccc", display: "block" }}
                  />
                ))}
              </Box>
            </FilterSection>

            {/* Manufacturer Filter */}
            {availableManufacturers.length > 0 && (
              <FilterSection>
                <Typography variant="h6">Manufacturer</Typography>
                <FormGroup>
                  {availableManufacturers.slice(0, 8).map((manufacturer) => (
                    <FormControlLabel
                      key={manufacturer}
                      control={
                        <Checkbox
                          checked={filters.manufacturers.includes(manufacturer)}
                          onChange={() =>
                            handleManufacturerToggle(manufacturer)
                          }
                          sx={{ color: "#e91e63" }}
                        />
                      }
                      label={
                        manufacturer.charAt(0).toUpperCase() +
                        manufacturer.slice(1)
                      }
                      sx={{ color: "#cccccc" }}
                    />
                  ))}
                </FormGroup>
              </FilterSection>
            )}
          </FilterPanel>

          {/* Products Section */}
          <ProductsSection>
            {/* Controls */}
            <ControlsSection>
              <SearchField
                label="Search products..."
                variant="outlined"
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "#888888", mr: 1 }} />
                  ),
                }}
              />
              <StyledFormControl>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                </Select>
              </StyledFormControl>
            </ControlsSection>

            {/* Results Info */}
            <ResultsInfo>
              Showing {displayedProducts.length} of {filteredProducts.length}{" "}
              products
            </ResultsInfo>

            {/* Loading State */}
            {loading && (
              <LoadingContainer>
                <CircularProgress sx={{ color: "#e91e63" }} />
              </LoadingContainer>
            )}

            {/* Error State */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {displayedProducts.length > 0 ? (
                  <>
                    <Grid container spacing={3}>
                      {displayedProducts.map((product) => {
                        const manufacturerInfo = getManufacturerInfo(
                          product.name
                        );
                        return (
                          <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard
                              onClick={() => handleProductClick(product)}
                            >
                              <ProductImage
                                image={generateProductImage(product)}
                                title={product.name}
                              />
                              <ProductContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    mb: 1,
                                  }}
                                >
                                  <Typography variant="h6">
                                    {product.name.length > 50
                                      ? `${product.name.substring(0, 50)}...`
                                      : product.name}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                  <ManufacturerChip
                                    label={`${manufacturerInfo.logo} ${manufacturerInfo.name}`}
                                    size="small"
                                  />
                                </Box>
                                <Box sx={{ mt: "auto" }}>
                                  <PriceChip
                                    label={formatPrice(product.price)}
                                  />
                                </Box>
                              </ProductContent>
                            </ProductCard>
                          </Grid>
                        );
                      })}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 4,
                        }}
                      >
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={(_, page) => setCurrentPage(page)}
                          color="primary"
                          size="large"
                          sx={{
                            "& .MuiPaginationItem-root": {
                              color: "#ffffff",
                              borderColor: "rgba(255, 255, 255, 0.2)",
                            },
                            "& .Mui-selected": {
                              backgroundColor: "#e91e63 !important",
                              color: "#ffffff",
                            },
                          }}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <EmptyState>
                    <Typography variant="h6" sx={{ color: "#888888", mb: 2 }}>
                      No products found
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666666" }}>
                      Try adjusting your filters or search terms
                    </Typography>
                  </EmptyState>
                )}
              </>
            )}
          </ProductsSection>
        </MainContent>

        {/* Product Modal */}
        <ProductModal open={modalOpen} onClose={handleModalClose}>
          <ModalContent>
            {selectedProduct && (
              <>
                <ModalHeader>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ color: "#ffffff", fontWeight: 600, mb: 1 }}
                    >
                      {selectedProduct.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <ManufacturerChip
                        label={`${
                          getManufacturerInfo(selectedProduct.name).logo
                        } ${getManufacturerInfo(selectedProduct.name).name}`}
                      />
                      <PriceChip label={formatPrice(selectedProduct.price)} />
                    </Box>
                  </Box>
                  <IconButton
                    onClick={handleModalClose}
                    sx={{ color: "#ffffff" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ModalHeader>

                <ModalBody>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                      <Box
                        component="img"
                        src={generateProductImage(selectedProduct)}
                        alt={selectedProduct.name}
                        sx={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                          borderRadius: "12px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Typography variant="h6" sx={{ color: "#ffffff", mb: 2 }}>
                        Specifications
                      </Typography>
                      <List>
                        {Object.entries(selectedProduct.properties).map(
                          ([key, value]) => {
                            if (key === "name" || key === "price") return null;
                            return (
                              <ListItem key={key} sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                  primary={formatPropertyKey(key)}
                                  secondary={formatPropertyValue(key, value)}
                                  primaryTypographyProps={{
                                    color: "#cccccc",
                                    fontWeight: 500,
                                  }}
                                  secondaryTypographyProps={{
                                    color: "#ffffff",
                                    fontSize: "1rem",
                                  }}
                                />
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                    </Grid>
                  </Grid>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </ProductModal>
      </Container>
    </PageContainer>
  );
};

export default ProductsPage;
