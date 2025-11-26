import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { CartModal } from './CartModal'; 

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-heading font-semibold text-3xl text-foreground hover:text-blue-600 transition-colors">
              Nancé
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8">
              <li><Link to="/" className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/') ? 'text-blue-600' : 'text-muted-foreground'}`}>Inicio</Link></li>
              <li><Link to="/catalogo" className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/catalogo') ? 'text-blue-600' : 'text-muted-foreground'}`}>Catálogo</Link></li>
              <li><Link to="/contacto" className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/contacto') ? 'text-blue-600' : 'text-muted-foreground'}`}>Contacto</Link></li>
              {isAdmin && (
                <li>
                  <Link to="/admin" className={`text-sm font-medium transition-colors hover:text-blue-600 flex items-center ${isActive('/admin') ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    <ShieldCheck className="h-4 w-4 inline mr-1" />
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="ml-2 hidden sm:inline">Carrito</span>
              </Button>

              {/* Auth Buttons */}
              {user ? (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Salir</span>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  <LogIn className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Ingresar</span>
                </Button>
              )}
              
              {/* Mobile Toggle Button */}
               <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          {isMobileMenuOpen && (
             <div className="md:hidden pb-4 border-t pt-4">
              <ul className="flex flex-col space-y-2">
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm font-medium hover:text-blue-600">Inicio</Link></li>
                <li><Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm font-medium hover:text-blue-600">Catálogo</Link></li>
                <li><Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm font-medium hover:text-blue-600">Contacto</Link></li>
                {isAdmin && <li><Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm font-medium hover:text-blue-600">Admin</Link></li>}
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Cart Modal is rendered here */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};