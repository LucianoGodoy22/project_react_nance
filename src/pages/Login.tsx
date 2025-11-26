// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { login, register } = useAuth(); 
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive',
      });
      return;
    }

    if (isRegistering) {
      if (!name) {
        toast({ title: 'Error', description: 'Por favor ingresa tu nombre', variant: 'destructive' });
        return;
      }

      const success = await register(email, password, name);
      
      if (success) {
        toast({ title: 'Cuenta creada', description: 'Tu cuenta ha sido creada exitosamente. Iniciando sesión...' });
        const loginSuccess = await login(email, password);
        if(loginSuccess) navigate(from, { replace: true });
      } else {
        toast({ title: 'Error', description: 'No se pudo crear la cuenta. Intenta con otro correo.', variant: 'destructive' });
      }

    } else {
      const success = await login(email, password);

      if (success) {
        toast({ title: 'Bienvenido', description: 'Has iniciado sesión correctamente en Nancé' });
        navigate(from, { replace: true });
      } else {
        toast({ title: 'Error', description: 'Credenciales inválidas o error de conexión', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-heading text-3xl">
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </CardTitle>
          <CardDescription>
            {isRegistering
              ? 'Únete a Nancé para gestionar tus pedidos'
              : 'Ingresa tus credenciales para continuar'}
          </CardDescription>
          <p className="text-xs text-muted-foreground mt-2">
            Admin: admin@nance.com
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegistering}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              {isRegistering ? 'Registrarse' : 'Ingresar'}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setName(''); 
              }}
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate aquí'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}