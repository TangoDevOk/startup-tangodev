'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Zap, Database, Code2, Layers, Palette, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const centerBoxRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(SVGPathElement | null)[]>([]);
  const techCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  const technologies = [
    {
      name: 'React',
      Icon: Layers
    },
    {
      name: 'Next.js',
      Icon: Zap
    },
    {
      name: 'TypeScript',
      Icon: Code2
    },
    {
      name: 'Tailwind',
      Icon: Palette
    },
    {
      name: 'Node.js',
      Icon: Cloud
    },
    {
      name: 'Supabase',
      Icon: Database
    }
  ];

  const features = [
    {
      icon: '🔄',
      text: 'Automatización perfecta'
    },
    {
      icon: '✓',
      text: 'Sincronización en tiempo real'
    },
    {
      icon: '🔒',
      text: 'Seguro y escalable'
    },
    {
      icon: '⚡',
      text: 'Configuración plug & play'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animación del subtítulo
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animación de las tech cards
      techCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, scale: 0.8, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: 0.4 + index * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Animación del centro
      if (centerBoxRef.current) {
        gsap.fromTo(centerBoxRef.current,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.8,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: centerBoxRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animación de las líneas
      linesRef.current.forEach((line, index) => {
        if (line) {
          const length = line.getTotalLength();
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length
          });

          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: 1 + index * 0.1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });

      // Animación de features
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(feature,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 1.5 + index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden py-20 lg:py-32">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div ref={titleRef} className="mb-6">
            <span className="text-[#d9ff00] text-sm lg:text-base font-pp-neue font-medium tracking-[0.3em] uppercase">
              INTEGRACIONES
            </span>
          </div>
          <div ref={subtitleRef}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-white leading-[1.1] tracking-tight font-pp-neue">
              Integración perfecta con tus
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-white leading-[1.1] tracking-tight font-pp-neue">
              herramientas favoritas
            </h2>
          </div>
        </div>

        {/* Tech Integration Diagram */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Container with proper height */}
          <div className="relative h-[600px] lg:h-[700px]">
            
            {/* SVG for connecting lines - FROM CENTER TO TOP */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ zIndex: 1 }}
              viewBox="0 0 1000 1000"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Gradiente para la luz amarilla que viaja DE ABAJO HACIA ARRIBA */}
                <linearGradient id="travelingLight" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#d9ff00" stopOpacity="0">
                    <animate 
                      attributeName="stop-opacity" 
                      values="1;0;0;0;0;0;1" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </stop>
                  <stop offset="50%" stopColor="#d9ff00" stopOpacity="0">
                    <animate 
                      attributeName="stop-opacity" 
                      values="0;1;1;0;0;0;0" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </stop>
                  <stop offset="100%" stopColor="#d9ff00" stopOpacity="0">
                    <animate 
                      attributeName="stop-opacity" 
                      values="0;0;0;1;1;0;0" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </stop>
                </linearGradient>
              </defs>
              
              {/* Lines from center (bottom) to tech cards (top) - TRIDENT STYLE */}
              {technologies.map((_, index) => {
                // Center position (bottom) - where the cube is
                const centerX = 500;
                const centerY = 700;
                
                // Tech cards position (top, más separados)
                const totalCards = technologies.length;
                const totalWidth = 700; // Ancho total más grande para más separación
                const spacing = totalWidth / (totalCards - 1);
                const startX = 500 - (totalWidth / 2); // Centrar
                const techX = startX + (spacing * index);
                const techY = 80;
                
                // Punto de control hacia afuera (curva convexa invertida)
                const controlX = techX; // Mismo X que el destino
                const controlY = 550; // Punto medio-bajo para curva pronunciada hacia afuera
                
                // Línea con curva invertida (hacia afuera)
                const pathD = `M ${centerX} ${centerY} Q ${controlX} ${controlY}, ${techX} ${techY}`;
                
                return (
                  <g key={index}>
                    {/* Línea base gris/blanca */}
                    <path
                      d={pathD}
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    
                    {/* Línea con luz amarilla viajando */}
                    <path
                      ref={(el) => { if (el) linesRef.current[index] = el; }}
                      d={pathD}
                      stroke="url(#travelingLight)"
                      strokeWidth="2"
                      fill="none"
                      style={{
                        filter: 'drop-shadow(0 0 6px #d9ff00)',
                        animationDelay: `${index * 0.3}s`
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tech Cards - Top Row */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-8 lg:px-16" style={{ zIndex: 2 }}>
              {technologies.map((tech, index) => {
                const IconComponent = tech.Icon;
                return (
                  <div
                    key={tech.name}
                    ref={(el) => { if (el) techCardsRef.current[index] = el; }}
                    className="group cursor-pointer"
                  >
                    <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white transition-all duration-300 group-hover:text-[#d9ff00] group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                );
              })}
            </div>

            {/* Center Box - Bottom Center */}
            <div
              ref={centerBoxRef}
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{ 
                bottom: '20%',
                zIndex: 3 
              }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-xl opacity-50">
                  <Box className="w-10 h-10 lg:w-12 lg:h-12 text-[#d9ff00]" strokeWidth={2} />
                </div>
                
                {/* Main cube icon */}
                <div className="relative flex items-center justify-center">
                  <Box className="w-10 h-10 lg:w-12 lg:h-12 text-[#d9ff00]" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => { if (el) featuresRef.current[index] = el; }}
                className="flex items-center gap-3"
              >
                <div className="text-[#d9ff00] text-xl">{feature.icon}</div>
                <span className="text-stone-400 text-sm lg:text-base font-medium font-pp-neue">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

