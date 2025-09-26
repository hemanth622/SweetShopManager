import SweetGrid from '../SweetGrid';
import gummyBearsImage from '@assets/generated_images/Colorful_gummy_bears_jar_58f2544b.png';
import chocolateImage from '@assets/generated_images/Chocolate_truffles_arrangement_590e3205.png';
import lollipopsImage from '@assets/generated_images/Colorful_spiral_lollipops_67c94b38.png';
import jellyBeansImage from '@assets/generated_images/Gourmet_jelly_beans_container_9cc6917c.png';

const mockSweets = [
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
  }
];

export default function SweetGridExample() {
  return (
    <SweetGrid
      sweets={mockSweets}
      onPurchase={(id) => console.log('Purchase:', id)}
      onViewDetails={(id) => console.log('View details:', id)}
      isLoading={false}
    />
  );
}