import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img
          src={product.image_url} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=No+Image';
          }}
        />
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
          </div>
          <span className="font-bold text-lg">
            ${product.price.toLocaleString('es-CL')}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => addItem(product)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};