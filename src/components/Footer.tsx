'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AboutModal from './AboutModal';
import LegalModal from './LegalModal';
import ContactModal from './ContactModal';

type LegalType = 'licenses' | 'terms' | 'privacy' | 'cookies';

const Footer = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalType | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLegalClick = (type: LegalType) => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  const handleFAQClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const faqSection = document.getElementById('preguntas');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <footer className="w-full relative overflow-hidden">
      {/* Puente visual para conectar con el componente de arriba */}
      <div className="absolute top-0 left-0 right-0 h-16"></div>
      
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl"></div>
      </div>

      {/* Contenido principal del footer */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-8 xl:px-10 2xl:px-12 pt-12 sm:pt-16 pb-8">
        {/* LAYOUT DESKTOP - Original */}
        <div className="hidden lg:block">
          <div className="flex gap-32 mb-12">
            
            {/* Columna 1 - SITEMAP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-8 font-pp-neue">SITEMAP</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue">Inicio</a>
                <a href="#servicios" className="block text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue">Servicios</a>
                <a href="#pricing" className="block text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue">Precios</a>
                <button
                  type="button"
                  onClick={() => setIsAboutModalOpen(true)}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Nosotros
                </button>
              </div>
            </motion.div>

            {/* Columna 2 - COMPANY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-8 font-pp-neue">EMPRESA</h4>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleLegalClick('licenses')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Licencias
                </button>
                <button
                  type="button"
                  onClick={() => handleLegalClick('terms')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Términos y Condiciones
                </button>
                <button
                  type="button"
                  onClick={() => handleLegalClick('privacy')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Política de Privacidad
                </button>
                <button
                  type="button"
                  onClick={() => handleLegalClick('cookies')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Política de Cookies
                </button>
              </div>
            </motion.div>

            {/* Columna 3 - SOPORTE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-8 font-pp-neue">SOPORTE</h4>
              <div className="space-y-3">
                <a 
                  href="#preguntas" 
                  onClick={handleFAQClick}
                  className="block text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Preguntas Frecuentes
                </a>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                >
                  Soporte Técnico
                </button>
              </div>
            </motion.div>

            {/* Columna 4 - CONTACTO RÁPIDO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 ml-auto"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-8 font-pp-neue">CONTACTO RÁPIDO</h4>
              <div className="space-y-6">
                <p className="text-white text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue">
                  ¿Tenés una idea? Contanos en 2 líneas.
                </p>
                <div className="flex gap-4">
                  <input 
                    type="email" 
                    placeholder="tu@email.com"
                    className="flex-1 bg-transparent border-b border-white/30 text-white placeholder:text-white/50 py-3 focus:outline-none focus:border-white transition-colors text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                  />
                  <input 
                    type="text" 
                    placeholder="Tu proyecto en 2 líneas..."
                    className="flex-1 bg-transparent border-b border-white/30 text-white placeholder:text-white/50 py-3 focus:outline-none focus:border-white transition-colors text-[21.3333px] font-medium leading-[29.8667px] font-pp-neue"
                  />
                  <button className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg font-pp-neue whitespace-nowrap">
                    Enviar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* LAYOUT MOBILE - Estilo referencia */}
        <div className="block lg:hidden">
          {/* Contacto Rápido Section - Arriba y ancho completo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-center mb-6">
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-4 font-pp-neue">CONTACTO RÁPIDO</h4>
              <p className="text-white text-base font-medium leading-relaxed font-pp-neue">
                ¿Tenés una idea? Contanos en 2 líneas.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="bg-transparent border-b border-white/30 text-white placeholder:text-white/50 py-3 focus:outline-none focus:border-white transition-colors text-base font-medium font-pp-neue"
              />
              <textarea 
                placeholder="Contanos brevemente tu proyecto..."
                rows={3}
                className="bg-transparent border-b border-white/30 text-white placeholder:text-white/50 py-3 focus:outline-none focus:border-white transition-colors text-base font-medium font-pp-neue resize-none"
              />
              <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base font-pp-neue">
                Enviar
              </button>
            </div>
          </motion.div>

          {/* Grid de 4 columnas en 2 grupos */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            
            {/* Grupo Izquierdo - SITEMAP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6 font-pp-neue">SITEMAP</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white hover:text-white/70 transition-colors duration-300 font-medium font-pp-neue">Inicio</a>
                <a href="#servicios" className="block text-white hover:text-white/70 transition-colors duration-300 font-medium font-pp-neue">Servicios</a>
                <a href="#pricing" className="block text-white hover:text-white/70 transition-colors duration-300 font-medium font-pp-neue">Precios</a>
                <a href="#proyectos" className="block text-white hover:text-white/70 transition-colors duration-300 font-medium font-pp-neue">Proyectos</a>
                <button
                  type="button"
                  onClick={() => setIsAboutModalOpen(true)}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 font-medium font-pp-neue"
                >
                  Nosotros
                </button>
              </div>
            </motion.div>

            {/* Grupo Izquierdo - COMPANY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6 font-pp-neue">COMPANY</h4>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleLegalClick('licenses')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue"
                >
                  Licensing
                </button>
                <button
                  type="button"
                  onClick={() => handleLegalClick('terms')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue"
                >
                  Terms & Conditions
                </button>
                <button
                  type="button"
                  onClick={() => handleLegalClick('privacy')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => handleLegalClick('cookies')}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue"
                >
                  Cookie Policy
                </button>
              </div>
            </motion.div>

            {/* Grupo Derecho - SOPORTE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6 font-pp-neue">SOPORTE</h4>
              <div className="space-y-3">
                <a 
                  href="#preguntas" 
                  onClick={handleFAQClick}
                  className="block text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue"
                >
                  FAQ
                </a>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="block text-left text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue"
                >
                  Soporte Técnico
                </button>
              </div>
            </motion.div>

            {/* Grupo Derecho - SOCIALS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-medium text-white/60 tracking-wider uppercase mb-6 font-pp-neue">SOCIALS</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue">LinkedIn</a>
                <a href="#" className="block text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue">Instagram</a>
                <a href="#" className="block text-white hover:text-white/70 transition-colors duration-300 text-sm font-medium font-pp-neue">X/Twitter</a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* DESKTOP - Texto grande "tangodev" y flecha original */}
        <div className="relative hidden lg:block mb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-pp-neue text-[21rem] text-stone-400 leading-none tracking-normal select-none pointer-events-none"
          >
            <span className="font-semibold">Tangodev</span>
          </motion.div>
          
          {/* Flecha diagonal hacia arriba-izquierda en la misma línea */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute top-12 right-0 font-pp-neue text-[21rem] text-stone-400 font-semibold select-none pointer-events-none leading-none"
          >
            ↩
          </motion.div>
        </div>

        {/* MOBILE - Texto grande "tangodev" centrado estilo referencia */}
        <div className="relative block lg:hidden mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-center font-pp-neue font-semibold text-[7rem] text-white leading-none tracking-tighter select-none pointer-events-none"
          >
            <span className="font-neue">Tangodev</span>
          </motion.div>
        </div>

        {/* DESKTOP - Footer inferior original */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex justify-between items-center gap-6 -mt-16"
        >
          <div className="text-white/90 text-sm font-pp-neue">
            ©{currentYear} TANGODEV. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div className="flex items-center gap-6 text-white/90 text-sm font-pp-neue">
            <span>LINKEDIN.</span>
            <span>INSTAGRAM.</span>
            <span>X/TWITTER</span>
          </div>
          <div className="text-white/90 text-sm font-pp-neue">
            HECHO CON ❤️ EN ARGENTINA
          </div>
        </motion.div>

        {/* MOBILE - Footer inferior centrado estilo referencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="block lg:hidden text-center space-y-4"
        >
          <div className="text-white/60 text-sm font-pp-neue tracking-wider">
            A THING BY TANGODEV
          </div>
          <div className="text-white/90 text-sm font-pp-neue">
            ©{currentYear} TANGODEV. ALL RIGHTS RESERVED.
          </div>
        </motion.div>

        <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    </footer>
    <LegalModal 
      isOpen={legalModalOpen} 
      onClose={() => {
        setLegalModalOpen(false);
        setLegalModalType(null);
      }}
      type={legalModalType}
    />
    </>
  );
};

export default Footer; 