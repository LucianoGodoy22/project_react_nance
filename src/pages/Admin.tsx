import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import api from '@/api/axios'; // <--- Importamos Axios configurado

export default function Admin() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cargar productos desde el Backend
  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error cargando productos", error);
      toast({ title: 'Error', description: 'No se pudo cargar el catálogo', variant: 'destructive' });
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadProducts();
  }, [isAdmin, navigate]);

  // Eliminar producto (Backend)
  const handleDelete = async (id: string | number) => { // ID puede ser number en DB
    if(!confirm("¿Estás seguro de eliminar este producto?")) return;
    
    try {
      await api.delete(`/products/${id}`);
      toast({ title: 'Producto eliminado', description: 'El producto ha sido eliminado correctamente' });
      loadProducts(); // Recargar lista
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo eliminar el producto', variant: 'destructive' });
    }
  };

  // Guardar o Editar (Backend)
  const handleSave = async (product: Product) => {
    try {
      // Ajuste: El backend espera 'imageUrl', pero el frontend usa 'image'. 
      // Si tu backend Product.java usa 'imageUrl', asegúrate de mapearlo o cambiar el backend.
      // Asumiremos que el backend acepta el JSON tal cual se envía.
      
      if (editingProduct && product.id) {
        // Actualizar (PUT)
        await api.put(`/products/${product.id}`, product);
        toast({ title: 'Producto actualizado' });
      } else {
        // Crear (POST) - Eliminamos el ID temporal si existe, el backend lo genera
        const { id, ...newProduct } = product; 
        await api.post('/products', newProduct);
        toast({ title: 'Producto creado' });
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
      loadProducts(); // Recargar lista
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Error al guardar el producto', variant: 'destructive' });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl">Panel de Administración</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingProduct(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Nota: Asegúrate que product.image o product.imageUrl coincida con tu backend */}
                <img
                  src={product.image_url || product.image_url} 
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-heading text-xl mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span>ID: {product.id}</span>
                    <span>Categoría: {product.category}</span>
                    <span>Stock: {product.stock}</span>
                    <span className="font-semibold">
                      ${product.price.toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingProduct(product);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ... El componente ProductForm se mantiene igual, 
// solo asegúrate de que al crear un nuevo producto no envíes un ID falso al backend 
// si tu backend usa @GeneratedValue.
interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  // Inicializamos el formulario.
  const [formData, setFormData] = useState<Product>(
    product || {
      // id: '', 
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image_url: '', 
      category: 'vestidos' as const,
    } as Product
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: (name === 'price' || name === 'stock') 
        ? (value === '' ? 0 : parseFloat(value)) 
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      
       <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value as any })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vestidos">Vestidos</SelectItem>
            <SelectItem value="camisas">Camisas</SelectItem>
            <SelectItem value="pantalones">Pantalones</SelectItem>
            <SelectItem value="accesorios">Accesorios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            value={formData.price || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input 
            id="stock" 
            name="stock" 
            type="number" 
            value={formData.stock || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL de la imagen</Label>
        {}
        <Input 
            id="image" 
            name="image_url" 
            type="url" 
            value={formData.image_url} 
            onChange={handleChange} 
            required 
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}