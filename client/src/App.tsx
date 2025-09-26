import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "@/components/ThemeProvider";
import { queryClient } from "./lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { AppSidebar } from "@/components/AppSidebar";
import CartModal from "@/components/CartModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import Header from "@/components/Header";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

// Mock data - todo: remove mock functionality
import gummyBearsImage from '@assets/generated_images/Colorful_gummy_bears_jar_58f2544b.png';
import chocolateImage from '@assets/generated_images/Chocolate_truffles_arrangement_590e3205.png';
import lollipopsImage from '@assets/generated_images/Colorful_spiral_lollipops_67c94b38.png';
import jellyBeansImage from '@assets/generated_images/Gourmet_jelly_beans_container_9cc6917c.png';

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

// todo: remove mock functionality - mock sweets data
const initialSweets: Sweet[] = [
  {
    id: "1",
    name: "Rainbow Gummy Bears",
    price: 8.99,
    image: gummyBearsImage,
    category: "Gummies",
    quantity: 15,
    rating: 4.8,
    description: "Delicious assorted fruit-flavored gummy bears in a convenient jar"
  },
  {
    id: "2", 
    name: "Chocolate Truffles",
    price: 24.99,
    image: chocolateImage,
    category: "Chocolate",
    quantity: 8,
    rating: 4.9,
    description: "Premium handcrafted chocolate truffles with rich cocoa powder"
  },
  {
    id: "3",
    name: "Spiral Lollipops",
    price: 12.50,
    image: lollipopsImage,
    category: "Hard Candy",
    quantity: 0,
    rating: 4.6,
    description: "Colorful spiral lollipops in assorted fruit flavors"
  },
  {
    id: "4",
    name: "Gourmet Jelly Beans",
    price: 15.99,
    image: jellyBeansImage,
    category: "Jelly Beans",
    quantity: 3,
    rating: 4.7,
    description: "Premium gourmet jelly beans with authentic fruit flavors"
  },
  {
    id: "5",
    name: "Caramel Fudge",
    price: 18.99,
    image: chocolateImage,
    category: "Fudge",
    quantity: 12,
    rating: 4.8,
    description: "Rich and creamy caramel fudge made with real butter"
  },
  {
    id: "6",
    name: "Marshmallow Clouds",
    price: 6.99,
    image: gummyBearsImage,
    category: "Marshmallows",
    quantity: 20,
    rating: 4.5,
    description: "Fluffy vanilla marshmallows perfect for s'mores"
  }
];

interface CartItem {
  sweet: Sweet;
  quantity: number;
}

function AppContent() {
  const [, setLocation] = useLocation();
  const { actualTheme, setTheme } = useTheme();
  const { toast } = useToast();

  // todo: remove mock functionality - App state
  const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
  const [sweets, setSweets] = useState<Sweet[]>(initialSweets);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // todo: remove mock functionality - Authentication handlers
  const handleLogin = (username: string, password: string) => {
    console.log('Login attempt:', username, password);
    
    // Mock authentication - in real app, this would call the API
    if (username && password) {
      const isAdmin = username.toLowerCase().includes('admin');
      setUser({ username, isAdmin });
      setLocation('/');
      toast({
        title: "Welcome!",
        description: `Successfully logged in as ${username}`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (username: string, password: string, confirmPassword: string) => {
    console.log('Register attempt:', username, password, confirmPassword);
    
    // Mock registration validation
    if (!username || !password) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed", 
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Mock successful registration
    const isAdmin = username.toLowerCase().includes('admin');
    setUser({ username, isAdmin });
    setLocation('/');
    toast({
      title: "Account Created!",
      description: `Welcome to Sweet Shop, ${username}!`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setFavoriteItems([]);
    setLocation('/auth');
    toast({
      title: "Logged Out",
      description: "Come back soon!",
    });
  };

  // todo: remove mock functionality - Cart management handlers
  const handleAddToCart = (sweetId: string, quantity: number = 1) => {
    const sweet = sweets.find(s => s.id === sweetId);
    if (!sweet || sweet.quantity === 0) {
      toast({
        title: "Purchase Failed",
        description: "This item is out of stock",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cartItems.find(item => item.sweet.id === sweetId);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= sweet.quantity) {
        setCartItems(prev => 
          prev.map(item => 
            item.sweet.id === sweetId 
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        toast({
          title: "Updated Cart",
          description: `${sweet.name} quantity updated in cart`,
        });
      } else {
        toast({
          title: "Insufficient Stock",
          description: `Only ${sweet.quantity} items available`,
          variant: "destructive",
        });
      }
    } else {
      if (quantity <= sweet.quantity) {
        setCartItems(prev => [...prev, { sweet, quantity }]);
        toast({
          title: "Added to Cart",
          description: `${sweet.name} added to your cart`,
        });
      } else {
        toast({
          title: "Insufficient Stock",
          description: `Only ${sweet.quantity} items available`,
          variant: "destructive",
        });
      }
    }
  };

  const handleUpdateCartQuantity = (sweetId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(sweetId);
      return;
    }

    const sweet = sweets.find(s => s.id === sweetId);
    if (sweet && quantity <= sweet.quantity) {
      setCartItems(prev => 
        prev.map(item => 
          item.sweet.id === sweetId 
            ? { ...item, quantity }
            : item
        )
      );
    } else {
      toast({
        title: "Insufficient Stock",
        description: `Only ${sweet?.quantity || 0} items available`,
        variant: "destructive",
      });
    }
  };

  const handleRemoveFromCart = (sweetId: string) => {
    const item = cartItems.find(item => item.sweet.id === sweetId);
    setCartItems(prev => prev.filter(item => item.sweet.id !== sweetId));
    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.sweet.name} removed from cart`,
      });
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.sweet.price * item.quantity), 0);
    toast({
      title: "Checkout Successful!",
      description: `Order total: $${(total * 1.08).toFixed(2)} (including tax)`,
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Legacy purchase handler for compatibility
  const handlePurchase = (id: string) => {
    handleAddToCart(id, 1);
  };

  const handleViewDetails = (id: string) => {
    const sweet = sweets.find(s => s.id === id);
    if (sweet) {
      setSelectedSweet(sweet);
      setIsProductDetailOpen(true);
    }
  };

  const handleToggleFavorite = (id: string) => {
    const sweet = sweets.find(s => s.id === id);
    if (favoriteItems.includes(id)) {
      setFavoriteItems(prev => prev.filter(fav => fav !== id));
      toast({
        title: "Removed from Favorites",
        description: `${sweet?.name} removed from favorites`,
      });
    } else {
      setFavoriteItems(prev => [...prev, id]);
      toast({
        title: "Added to Favorites",
        description: `${sweet?.name} added to favorites`,
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search for:', query);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    toast({
      title: "Profile",
      description: "Profile management coming soon!",
    });
  };

  // todo: remove mock functionality - Admin handlers
  const handleAddSweet = (newSweet: Omit<Sweet, 'id'>) => {
    const id = Date.now().toString();
    const sweet = { ...newSweet, id };
    setSweets(prev => [...prev, sweet]);
    console.log('Added sweet:', sweet);
    toast({
      title: "Sweet Added",
      description: `${newSweet.name} has been added to the inventory`,
    });
  };

  const handleEditSweet = (id: string, updates: Partial<Sweet>) => {
    setSweets(prev => prev.map(sweet => 
      sweet.id === id ? { ...sweet, ...updates } : sweet
    ));
    console.log('Edited sweet:', id, updates);
    toast({
      title: "Sweet Updated",
      description: "Product details have been updated",
    });
  };

  const handleDeleteSweet = (id: string) => {
    const sweet = sweets.find(s => s.id === id);
    setSweets(prev => prev.filter(sweet => sweet.id !== id));
    // Remove from cart and favorites if deleted
    setCartItems(prev => prev.filter(item => item.sweet.id !== id));
    setFavoriteItems(prev => prev.filter(item => item !== id));
    console.log('Deleted sweet:', id);
    toast({
      title: "Sweet Deleted",
      description: `${sweet?.name} has been removed from inventory`,
    });
  };

  // Filter sweets based on search
  const filteredSweets = searchQuery 
    ? sweets.filter(sweet => 
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sweets;

  // Sidebar style configuration  
  const sidebarStyle = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "3.5rem",
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <main className="min-h-screen">
          <Switch>
            <Route path="/auth">
              <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
            </Route>
            <Route path="/">
              <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar
          user={user}
          cartItemCount={cartItems.length}
          favoriteItemCount={favoriteItems.length}
          onLogout={handleLogout}
          onCartClick={handleCartClick}
          onShowFavorites={handleShowFavorites}
        />
        
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-2 sm:p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2 sm:gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1 className="text-base sm:text-lg font-semibold hidden sm:block">Sweet Shop Management</h1>
              <h1 className="text-sm font-semibold sm:hidden">Sweet Shop</h1>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Header
                user={user}
                cartItemCount={cartItems.length}
                onSearch={handleSearch}
                onCartClick={handleCartClick}
                onProfileClick={handleProfileClick}
                onLogout={handleLogout}
                onToggleTheme={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
                isDarkMode={actualTheme === 'dark'}
              />
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            <Switch>
              <Route path="/admin">
                {user.isAdmin ? (
                  <AdminPage
                    sweets={sweets}
                    onAddSweet={handleAddSweet}
                    onEditSweet={handleEditSweet}
                    onDeleteSweet={handleDeleteSweet}
                  />
                ) : (
                  <div className="container mx-auto p-4 text-center py-16">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p className="text-muted-foreground">You need admin privileges to access this page.</p>
                  </div>
                )}
              </Route>

              <Route path="/">
                <DashboardPage
                  user={user}
                  sweets={filteredSweets}
                  cartItems={cartItems.map(item => item.sweet.id)}
                  favoriteItems={favoriteItems}
                  showFavorites={showFavorites}
                  onPurchase={handlePurchase}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleShowFavorites={handleShowFavorites}
                />
              </Route>

              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
        
        {/* Cart Modal */}
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onClearCart={handleClearCart}
        />
        
        {/* Product Detail Modal */}
        <ProductDetailModal
          sweet={selectedSweet}
          isOpen={isProductDetailOpen}
          onClose={() => {
            setIsProductDetailOpen(false);
            setSelectedSweet(null);
          }}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={selectedSweet ? favoriteItems.includes(selectedSweet.id) : false}
        />
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="sweet-shop-ui-theme">
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;