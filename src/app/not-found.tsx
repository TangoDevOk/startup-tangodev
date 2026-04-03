'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import Aurora from '../components/Aurora';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del número 404 con efecto dramático
      if (numberRef.current) {
        gsap.set(numberRef.current, { 
          opacity: 0, 
          scale: 0.5, 
          rotationY: 180,
          filter: "blur(20px)"
        });
        
        gsap.to(numberRef.current, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 0.3
        });
      }

      // Animación del título
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 50 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.8
        });
      }

      // Animación de la descripción
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
        gsap.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.2
        });
      }

      // Animación de los botones
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('a');
        gsap.set(buttons, { opacity: 0, y: 30 });
        gsap.to(buttons, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 1.6
        });
      }

      // Efecto parallax en Aurora
      if (auroraRef.current) {
        gsap.to(auroraRef.current, {
          y: -30,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        });

        gsap.to(auroraRef.current, {
          rotation: 1,
          duration: 8,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      // Efectos hover para botones
      const primaryButton = buttonsRef.current?.querySelector('.primary-button');
      const secondaryButton = buttonsRef.current?.querySelector('.secondary-button');

      if (primaryButton) {
        primaryButton.addEventListener('mouseenter', () => {
          gsap.to(primaryButton, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        primaryButton.addEventListener('mouseleave', () => {
          gsap.to(primaryButton, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }

      if (secondaryButton) {
        secondaryButton.addEventListener('mouseenter', () => {
          gsap.to(secondaryButton, { 
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        secondaryButton.addEventListener('mouseleave', () => {
          gsap.to(secondaryButton, { 
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Aurora effect */}
      <div ref={auroraRef} className="absolute inset-0 opacity-70 blur-[20px]">
        <Aurora
          colorStops={["#0f172a", "#d9ff00", "#0f172a"]}
          blend={0.9}
          amplitude={1.4}
          speed={0.9}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 lg:px-8 xl:px-12 2xl:px-16 max-w-5xl mx-auto text-center">
        
        {/* 404 Number */}
        <div 
          ref={numberRef}
          className="mb-8 lg:mb-12"
        >
          <div className="text-[150px] sm:text-[200px] lg:text-[280px] font-medium leading-none tracking-[-0.05em] text-gradient-ios font-pp-neue">
            404
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-[-1px] text-gradient-ios font-pp-neue mb-6"
        >
          Página no encontrada
        </h1>

        {/* Description */}
        <p 
          ref={descriptionRef}
          className="text-stone-300 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          Lo sentimos, la página que estás buscando no existe o fue movida. 
          Volvé al inicio para explorar nuestros servicios.
        </p>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary button - Volver al inicio */}
          <Link
            href="/"
            className="primary-button bg-white text-black px-8 py-4 lg:px-10 lg:py-5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base lg:text-lg font-pp-neue flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>

          {/* Secondary button - Ir atrás */}
          <button
            onClick={() => window.history.back()}
            className="secondary-button px-8 py-4 lg:px-10 lg:py-5 rounded-lg font-medium flex items-center gap-2 text-base lg:text-lg font-pp-neue text-white backdrop-blur-sm transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Ir atrás
          </button>
        </div>

        {/* Additional help text */}
        <div className="mt-16 lg:mt-20">
          <p className="text-stone-400 text-sm font-pp-neue">
            ¿Necesitás ayuda?{' '}
            <Link href="/" className="text-[#d9ff00] hover:text-[#d9ff00]/80 transition-colors underline underline-offset-4">
              Contactanos
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>
  );
}


