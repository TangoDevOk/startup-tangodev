'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Send, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPlan?: 'landing' | 'ecommerce' | 'saas' | null;
}

export default function ContactModal({ isOpen, onClose, preSelectedPlan = null }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset states
      setIsSuccess(false);
      setIsSubmitting(false);

      // Animación de apertura
      const tl = gsap.timeline();
      
      // Overlay fade in
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Modal slide in from right
      tl.fromTo(modalRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: "power3.out" },
        "-=0.1"
      );
      
      // Content fade in
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
    } else if (overlayRef.current && modalRef.current) {
      // Animación de cierre
      const tl = gsap.timeline();
      
      tl.to(modalRef.current, {
        x: '100%',
        duration: 0.4,
        ease: "power3.in"
      });
      
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.2");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Obtener datos del formulario
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || undefined,
        'project-type': formData.get('project-type') as string,
        budget: formData.get('budget') as string || undefined,
        message: formData.get('message') as string,
      };

      // Enviar a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto-cerrar después de 3 segundos
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setIsSubmitting(false);
      alert(error instanceof Error ? error.message : 'Error al enviar el mensaje. Por favor, intentá nuevamente o escribinos directamente a tangodev08@gmail.com');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal panel - 1/3 de pantalla */}
      <div
        ref={modalRef}
        className="absolute top-0 right-0 h-full w-full lg:w-[40%] bg-stone-900 shadow-2xl overflow-hidden"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Contenido */}
        <div
          ref={contentRef}
          className="relative h-full overflow-y-auto p-8 lg:p-12"
        >
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="text-stone-400 text-sm font-pp-neue font-medium tracking-[0.2em] uppercase mb-4">
                  CONTACTO RÁPIDO
                </div>
                <h2 className="text-4xl lg:text-5xl font-medium text-white font-pp-neue leading-tight mb-6">
                  Iniciemos tu proyecto
                </h2>
                <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                  Contanos sobre tu idea y nos pondremos en contacto dentro de las próximas 24 horas.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue"
                    placeholder="Juan Pérez"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue"
                    placeholder="juan@empresa.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue"
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                {/* Tipo de proyecto */}
                <div>
                  <label htmlFor="project-type" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    Tipo de proyecto *
                  </label>
                  <select
                    id="project-type"
                    name="project-type"
                    required
                    defaultValue={preSelectedPlan || ''}
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue appearance-none cursor-pointer hover:bg-black/40"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8a29e' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="" className="bg-stone-900 text-stone-200">Seleccioná una opción</option>
                    <option value="landing" className="bg-stone-900 text-stone-200">Landing Page</option>
                    <option value="website" className="bg-stone-900 text-stone-200">Sitio Web Corporativo</option>
                    <option value="ecommerce" className="bg-stone-900 text-stone-200">E-commerce</option>
                    <option value="webapp" className="bg-stone-900 text-stone-200">Aplicación Web</option>
                    <option value="saas" className="bg-stone-900 text-stone-200">SaaS / Plataforma</option>
                    <option value="other" className="bg-stone-900 text-stone-200">Otro</option>
                  </select>
                </div>

                {/* Presupuesto estimado */}
                <div>
                  <label htmlFor="budget" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    Presupuesto estimado (opcional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue appearance-none cursor-pointer hover:bg-black/40"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8a29e' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '12px'
                    }}
                  >
                  <option value="" className="bg-stone-900 text-stone-200">Seleccioná un rango</option>
                  <option value="250-1000" className="bg-stone-900 text-stone-200">
                    $250 - $1.000 USD (Landing / web simple)
                  </option>
                  <option value="700-2500" className="bg-stone-900 text-stone-200">
                    $700 - $2.500 USD (Sitios y e-commerce)
                  </option>
                  <option value="2500-6000" className="bg-stone-900 text-stone-200">
                    $2.500+ USD (Apps web / SaaS)
                  </option>
                  <option value="no-idea" className="bg-stone-900 text-stone-200">No estoy seguro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    Contanos sobre tu proyecto *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue resize-none"
                    placeholder="Describe brevemente tu proyecto, objetivos y timeline..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base font-pp-neue flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar solicitud
                    </>
                  )}
                </button>

                {/* Info adicional */}
                <p className="text-stone-400 text-sm font-pp-neue text-center">
                  También podés escribirnos directamente a{' '}
                  <a href="mailto:tangodev08@gmail.com" className="text-[#d9ff00] hover:text-[#d9ff00]/80 transition-colors">
                    tangodev08@gmail.com
                  </a>
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-medium text-white font-pp-neue mb-4">
                ¡Mensaje enviado!
              </h3>
              <p className="text-stone-300 text-lg font-pp-neue max-w-md">
                Recibimos tu solicitud. Nos pondremos en contacto muy pronto.
              </p>
              <div className="mt-8">
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-white transition-colors font-pp-neue"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





