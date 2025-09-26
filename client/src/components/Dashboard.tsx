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
  onPurchase: (id: string) => void;
  onViewDetails: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function Dashboard({ 
  user, 
  sweets, 
  cartItems, 
  favoriteItems,
  onPurchase, 
  onViewDetails,
  onToggleFavorite 
}: DashboardProps) {
  const [showFavorites, setShowFavorites] = useState(false);

  const featuredSweets = sweets.filter(sweet => sweet.rating && sweet.rating >= 4.7).slice(0, 4);
  const newArrivals = sweets.slice(-4);
  const displaySweets = showFavorites 
    ? sweets.filter(sweet => favoriteItems.includes(sweet.id))
    : sweets;

  const totalProducts = sweets.length;
  const averageRating = sweets.reduce((sum, sweet) => sum + (sweet.rating || 0), 0) / sweets.length;
  const categoriesCount = new Set(sweets.map(sweet => sweet.category)).size;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
            Welcome back, {user.username}! 🍭
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover delicious sweets and manage your candy cravings. 
            {user.isAdmin && " You have admin access to manage the store inventory."}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Products</p>
                <p className="text-2xl font-bold" data-testid="stat-products">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold" data-testid="stat-rating">
                  {averageRating.toFixed(1)} ⭐
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold" data-testid="stat-categories">{categoriesCount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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
      <div className="flex items-center gap-4 justify-center">
        <Button
          variant={showFavorites ? "default" : "outline"}
          onClick={() => setShowFavorites(!showFavorites)}
          className="gap-2"
          data-testid="button-toggle-favorites"
        >
          <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
          {showFavorites ? 'Show All Products' : 'Show Favorites Only'}
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          data-testid="button-view-cart"
        >
          <ShoppingCart className="w-4 h-4" />
          View Cart ({cartItems.length})
        </Button>
      </div>

      {/* All Products Grid */}
      <SweetGrid
        sweets={displaySweets}
        onPurchase={onPurchase}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}