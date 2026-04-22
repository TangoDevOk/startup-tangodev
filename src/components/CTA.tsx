'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import ContactModal from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const t = useTranslations('cta');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const primaryButtonRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gradientLeftRef = useRef<HTMLDivElement>(null);
  const gradientRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada espectacular
      const tl = gsap.timeline();

      // Gradientes de fondo con parallax
      if (gradientLeftRef.current) {
        gsap.fromTo(gradientLeftRef.current, 
          { x: -200, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 2,
            ease: "power3.out"
          }
        );
      }

      if (gradientRightRef.current) {
        gsap.fromTo(gradientRightRef.current, 
          { x: 200, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 2,
            ease: "power3.out"
          }
        );
      }

      // Glow central con efecto pulsante
      if (glowRef.current) {
        gsap.fromTo(glowRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "back.out(1.7)"
          }
        );
      }

      // Título con efecto de desvanecimiento y rotación 3D
      if (titleRef.current) {
        gsap.set(titleRef.current, { 
          opacity: 0, 
          y: 100, 
          rotationX: 90,
          scale: 0.8,
          filter: "blur(20px)"
        });
        
        tl.to(titleRef.current, { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out"
        });
      }

      // Subtítulo con efecto de escritura
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { 
          opacity: 0, 
          y: 50,
          clipPath: "inset(0 100% 0 0)"
        });
        
        tl.to(subtitleRef.current, { 
          opacity: 1, 
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power2.out"
        }, "-=0.8");
      }

      // Botón primario con efecto de flip 3D
      if (primaryButtonRef.current) {
        gsap.set(primaryButtonRef.current, { 
          opacity: 0, 
          y: 80,
          rotationY: 180,
          scale: 0.5
        });
        
        tl.to(primaryButtonRef.current, { 
          opacity: 1, 
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.4)"
        }, "-=0.6");
      }

      // Efectos hover mejorados
      if (primaryButtonRef.current) {
        const flipContent = primaryButtonRef.current.querySelector('.flip-content');
        
        primaryButtonRef.current.addEventListener('mouseenter', () => {
          gsap.to(primaryButtonRef.current, {
            scale: 1.05,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (flipContent) {
            gsap.to(flipContent, {
              rotateX: 180,
              duration: 0.3,
              ease: "easeInOut"
            });
          }
        });

        primaryButtonRef.current.addEventListener('mouseleave', () => {
          gsap.to(primaryButtonRef.current, {
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (flipContent) {
            gsap.to(flipContent, {
              rotateX: 0,
              duration: 0.3,
              ease: "easeInOut"
            });
          }
        });
      }

      // Efecto de desvanecimiento al salir del viewport (opcional)
      // Comentado temporalmente para evitar problemas de visibilidad
      /*
      gsap.to([titleRef.current, subtitleRef.current, primaryButtonRef.current, secondaryButtonRef.current], {
        opacity: 0,
        y: -50,
        scale: 0.9,
        duration: 1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          toggleActions: "none none play reverse"
        }
      });
      */

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Horizontal lines for visual structure - with fade effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Very subtle side gradients for depth without being noticeable */}
      <div className="absolute inset-0">
        <div 
          ref={gradientLeftRef}
          className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-blue-900/5 via-transparent to-transparent"
        ></div>
        <div 
          ref={gradientRightRef}
          className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-slate-900/5 via-transparent to-transparent"
        ></div>
      </div>
      
      {/* Subtle center glow - very minimal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          ref={glowRef}
          className="w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full pt-28 lg:pt-32 pb-10 flex items-center justify-center min-h-screen">
        <div className="w-full px-4 lg:px-8 xl:px-12 2xl:px-16 max-w-6xl mx-auto">
          
          {/* Main headline - matching Hero typography */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[114px] font-medium leading-[0.95] tracking-[-1.2px] text-gradient-ios font-pp-neue mb-4"
            >
              {t('title.line1')}{' '}
              <span className="text-gradient-ios italic">{t('title.something')}</span>{' '}
              <span className="relative text-gradient-ios">
                {t('title.extraordinary')}
                <div className="absolute inset-0 bg-white/8 rounded-full blur-xl -z-10 scale-125 animate-pulse"></div>
                <div className="absolute inset-0 bg-white/4 rounded-full blur-2xl -z-20 scale-150 animate-pulse delay-500"></div>
              </span>{' '}
              <span className="text-gradient-ios">{t('title.together')}</span>
            </h1>
          </div>

          {/* Description - matching Services style */}
          <div className="max-w-[733.333px] mx-auto text-center mb-8 lg:mb-12">
            <p 
              ref={subtitleRef}
              className="text-stone-200 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue"
            >
              {t('subtitle')}
            </p>
          </div>

          {/* CTA Button - matching Hero button style */}
          <div className="flex justify-center items-center mb-8">
            
            {/* Primary button with flip effect - matching Hero */}
            <div
              ref={primaryButtonRef}
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-black px-6 py-4 lg:px-10 lg:py-5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base lg:text-lg font-pp-neue relative overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div 
                className="flip-content"
                style={{ 
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease-in-out"
                }}
              >
                <div style={{ backfaceVisibility: "hidden" }}>
                  {t('button.start')}
                </div>
                <div 
                  className="absolute top-0 left-0 w-full"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)"
                  }}
                >
                  {t('button.letsGo')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  );
}
