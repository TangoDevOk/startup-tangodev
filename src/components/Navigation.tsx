'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false); // true cuando ha scrolleado hacia abajo
  const [language, setLanguage] = useState('ES'); // 'ES' o 'EN'
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Referencias para GSAP
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Detectar si ha scrolleado hacia abajo (más de 30px)
      const hasScrolledDown = currentScrollY > 30;
      
      if (hasScrolledDown !== scrolled) {
        setScrolled(hasScrolledDown);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [scrolled]);

  // Efectos GSAP
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];
    
    const ctx = gsap.context(() => {
      // Animación inicial de la navbar
      if (navRef.current) {
        gsap.fromTo(navRef.current, 
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }

      // Animación del logo
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }

      // Animación de los enlaces
      const navLinks = linksRef.current?.querySelectorAll('a');
      if (navLinks) {
        gsap.fromTo(navLinks,
          { y: -20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "power2.out",
            delay: 0.4
          }
        );
      }

      // Efectos de hover en enlaces
      navLinks?.forEach(link => {
        const handleMouseEnter = () => {
          if (link) {
            gsap.to(link, { 
              scale: 1.05, 
              duration: 0.3, 
              ease: "power2.out" 
            });
          }
        };
        
        const handleMouseLeave = () => {
          if (link) {
            gsap.to(link, { 
              scale: 1, 
              duration: 0.3, 
              ease: "power2.out" 
            });
          }
        };

        link.addEventListener('mouseenter', handleMouseEnter);
        link.addEventListener('mouseleave', handleMouseLeave);
        
        cleanupFunctions.push(() => {
          link.removeEventListener('mouseenter', handleMouseEnter);
          link.removeEventListener('mouseleave', handleMouseLeave);
        });
      });

      // Efectos del botón CTA
      const ctaButton = navRef.current?.querySelector('.cta-button');
      if (ctaButton) {
        // Animación inicial
        gsap.fromTo(ctaButton,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.6 }
        );

        // Efectos de hover
        const handleCtaMouseEnter = () => {
          if (ctaButton) {
            gsap.to(ctaButton, { 
              scale: 1.05, 
              duration: 0.3, 
              ease: "power2.out" 
            });
          }
        };
        
        const handleCtaMouseLeave = () => {
          if (ctaButton) {
            gsap.to(ctaButton, { 
              scale: 1, 
              duration: 0.3, 
              ease: "power2.out" 
            });
          }
        };

        ctaButton.addEventListener('mouseenter', handleCtaMouseEnter);
        ctaButton.addEventListener('mouseleave', handleCtaMouseLeave);
        
        cleanupFunctions.push(() => {
          ctaButton.removeEventListener('mouseenter', handleCtaMouseEnter);
          ctaButton.removeEventListener('mouseleave', handleCtaMouseLeave);
        });
      }

    }, navRef);

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      ctx.revert();
    };
  }, []);

  // Animación del menú móvil
  useEffect(() => {
    if (isMobileMenuOpen) {
      const tl = gsap.timeline();
      
      // Overlay fade in
      tl.fromTo(mobileMenuOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Menu slide in from right
      tl.fromTo(mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: "power3.out" },
        "-=0.1"
      );
    } else if (mobileMenuRef.current && mobileMenuOverlayRef.current) {
      const tl = gsap.timeline();
      
      tl.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: "power3.in"
      });
      
      tl.to(mobileMenuOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1");
    }
  }, [isMobileMenuOpen]);


  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'top-0 backdrop-blur-md bg-black/60' : 'top-2 lg:top-3 bg-transparent'
        }`}
      >
        <div className={`w-full transition-all duration-500 ${
          scrolled 
            ? 'px-8 lg:px-4 xl:px-8' 
            : 'px-10 lg:px-12 xl:px-14'
        }`}>
          <div className={`flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? 'h-16 lg:h-18 xl:h-20' 
              : 'h-20 lg:h-22 xl:h-24'
          }`}>
              
              {/* Logo - Left Edge */}
              <div ref={logoRef} className="flex items-center space-x-3">
                {/* <div className="w-3 h-3 bg-white rounded-full"></div> */}
                <Link href="/" className={`text-gradient-ios hover:text-blue-400 transition-all duration-500 ${
                  scrolled 
                    ? 'text-2xl lg:text-3xl xl:text-4xl' 
                    : 'text-2xl lg:text-3xl xl:text-4xl scale-105'
                }`}>
                  <span className="font-neue">Tangodev</span>
                  <span className="font-neue"></span>
                </Link>
              </div>

              {/* Desktop Navigation - Center */}
              <div ref={linksRef} className={`hidden lg:flex items-center transition-all duration-500 ${
                scrolled 
                  ? 'space-x-8 xl:space-x-10' 
                  : 'space-x-9 xl:space-x-11'
              }`}>
                <Link 
                  href="/" 
                  className={`relative font-medium transition-all duration-500 ${
                    scrolled ? 'text-base lg:text-base' : 'text-base lg:text-lg'
                  } ${
                    isActive('/') 
                      ? 'text-gradient-ios underline underline-offset-4' 
                      : 'text-gradient-ios hover:text-blue-400'
                  }`}
                >
                  Inicio
                </Link>
                <button 
                  className={`relative font-medium transition-all duration-500 cursor-pointer ${
                    scrolled ? 'text-base lg:text-base' : 'text-base lg:text-lg'
                  } text-gradient-ios hover:text-blue-400`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('servicios');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Servicios
                </button>
                <button 
                  className={`relative font-medium transition-all duration-500 cursor-pointer ${
                    scrolled ? 'text-base lg:text-base' : 'text-base lg:text-lg'
                  } text-gradient-ios hover:text-blue-400`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('precios');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Precios
                </button>
                <button 
                  onClick={() => setIsAboutModalOpen(true)}
                  className={`relative font-medium transition-all duration-500 cursor-pointer ${
                    scrolled ? 'text-base lg:text-base' : 'text-base lg:text-lg'
                  } text-gradient-ios hover:text-blue-400`}
                >
                  Nosotros
                </button>
              </div>

              {/* Right side actions - Right Edge */}
              <div className={`flex items-center transition-all duration-500 ${
                scrolled 
                  ? 'space-x-3 lg:space-x-5' 
                  : 'space-x-4 lg:space-x-6'
              }`}>
                {/* Language Switcher */}
                <div className="hidden lg:flex items-center gap-1 font-medium text-sm">
                  <button
                    onClick={() => setLanguage('ES')}
                    className={`transition-all duration-300 ${
                      language === 'ES' 
                        ? 'text-[#d9ff00]' 
                        : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    ES
                  </button>
                  <span className="text-stone-600">/</span>
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`transition-all duration-300 ${
                      language === 'EN' 
                        ? 'text-[#d9ff00]' 
                        : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    EN
                  </button>
                </div>
                
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className={`cta-button hidden lg:block bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-500 font-medium relative overflow-hidden group cursor-pointer ${
                    scrolled 
                      ? 'px-6 py-2 text-base lg:text-base' 
                      : 'px-6 py-2 lg:px-7 lg:py-3 text-base lg:text-lg'
                  }`}
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">Contacto</span>
                  <div className="absolute inset-0 bg-[#d9ff00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>

                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden bg-white text-black w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <span className="text-sm font-bold">+</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9998] lg:hidden">
            {/* Overlay */}
            <div
              ref={mobileMenuOverlayRef}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div
              ref={mobileMenuRef}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-stone-900 shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-white text-xl font-pp-neue font-medium">Menú</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-6 space-y-6">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-white text-lg font-medium font-pp-neue transition-colors ${
                    isActive('/') 
                      ? 'text-[#d9ff00]' 
                      : 'hover:text-[#d9ff00]'
                  }`}
                >
                  Inicio
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('servicios');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full text-left text-white text-lg font-medium font-pp-neue hover:text-[#d9ff00] transition-colors"
                >
                  Servicios
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('precios');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full text-left text-white text-lg font-medium font-pp-neue hover:text-[#d9ff00] transition-colors"
                >
                  Precios
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAboutModalOpen(true);
                  }}
                  className="block w-full text-left text-white text-lg font-medium font-pp-neue hover:text-[#d9ff00] transition-colors"
                >
                  Nosotros
                </button>
              </div>

              {/* CTA Button */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base font-pp-neue"
                >
                  Contacto
                </button>
              </div>

              {/* Language Switcher */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <span className="text-white/60 text-sm font-pp-neue">Idioma:</span>
                  <button
                    onClick={() => setLanguage('ES')}
                    className={`transition-all duration-300 font-pp-neue ${
                      language === 'ES' 
                        ? 'text-[#d9ff00]' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    ES
                  </button>
                  <span className="text-white/40">/</span>
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`transition-all duration-300 font-pp-neue ${
                      language === 'EN' 
                        ? 'text-[#d9ff00]' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
}
