import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Inicio = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                Own your luxury. Be Nancé.
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Descubre nuestra cuidada selección de ropa y accesorios que combinan alta calidad, diseños innovadores y precios accesibles.
              </p>
              <Link to="/catalogo">
                <Button size="lg" className="text-base px-8">
                  Ver catálogo
                </Button>
              </Link>
            </div>
            <div>
              <img
                src="https://th.bing.com/th/id/R.42c8b3c7343caef3151c5b47887d6c57?rik=jQ4%2fPTXUSkDSuQ&pid=ImgRaw&r=0"
                alt="Moda Nancé"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="text-center">
              <div className="bg-muted rounded-lg p-8 mb-4">
                <h3 className="font-heading text-2xl font-semibold mb-3">Calidad Premium</h3>
                <p className="text-muted-foreground">
                  Materiales seleccionados cuidadosamente para garantizar durabilidad y confort.
                </p>
              </div>
            </article>
            <article className="text-center">
              <div className="bg-muted rounded-lg p-8 mb-4">
                <h3 className="font-heading text-2xl font-semibold mb-3">Diseños Únicos</h3>
                <p className="text-muted-foreground">
                  Piezas exclusivas que reflejan las últimas tendencias en moda sostenible.
                </p>
              </div>
            </article>
            <article className="text-center">
              <div className="bg-muted rounded-lg p-8 mb-4">
                <h3 className="font-heading text-2xl font-semibold mb-3">Precios Justos</h3>
                <p className="text-muted-foreground">
                  Lujo accesible sin comprometer la calidad ni el estilo.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Sostenibilidad</h3>
              <p className="text-muted-foreground">
                Comprometidos con prácticas responsables y materiales eco-friendly.
              </p>
            </article>
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Inclusividad</h3>
              <p className="text-muted-foreground">
                Moda para todos, sin importar tallas, estilos o presupuestos.
              </p>
            </article>
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Innovación</h3>
              <p className="text-muted-foreground">
                Siempre buscando nuevas formas de mejorar y sorprender.
              </p>
            </article>
            <article>
              <h3 className="font-heading text-2xl font-semibold mb-3">Transparencia</h3>
              <p className="text-muted-foreground">
                Honestidad en cada paso, desde el diseño hasta la entrega.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
