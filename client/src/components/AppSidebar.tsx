import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Package,
  ShoppingCart,
  Heart,
  Settings,
  User,
  Candy,
  BarChart3,
  Users,
  LogOut
} from "lucide-react";

interface AppSidebarProps {
  user: {
    username: string;
    isAdmin: boolean;
  };
  cartItemCount: number;
  favoriteItemCount: number;
  onLogout: () => void;
  onCartClick?: () => void;
  onShowFavorites?: () => void;
}

export function AppSidebar({ user, cartItemCount, favoriteItemCount, onLogout, onCartClick, onShowFavorites }: AppSidebarProps) {
  const [location] = useLocation();

  const customerItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      badge: null,
      action: null,
    },
    {
      title: "Shopping Cart",
      url: null,
      icon: ShoppingCart,
      badge: cartItemCount > 0 ? cartItemCount : null,
      action: onCartClick,
    },
    {
      title: "Favorites",
      url: null,
      icon: Heart,
      badge: favoriteItemCount > 0 ? favoriteItemCount : null,
      action: onShowFavorites,
    },
  ];

  const adminItems = [
    {
      title: "Admin Dashboard",
      url: "/admin",
      icon: BarChart3,
      badge: null,
      action: null,
    },
  ];

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Candy className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-sidebar-foreground">Sweet Shop</h2>
            <p className="text-xs text-sidebar-foreground/60">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Customer Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.url ? (
                    <SidebarMenuButton 
                      asChild 
                      isActive={location === item.url}
                      data-testid={`sidebar-${item.title.toLowerCase().replace(' ', '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton 
                      onClick={item.action}
                      data-testid={`sidebar-${item.title.toLowerCase().replace(' ', '-')}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation - Only show if user is admin */}
        {user.isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location === item.url}
                      data-testid={`sidebar-${item.title.toLowerCase().replace(' ', '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={onLogout}
                  data-testid="sidebar-logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" data-testid="text-sidebar-username">
                  {user.username}
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  {user.isAdmin ? "Administrator" : "Customer"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="w-8 h-8"
                data-testid="button-sidebar-logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}