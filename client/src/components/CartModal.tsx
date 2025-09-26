import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, Trash2, X } from "lucide-react";

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

interface CartItem {
  sweet: Sweet;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (sweetId: string, quantity: number) => void;
  onRemoveItem: (sweetId: string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClearCart,
}: CartModalProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.sweet.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleIncrement = (sweetId: string, currentQuantity: number) => {
    const sweet = cartItems.find(item => item.sweet.id === sweetId)?.sweet;
    if (sweet && currentQuantity < sweet.quantity) {
      onUpdateQuantity(sweetId, currentQuantity + 1);
    }
  };

  const handleDecrement = (sweetId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      onUpdateQuantity(sweetId, currentQuantity - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col" data-testid="modal-cart">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItems.length} items)
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-cart"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-4">
              Browse our delicious sweets and add them to your cart to get started!
            </p>
            <Button onClick={onClose} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 max-h-96">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.sweet.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                    data-testid={`cart-item-${item.sweet.id}`}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                      <img
                        src={item.sweet.image}
                        alt={item.sweet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate" data-testid={`text-cart-item-name-${item.sweet.id}`}>
                        {item.sweet.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.sweet.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold" data-testid={`text-cart-item-price-${item.sweet.id}`}>
                          ${item.sweet.price.toFixed(2)}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {item.sweet.quantity} in stock
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDecrement(item.sweet.id, item.quantity)}
                        disabled={item.quantity <= 1}
                        data-testid={`button-decrease-${item.sweet.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.sweet.id}`}>
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleIncrement(item.sweet.id, item.quantity)}
                        disabled={item.quantity >= item.sweet.quantity}
                        data-testid={`button-increase-${item.sweet.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold" data-testid={`text-item-total-${item.sweet.id}`}>
                        ${(item.sweet.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 mt-1 text-destructive hover:text-destructive"
                        onClick={() => onRemoveItem(item.sweet.id)}
                        data-testid={`button-remove-${item.sweet.id}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%):</span>
                <span data-testid="text-tax">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span data-testid="text-total">${total.toFixed(2)}</span>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                variant="outline"
                onClick={onClearCart}
                className="gap-2"
                data-testid="button-clear-cart"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </Button>
              <Button
                onClick={onCheckout}
                className="gap-2 flex-1"
                data-testid="button-checkout"
              >
                <ShoppingCart className="w-4 h-4" />
                Checkout (${total.toFixed(2)})
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}