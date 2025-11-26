import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'VE001',
    name: 'Vestido softcore',
    description: 'Un vestido midi elegante y fresco, confeccionado en lino de alta calidad.',
    price: 49990,
    stock: 50,
    image_url: 'https://i.pinimg.com/1200x/14/cb/01/14cb0193f164b4d556fc480fe8de017b.jpg',
    category: 'vestidos',
  },
  {
    id: 'CB001',
    name: 'Camisa de Algodón Orgánico',
    description: 'La camisa blanca clásica, reinventada con algodón 100% orgánico.',
    price: 34990,
    stock: 80,
    image_url: 'https://i.pinimg.com/1200x/a0/53/7c/a0537c82c0ce679a0624a6aabbe1c94e.jpg',
    category: 'camisas',
  },
  {
    id: 'PA001',
    name: 'Pantalones rosados',
    description: 'Diseñados para alargar la silueta y ofrecer un movimiento fluido.',
    price: 42990,
    stock: 60,
    image_url: 'https://i.pinimg.com/736x/29/b9/7c/29b97c2e198ae7706261229494b2c5bc.jpg',
    category: 'pantalones',
  },
  {
    id: 'AC001',
    name: 'Bolso de Cuero Vegano',
    description: 'Un bolso versátil y chic, fabricado con cuero vegano de alta calidad.',
    price: 39990,
    stock: 40,
    image_url: 'https://i.pinimg.com/1200x/2f/d4/70/2fd470b6a3836646cb243964a31d0d2b.jpg',
    category: 'accesorios',
  },
];
