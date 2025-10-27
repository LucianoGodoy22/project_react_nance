import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h5 className="font-heading text-xl font-semibold mb-4">Nancé</h5>
            <p className="mb-2">Own your luxury. Be Nancé.</p>
            <p className="mb-2">Teléfono: +56 9 1234 5678</p>
            <p>Email: contacto@nance.cl</p>
          </div>
          <div>
            <h5 className="font-heading text-xl font-semibold mb-4">Enlaces</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-secondary-foreground/20" />
        <div className="text-center">
          <p>&copy; 2025 Nancé. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
