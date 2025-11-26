import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import api from '@/api/axios'; 

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return products;
};