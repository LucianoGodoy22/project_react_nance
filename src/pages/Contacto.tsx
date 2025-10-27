import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Por favor, ingrese un email válido').max(255),
  telefono: z.string().regex(/^[0-9]{9}$/, 'El teléfono debe tener 9 dígitos'),
  asunto: z.string().min(1, 'Por favor, seleccione un asunto'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contacto = () => {
  const [formData, setFormData] = useState<ContactForm>({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  const handleChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      toast.success('Mensaje enviado correctamente');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactForm, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactForm] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Por favor, corrige los errores en el formulario');
      }
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12">
          Contacto
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <section>
              <h2 className="font-heading text-3xl font-semibold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      className={errors.nombre ? 'border-destructive' : ''}
                    />
                    {errors.nombre && (
                      <p className="text-sm text-destructive mt-1">{errors.nombre}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="telefono">Teléfono (9 dígitos)</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      placeholder="912345678"
                      value={formData.telefono}
                      onChange={(e) => handleChange('telefono', e.target.value)}
                      className={errors.telefono ? 'border-destructive' : ''}
                    />
                    {errors.telefono && (
                      <p className="text-sm text-destructive mt-1">{errors.telefono}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="asunto">Asunto</Label>
                    <Select
                      value={formData.asunto}
                      onValueChange={(value) => handleChange('asunto', value)}
                    >
                      <SelectTrigger className={errors.asunto ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Seleccione un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta general</SelectItem>
                        <SelectItem value="pedido">Sobre mi pedido</SelectItem>
                        <SelectItem value="producto">Información de producto</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.asunto && (
                      <p className="text-sm text-destructive mt-1">{errors.asunto}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => handleChange('mensaje', e.target.value)}
                    className={errors.mensaje ? 'border-destructive' : ''}
                  />
                  {errors.mensaje && (
                    <p className="text-sm text-destructive mt-1">{errors.mensaje}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Enviar mensaje
                </Button>
              </form>
            </section>
          </div>

          <div>
            <section>
              <h2 className="font-heading text-3xl font-semibold mb-6">Información de contacto</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Dirección</h3>
                  <p className="text-muted-foreground">
                    Av. Principal 123<br />
                    Santiago, Chile
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Teléfono</h3>
                  <p className="text-muted-foreground">+56 9 1234 5678</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">contacto@nance.cl</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Horario de atención</h3>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábado: 10:00 - 14:00
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="font-heading text-3xl font-semibold mb-6">Preguntas frecuentes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">¿Cuál es el tiempo de entrega?</h3>
                  <p className="text-muted-foreground text-sm">
                    El tiempo de entrega es de 3-5 días hábiles en la Región Metropolitana.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">¿Tienen cambios y devoluciones?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sí, aceptamos cambios y devoluciones dentro de los primeros 30 días.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
