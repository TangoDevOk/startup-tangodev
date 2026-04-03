'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('basics');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const tabs = [
    { id: 'basics', label: 'Conceptos Básicos' },
    { id: 'process', label: 'Proceso de Trabajo' },
    { id: 'pricing', label: 'Precios y Pagos' },
    { id: 'support', label: 'Post-lanzamiento' }
  ];

  const faqsByCategory = {
    basics: [
      {
        question: "¿Qué es una landing page?",
        answer: "Una landing page es una página web diseñada específicamente para convertir visitantes en clientes o leads. A diferencia de un sitio web completo, se enfoca en una sola acción: que el usuario se registre, compre, descargue algo o deje sus datos de contacto. Es ideal para campañas de marketing, lanzamientos de productos o validar ideas de negocio."
      },
      {
        question: "¿Qué es un e-commerce o tienda online?",
        answer: "Un e-commerce es un sitio web donde podés vender productos o servicios directamente. Incluye catálogo de productos con fotos y descripciones, carrito de compras, pasarela de pagos para procesar tarjetas o transferencias, sistema de envíos, y un panel de administración donde gestionás stock, precios y pedidos. Es tu negocio funcionando 24/7 sin necesidad de local físico."
      },
      {
        question: "¿Qué es una aplicación web o SaaS?",
        answer: "Es software que funciona en el navegador sin necesidad de instalar nada. Piensa en Google Docs, Notion o Spotify Web. Incluye funcionalidades complejas como sistemas de usuarios, dashboards personalizados, procesamiento de datos en tiempo real, integraciones con otros servicios. Es la solución cuando necesitás algo más allá de un sitio web informativo o tienda básica."
      },
      {
        question: "¿Qué es un sitio web corporativo?",
        answer: "Es la presencia digital de tu empresa: quiénes son, qué hacen, cómo contactarlos. Incluye páginas institucionales (Nosotros, Servicios, Contacto), está optimizado para SEO para aparecer en Google, y proyecta profesionalismo. A diferencia de una landing page que busca una conversión específica, un sitio corporativo es más informativo y completo."
      },
      {
        question: "¿Cuál es la diferencia entre sitio web y aplicación web?",
        answer: "Un sitio web es principalmente informativo: mostrás contenido que el usuario lee (como una revista digital). Una aplicación web es interactiva: el usuario realiza acciones complejas como gestionar proyectos, editar documentos, procesar pagos. Si solo necesitás mostrar información y recibir formularios, es un sitio web. Si necesitás que los usuarios hagan tareas específicas con datos, es una aplicación."
      },
      {
        question: "¿Necesito conocimientos técnicos para trabajar con nosotros?",
        answer: "Para nada. Nuestra responsabilidad es traducir tus ideas de negocio en soluciones técnicas. Hablamos en lenguaje claro, sin jerga innecesaria. Te explicamos cada decisión técnica importante y por qué la recomendamos, pero vos no necesitás saber programar ni entender de tecnología."
      }
    ],
    process: [
      {
        question: "¿Cuánto tiempo toma desarrollar un proyecto web?",
        answer: "Una landing page optimizada toma entre 1-2 semanas. Un sitio web corporativo completo entre 2-4 semanas. Aplicaciones web más complejas pueden requerir 1-3 meses. Trabajamos con sprints ágiles y entregas incrementales para que veas progreso constante desde la primera semana."
      },
      {
        question: "¿Necesito tener diseños listos antes de empezar?",
        answer: "No es necesario. Nuestro proceso incluye la fase de diseño completa. Partimos de tu idea o referencias que te gusten, creamos wireframes, diseños de alta fidelidad y los iteramos contigo hasta que estés 100% conforme antes de escribir una sola línea de código."
      },
      {
        question: "¿Qué pasa si quiero hacer cambios durante el desarrollo?",
        answer: "Los cambios son parte natural del proceso. Durante el desarrollo hacemos revisiones semanales donde podés solicitar ajustes. Cambios menores están incluidos. Para cambios grandes que modifiquen el alcance original, te presentamos opciones y ajustamos timeline y presupuesto de forma transparente."
      },
      {
        question: "¿Qué tecnologías usan y por qué?",
        answer: "Trabajamos principalmente con React, Next.js y TypeScript para el frontend, y Node.js para el backend. Son tecnologías modernas, probadas en producción por empresas como Netflix y Airbnb. Esto garantiza que tu sitio sea rápido, seguro, fácil de mantener y que cualquier desarrollador pueda trabajar con el código en el futuro."
      }
    ],
    pricing: [
      {
        question: "¿Cómo funcionan los precios?",
        answer: "Ofrecemos rangos de referencia según el tipo de proyecto. El precio final se ajusta según alcance específico, funcionalidades requeridas, integraciones necesarias y timeline. La primera consulta es sin costo: conversamos sobre tu proyecto, te damos una estimación honesta y armamos una propuesta detallada."
      },
      {
        question: "¿Incluyen hosting, dominio y mantenimiento?",
        answer: "El hosting y dominio pueden ser incluidos o podés usar tu proveedor preferido. Ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, backups diarios, monitoreo 24/7 y soporte técnico. También podés administrarlo vos mismo una vez entregado el proyecto."
      },
      {
        question: "¿Aceptan pagos en cuotas o por etapas?",
        answer: "Sí, trabajamos con pagos por etapas para proyectos medianos y grandes. Típicamente: 40% al inicio, 40% a mitad del desarrollo, y 20% al finalizar. Para proyectos más chicos podemos dividirlo en 2 pagos. Aceptamos transferencias, tarjetas y criptomonedas."
      }
    ],
    support: [
      {
        question: "¿Ofrecen soporte después del lanzamiento?",
        answer: "Sí, todos los proyectos incluyen 30 días de garantía post-lanzamiento para correcciones de bugs. Además ofrecemos planes de soporte mensual que incluyen actualizaciones, monitoreo, backups automáticos y atención prioritaria para cambios o nuevas funcionalidades."
      },
      {
        question: "¿Puedo hacer cambios después de que esté listo?",
        answer: "Absolutamente. Te entregamos el código fuente completo y documentación. Podés hacer cambios vos mismo, contratar otro desarrollador, o contratarnos para actualizaciones futuras. No hay vendor lock-in: es tu proyecto y tenés control total."
      },
      {
        question: "¿Me capacitan para administrar el sitio?",
        answer: "Sí, incluimos sesiones de capacitación según el proyecto. Te enseñamos a actualizar contenido, agregar productos (en e-commerce), revisar estadísticas y hacer tareas administrativas básicas. También dejamos documentación escrita y videos tutoriales para consultar cuando lo necesites."
      }
    ]
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
                Preguntas frecuentes
              </motion.h2>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue max-w-md mb-8 text-center"
              >
                Respuestas rápidas a las dudas más comunes sobre nuestro proceso de trabajo y servicios.
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
