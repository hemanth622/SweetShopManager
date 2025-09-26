import Dashboard from "@/components/Dashboard";

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

interface DashboardPageProps {
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
}

export default function DashboardPage(props: DashboardPageProps) {
  return <Dashboard {...props} />;
}