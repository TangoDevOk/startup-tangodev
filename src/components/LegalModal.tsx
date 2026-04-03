'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

type LegalType = 'licenses' | 'terms' | 'privacy' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType | null;
}

const legalContent = {
  licenses: {
    title: 'Licencias',
    subtitle: 'Información sobre nuestras licencias y permisos',
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">1. Licencias de Software</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Todos los productos y servicios web desarrollados por TangoDev están sujetos a las siguientes condiciones de licencia:
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>El cliente adquiere una licencia de uso exclusiva para el proyecto contratado.</li>
            <li>El código fuente permanece bajo propiedad de TangoDev hasta el pago completo del proyecto.</li>
            <li>Una vez finalizado el pago, se transfieren los derechos de uso al cliente.</li>
            <li>Queda prohibida la redistribución o venta del código sin autorización escrita.</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">2. Licencias de Contenido</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            El contenido proporcionado por el cliente (textos, imágenes, videos) debe estar libre de restricciones de derechos de autor.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">3. Terceros y Dependencias</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Los proyectos pueden incluir librerías de código abierto sujetas a sus propias licencias (MIT, Apache, etc.). 
            TangoDev garantiza el cumplimiento de todas las licencias de terceros utilizadas.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">4. Modificaciones y Actualizaciones</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Las actualizaciones y modificaciones posteriores a la entrega del proyecto pueden estar sujetas a acuerdos adicionales 
            y pueden generar costos adicionales.
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    )
  },
  terms: {
    title: 'Términos y Condiciones',
    subtitle: 'Condiciones generales de uso de nuestros servicios',
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">1. Aceptación de los Términos</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Al contratar los servicios de TangoDev, usted acepta estar sujeto a estos términos y condiciones. 
            Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">2. Descripción de los Servicios</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            TangoDev ofrece servicios de desarrollo web, incluyendo pero no limitado a: desarrollo de sitios web, 
            aplicaciones web, e-commerce, landing pages, APIs y servicios en la nube.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">3. Pagos y Facturación</h3>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>Los pagos se realizarán según lo acordado en el contrato de servicios.</li>
            <li>Se requiere un depósito inicial para comenzar el trabajo.</li>
            <li>El saldo restante se debe pagar antes de la entrega final del proyecto.</li>
            <li>Los pagos atrasados pueden resultar en la suspensión del trabajo.</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">4. Responsabilidades del Cliente</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            El cliente es responsable de proporcionar contenido, información y materiales necesarios para completar el proyecto. 
            Los retrasos en la provisión de estos materiales pueden afectar los plazos de entrega.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">5. Garantías y Limitaciones</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            TangoDev garantiza que el trabajo cumplirá con las especificaciones acordadas. Sin embargo, no garantizamos 
            resultados específicos de negocio ni somos responsables por decisiones comerciales del cliente.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">6. Cancelaciones y Reembolsos</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Las cancelaciones deben comunicarse por escrito. El depósito inicial no es reembolsable. 
            Los pagos por trabajo completado no serán reembolsados.
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    )
  },
  privacy: {
    title: 'Política de Privacidad',
    subtitle: 'Cómo protegemos y utilizamos tu información personal',
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">1. Información que Recopilamos</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Recopilamos información que usted nos proporciona directamente, incluyendo:
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>Nombre y datos de contacto (email, teléfono)</li>
            <li>Información del proyecto y requisitos</li>
            <li>Información de facturación y pago</li>
            <li>Comunicaciones con nuestro equipo</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">2. Uso de la Información</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Utilizamos la información recopilada para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>Proporcionar y mejorar nuestros servicios</li>
            <li>Comunicarnos con usted sobre su proyecto</li>
            <li>Procesar pagos y enviar facturas</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">3. Compartir Información</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            No vendemos ni alquilamos su información personal. Podemos compartir información únicamente en las siguientes circunstancias:
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>Con su consentimiento explícito</li>
            <li>Para cumplir con obligaciones legales</li>
            <li>Con proveedores de servicios de confianza (hosting, pagos) que necesitan la información para realizar su trabajo</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">4. Seguridad de los Datos</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal 
            contra acceso no autorizado, pérdida o destrucción.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">5. Sus Derechos</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Usted tiene derecho a acceder, rectificar, eliminar o solicitar la portabilidad de sus datos personales. 
            Puede ejercer estos derechos contactándonos en tangodev08@gmail.com
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    )
  },
  cookies: {
    title: 'Política de Cookies',
    subtitle: 'Información sobre el uso de cookies en nuestro sitio',
    content: (
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">1. ¿Qué son las Cookies?</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. 
            Estas nos ayudan a proporcionar una mejor experiencia de usuario.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">2. Tipos de Cookies que Utilizamos</h3>
          
          <div className="mb-4">
            <h4 className="text-lg font-medium text-white font-pp-neue mb-2">Cookies Esenciales</h4>
            <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-3">
              Son necesarias para el funcionamiento básico del sitio y no pueden desactivarse.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-white font-pp-neue mb-2">Cookies de Rendimiento</h4>
            <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-3">
              Nos ayudan a entender cómo los visitantes interactúan con el sitio recopilando información anónima.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-white font-pp-neue mb-2">Cookies de Funcionalidad</h4>
            <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-3">
              Permiten que el sitio recuerde sus preferencias para proporcionar características mejoradas y personalizadas.
            </p>
          </div>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">3. Cookies de Terceros</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Podemos utilizar servicios de terceros (como Google Analytics) que también establecen cookies. 
            Estas cookies están sujetas a las políticas de privacidad de esos terceros.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">4. Gestión de Cookies</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su 
            dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen.
          </p>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Tenga en cuenta que si desactiva las cookies, algunas funcionalidades del sitio pueden no estar disponibles.
          </p>
        </section>

        <section className="pt-6 border-t border-stone-800">
          <h3 className="text-xl font-medium text-white font-pp-neue mb-4">5. Más Información</h3>
          <p className="text-stone-300 text-base leading-relaxed font-pp-neue mb-4">
            Para obtener más información sobre cómo gestionar las cookies en diferentes navegadores, puede visitar:
          </p>
          <ul className="list-disc list-inside space-y-2 text-stone-300 text-base leading-relaxed font-pp-neue ml-4">
            <li>Chrome: chrome://settings/cookies</li>
            <li>Firefox: about:preferences#privacy</li>
            <li>Safari: Preferencias → Privacidad</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-stone-800 text-stone-400 text-sm font-pp-neue">
          <p>Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    )
  }
};

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
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
    } else if (overlayRef.current && modalRef.current) {
      // Animación de cierre
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
  }, [isOpen]);

  if (!isOpen || !type) return null;

  const content = legalContent[type];

  return (
    <div className="fixed inset-0 z-[9999]">
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
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Contenido */}
        <div
          ref={contentRef}
          className="relative h-full overflow-y-auto p-8 lg:p-12"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="text-stone-400 text-sm font-pp-neue font-medium tracking-[0.2em] uppercase mb-4">
              INFORMACIÓN LEGAL
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
}




