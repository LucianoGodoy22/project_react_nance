import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { CartModal } from './CartModal';

export const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="border-b border-border bg-card">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-heading font-semibold text-3xl text-foreground hover:text-muted-foreground transition-colors">
              Nancé
            </Link>
            
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/') ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/catalogo" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/catalogo') ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/contacto') ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Contacto
                </Link>
              </li>
            </ul>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="ml-2 hidden sm:inline">Carrito</span>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden pb-4">
            <ul className="flex justify-center space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/') ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/catalogo" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/catalogo') ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/contacto') ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
