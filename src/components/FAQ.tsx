'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FAQ = () => {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('basics');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const tabs = [
    { id: 'basics', label: t('tabs.basics') },
    { id: 'process', label: t('tabs.process') },
    { id: 'pricing', label: t('tabs.pricing') },
    { id: 'support', label: t('tabs.support') }
  ];

  const faqsByCategory = {
    basics: t.raw('questions.basics') as Array<{question: string, answer: string}>,
    process: t.raw('questions.process') as Array<{question: string, answer: string}>,
    pricing: t.raw('questions.pricing') as Array<{question: string, answer: string}>,
    support: t.raw('questions.support') as Array<{question: string, answer: string}>
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden group"
    >
      {/* Background image with rocky texture */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-no-repeat opacity-50 transition-opacity duration-700"
          style={{
            backgroundImage: "url('/imgs/building.jpg')",
            backgroundPosition: 'center 40%',
            filter: 'grayscale(100%) contrast(1.2) brightness(0.8)'
          }}
        />
        {/* Hover effect - subtle glow on building that follows mouse */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundImage: "url('/imgs/building.jpg')",
            backgroundPosition: 'center 40%',
            filter: 'grayscale(100%) contrast(1.5) brightness(1.2)',
            maskImage: `radial-gradient(ellipse 200px 200px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(ellipse 200px 200px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 70%)`
          }}
        />
        {/* Gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/90"></div>
      </div>

      {/* Main content - Full width layout */}
      <div className="relative z-10 w-full pt-12 lg:pt-16 pb-8 lg:pb-12">
        <div className="w-full px-4 lg:px-8 xl:px-12 2xl:px-16">
          
          {/* Full width grid - exactly like reference */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left column - Half width */}
            <div className="flex flex-col justify-start">
              {/* FAQS label */}
                                      <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="text-stone-400 text-sm lg:text-base font-pp-neue font-medium tracking-wider uppercase mb-4 text-center"
                        >
                          FAQS
                        </motion.div>
              
              {/* Main title - takes most of left half */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-gradient-ios leading-[1.05] tracking-[-1.2px] font-pp-neue mb-8 text-center"
              >
                {t('title')}
              </motion.h2>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue max-w-md mb-8 text-center"
              >
                {t('subtitle')}
              </motion.p>

              {/* Tabs - Container with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-flex flex-wrap gap-2 p-1.5 rounded-lg backdrop-blur-xl bg-transparent w-fit"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setOpenIndex(null);
                    }}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 whitespace-nowrap backdrop-blur-xl bg-transparent ${
                      activeTab === tab.id
                        ? 'bg-white/5 text-stone-200 shadow-lg border border-white/1'
                        : 'bg-transparent text-stone-400 hover:bg-white/5 hover:text-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </motion.div>
            </div>
            
            {/* Right column - Half width */}
            <div className="space-y-0 pt-8 lg:pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {faqsByCategory[activeTab as keyof typeof faqsByCategory].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between py-4 lg:py-5 text-left hover:text-white/80 transition-colors duration-300"
                      >
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-medium text-white font-pp-neue pr-8">
                          {faq.question}
                        </h3>
                        
                        <motion.div
                          animate={{ rotate: openIndex === index ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="flex-shrink-0"
                        >
                          {openIndex === index ? (
                            <X className="w-6 h-6 text-[#d9ff00]" />
                          ) : (
                            <Plus className="w-6 h-6 text-[#d9ff00]" />
                          )}
                        </motion.div>
                      </button>

                      {/* Separator line */}
                      <div className="w-full h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>

                      {/* Answer */}
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="py-4 lg:py-5">
                              <p className="text-stone-300 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default FAQ;
