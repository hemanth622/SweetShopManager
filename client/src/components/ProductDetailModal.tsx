import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Minus, 
  Plus,
  Package,
  X
} from "lucide-react";

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

interface ProductDetailModalProps {
  sweet: Sweet | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (sweetId: string, quantity: number) => void;
  onToggleFavorite: (sweetId: string) => void;
  isFavorite: boolean;
}

export default function ProductDetailModal({
  sweet,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}: ProductDetailModalProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!sweet) return null;

  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 5;

  const handleAddToCart = () => {
    onAddToCart(sweet.id, selectedQuantity);
    setSelectedQuantity(1);
  };

  const handleIncrement = () => {
    if (selectedQuantity < sweet.quantity) {
      setSelectedQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(prev => prev - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-product-detail">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold pr-8">
            {sweet.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
            data-testid="button-close-detail"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={sweet.image}
                alt={sweet.name}
                className="w-full h-full object-cover"
                data-testid="img-product-detail"
              />
            </div>
            
            {/* Product Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <Package className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">{sweet.quantity}</p>
                <p className="text-xs text-muted-foreground">In Stock</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <Star className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
                <p className="text-sm font-medium">{sweet.rating || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <ShoppingCart className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">${sweet.price}</p>
                <p className="text-xs text-muted-foreground">Price</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and Category */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold" data-testid="text-detail-price">
                  ${sweet.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" data-testid="text-detail-category">
                    {sweet.category}
                  </Badge>
                  {sweet.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground" data-testid="text-detail-rating">
                        {sweet.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => onToggleFavorite(sweet.id)}
                data-testid="button-toggle-favorite-detail"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Stock Status */}
            <div>
              {isOutOfStock ? (
                <Badge variant="destructive" className="text-sm" data-testid="status-out-of-stock-detail">
                  Out of Stock
                </Badge>
              ) : isLowStock ? (
                <Badge variant="secondary" className="text-sm" data-testid="status-low-stock-detail">
                  Only {sweet.quantity} left in stock
                </Badge>
              ) : (
                <Badge variant="default" className="text-sm" data-testid="status-in-stock-detail">
                  {sweet.quantity} in stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-detail-description">
                {sweet.description || 'No description available for this product.'}
              </p>
            </div>

            <Separator />

            {/* Quantity Selector and Add to Cart */}
            {!isOutOfStock && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDecrement}
                      disabled={selectedQuantity <= 1}
                      data-testid="button-decrease-detail"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <span className="w-12 text-center font-medium" data-testid="text-selected-quantity">
                      {selectedQuantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleIncrement}
                      disabled={selectedQuantity >= sweet.quantity}
                      data-testid="button-increase-detail"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    
                    <span className="text-sm text-muted-foreground ml-2">
                      of {sweet.quantity} available
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-lg font-semibold" data-testid="text-total-price">
                    Total: ${(sweet.price * selectedQuantity).toFixed(2)}
                  </p>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="w-full gap-2"
                    size="lg"
                    data-testid="button-add-to-cart-detail"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add {selectedQuantity} to Cart
                  </Button>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Free shipping on orders over $25</p>
              <p>✓ 30-day satisfaction guarantee</p>
              <p>✓ Fresh ingredients, made daily</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}