import AdminPanel from "@/components/AdminPanel";

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

interface AdminPageProps {
  sweets: Sweet[];
  onAddSweet: (sweet: Omit<Sweet, 'id'>) => void;
  onEditSweet: (id: string, sweet: Partial<Sweet>) => void;
  onDeleteSweet: (id: string) => void;
}

export default function AdminPage(props: AdminPageProps) {
  return <AdminPanel {...props} />;
}