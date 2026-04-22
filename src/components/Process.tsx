'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const t = useTranslations('process');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const expandedContentRef = useRef<(HTMLDivElement | null)[]>([]);

  // Hook para detectar cambios de tamaño
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Establecer el estado inicial
    handleResize();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = [
    {
      id: "01",
      title: t('steps.analysis.title'),
      subtitle: t('steps.analysis.subtitle'),
      description: t('steps.analysis.description'),
      deliverables: t.raw('steps.analysis.deliverables') as string[],
      duration: t('steps.analysis.duration')
    },
    {
      id: "02", 
      title: t('steps.structure.title'),
      subtitle: t('steps.structure.subtitle'),
      description: t('steps.structure.description'),
      deliverables: t.raw('steps.structure.deliverables') as string[],
      duration: t('steps.structure.duration')
    },
    {
      id: "03",
      title: t('steps.design.title'),
      subtitle: t('steps.design.subtitle'),
      description: t('steps.design.description'),
      deliverables: t.raw('steps.design.deliverables') as string[],
      duration: t('steps.design.duration')
    },
    {
      id: "04",
      title: t('steps.code.title'),
      subtitle: t('steps.code.subtitle'),
      description: t('steps.code.description'),
      deliverables: t.raw('steps.code.deliverables') as string[],
      duration: t('steps.code.duration')
    },
    {
      id: "05",
      title: t('steps.testing.title'),
      subtitle: t('steps.testing.subtitle'),
      description: t('steps.testing.description'),
      deliverables: t.raw('steps.testing.deliverables') as string[],
      duration: t('steps.testing.duration')
    },
    {
      id: "06",
      title: t('steps.deploy.title'),
      subtitle: t('steps.deploy.subtitle'),
      description: t('steps.deploy.description'),
      deliverables: t.raw('steps.deploy.deliverables') as string[],
      duration: t('steps.deploy.duration')
    }
  ];

  const handleStepClick = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const contentElement = expandedContentRef.current[stepIndex];
    const stepElement = stepsRef.current[stepIndex];
    const titleElement = stepElement?.querySelector('h3');
    const lineElement = stepElement?.querySelector('.w-full.h-0\\.5');
    
    // Animación de click en el título
    if (titleElement) {
      gsap.to(titleElement, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
    
    if (expandedStep === stepId) {
      // Cerrar el step actual
      if (contentElement) {
        gsap.to(contentElement, {
          opacity: 0,
          maxHeight: 0,
          scale: 0.98,
          duration: 0.7,
          ease: "power1.inOut",
          onComplete: () => {
            setExpandedStep(null);
          }
        });
      } else {
        setExpandedStep(null);
      }
    } else {
      // Cerrar el step anterior si existe
      if (expandedStep) {
        const previousStepIndex = steps.findIndex(step => step.id === expandedStep);
        const previousContentElement = expandedContentRef.current[previousStepIndex];
        if (previousContentElement) {
          gsap.to(previousContentElement, {
            opacity: 0,
            maxHeight: 0,
            scale: 0.98,
            duration: 0.6,
            ease: "power1.inOut"
          });
        }
      }
      
      // Abrir el nuevo step
      setExpandedStep(stepId);
      
      // Animar la apertura después de que el estado se actualice
      setTimeout(() => {
        if (contentElement) {
          // Obtener la altura real del contenido
          const contentHeight = contentElement.scrollHeight;
          
          // Establecer estado inicial
          gsap.set(contentElement, {
            opacity: 0,
            maxHeight: 0,
            scale: 0.98,
            transformOrigin: "top center"
          });
          
          // Crear una timeline más suave
          const tl = gsap.timeline();
          
          // Animar max-height primero (más suave que height)
          tl.to(contentElement, {
            maxHeight: contentHeight + 20, // Un poco extra para evitar cortes
            duration: 1.0,
            ease: "power1.out"
          })
          // Luego opacidad y escala con overlap
          .to(contentElement, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power1.out"
          }, "-=0.6");
          
          // Animar elementos internos de forma más gradual
          const internalElements = contentElement.querySelectorAll('h4, p, div');
          gsap.fromTo(internalElements, 
            { opacity: 0, y: 5 },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              delay: 0.6,
              ease: "power1.out"
            }
          );
        }
      }, 150);
    }
  };

  // Animaciones de entrada
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título principal
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animación del subtítulo
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animación de la descripción
      if (descriptionRef.current) {
        gsap.fromTo(descriptionRef.current, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            delay: 0.4,
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animación de los steps
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(step, 
            { opacity: 0, x: -50 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.8,
              delay: 0.1 + index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animaciones de hover
  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          const title = step.querySelector('.step-title');
          const line = step.querySelector('.w-full.h-0\\.5');
          
          if (title) {
            // Hover in
            step.addEventListener('mouseenter', () => {
              // Cambiar a amarillo removiendo el gradiente
              title.classList.remove('text-gradient-ios');
              title.classList.add('text-[#d9ff00]');
              
              gsap.to(title, {
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out"
              });
              
              if (line) {
                gsap.to(line, {
                  backgroundColor: '#d9ff00',
                  scaleY: 1.2,
                  duration: 0.4,
                  ease: "power2.out"
                });
              }
            });
            
            // Hover out
            step.addEventListener('mouseleave', () => {
              // Restaurar el gradiente
              title.classList.remove('text-[#d9ff00]');
              title.classList.add('text-gradient-ios');
              
              gsap.to(title, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              });
              
              if (line) {
                gsap.to(line, {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  scaleY: 1,
                  duration: 0.4,
                  ease: "power2.out"
                });
              }
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-32">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 2xl:px-12">
          
          {/* Header Section */}
       {/*    <div className="flex justify-between items-start mb-16 lg:mb-24">
            <div className="text-left">
              <div className="text-white/40 text-sm lg:text-base font-pp-neue tracking-wider mb-2">
                [ 02 ]
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm lg:text-base font-pp-neue tracking-wider">
                TANGODEV
              </div>
            </div>
          </div> */}

          {/* Main Title - Consistent with other sections */}
          <div className="text-center mb-20 lg:mb-32">
            <div className="w-full mb-8">
              <div
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.05] tracking-[-1.2px] font-pp-neue text-center"
              >
                {t('mainTitle.line1')}
              </div>
              <div
                ref={subtitleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.05] tracking-[-1.2px] font-pp-neue text-center"
              >
                {t('mainTitle.line2')}
              </div>
            </div>
            
            <div className="max-w-[600px] mx-auto">
              <p 
                ref={descriptionRef}
                className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue text-center"
              >
                {t('description')}
              </p>
            </div>
          </div>

          {/* Steps List - Diagonal Layout - Full Width */}
          <div className="relative w-full">
            {/* Header Row */}
           {/*  <div className="flex justify-between items-center mb-16 lg:mb-24">
              <div className="text-white/60 text-lg lg:text-xl font-pp-neue tracking-wider">
                STAGE
              </div>
              <div className="text-white/40 text-lg lg:text-xl font-pp-neue tracking-wider">
                [ 00 ]
              </div>
            </div> */}

            {/* Line connecting header */}
{/*             <div className="w-full h-px bg-white/20 mb-12"></div>
 */}
            {/* Steps - Diagonal Staggered Layout */}
            <div className="relative space-y-0">
              {steps.map((step, index) => {
                // Márgenes diferentes para mobile y desktop
                const desktopMarginValues = ['0%', '15%', '35%', '50%', '60%', '75%'];
                const mobileMarginValues = ['0%', '5%', '10%', '15%', '20%', '25%'];
                
                return (
                  <div
                    key={step.id}
                    ref={(el) => {
                      if (el) stepsRef.current[index] = el;
                    }}
                    className="group relative"
                    style={{ 
                      marginLeft: !isMobile ? desktopMarginValues[index] : mobileMarginValues[index]
                    }}
                  >
                    <div className="py-6 lg:py-8">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleStepClick(step.id)}
                      >
                        <h3 className="step-title text-3xl lg:text-4xl xl:text-5xl font-medium text-gradient-ios font-pp-neue tracking-tight transition-all duration-300">
                          {step.title}
                        </h3>
                        <div className="text-white/40 text-xl lg:text-2xl font-pp-neue tracking-wider">
                          [ {step.id} ]
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-white/20 group-hover:bg-white/40 transition-colors duration-300"></div>
                    
                    {/* Expanded Content */}
                    {expandedStep === step.id && (
                      <div
                        ref={(el) => {
                          if (el) expandedContentRef.current[index] = el;
                        }}
                        className="overflow-hidden"
                        style={{
                          maxHeight: 'none',
                          transition: 'none'
                        }}
                      >
                          <div className="pt-4 pb-6 px-4 lg:px-0">
                            <div className={`grid grid-cols-1 gap-6 lg:gap-8 ${step.id !== "06" ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
                              {/* Description */}
                              <div className={step.id !== "06" ? "lg:col-span-2" : "lg:col-span-1"}>
                                <h4 className="text-stone-200 text-lg lg:text-xl font-medium mb-3 font-pp-neue">
                                  {step.subtitle}
                                </h4>
                                <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue mb-6">
                                  {step.description}
                                </p>
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                                  <span className="text-stone-400 text-base font-medium font-pp-neue">
                                    {t('duration')}: {step.duration}
                                  </span>
                                </div>
                              </div>
                              {/* Deliverables - Hidden for Deploy step */}
                              {step.id !== "06" && (
                                <div>
                                  <h5 className="text-stone-200 text-lg lg:text-xl font-medium mb-4 font-pp-neue">
                                    {t('deliverables')}
                                  </h5>
                                  <div className="space-y-3">
                                    {step.deliverables.map((deliverable, idx) => (
                                      <div key={idx} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                                          {deliverable}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>

            {/* Process Label at bottom left */}
           {/*  <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-0 left-0 text-white/60 text-xl lg:text-2xl font-pp-neue tracking-wider"
            >
              PROCESO
            </motion.div> */}
          </div>

          {/* Bottom Action */}
         {/*  <motion.div 
            className="text-center mt-20 lg:mt-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="bg-black border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300 font-medium text-lg font-pp-neue"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar proyecto
            </motion.button>
          </motion.div> */}

        </div>
      </div>
    </section>
  );
};

export default Process;
