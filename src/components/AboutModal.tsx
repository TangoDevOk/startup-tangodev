'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const t = useTranslations('about');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Crear contexto GSAP para este componente
    const ctx = gsap.context(() => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal panel - 1/3 de pantalla */}
      <div
        ref={modalRef}
        className="absolute top-0 right-0 h-full w-full lg:w-1/3 bg-stone-900 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header con Logo y botón cerrar */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          {/* Logo */}
          <Link href="/" className="transition-all duration-500 hover:opacity-80">
            <Image 
              src="/imgs/logoblanco.png" 
              alt="Tangodev" 
              width={172} 
              height={48}
              className="h-11 w-auto"
              priority
            />
          </Link>
          
          {/* Botón cerrar - estilo hamburguesa */}
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
          className="relative flex-1 min-h-0 overflow-y-auto p-8 lg:p-12"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="text-stone-500 text-sm font-pp-neue tracking-wider uppercase mb-4">
              {t('title')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium text-white font-pp-neue leading-tight mb-6">
              {t('subtitle')}
            </h2>
          </div>

          {/* Descripción principal */}
          <div className="space-y-6 mb-12">
            <p className="text-stone-300 text-lg lg:text-xl leading-relaxed font-pp-neue">
              {t('description')}
            </p>
            <p className="text-stone-400 text-base lg:text-lg leading-relaxed font-pp-neue">
              {t('description2')}
            </p>
          </div>

          {/* Enfoque de trabajo */}
          <div className="space-y-6 mb-12">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-white text-xl font-medium font-pp-neue mb-3">
                {t('workTitle')}
              </h3>
              <p className="text-stone-300 text-base leading-relaxed font-pp-neue">
                {t('workDescription')}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-white text-xl font-medium font-pp-neue mb-3">
                {t('expectTitle')}
              </h3>
              <p className="text-stone-400 text-base leading-relaxed font-pp-neue">
                {t('expectDescription')}
              </p>
            </div>
          </div>

          {/* Team info */}
          <div className="space-y-4 border-t border-stone-800 pt-8">
            <h3 className="text-xl font-medium text-white font-pp-neue mb-4">
              {t('teamTitle')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Image 
                  src="/imgs/nicolas.png" 
                  alt="Nicolás Siciliano" 
                  width={40} 
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <a 
                    href="https://www.linkedin.com/in/nicosici/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-medium font-pp-neue hover:text-[#d9ff00] transition-colors duration-300 cursor-pointer"
                  >
                    Nicolás Siciliano
                  </a>
                  <div className="text-stone-400 text-sm font-pp-neue">Full Stack Developer</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Image 
                  src="/imgs/keke.JPG" 
                  alt="Tomás Martorelli" 
                  width={40} 
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <a 
                    href="https://portfolio-tomas-martorelli.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-medium font-pp-neue hover:text-[#d9ff00] transition-colors duration-300 cursor-pointer"
                  >
                    Tomás Martorelli
                  </a>
                  <div className="text-stone-400 text-sm font-pp-neue">Designer / Full Stack</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


