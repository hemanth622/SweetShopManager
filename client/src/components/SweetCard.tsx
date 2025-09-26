import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

interface SweetCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  rating?: number;
  description?: string;
  onPurchase: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export default function SweetCard({
  id,
  name,
  price,
  image,
  category,
  quantity,
  rating = 4.5,
  description,
  onPurchase,
  onViewDetails,
}: SweetCardProps) {
  const isOutOfStock = quantity === 0;
  const isLowStock = quantity > 0 && quantity <= 5;

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-sweet-${id}`}>
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-md">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => onViewDetails(id)}
            data-testid={`img-sweet-${id}`}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 
              className="font-medium text-base leading-tight cursor-pointer hover:text-primary"
              onClick={() => onViewDetails(id)}
              data-testid={`text-sweet-name-${id}`}
            >
              {name}
            </h3>
            <Badge 
              variant="secondary" 
              className="text-xs shrink-0"
              data-testid={`badge-category-${id}`}
            >
              {category}
            </Badge>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${id}`}>
              {description}
            </p>
          )}

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground" data-testid={`text-rating-${id}`}>
              {rating}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold" data-testid={`text-price-${id}`}>
              ${price.toFixed(2)}
            </span>
            
            <div className="text-right">
              {isOutOfStock ? (
                <Badge variant="destructive" data-testid={`status-out-of-stock-${id}`}>
                  Out of Stock
                </Badge>
              ) : isLowStock ? (
                <Badge variant="secondary" data-testid={`status-low-stock-${id}`}>
                  {quantity} left
                </Badge>
              ) : (
                <span className="text-sm text-muted-foreground" data-testid={`text-stock-${id}`}>
                  {quantity} in stock
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-4 pb-4">
        <Button
          onClick={() => onPurchase(id)}
          disabled={isOutOfStock}
          className="w-full gap-2"
          data-testid={`button-purchase-${id}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}