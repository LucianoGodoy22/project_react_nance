import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  return (
    <Card className="h-full flex flex-col product-card">
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover object-center rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <h5 className="font-heading text-xl font-semibold mb-2">{product.name}</h5>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
        <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
        <p className="text-sm text-muted-foreground">Stock: {product.stock} unidades</p>
        <Button 
          onClick={() => addToCart(product)}
          className="w-full"
        >
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};
