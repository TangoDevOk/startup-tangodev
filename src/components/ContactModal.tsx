'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Send, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPlan?: 'landing' | 'ecommerce' | 'saas' | null;
}

export default function ContactModal({ isOpen, onClose, preSelectedPlan = null }: ContactModalProps) {
  const t = useTranslations('contact');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Crear contexto GSAP para este componente
    const ctx = gsap.context(() => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        
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
      } else {
        // Restaurar scroll del body inmediatamente
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Animación de cierre (solo si hay refs)
        if (overlayRef.current && modalRef.current) {
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
      }
    });
    
    // Cleanup cuando el componente se desmonta o cambia isOpen
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      ctx.revert(); // Limpia todas las animaciones GSAP
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar con EmailJS
      const result = await emailjs.sendForm(
        'service_jy30k4w', // Service ID
        'template_ep9zoqc', // Template ID
        e.currentTarget,
        'qh9gEflQcEoNQntav' // Public Key
      );

      console.log('Email enviado:', result.text);
      
      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto-cerrar después de 3 segundos
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setIsSubmitting(false);
      alert(t('form.error'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal panel */}
      <div
        ref={modalRef}
        className="absolute top-0 right-0 h-full w-full lg:w-[40%] bg-stone-900 shadow-2xl overflow-hidden"
      >
        {/* Header con Logo y botón cerrar */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-white/10">
          {/* Logo */}
          <Link href="/" className="transition-all duration-500 hover:opacity-80 -ml-2">
            <Image 
              src="/imgs/logoblanco.png" 
              alt="Tangodev" 
              width={200} 
              height={150}
              className="h-32 w-auto"
              priority
            />
          </Link>
          
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            <span className="text-white text-base font-bold leading-none flex items-center justify-center rotate-45 transition-transform duration-300 group-hover:rotate-90">+</span>
          </button>
        </div>

        {/* Contenido */}
        <div
          ref={contentRef}
          className="relative overflow-y-auto p-8 lg:p-12"
          style={{ height: 'calc(100% - 148px)' }}
        >
          {!isSuccess ? (
            <>
              {/* Hidden from_email field for EmailJS */}
              <input type="hidden" name="from_email" value="tangodev08@gmail.com" />
              
              {/* Header */}
              <div className="mb-8">
                <div className="text-stone-400 text-sm font-pp-neue font-medium tracking-[0.2em] uppercase mb-4">
                  {t('quick')}
                </div>
                <h2 className="text-4xl lg:text-5xl font-medium text-white font-pp-neue leading-tight mb-6">
                  {t('title')}
                </h2>
                <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                  {t('subtitle')}
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue"
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue"
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue"
                    placeholder={t('form.phonePlaceholder')}
                  />
                </div>

                {/* Tipo de proyecto */}
                <div>
                  <label htmlFor="project-type" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    {t('form.projectType')}
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
                    <option value="" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.placeholder')}</option>
                    <option value="landing" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.landing')}</option>
                    <option value="website" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.website')}</option>
                    <option value="ecommerce" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.ecommerce')}</option>
                    <option value="webapp" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.webapp')}</option>
                    <option value="saas" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.saas')}</option>
                    <option value="other" className="bg-stone-900 text-stone-200">{t('form.projectTypeOptions.other')}</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-stone-400 text-sm font-medium font-pp-neue mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-stone-700 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#d9ff00] transition-colors font-pp-neue resize-none"
                    placeholder={t('form.messagePlaceholder')}
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
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>

                {/* Info adicional */}
                <p className="text-stone-400 text-sm font-pp-neue text-center">
                  {t('form.emailAlternative')}{' '}
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
                {t('form.successTitle')}
              </h3>
              <p className="text-stone-300 text-lg font-pp-neue max-w-md">
                {t('form.successMessage')}
              </p>
              <div className="mt-8">
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-white transition-colors font-pp-neue"
                >
                  {t('form.close')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





