export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}