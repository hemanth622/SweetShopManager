import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SweetCard from "./SweetCard";
import EnhancedSearch from "./EnhancedSearch";
import { SweetGridSkeleton } from "./LoadingStates";
import { StaggerContainer, StaggerItem } from "./PageTransition";
import { Filter, SortAsc, Package } from "lucide-react";

interface Sweet {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  rating?: number;
  description?: string;
}

interface SweetGridProps {
  sweets: Sweet[];
  onPurchase: (id: string) => void;
  onViewDetails: (id: string) => void;
  isLoading?: boolean;
}

export default function SweetGrid({ sweets, onPurchase, onViewDetails, isLoading }: SweetGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Get unique categories
  const categories = Array.from(new Set(sweets.map(sweet => sweet.category)));

  // Filter and sort sweets
  const filteredSweets = sweets
    .filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sweet.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || sweet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "stock":
          return b.quantity - a.quantity;
        default: // name
          return a.name.localeCompare(b.name);
      }
    });

  const outOfStockCount = sweets.filter(sweet => sweet.quantity === 0).length;
  const lowStockCount = sweets.filter(sweet => sweet.quantity > 0 && sweet.quantity <= 5).length;

  if (isLoading) {
    return <SweetGridSkeleton />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Search</label>
              <EnhancedSearch
                sweets={sweets}
                onSearch={setSearchQuery}
                placeholder="Search sweets, categories, descriptions..."
                showSuggestions={true}
                data-testid="enhanced-search-grid"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="stock">Stock Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Stats</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" data-testid="badge-total-products">
                  <Package className="w-3 h-3 mr-1" />
                  {sweets.length} Products
                </Badge>
                {outOfStockCount > 0 && (
                  <Badge variant="destructive" data-testid="badge-out-of-stock">
                    {outOfStockCount} Out of Stock
                  </Badge>
                )}
                {lowStockCount > 0 && (
                  <Badge variant="secondary" data-testid="badge-low-stock">
                    {lowStockCount} Low Stock
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {filteredSweets.length !== sweets.length && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground" data-testid="text-filter-results">
                Showing {filteredSweets.length} of {sweets.length} products
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSortBy("name");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredSweets.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No sweets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      ) : (
        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          data-testid="grid-sweets"
          staggerDelay={0.05}
        >
          {filteredSweets.map((sweet, index) => (
            <StaggerItem key={sweet.id} delay={index * 0.02}>
              <SweetCard
                {...sweet}
                onPurchase={onPurchase}
                onViewDetails={onViewDetails}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}