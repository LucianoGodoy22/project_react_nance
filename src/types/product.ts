export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: 'vestidos' | 'camisas' | 'pantalones' | 'accesorios';
}

export interface CartItem extends Product {
  quantity: number;
}
