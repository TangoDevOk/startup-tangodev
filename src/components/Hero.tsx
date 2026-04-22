'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Aurora from './Aurora';
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations('hero');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // GSAP refs
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const titleWords = titleRef.current?.querySelectorAll('.title-word');
      if (titleWords) {
        gsap.set(titleWords, { opacity: 0, y: 100, scale: 0.8 });
        gsap.to(titleWords, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5
        });
      }

      // Buttons animation
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 0, y: 50 });
        gsap.to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 1.5
        });
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, x: -50 });
        gsap.to(descriptionRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          delay: 2
        });
      }

      // Video player animation
      if (videoRef.current) {
        gsap.set(videoRef.current, { opacity: 0, scale: 0.8, y: 100, rotation: 5 });
        gsap.to(videoRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 2.5
        });
      }

      // Nav links animation
      const navLinks = navLinksRef.current?.querySelectorAll('a, div');
      if (navLinks) {
        gsap.set(navLinks, { opacity: 0, x: -30 });
        gsap.to(navLinks, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1.8
        });
      }

      // Aurora parallax effect
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

      // Button hover effects - consolidated
      const primaryButton = buttonsRef.current?.querySelector('.primary-button');
      const secondaryButton = buttonsRef.current?.querySelector('.secondary-button');
      const playButton = videoRef.current?.querySelector('.play-button');
      const iconsContainer = buttonsRef.current?.querySelector('.icons-container');

      if (primaryButton) {
        const flipContainer = primaryButton.querySelector('.flip-container');

        primaryButton.addEventListener('mouseenter', () => {
          gsap.to(primaryButton, { scale: 1.05, duration: 0.3, ease: "power2.out" });
          if (flipContainer) {
            gsap.to(flipContainer, { rotateX: 180, duration: 0.3, ease: "power2.out" });
          }
        });
        primaryButton.addEventListener('mouseleave', () => {
          gsap.to(primaryButton, { scale: 1, duration: 0.3, ease: "power2.out" });
          if (flipContainer) {
            gsap.to(flipContainer, { rotateX: 0, duration: 0.3, ease: "power2.out" });
          }
        });
        primaryButton.addEventListener('mousedown', () => {
          gsap.to(primaryButton, { scale: 0.95, duration: 0.1, ease: "power2.out" });
        });
        primaryButton.addEventListener('mouseup', () => {
          gsap.to(primaryButton, { scale: 1.05, duration: 0.1, ease: "power2.out" });
        });
      }

      if (secondaryButton) {
        const flipContainerSecondary = secondaryButton.querySelector('.flip-container-secondary');

        secondaryButton.addEventListener('mouseenter', () => {
          gsap.to(secondaryButton, {
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            duration: 0.3,
            ease: "power2.out"
          });
          if (flipContainerSecondary) {
            gsap.to(flipContainerSecondary, { rotateY: 180, duration: 0.3, ease: "power2.out" });
          }
          if (iconsContainer) {
            gsap.to(iconsContainer, { rotate: 10, scale: 1.1, duration: 0.5, ease: "power2.out" });
          }
        });
        secondaryButton.addEventListener('mouseleave', () => {
          gsap.to(secondaryButton, {
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            duration: 0.3,
            ease: "power2.out"
          });
          if (flipContainerSecondary) {
            gsap.to(flipContainerSecondary, { rotateY: 0, duration: 0.3, ease: "power2.out" });
          }
          if (iconsContainer) {
            gsap.to(iconsContainer, { rotate: 0, scale: 1, duration: 0.5, ease: "power2.out" });
          }
        });
        secondaryButton.addEventListener('mousedown', () => {
          gsap.to(secondaryButton, { scale: 0.98, duration: 0.1, ease: "power2.out" });
        });
        secondaryButton.addEventListener('mouseup', () => {
          gsap.to(secondaryButton, { scale: 1.02, duration: 0.1, ease: "power2.out" });
        });
      }

      if (playButton) {
        playButton.addEventListener('mouseenter', () => {
          gsap.to(playButton, {
            scale: 1.2,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(videoRef.current, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        playButton.addEventListener('mouseleave', () => {
          gsap.to(playButton, {
            scale: 1,
            backgroundColor: 'rgba(120, 120, 120, 1)',
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(videoRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

      // ScrollTrigger effects
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self: any) => {
          const progress = self.progress;

          if (auroraRef.current) {
            gsap.to(auroraRef.current, {
              y: -50 * progress,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (titleRef.current) {
            gsap.to(titleRef.current, {
              opacity: 1 - progress * 0.5,
              y: -50 * progress,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Aurora effect */}
      <div ref={auroraRef} className="absolute inset-0 opacity-70 blur-[20px]">
        <Aurora
          colorStops={["#0f172a", "#b4f34d", "#0f172a"]}
          blend={0.9}
          amplitude={1.4}
          speed={0.9}
        />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[432px_1fr] gap-8 lg:gap-24 items-center w-full">

          {/* Left Column - Tech Stack */}
          <div ref={navLinksRef} className="hidden lg:block pl-8 lg:pl-10 xl:pl-14 pt-9">
            <div className="grid grid-cols-2 gap-8">
              {/* Column 1: Stack */}
              <div className="space-y-1">
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('tech.stack')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('tech.typescript')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('tech.tailwind')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('tech.nodejs')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('tech.vercel')}
                </div>
              </div>

              {/* Column 2: Services */}
              <div className="space-y-1">
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('services.landing')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('services.ecommerce')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('services.webapps')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('services.apis')}
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  {t('services.integrations')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-start-2 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {/* Main Heading */}
            <div className="max-w-7xl mb-8 sm:mb-10 lg:mb-16">
              <h1 ref={titleRef} className="text-[40px] sm:text-5xl md:text-6xl lg:text-[110px] font-medium leading-[1.15] sm:leading-[1.05] tracking-[-0.5px] sm:tracking-[-1.2px] text-gradient-ios">
                <span className="title-word block text-gradient-ios">
                  {t('title')}
                </span>
              </h1>
            </div>

            {/* CTA Buttons - Original style with better copy */}
            <div ref={buttonsRef} className="flex flex-row gap-3 sm:gap-3 lg:gap-4 mb-10 sm:mb-12 lg:mb-24">
              {/* Primary button with flip effect */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="primary-button bg-white text-black px-5 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base lg:text-lg font-pp-neue relative overflow-hidden cursor-pointer flex-1 sm:flex-none h-full"
              >
                <div className="flip-container h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                  <div style={{ backfaceVisibility: "hidden" }}>
                    {t('cta.prices')}
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateX(180deg)"
                    }}
                  >
                    {t('cta.pricesFlip')}
                  </div>
                </div>
              </button>

              {/* Secondary button with glass effect and flip */}
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="secondary-button px-5 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 rounded-lg font-medium flex items-center justify-center gap-2 lg:gap-3 text-sm sm:text-base lg:text-lg font-pp-neue text-white backdrop-blur-sm transition-all duration-300 relative overflow-hidden flex-1 sm:flex-none"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="icons-container flex -space-x-1 lg:-space-x-2">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Team member"
                    className="w-5 h-5 lg:w-6 lg:h-6 rounded-full object-cover"
                  />
                  <img
                    src="https://i.pravatar.cc/150?img=33"
                    alt="Team member"
                    className="w-5 h-5 lg:w-6 lg:h-6 rounded-full object-cover"
                  />
                </div>

                <div className="flip-container-secondary" style={{ transformStyle: "preserve-3d" }}>
                  <div style={{ backfaceVisibility: "hidden" }}>
                    {t('cta.work')}
                  </div>
                  <div
                    className="absolute top-0 left-0 w-full"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    {t('cta.workFlip')}
                  </div>
                </div>
              </button>
            </div>

            {/* Description */}
            <div className="max-w-full sm:max-w-[600px] mb-12 sm:mb-14 lg:mb-24">
              <p ref={descriptionRef} className="text-stone-200 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                {t('subtitle')}
              </p>
            </div>

            {/* Mobile Stack - simplified */}
            <div className="lg:hidden mt-12 sm:mt-14">
              <div className="space-y-2">
                <p className="text-stone-400 font-pp-neue text-sm font-medium">
                  Stack: React • Next.js • TypeScript • Tailwind • Vercel
                </p>
                <p className="text-stone-400 font-pp-neue text-sm font-medium">
                  Servicios: Landings • E-commerce • Web Apps • APIs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player - Bottom right */}
      <div ref={videoRef} className="absolute bottom-24 right-24 hidden lg:block z-20">
        <div className="w-110 h-70 rounded-lg p-6" style={{ backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)' }}>
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <div className="relative w-full h-3/4 bg-black">
              <video
                src="/videos/Reels.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="h-16 flex items-center justify-between px-2" style={{ backgroundColor: 'rgba(239, 238, 236, 0.06)' }}>
              <span className="text-white text-sm font-pp-neue font-medium">{t('cta.work')}</span>
              <div
                className="play-button w-6 h-6 bg-stone-800 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl px-4">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-6 right-0 text-stone-200 hover:text-white font-pp-neue text-sm"
            >
              Cerrar
            </button>
            <div className="mt-4 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <video
                src="/videos/Reels.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* 'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Aurora from './Aurora';
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll('.title-word');
      if (titleWords) {
        gsap.set(titleWords, { opacity: 0, y: 100, scale: 0.8 });
        gsap.to(titleWords, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5
        });
      }

      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 0, y: 50 });
        gsap.to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 1.5
        });
      }

      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, x: -50 });
        gsap.to(descriptionRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          delay: 2
        });
      }

      if (videoRef.current) {
        gsap.set(videoRef.current, { opacity: 0, scale: 0.8, y: 100, rotation: 5 });
        gsap.to(videoRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 2.5
        });

        const playButton = videoRef.current.querySelector('.play-button');
        if (playButton) {
          playButton.addEventListener('mouseenter', () => {
            gsap.to(playButton, { 
              scale: 1.2, 
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              duration: 0.3, 
              ease: "power2.out" 
            });
            gsap.to(videoRef.current, { 
              scale: 1.02,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          playButton.addEventListener('mouseleave', () => {
            gsap.to(playButton, { 
              scale: 1, 
              backgroundColor: 'rgba(120, 120, 120, 1)',
              duration: 0.3, 
              ease: "power2.out" 
            });
            gsap.to(videoRef.current, { 
              scale: 1,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
        }
      }

      const navLinks = navLinksRef.current?.querySelectorAll('a');
      if (navLinks) {
        gsap.set(navLinks, { opacity: 0, x: -30 });
        gsap.to(navLinks, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1.8
        });
      }

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

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          if (auroraRef.current) {
            gsap.to(auroraRef.current, {
              y: -50 * progress,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              opacity: 1 - progress * 0.5,
              y: -50 * progress,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-black overflow-hidden">
      <div ref={auroraRef} className="absolute inset-0 opacity-70 blur-[20px]">
        <Aurora
          colorStops={["#0f172a", "#d9ff00", "#0f172a"]}
          blend={0.9}
          amplitude={1.4}
          speed={0.9}
        />
      </div>

      <div className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-72 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[432px_1fr] gap-8 lg:gap-32 items-stretch w-full min-h-[584px]">
          
          <div ref={navLinksRef} className="hidden lg:block pl-8 lg:pl-10 xl:pl-14 pt-9">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  React & Next.js
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  TypeScript
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  Tailwind CSS
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  Node.js
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  Cloud-Native
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  Landing Pages
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  E-commerce
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  Web Apps
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  APIs Custom
                </div>
                <div className="font-pp-neue text-[21.3333px] font-medium leading-[26.8667px] text-stone-400">
                  Integraciones
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-start-2 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mb-8 sm:mb-10 lg:mb-16">
              <h1 ref={titleRef} className="text-[40px] sm:text-5xl md:text-6xl lg:text-[114px] font-medium leading-[1.15] sm:leading-[1.05] tracking-[-0.5px] sm:tracking-[-1.2px] text-gradient-ios">
                <span className="title-word block lg:block text-gradient-ios">
                  Creamos servicios web
                </span>
                <span className="title-word block lg:block text-gradient-ios">
                  que impactan.
                </span>
              </h1>
            </div>
       
            <div ref={buttonsRef} className="flex flex-row gap-3 sm:gap-3 lg:gap-4 mb-10 sm:mb-12 lg:mb-24">
              <div
                ref={(el) => {
                  if (el) {
                    const primaryButton = el.querySelector('.primary-button');
                    if (primaryButton) {
                      primaryButton.addEventListener('mouseenter', () => {
                        gsap.to(primaryButton, { scale: 1.05, duration: 0.3, ease: "power2.out" });
                        gsap.to(primaryButton.querySelector('.flip-container'), { 
                          rotateX: 180, 
                          duration: 0.3, 
                          ease: "power2.out" 
                        });
                      });
                      primaryButton.addEventListener('mouseleave', () => {
                        gsap.to(primaryButton, { scale: 1, duration: 0.3, ease: "power2.out" });
                        gsap.to(primaryButton.querySelector('.flip-container'), { 
                          rotateX: 0, 
                          duration: 0.3, 
                          ease: "power2.out" 
                        });
                      });
                      primaryButton.addEventListener('mousedown', () => {
                        gsap.to(primaryButton, { scale: 0.95, duration: 0.1, ease: "power2.out" });
                      });
                      primaryButton.addEventListener('mouseup', () => {
                        gsap.to(primaryButton, { scale: 1.05, duration: 0.1, ease: "power2.out" });
                      });
                    }
                  }
                }}
              >
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="primary-button bg-white text-black px-5 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base lg:text-lg font-pp-neue relative overflow-hidden cursor-pointer flex-1 sm:flex-none"
                >
                  <div className="flip-container" style={{ transformStyle: "preserve-3d" }}>
                    <div style={{ backfaceVisibility: "hidden" }}>
                      Iniciar proyecto
                    </div>
                    <div 
                      className="absolute top-0 left-0 w-full"
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateX(180deg)"
                      }}
                    >
                      ¡Empecemos!
                    </div>
                  </div>
                </button>
              </div>

              <div
                ref={(el) => {
                  if (el) {
                    const secondaryButton = el.querySelector('.secondary-button');
                    const iconsContainer = el.querySelector('.icons-container');
                    const flipContainer = el.querySelector('.flip-container-secondary');
                    
                    if (secondaryButton) {
                      secondaryButton.addEventListener('mouseenter', () => {
                        gsap.to(secondaryButton, { 
                          scale: 1.02,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          duration: 0.3, 
                          ease: "power2.out" 
                        });
                        gsap.to(flipContainer, { 
                          rotateY: 180, 
                          duration: 0.3, 
                          ease: "power2.out" 
                        });
                        gsap.to(iconsContainer, { 
                          rotate: 10, 
                          scale: 1.1,
                          duration: 0.5, 
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
                        gsap.to(flipContainer, { 
                          rotateY: 0, 
                          duration: 0.3, 
                          ease: "power2.out" 
                        });
                        gsap.to(iconsContainer, { 
                          rotate: 0, 
                          scale: 1,
                          duration: 0.5, 
                          ease: "power2.out" 
                        });
                      });
                      secondaryButton.addEventListener('mousedown', () => {
                        gsap.to(secondaryButton, { scale: 0.98, duration: 0.1, ease: "power2.out" });
                      });
                      secondaryButton.addEventListener('mouseup', () => {
                        gsap.to(secondaryButton, { scale: 1.02, duration: 0.1, ease: "power2.out" });
                      });
                    }
                  }
                }}
              >
                <button 
                  onClick={() => setIsAboutModalOpen(true)}
                  className="secondary-button px-5 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 rounded-lg font-medium flex items-center justify-center gap-2 lg:gap-3 text-sm sm:text-base lg:text-lg font-pp-neue text-white backdrop-blur-sm transition-all duration-300 relative overflow-hidden flex-1 sm:flex-none" 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="icons-container flex -space-x-1 lg:-space-x-2">
                    <img 
                      src="https://i.pravatar.cc/150?img=12" 
                      alt="Team member" 
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full object-cover"
                    />
                    <img 
                      src="https://i.pravatar.cc/150?img=33" 
                      alt="Team member" 
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flip-container-secondary" style={{ transformStyle: "preserve-3d" }}>
                    <div style={{ backfaceVisibility: "hidden" }}>
                      Sobre nosotros
                    </div>
                    <div 
                      className="absolute top-0 left-0 w-full"
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      Sobre nosotros
                    </div>
                  </div>
                </button>
              </div>
            </div>
       
            <div className="max-w-full sm:max-w-[533.333px] mb-12 sm:mb-14 lg:mb-24">
              <p ref={descriptionRef} className="text-stone-200 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                Nuestro servicio web nace de la necesidad de crear soluciones digitales que perduren. 
                Somos tu socio tecnológico, especializado en desarrollo web, APIs y servicios en la nube que crecen con tu negocio.
              </p>
            </div>
       
            <div className="lg:hidden mt-12 sm:mt-14">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="space-y-1">
                  <a href="#servicios" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    Web Apps
                  </a>
                  <a href="#desarrollo" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    E-commerce
                  </a>
                  <a href="#apis" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    APIs & Backend
                  </a>
                  <a href="#cloud" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    Cloud & DevOps
                  </a>
                  <a href="#consultoria" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    Consultoría Tech
                  </a>
                </div>
                <div className="space-y-1">
                  <a href="#servicios" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    SaaS Solutions
                  </a>
                  <a href="#desarrollo" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    Mobile Apps
                  </a>
                  <a href="#apis" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    Integraciones
                  </a>
                  <a href="#cloud" className="block hover:text-white transition-colors font-pp-neue text-sm font-medium leading-relaxed text-stone-200">
                    Automatización
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={videoRef} className="absolute bottom-24 right-24 hidden lg:block z-20">
        <div className="w-110 h-70 rounded-lg p-6" style={{backgroundColor: 'rgba(239, 238, 236, 0.06)', border: '1px solid rgba(239, 238, 236, 0.03)'}}>
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <div className="relative w-full h-3/4 bg-black">
              <video
                src="/videos/Reels.mp4" 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="h-16 flex items-center justify-between px-2" style={{backgroundColor: 'rgba(239, 238, 236, 0.06)'}}>
              <span className="text-white text-sm font-pp-neue font-medium">PLAY REEL</span>
              <div 
                className="play-button w-6 h-6 bg-stone-800 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl px-4">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-6 right-0 text-stone-200 hover:text-white font-pp-neue text-sm"
            >
              Cerrar
            </button>
            <div className="mt-4 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <video
                src="/videos/Reels.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
 */