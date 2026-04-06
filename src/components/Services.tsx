'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WebDevelopmentCard from './WebDevelopmentCard';
import ContactModal from './ContactModal';
import InfiniteScroll from './InfiniteScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (descriptionRef.current) {
        gsap.fromTo(descriptionRef.current,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (card && index !== 0) { // Skip WebDevelopmentCard
          gsap.set(card, {
            opacity: 0,
            y: 30
          });
          
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });


      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Solo aplicar hover a cards que no sean WebDevelopmentCard (index 0)
          if (index !== 0) {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, { 
                scale: 1.02, 
                duration: 0.3, 
                ease: "power2.out" 
              });
            });
            card.addEventListener('mouseleave', () => {
              gsap.to(card, { 
                scale: 1, 
                duration: 0.3, 
                ease: "power2.out" 
              });
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="servicios" ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden mt-16">
      <div ref={containerRef} className="relative z-10 w-full pt-16 lg:pt-24 pb-12 lg:pb-16">
        <div className="w-full px-4 lg:px-8 xl:px-12 2xl:px-16">
          
          <div className="text-center mb-12 lg:mb-16">
            <div ref={titleRef} className="w-full mb-8">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.1] tracking-[-1.2px] font-pp-neue text-center">
                Servicios de desarrollo web
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.1] tracking-[-1.2px] font-pp-neue text-center">
                que transforman ideas en realidad
              </div>
            </div>
            
            <div className="max-w-[733.333px] mx-auto">
              <p ref={descriptionRef} className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue text-center">
                Desde sitios web corporativos hasta aplicaciones web complejas, 
                creamos soluciones digitales que impulsan el crecimiento de tu negocio.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              
              <div ref={(el) => { if (el) cardsRef.current[0] = el; }}>
                <WebDevelopmentCard />
              </div>

              <div 
                ref={(el) => {
                  if (el) cardsRef.current[1] = el;
                }}
                className="group relative rounded-2xl transition-all duration-500 h-full min-h-[400px] overflow-hidden flex flex-col" 
                style={{backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)'}}
              >
                <div className="relative z-10 p-8 lg:p-10">
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-stone-500 tracking-[0.2em] uppercase font-pp-neue">
                      E-COMMERCE
                    </span>
                  </div>
                  <h3 className="text-stone-200 text-2xl lg:text-3xl font-medium mb-4 font-pp-neue">
                    Tu tienda online lista para operar
                  </h3>
                  <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                    Armamos tu catálogo, configuramos el checkout e integramos pagos y envíos.
                    Todo preparado para que puedas vender sin depender de terceros.
                  </p>
                </div>

                <div className="relative flex-grow flex px-8 pb-8 lg:px-10 lg:pb-10">
                  <img 
                    src="/imgs/imagencordobaimports1.jpg" 
                    alt="E-commerce"
                    className="max-h-[200px] lg:max-h-[250px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
              
              <div 
                ref={(el) => {
                  if (el) cardsRef.current[2] = el;
                }}
                className="group relative lg:col-span-1 rounded-2xl transition-all duration-500 flex flex-col overflow-hidden" 
                style={{backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)'}}
              >
                <div className="relative h-[200px] lg:h-[240px] overflow-hidden">
                  <div className="absolute inset-0 flex flex-row animate-scroll-horizontal">
                    <img src="/imgs/cryptohub.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/cryptohub2.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/cryptohub3.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/dashboard.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/cryptohub.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/cryptohub2.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/cryptohub3.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                    <img src="/imgs/dashboard.png" alt="Corporate Site" className="h-full w-auto object-cover flex-shrink-0" />
                  </div>
                  <div 
                    className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(14, 14, 13, 0) 0%, rgba(14, 14, 13, 0.3) 20%, rgba(14, 14, 13, 0.6) 40%, rgba(14, 14, 13, 0.8) 60%, rgba(14, 14, 13, 0.95) 80%, rgba(14, 14, 13, 1) 100%)'
                    }}
                  ></div>
                </div>

                <div className="relative z-10 p-8 lg:p-10 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-stone-500 tracking-[0.2em] uppercase font-pp-neue">
                      APLICACIONES WEB
                    </span>
                  </div>
                  
                  <h3 className="text-stone-200 text-2xl lg:text-3xl font-medium mb-4 font-pp-neue">
                      De la idea al producto funcional
                  </h3>
                  <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                  Paneles, plataformas y herramientas a medida. Si tenés algo más complejo en mente que un sitio,
                   también lo construimos.
                  </p>
                </div>
              </div>

              <div 
                ref={(el) => {
                  if (el) cardsRef.current[3] = el;
                }}
                className="group relative lg:col-span-2 rounded-2xl p-8 lg:p-10 transition-all duration-500" 
                style={{backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)'}}
              >
                <div className="mb-6">
                  <span className="text-xs font-semibold text-stone-500 tracking-[0.2em] uppercase font-pp-neue">
                    REDISEÑO
                  </span>
                </div>
                <h3 className="text-stone-200 text-2xl lg:text-3xl font-medium mb-4 font-pp-neue">
                  Actualizamos tu sitio existente
                </h3>
                <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue mb-8">
                  Si tu web se ve desactualizada o no rinde, la renovamos con tecnología moderna.
                  Mejor rendimiento, mejor experiencia y estructura optimizada para buscadores.
                </p>
                
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="/imgs/redesign-before-after.png"
                    alt="Comparación antes y después de un rediseño web: de un sitio oscuro tipo portfolio a una landing clara orientada a conversión"
                    className="w-full h-auto max-h-[280px] sm:max-h-[320px] lg:max-h-[360px] object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>

    
              <div 
                ref={(el) => {
                  if (el) cardsRef.current[4] = el;
                }}
                className="group relative lg:col-span-1 rounded-2xl transition-all duration-500 flex flex-col overflow-hidden" 
                style={{backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)'}}
              >
           
                <div className="relative h-[250px] lg:h-[280px] -mb-[1px] overflow-hidden">
                  <InfiniteScroll
                    items={[
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                          </div>
                        ) 
                      },
                      { 
                        content: (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-white/10">
                            <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                          </div>
                        ) 
                      },
                    ]}
                    isTilted={true}
                    tiltDirection='right'
                    autoplay={true}
                    autoplaySpeed={0.3}
                    autoplayDirection="down"
                    pauseOnHover={true}
                    itemMinHeight={100}
                    width="100%"
                    maxHeight="100%"
                    negativeMargin="-0.8em"
                  />
                 
                  <div 
                    className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(14, 14, 13, 0) 0%, rgba(14, 14, 13, 0.3) 20%, rgba(14, 14, 13, 0.6) 40%, rgba(14, 14, 13, 0.8) 60%, rgba(14, 14, 13, 0.95) 80%, rgba(14, 14, 13, 1) 100%)'
                    }}
                  ></div>
                </div>

          
                <div className="relative z-10 p-8 lg:p-10 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-stone-500 tracking-[0.2em] uppercase font-pp-neue">
                      SOPORTE
                    </span>
                  </div>
                  
                  <h3 className="text-stone-200 text-2xl lg:text-3xl font-medium mb-4 font-pp-neue">
                    Tu sitio funcionando siempre
                  </h3>
                  <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                    Mantenimiento, actualizaciones y monitoreo continuo.
                    Nos ocupamos de que tu web siga online sin interrupciones.
                  </p>
                </div>
              </div>
            </div>

          </div>


          <div className="mt-4">
            <div className="rounded-2xl p-8 lg:p-10 text-center transition-all duration-500" style={{backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)'}}>
      
              <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue max-w-2xl mx-auto">
                Constantemente expandimos nuestros servicios para adaptarnos a las necesidades de nuestros clientes. Si tenés algo en mente que no está listado,{' '}
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-[#d9ff00] hover:underline transition-all duration-300 font-medium"
                >
                  hablemos
                </button>.
              </p>
            </div>
          </div>

        </div>
      </div>

     
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}

