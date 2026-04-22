'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type LegalType = 'licenses' | 'terms' | 'privacy' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType | null;
}

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const t = useTranslations('legal');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const legalContent = {
  licenses: {
    title: t('licenses.title'),
    subtitle: t('licenses.subtitle'),
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('licenses.software.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('licenses.software.description')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>{t('licenses.software.items.0')}</li>
            <li>{t('licenses.software.items.1')}</li>
            <li>{t('licenses.software.items.2')}</li>
            <li>{t('licenses.software.items.3')}</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('licenses.content.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('licenses.content.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('licenses.thirdparty.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('licenses.thirdparty.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('licenses.updates.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('licenses.updates.description')}
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>{t('lastUpdated', { date: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) })}</p>
        </div>
      </div>
    )
  },
  terms: {
    title: t('terms.title'),
    subtitle: t('terms.subtitle'),
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('terms.acceptance.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('terms.acceptance.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('terms.services.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('terms.services.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('terms.payments.title')}</h3>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>{t('terms.payments.items.0')}</li>
            <li>{t('terms.payments.items.1')}</li>
            <li>{t('terms.payments.items.2')}</li>
            <li>{t('terms.payments.items.3')}</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('terms.responsibilities.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('terms.responsibilities.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('terms.warranties.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('terms.warranties.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('terms.cancellations.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('terms.cancellations.description')}
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>{t('lastUpdated', { date: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) })}</p>
        </div>
      </div>
    )
  },
  privacy: {
    title: t('privacy.title'),
    subtitle: t('privacy.subtitle'),
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('privacy.collection.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('privacy.collection.description')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>{t('privacy.collection.items.0')}</li>
            <li>{t('privacy.collection.items.1')}</li>
            <li>{t('privacy.collection.items.2')}</li>
            <li>{t('privacy.collection.items.3')}</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('privacy.usage.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('privacy.usage.description')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>{t('privacy.usage.items.0')}</li>
            <li>{t('privacy.usage.items.1')}</li>
            <li>{t('privacy.usage.items.2')}</li>
            <li>{t('privacy.usage.items.3')}</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('privacy.sharing.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('privacy.sharing.description')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>{t('privacy.sharing.items.0')}</li>
            <li>{t('privacy.sharing.items.1')}</li>
            <li>{t('privacy.sharing.items.2')}</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('privacy.security.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('privacy.security.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('privacy.rights.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('privacy.rights.description')}
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>{t('lastUpdated', { date: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) })}</p>
        </div>
      </div>
    )
  },
  cookies: {
    title: t('cookies.title'),
    subtitle: t('cookies.subtitle'),
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('cookies.what.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('cookies.what.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('cookies.types.title')}</h3>
          
          <div className="mb-4">
            <h4 className="text-lg font-medium text-white font-pp-neue mb-2">{t('cookies.types.essential.title')}</h4>
            <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-3">
              {t('cookies.types.essential.description')}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-white font-pp-neue mb-2">{t('cookies.types.performance.title')}</h4>
            <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-3">
              {t('cookies.types.performance.description')}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-white font-pp-neue mb-2">{t('cookies.types.functional.title')}</h4>
            <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-3">
              {t('cookies.types.functional.description')}
            </p>
          </div>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('cookies.thirdparty.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('cookies.thirdparty.description')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('cookies.management.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('cookies.management.description')}
          </p>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('cookies.management.warning')}
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">{t('cookies.moreinfo.title')}</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            {t('cookies.moreinfo.description')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>Chrome: chrome://settings/cookies</li>
            <li>Firefox: about:preferences#privacy</li>
            <li>Safari: {t('cookies.moreinfo.safari')}</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>{t('lastUpdated', { date: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) })}</p>
        </div>
      </div>
    )
  }
};


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

  if (!isOpen || !type) return null;

  const content = legalContent[type];

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
        className="absolute top-0 right-0 h-full w-full lg:w-[40%] bg-stone-900 shadow-2xl overflow-hidden"
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
            <div className="text-stone-400 text-sm font-pp-neue font-medium tracking-[0.2em] uppercase mb-4">
              {t('header')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium text-white font-pp-neue leading-tight mb-6">
              {content.title}
            </h2>
            <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
              {content.subtitle}
            </p>
          </div>

          {/* Contenido legal */}
          <div className="pb-8">
            {content.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;

