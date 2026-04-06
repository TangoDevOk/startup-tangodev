'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    
    // Cleanup cuando el componente se desmonta
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal panel - 1/3 de pantalla */}
      <div
        ref={modalRef}
        className="absolute top-0 right-0 h-full w-full lg:w-1/3 bg-stone-900 shadow-2xl overflow-hidden"
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
          className="relative overflow-y-auto p-8 lg:p-12"
          style={{ height: 'calc(100% - 148px)' }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="text-stone-500 text-sm font-pp-neue tracking-wider uppercase mb-4">
              Sobre Nosotros
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium text-white font-pp-neue leading-tight mb-6">
              Construimos experiencias digitales que perduran
            </h2>
          </div>

          {/* Descripción principal */}
          <div className="space-y-6 mb-12">
            <p className="text-stone-300 text-lg lg:text-xl leading-relaxed font-pp-neue">
              TangoDev nace de la pasión por crear soluciones web que realmente impactan. 
              Somos un equipo de desarrolladores con experiencia en tecnologías modernas 
              y metodologías ágiles.
            </p>
            <p className="text-stone-400 text-base lg:text-lg leading-relaxed font-pp-neue">
              Combinamos diseño minimalista con código limpio para entregar productos 
              digitales escalables, desde landing pages hasta aplicaciones web complejas.
            </p>
          </div>

          {/* Stats o highlights */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white font-pp-neue">
                2+
              </div>
              <div className="text-stone-400 text-sm font-pp-neue">
                Años de experiencia
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white font-pp-neue">
                10+
              </div>
              <div className="text-stone-400 text-sm font-pp-neue">
                Proyectos completados
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white font-pp-neue">
                100%
              </div>
              <div className="text-stone-400 text-sm font-pp-neue">
                Clientes satisfechos
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-white font-pp-neue">
                24/7
              </div>
              <div className="text-stone-400 text-sm font-pp-neue">
                Soporte técnico
              </div>
            </div>
          </div>

          {/* Detalle visual - Stack de tecnologías */}
          <div className="relative h-48 mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Stack de "cartas" con tecnologías - efecto similar a los premios rojos */}
              <div className="relative w-full h-full perspective-1000">
                {['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'].map((tech, index) => (
                  <div
                    key={tech}
                    className="absolute left-1/2 top-1/2 w-32 h-20 lg:w-40 lg:h-24 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg flex items-center justify-center"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${index * 8 - 16}deg) translateY(${index * 8}px)`,
                      zIndex: 5 - index,
                    }}
                  >
                    <span className="text-white font-bold text-sm lg:text-base font-pp-neue">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team info */}
          <div className="space-y-4 border-t border-stone-800 pt-8">
            <h3 className="text-xl font-medium text-white font-pp-neue mb-4">
              El Equipo
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex-shrink-0"></div>
                <div>
                  <a 
                    href="https://portfolio-tomas-martorelli.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-medium font-pp-neue hover:text-[#d9ff00] transition-colors duration-300 cursor-pointer"
                  >
                    Tomás Martorelli
                  </a>
                  <div className="text-stone-400 text-sm font-pp-neue">Full Stack Developer</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex-shrink-0"></div>
                <div>
                  <a 
                    href="https://portfolio-virid-ten-84.vercel.app/es" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-medium font-pp-neue hover:text-[#d9ff00] transition-colors duration-300 cursor-pointer"
                  >
                    Nicolás Siciliano
                  </a>
                  <div className="text-stone-400 text-sm font-pp-neue">Frontend Developer</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="mt-12 pt-8 border-t border-stone-800">
            <a
              href="/about"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base font-pp-neue"
            >
              Ver más sobre nosotros
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


