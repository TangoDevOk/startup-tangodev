'use client';

import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Estilos específicos para Rentix
const rentixStyles = `
  .rentix-card .card-background {
    background-size: 150% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
  }
`;

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
 
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const backgroundRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    // Inyectar estilos específicos para Rentix
    const styleElement = document.createElement('style');
    styleElement.textContent = rentixStyles;
    document.head.appendChild(styleElement);
    
    // Preload expanded images to prevent flicker
    services.forEach(service => {
      if (service.backgroundExpanded && service.backgroundExpanded !== service.background) {
        const img = new Image();
        img.src = service.backgroundExpanded.replace(/url\(['"]?([^'"]+)['"]?\)/, '$1');
      }
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(styleElement);
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Cryptohub",
      description: "Dashboard de criptomonedas en tiempo real. Tracking de precios, gráficos interactivos y análisis de mercado.",
      // Imagen principal (card colapsada)
      background: "url('/imgs/cryptohub.png')",
      // Imagen opcional para la vista expandida (por defecto usa la misma)
      backgroundExpanded: "url('/imgs/cryptohub2.png')",
      category: "FINTECH",
      url: "", 
      details: []
    },
     {
      id: 2,
      title: "Cordoba Imports",
      description: "Ecommerce de importaciones de smartphones en Argentina.",
      background: "url('/imgs/imagencordobaimports.png')",
      backgroundExpanded: "url('/imgs/imagencordobaimports1.jpg')",
      category: "ECOMMERCE",
      url: "https://cordobaimports.infinityfreeapp.com/ecommerce/?i=1",
      details: []
    },
    {
      id: 3,
      title: "Rentix",
      description: "Landing page para emprendimiento de cuadros artesanales. Diseño moderno y optimizado para conversión.",
      background: "url('/imgs/rentix1.jpg')",
      backgroundExpanded: "url('/imgs/rentix.png')",
      category: "SAAS",
      url: "https://by-kalanit.vercel.app/", 
      details: []
    },
    {
      id: 4,
      title: "Para Tierra Sur",
      description: "Landing page para emprendimiento turístico en el sur argentino.",
      background: "url('/imgs/paradatierrasur.jpg')",
      backgroundExpanded: "url('/imgs/imagencordobaimports1.jpg')",
      category: "TURISMO",
      url: "", 
      details: []
    },
    {
      id: 5,
      title: "Kal",
      description: "Sitio web para marca de diseño y arte visual.",
      background: "url('/imgs/kal.png')",
      backgroundExpanded: "url('/imgs/imagencordobaimports1.jpg')",
      category: "DISEÑO",
      url: "https://by-kalanit.vercel.app/", 
      details: []
    },
    {
      id: 6,
      title: "Berti",
      description: "Plataforma web para servicios profesionales.",
      background: "url('/imgs/berti1.jpg')",
      backgroundExpanded: "url('/imgs/imagencordobaimports1.jpg')",
      category: "SERVICIOS",
      url: "", 
      details: []
    },
    {
      id: 7,
      title: "Hechos.ar",
      description: "Portal de noticias y actualidad con diseño moderno.",
      background: "url('/imgs/hechos.ar.jpg')",
      backgroundExpanded: "url('/imgs/imagencordobaimports1.jpg')",
      category: "NOTICIAS",
      url: "", 
      details: []
    },
  ];


  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      if (titleLines) {
        gsap.set(titleLines, { opacity: 0, y: 100, scale: 0.9 });
        gsap.to(titleLines, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          delay: 0.5
        });
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 1.2
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            width: isMobile ? '100%' : 500,
            marginLeft: 0,
            scale: 1,
            opacity: 0,
            y: 100,
            rotation: isMobile ? 0 : 5
          });
          
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });
      
      // Set initial widths for cards
      if (!isMobile) {
        cardsRef.current.forEach((card) => {
          if (card) {
            gsap.set(card, { width: 500 });
          }
        });
      }

      cardsRef.current.forEach((card) => {
        if (card) {
          const cardElement = card.querySelector('.card-content');
          const backgroundElement = card.querySelector('.card-background');
          const overlayElement = card.querySelector('.card-overlay');

          card.addEventListener('mouseenter', () => {
            gsap.to(cardElement, { 
              scale: 1.02, 
              duration: 1.2, 
              ease: "sine.out" 
            });
            gsap.to(backgroundElement, { 
              scale: 1.02, 
              duration: 1.5, 
              ease: "sine.out" 
            });
            gsap.to(overlayElement, { 
              opacity: 0.1, 
              duration: 1.2, 
              ease: "sine.out" 
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(cardElement, { 
              scale: 1, 
              duration: 1.2, 
              ease: "sine.out" 
            });
            gsap.to(backgroundElement, { 
              scale: 1, 
              duration: 1.5, 
              ease: "sine.out" 
            });
            gsap.to(overlayElement, { 
              opacity: 0, 
              duration: 1.2, 
              ease: "sine.out" 
            });
          });
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: -50 * progress,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);


  const ITEMS_PER_PAGE = isMobile ? 1 : 3;
  const SCROLL_STEP = 1;
  const totalPages = isMobile 
    ? services.length 
    : services.length - ITEMS_PER_PAGE + 1;
  const paginatedServices = services.slice(
    currentPage,
    currentPage + ITEMS_PER_PAGE
  );

  const goToNextPage = () => {
    setExpandedCard(null);
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + SCROLL_STEP));
  };

  const goToPrevPage = () => {
    setExpandedCard(null);
    setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - SCROLL_STEP));
  };

  // GSAP animation for mobile slide transitions
  useEffect(() => {
    if (!isMobile) return;
    
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            x: 50,
            scale: 0.95
          },
          { 
            opacity: 1, 
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: index * 0.1
          }
        );
      });
    }, cardsContainerRef);
    
    return () => ctx.revert();
  }, [currentPage, isMobile]);

  const handleCardExpansion = useCallback((cardId: number) => {
    if (isAnimating) return;
    const newExpandedCard = expandedCard === cardId ? null : cardId;
    setExpandedCard(newExpandedCard);
  }, [expandedCard, isAnimating]);

  // GSAP animation for card expansion
  useEffect(() => {
    if (isMobile) return;
    
    setIsAnimating(true);
    const ctx = gsap.context(() => {
      const isExpanding = expandedCard !== null;
      
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const service = paginatedServices[index];
        if (!service) return;
        
        const isCardExpanded = expandedCard === service.id;
        const targetWidth = isCardExpanded ? getExpandedCardWidth() : 500;
        
        gsap.to(card, {
          width: targetWidth,
          duration: isExpanding ? 0.7 : 0.5,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false)
        });
      });
      
      // Background image transition
      backgroundRefs.current.forEach((bg, index) => {
        if (!bg) return;
        const service = paginatedServices[index];
        if (!service) return;
        
        const isCardExpanded = expandedCard === service.id;
        const newImage = isCardExpanded && service.backgroundExpanded 
          ? service.backgroundExpanded 
          : service.background;
        
        const currentImage = bg.style.backgroundImage;
        if (currentImage !== newImage) {
          if (isExpanding) {
            // Smooth fade when expanding
            gsap.to(bg, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => {
                bg.style.backgroundImage = newImage;
                gsap.to(bg, { opacity: 1, duration: 0.3 });
              }
            });
          } else {
            // When closing: smooth fade out, swap image, fade in
            gsap.to(bg, {
              opacity: 0.5,
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => {
                bg.style.backgroundImage = newImage;
                gsap.to(bg, {
                  opacity: 1,
                  duration: 0.35,
                  ease: "power2.out"
                });
              }
            });
          }
        }
      });
    }, cardsContainerRef);
    
    return () => ctx.revert();
  }, [expandedCard, isMobile, currentPage]);

  const getExpandedCardWidth = () => {
    const visibleCards = paginatedServices.length;
    const normalCardWidth = 500; 
    const gap = 24; 
    const availableWidth = window.innerWidth > 1024 ? window.innerWidth - 160 : 1400; 
    const totalGaps = (visibleCards - 1) * gap;
    const otherCardsWidth = (visibleCards - 1) * normalCardWidth;
    const expandedWidth = availableWidth - otherCardsWidth - totalGaps;
    return Math.max(expandedWidth, 800);
  };

  // Touch/Swipe handlers for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNextPage();
    }
    if (isRightSwipe) {
      goToPrevPage();
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 w-full pt-20 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32">
        <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-24">
          
          <div className="text-center mb-12 sm:mb-16 lg:mb-32">
            <div ref={titleRef} className="w-full mb-8">
              <div className="title-line text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.05] tracking-[-1.2px] font-helvetica-neue text-center">
                Por qué elegir
              </div>
              <div className="title-line text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.05] tracking-[-1.2px] font-helvetica-neue text-center">
                trabajar con nosotros
              </div>
            </div>
            
            <div className="max-w-[920px] mx-auto">
              <p ref={subtitleRef} className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue text-center">
                No somos solo otra agencia. Somos tu socio técnico comprometido con el éxito de tu proyecto. Estas son las razones por las que nuestros clientes eligen trabajar con nosotros.
              </p>
            </div>
          </div>

          <div ref={cardsContainerRef} className="relative w-full" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {/* Navegación - Flecha Izquierda - Desktop only */}
            {!isMobile && (
              <button
                onClick={goToPrevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Proyectos anteriores"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            
            {/* Navegación - Flecha Derecha - Desktop only */}
            {!isMobile && (
              <button
                onClick={goToNextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Más proyectos"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            <div className={`flex flex-col lg:flex-row gap-6 lg:gap-6 w-full ${expandedCard ? 'lg:justify-start' : 'lg:justify-center'} items-center lg:items-stretch`}>
            {paginatedServices.map((service, index) => {
              const isExpanded = expandedCard === service.id;
              
              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={`group relative h-[400px] sm:h-[500px] lg:h-[600px] w-full max-w-[650px] lg:max-w-none lg:w-[500px]`}
                >
                  <div 
                    className={`card-content relative overflow-hidden cursor-pointer h-full rounded-2xl ${service.title === "Rentix" ? "rentix-card" : ""}`}
                    onClick={() => handleCardExpansion(service.id)}
                  >
                    <div 
                      ref={(el) => {
                        if (el) backgroundRefs.current[index] = el;
                      }}
                      className="card-background absolute inset-0 group-hover:scale-110"
                      style={{ 
                        backgroundImage: service.background,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        objectFit: 'cover'
                      }}
                    />
                    
                    <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                    
                    <div className="relative h-full flex flex-col justify-between p-6">
                      {!isMobile && (
                        <div className="absolute top-4 right-4 z-10">
                          <div
                            ref={(el) => {
                              if (el) {
                                el.addEventListener('mouseenter', () => {
                                  gsap.to(el, { scale: 1.1, duration: 0.3, ease: "power2.out" });
                                });
                                el.addEventListener('mouseleave', () => {
                                  gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
                                });
                                el.addEventListener('mousedown', () => {
                                  gsap.to(el, { scale: 0.95, duration: 0.1, ease: "power2.out" });
                                });
                                el.addEventListener('mouseup', () => {
                                  gsap.to(el, { scale: 1.1, duration: 0.1, ease: "power2.out" });
                                });
                              }
                            }}
                            className={`backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                              isExpanded
                                ? 'w-10 h-10 bg-#d9ff00-500/20 opacity-0.1 hover:bg-#d9ff00'
                                : 'w-10 h-10 hover:bg-[#d9ff00]/80'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              
                              if (isExpanded) {
                                // Si está expandida, usamos la X para colapsar
                                handleCardExpansion(service.id);
                                return;
                              }

                              // Si no está expandida, la flecha lleva a la URL
                              if (service.url && service.url.trim() !== "") {
                                window.open(service.url, "_blank", "noopener,noreferrer");
                              }
                            }}
                          >
                            {isExpanded ? (
                              <X className="w-6 h-6 text-white" />
                            ) : (
                              <div className="w-6 h-6  flex items-center justify-center transform -rotate-45">
                                <ArrowRight className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Top section */}
                      <div>
                      {/*   <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                          <span className="text-sm lg:text-base font-medium text-white/90 font-pp-neue">
                            {service.category}
                          </span>
                        </div>  */}
                        {/* Título comentado temporalmente
                        <h3 className="text-white text-xl lg:text-2xl font-medium mb-3 font-pp-neue">
                          {service.title}
                        </h3>
                        */}
                        {/* Descripción comentada temporalmente
                        <p className="text-gray-300 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue mb-6">
                          {service.description}
                        </p>
                        */}
                        
                        {/* Expanded content - Horizontal layout */}
                        {/* Contenido expandido comentado temporalmente
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                              className="mt-6 overflow-hidden"
                            >
                              <h4 className="text-lg lg:text-xl font-medium text-white mb-3 font-pp-neue">
                                Características principales:
                              </h4>
                              <div className="grid grid-cols-2 gap-4">
                                {service.details.map((detail, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.05 }}
                                    className="flex items-center text-gray-300 font-pp-neue font-medium text-base lg:text-[21.3333px] leading-relaxed"
                                  >
                                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full mr-2 flex-shrink-0"></div>
                                    {detail}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        */}
                      </div>
                      
                      
                      <div className="relative z-10">
                        <div className="absolute -left-6 -right-6 -bottom-6 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                        
                        <div className="relative z-20">
                          <span className="text-sm lg:text-base font-semibold text-white/80 font-pp-neue uppercase tracking-[0.2em] mb-2 block">
                            {service.category}
                          </span>
                          <h3 className="text-stone-200 text-xl lg:text-2xl xl:text-3xl font-medium font-pp-neue leading-tight">
                            {service.title}
                          </h3>
                          
                          {isExpanded && service.url && service.url.trim() !== "" && (
                            <button
                              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm lg:text-base font-medium font-pp-neue hover:bg-[#d9ff00] transition-colors duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(service.url!, "_blank", "noopener,noreferrer");
                              }}
                            >
                              Ver proyecto
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              );
            })}
            </div>
            
            {/* Pagination dots - Mobile only */}
            {isMobile && (
              <div className="flex justify-center gap-2 mt-6">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setExpandedCard(null);
                      setCurrentPage(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === index 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir al proyecto ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Showcase;
