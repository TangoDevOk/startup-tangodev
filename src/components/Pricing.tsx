'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ContactModal from './ContactModal';

const Pricing = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'landing' | 'ecommerce' | 'saas' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const t = useTranslations('pricing');

  const plans = [
    {
      id: 'landing' as const,
      name: t('plans.landing.name'),
      price: t('plans.landing.price'),
      timeline: t('plans.landing.timeline'),
      techStack: ["Next.js", "WordPress", "Framer", "Webflow", "HTML/CSS"],
      features: t.raw('plans.landing.features') as string[],
      buttonStyle: "bg-black text-white hover:bg-neutral-900 border border-neutral-800 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300",
      popular: false
    },
    {
      id: 'ecommerce' as const,
      name: t('plans.ecommerce.name'),
      price: t('plans.ecommerce.price'),
      timeline: t('plans.ecommerce.timeline'),
      techStack: ["Shopify", "WooCommerce", "Next.js", "Stripe"],
      features: t.raw('plans.ecommerce.features') as string[],
      buttonStyle: "bg-white text-black hover:bg-[#d9ff00] transition-colors duration-300",
      popular: true
    },
    {
      id: 'saas' as const,
      name: t('plans.saas.name'),
      price: t('plans.saas.price'),
      timeline: t('plans.saas.timeline'),
      techStack: ["Next.js", "React", "Node.js", "Supabase", "PostgreSQL"],
      features: t.raw('plans.saas.features') as string[],
      buttonStyle: "bg-black text-white hover:bg-neutral-900 border border-neutral-800 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300",
      popular: false
    }
  ];

  const paymentHighlights = [
    {
      eyebrow: "Cashflow friendly",
      title: "Pagos flexibles",
      detail: "50% señal + 50% al entregar (o 3-6 cuotas sin interés con Mercado Pago)",
    },
    {
      eyebrow: "Sin sorpresas",
      title: "Precios finales",
      detail: "No cobro IVA extra si facturás como monotributista",
    },
  ];

  useEffect(() => {
    // Animación inicial más dramática
    const tl = gsap.timeline();
    
    // Título con efecto más notorio
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 60, scale: 0.9 });
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
      });
    }
    
    // Subtítulo con delay y efecto de escritura
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");
    }
    
    // Cards con animación más dramática y stagger
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        // Establecer estado inicial para la card
        gsap.set(ref, { opacity: 0, y: 80, scale: 0.8, rotationY: 15 });
        
        // Establecer estado inicial para features y botón
        const features = ref.querySelectorAll('.feature-item');
        const button = ref.querySelector('.cta-button');
        
        gsap.set(features, { opacity: 0, x: -20 });
        gsap.set(button, { opacity: 0, y: 20 });
        
        gsap.to(ref, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          delay: 0.8 + index * 0.2,
          ease: "back.out(1.2)",
          onComplete: () => {
            // Animar features después de que la card aparezca
            gsap.to(features, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              onComplete: () => {
                // Animar botón al final
                gsap.to(button, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "back.out(1.2)"
                });
              }
            });
          }
        });
      }
    });

  }, []);

  return (
    <section id="pricing" className="relative min-h-screen overflow-hidden py-20">
      

      {/* Section Header - estilo minimalista como referencia */}
      <div className="relative z-10 text-center mb-20 pt-32">
        <div 
          ref={titleRef}
          className="mb-8"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.05] tracking-[-1.2px] font-pp-neue text-center mb-4">
            {t('title')}
          </div>
        </div>
        <p 
          ref={subtitleRef}
          className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue max-w-3xl mx-auto"
        >
          {t('subtitle')}
        </p>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Pricing Cards - Sin header, solo las cards */}
        <div className="">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 w-full px-4 md:px-6 lg:px-8 mb-10">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative group transition-transform duration-300"
            >
              {/* Glassmorphism Card - Profesional y sutil */}
              <div className="relative border border-white/20 rounded-2xl p-6 md:p-7 lg:p-8 h-full shadow-lg transition-all duration-300 flex flex-col">
                {/* Card Content */}
                <div className="text-left mb-8">
                  <h3 className="text-xl font-semibold text-stone-300 mb-2 font-pp-neue">
                    {plan.name}
                  </h3>
                  <p className="text-stone-400 text-base leading-relaxed font-medium font-pp-neue mb-6">
                    {plan.timeline}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-stone-200 font-pp-neue">
                      {plan.price}
                    </span>
                  </div>
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {plan.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium text-stone-300 bg-white/5 border border-white/10 rounded-md font-pp-neue"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Línea separadora */}
                  <div className="w-full h-px bg-white/20 mb-6"></div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="feature-item flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-stone-400 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - Más cuadrado estilo web */}
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    setIsContactModalOpen(true);
                  }}
                  className={`cta-button w-full py-4 px-6 rounded-lg font-semibold font-pp-neue transition-all duration-300 ${plan.buttonStyle} ${
                    plan.buttonStyle.includes('bg-black') 
                      ? 'shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]' 
                      : 'shadow-lg hover:shadow-xl'
                  } transform hover:scale-105`}
                >
                  {t('startButton')}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Payment Info Section - concise highlight cards */}
        {/* <div className="mt-2 mb-8 px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 lg:gap-8">
            {paymentHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-6 shadow-[0_0_30px_rgba(0,0,0,0.35)] flex flex-col gap-2"
              >
                <span className="text-[11px] uppercase tracking-[0.35em] text-stone-500">
                  {highlight.eyebrow}
                </span>
                <p className="text-stone-300 text-lg font-semibold font-pp-neue">
                  {highlight.title}
                </p>
                <p className="text-stone-100 text-base leading-relaxed max-w-sm">
                  {highlight.detail}
                </p>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* Disclaimer abajo */}
        <div className="text-center mt-10 px-4">
          <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue max-w-2xl lg:max-w-xl mx-auto">
            {t('customCta')}{" "}
            <button
              onClick={() => {
                setSelectedPlan(null);
                setIsContactModalOpen(true);
              }}
              className="text-[#d9ff00] hover:text-[#d9ff00]/80 transition-colors underline underline-offset-4 cursor-pointer whitespace-nowrap"
            >
              {t('customLink')}
            </button>{" "}
            {t('customEnd')}
          </p>
        </div>
        
        </div>



      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        preSelectedPlan={selectedPlan}
      />
    </section>
  );
};

export default Pricing;
