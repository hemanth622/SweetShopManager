import SweetCard from '../SweetCard';
import gummyBearsImage from '@assets/generated_images/Colorful_gummy_bears_jar_58f2544b.png';

export default function SweetCardExample() {
  return (
    <div className="max-w-sm">
      <SweetCard
        id="1"
        name="Rainbow Gummy Bears"
        price={8.99}
        image={gummyBearsImage}
        category="Gummies"
        quantity={15}
        rating={4.8}
        description="Delicious assorted fruit-flavored gummy bears in a convenient jar"
        onPurchase={(id) => console.log('Purchase triggered for:', id)}
        onViewDetails={(id) => console.log('View details for:', id)}
      />
    </div>
  );
}