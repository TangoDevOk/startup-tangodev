'use client';

import GridMotion from './GridMotion';

export default function WebDevelopmentCard() {
  const gridItems = [
    '/imgs/paradatierrasur.jpg',
    '/imgs/kal.png',
    '/imgs/berti1.jpg',
    '/imgs/hechos.ar.jpg',
    '/imgs/rentix.png',
    '/imgs/imagencordobaimports1.jpg',
  ];

  return (
    <div 
      className="relative rounded-2xl flex flex-col h-full min-h-[400px] overflow-hidden" 
      style={{backgroundColor: 'rgba(239, 238, 236, 0.06)'}}
    >

      <div className="relative z-20 p-6 pl-8 pr-8 lg:pt-8 lg:pl-10 lg:pr-10 flex flex-col" style={{ backgroundColor: '#0e0e0d' }}>
        <div className="mb-6">
          <span className="text-xs font-semibold text-stone-500 tracking-[0.2em] uppercase font-pp-neue">
            SITIOS WEB
          </span>
        </div>
        <h3 className="text-stone-200 text-2xl lg:text-3xl font-medium font-pp-neue mb-4">
          Landings que convierten, sin complicaciones
        </h3>
        <p className="text-stone-400 text-base lg:text-[21.3333px] leading-relaxed font-medium font-pp-neue mb-8">
          Páginas enfocadas en performance y conversión.
          Carga rápida, SEO básico desde el inicio y estructura lista para campañas o lanzamientos.
        </p>
      </div>

      <div className="relative h-[250px] lg:h-[250px] overflow-hidden flex-grow" style={{ backgroundColor: '#0e0e0d' }}>
        {/* Grid con área extra - posicionado para que pueda moverse sin salirse */}
        <div 
          className="absolute -inset-[100px] z-10"
        >
          <div className="w-full h-full relative">
            <GridMotion items={gridItems} gradientColor="rgba(0, 0, 0, 0.5)" />
          </div>
        </div>

        {/* Máscara superior SUAVE */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 z-[25] pointer-events-none" 
          style={{
            background: 'linear-gradient(to bottom, #0e0e0d 0%, #0e0e0d 20%, rgba(14, 14, 13, 0.8) 40%, rgba(14, 14, 13, 0.4) 70%, transparent 100%)'
          }}
        />

        {/* Máscaras laterales SUAVES */}
        <div 
          className="absolute inset-y-0 left-0 w-20 z-[24] pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #0e0e0d 0%, rgba(14, 14, 13, 0.7) 30%, rgba(14, 14, 13, 0.3) 70%, transparent 100%)'
          }}
        />
        <div 
          className="absolute inset-y-0 right-0 w-20 z-[24] pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #0e0e0d 0%, rgba(14, 14, 13, 0.7) 30%, rgba(14, 14, 13, 0.3) 70%, transparent 100%)'
          }}
        />
        
        {/* Vignette radial muy sutil */}
        <div 
          className="absolute inset-0 z-[20] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 20%, transparent 0%, transparent 60%, rgba(14, 14, 13, 0.15) 85%, rgba(14, 14, 13, 0.3) 100%)'
          }}
        />
      </div>
    </div>
  );
}
