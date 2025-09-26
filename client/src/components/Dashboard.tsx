import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Package, 
  Star, 
  TrendingUp, 
  Heart,
  Filter
} from "lucide-react";
import SweetGrid from "./SweetGrid";
import { DashboardSkeleton } from "./LoadingStates";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "./PageTransition";

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

interface DashboardProps {
  user: {
    username: string;
    isAdmin: boolean;
  };
  sweets: Sweet[];
  cartItems: string[];
  favoriteItems: string[];
  showFavorites?: boolean;
  onPurchase: (id: string) => void;
  onViewDetails: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleShowFavorites?: () => void;
  isLoading?: boolean;
}

export default function Dashboard({ 
  user, 
  sweets, 
  cartItems, 
  favoriteItems,
  showFavorites: externalShowFavorites,
  onPurchase, 
  onViewDetails,
  onToggleFavorite,
  onToggleShowFavorites,
  isLoading = false
}: DashboardProps) {
  const [localShowFavorites, setLocalShowFavorites] = useState(false);
  const showFavorites = externalShowFavorites !== undefined ? externalShowFavorites : localShowFavorites;

  const featuredSweets = sweets.filter(sweet => sweet.rating && sweet.rating >= 4.7).slice(0, 4);
  const newArrivals = sweets.slice(-4);
  const displaySweets = showFavorites 
    ? sweets.filter(sweet => favoriteItems.includes(sweet.id))
    : sweets;

  const totalProducts = sweets.length;
  const averageRating = sweets.reduce((sum, sweet) => sum + (sweet.rating || 0), 0) / sweets.length;
  const categoriesCount = new Set(sweets.map(sweet => sweet.category)).size;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <SlideIn direction="down" className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-welcome">
            Welcome back, {user.username}! 🍭
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover delicious sweets and manage your candy cravings. 
            {user.isAdmin && " You have admin access to manage the store inventory."}
          </p>
        </div>
      </SlideIn>

      {/* Quick Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.1}>
        <StaggerItem>
          <Card className="hover-elevate transition-all duration-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Products</p>
                  <p className="text-xl sm:text-2xl font-bold" data-testid="stat-products">{totalProducts}</p>
                </div>
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="hover-elevate transition-all duration-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-xl sm:text-2xl font-bold" data-testid="stat-rating">
                    {averageRating.toFixed(1)} ⭐
                  </p>
                </div>
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="hover-elevate transition-all duration-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-xl sm:text-2xl font-bold" data-testid="stat-categories">{categoriesCount}</p>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Featured Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSweets.map((sweet) => (
              <div key={sweet.id} className="group cursor-pointer" onClick={() => onViewDetails(sweet.id)}>
                <div className="aspect-square mb-3 overflow-hidden rounded-md bg-muted">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium line-clamp-1">{sweet.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${sweet.price.toFixed(2)}</span>
                    <Badge variant="secondary">{sweet.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">{sweet.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Arrivals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            New Arrivals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map((sweet) => (
              <div key={sweet.id} className="group cursor-pointer" onClick={() => onViewDetails(sweet.id)}>
                <div className="aspect-square mb-3 overflow-hidden rounded-md bg-muted relative">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    New
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(sweet.id);
                    }}
                    data-testid={`button-favorite-${sweet.id}`}
                  >
                    <Heart 
                      className={`w-4 h-4 ${favoriteItems.includes(sweet.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium line-clamp-1">{sweet.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${sweet.price.toFixed(2)}</span>
                    <Badge variant="secondary">{sweet.category}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <FadeIn delay={0.6} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <Button
          variant={showFavorites ? "default" : "outline"}
          onClick={onToggleShowFavorites || (() => setLocalShowFavorites(!localShowFavorites))}
          className="gap-2 w-full sm:w-auto"
          data-testid="button-toggle-favorites"
        >
          <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">
            {showFavorites ? 'Show All Products' : 'Show Favorites Only'}
          </span>
          <span className="sm:hidden">
            {showFavorites ? 'All Products' : 'Favorites'}
          </span>
        </Button>

        <Button
          variant="outline"
          className="gap-2 w-full sm:w-auto"
          data-testid="button-view-cart"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Cart ({cartItems.length})</span>
        </Button>
      </FadeIn>

      {/* All Products Grid */}
      <SweetGrid
        sweets={displaySweets}
        onPurchase={onPurchase}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}