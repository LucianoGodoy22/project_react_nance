import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts'; 

const Catalogo = () => {
  const products = useProducts(); 

  return (
    <div className="min-h-screen">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12">
            Nuestro catálogo
          </h1>
          
          {}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Cargando productos...</p>
              <p className="text-sm text-gray-400 mt-2">(Si tarda mucho, verifica que el Backend esté encendido)</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Vestidos</h3>
              <p className="text-muted-foreground">
                Descubre nuestra colección de vestidos, diseñados para cada ocasión. Desde elegantes vestidos midi de lino hasta frescos vestidos florales de verano.
              </p>
            </article>
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Camisas y blusas</h3>
              <p className="text-muted-foreground">
                Eleva tu estilo con nuestra selección de camisas y blusas. Encuentra desde la clásica camisa de algodón orgánico hasta sofisticadas blusas de seda.
              </p>
            </article>
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Pantalones</h3>
              <p className="text-muted-foreground">
                Encuentra el ajuste perfecto en nuestra gama de pantalones. Desde modernos pantalones palazzo hasta atemporales jeans skinny.
              </p>
            </article>
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Accesorios</h3>
              <p className="text-muted-foreground">
                El toque final para tu look está en nuestros accesorios. Descubre piezas únicas como bolsos de cuero vegano y elegantes pañuelos de seda.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalogo;