import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Eye
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

interface AdminPanelProps {
  sweets: Sweet[];
  onAddSweet: (sweet: Omit<Sweet, 'id'>) => void;
  onEditSweet: (id: string, sweet: Partial<Sweet>) => void;
  onDeleteSweet: (id: string) => void;
}

export default function AdminPanel({ sweets, onAddSweet, onEditSweet, onDeleteSweet }: AdminPanelProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [newSweet, setNewSweet] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    quantity: 0,
    description: ""
  });

  const categories = ["Gummies", "Chocolate", "Hard Candy", "Jelly Beans", "Fudge", "Marshmallows"];
  
  const totalProducts = sweets.length;
  const totalValue = sweets.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
  const outOfStock = sweets.filter(sweet => sweet.quantity === 0).length;
  const lowStock = sweets.filter(sweet => sweet.quantity > 0 && sweet.quantity <= 5).length;

  const handleAddSweet = () => {
    onAddSweet(newSweet);
    setNewSweet({ name: "", price: 0, image: "", category: "", quantity: 0, description: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditSweet = () => {
    if (editingSweet) {
      onEditSweet(editingSweet.id, editingSweet);
      setEditingSweet(null);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" data-testid="text-admin-title">Admin Panel</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-add-sweet">
              <Plus className="w-4 h-4" />
              Add Sweet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Sweet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSweet.name}
                  onChange={(e) => setNewSweet(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Sweet name"
                  data-testid="input-add-name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newSweet.price}
                    onChange={(e) => setNewSweet(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    data-testid="input-add-price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newSweet.quantity}
                    onChange={(e) => setNewSweet(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    data-testid="input-add-quantity"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newSweet.category} onValueChange={(value) => setNewSweet(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger data-testid="select-add-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newSweet.image}
                  onChange={(e) => setNewSweet(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                  data-testid="input-add-image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSweet.description}
                  onChange={(e) => setNewSweet(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Product description..."
                  data-testid="textarea-add-description"
                />
              </div>

              <Button onClick={handleAddSweet} className="w-full" data-testid="button-save-sweet">
                Add Sweet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList data-testid="tabs-admin">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold" data-testid="stat-total-products">{totalProducts}</p>
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                    <p className="text-2xl font-bold" data-testid="stat-inventory-value">${totalValue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                    <p className="text-2xl font-bold text-destructive" data-testid="stat-out-of-stock">{outOfStock}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600" data-testid="stat-low-stock">{lowStock}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sweets.slice(0, 5).map((sweet) => (
                  <div key={sweet.id} className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      {sweet.image ? (
                        <img src={sweet.image} alt={sweet.name} className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <Package className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{sweet.name}</h4>
                      <p className="text-sm text-muted-foreground">{sweet.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${sweet.price.toFixed(2)}</p>
                      <Badge variant={sweet.quantity === 0 ? "destructive" : sweet.quantity <= 5 ? "secondary" : "default"}>
                        {sweet.quantity} in stock
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sweets.map((sweet) => (
                    <TableRow key={sweet.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                            {sweet.image ? (
                              <img src={sweet.image} alt={sweet.name} className="w-full h-full object-cover rounded-md" />
                            ) : (
                              <Package className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <span className="font-medium">{sweet.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{sweet.category}</TableCell>
                      <TableCell>${sweet.price.toFixed(2)}</TableCell>
                      <TableCell>{sweet.quantity}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={sweet.quantity === 0 ? "destructive" : sweet.quantity <= 5 ? "secondary" : "default"}
                          data-testid={`status-${sweet.id}`}
                        >
                          {sweet.quantity === 0 ? "Out of Stock" : sweet.quantity <= 5 ? "Low Stock" : "In Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" data-testid={`button-view-${sweet.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => setEditingSweet(sweet)}
                            data-testid={`button-edit-${sweet.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => onDeleteSweet(sweet.id)}
                            data-testid={`button-delete-${sweet.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and reporting features will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!editingSweet} onOpenChange={() => setEditingSweet(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Sweet</DialogTitle>
          </DialogHeader>
          {editingSweet && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingSweet.name}
                  onChange={(e) => setEditingSweet(prev => prev ? { ...prev, name: e.target.value } : null)}
                  data-testid="input-edit-name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editingSweet.price}
                    onChange={(e) => setEditingSweet(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                    data-testid="input-edit-price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={editingSweet.quantity}
                    onChange={(e) => setEditingSweet(prev => prev ? { ...prev, quantity: parseInt(e.target.value) || 0 } : null)}
                    data-testid="input-edit-quantity"
                  />
                </div>
              </div>

              <Button onClick={handleEditSweet} className="w-full" data-testid="button-save-edit">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}