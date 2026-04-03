'use client';

import { useRef } from 'react';

interface GridMotionProps {
  items?: (string | React.ReactElement)[];
  gradientColor?: string;
}

const GridMotion = ({ items = [], gradientColor = 'black' }: GridMotionProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Duplicar items 4 veces para asegurar loop infinito sin costuras
  const baseItems = items.length > 0 ? items : Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`);
  const loopItems = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden" style={{ perspective: '1000px' }}>
      <style>{`
        @keyframes marqueeRight {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25%, 0, 0); }
        }
        @keyframes marqueeLeft {
          0% { transform: translate3d(-25%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-right {
          animation: marqueeRight 120s linear infinite;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .animate-marquee-left {
          animation: marqueeLeft 120s linear infinite;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        {/* Grid con perspectiva 3D */}
        <div 
          className="gap-1 flex-none relative w-[180vw] h-[180vh] grid grid-rows-5 grid-cols-1 z-[2] scale-75"
          style={{
            transform: 'rotateX(45deg) rotateZ(-12deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {[...Array(5)].map((_, rowIndex) => {
            const isEven = rowIndex % 2 === 0;
            return (
              <div
                key={rowIndex}
                className={`grid gap-1 grid-cols-8 ${isEven ? 'animate-marquee-right' : 'animate-marquee-left'}`}
                style={{ willChange: 'transform' }}
              >
                {loopItems.slice(0, 8).map((content, itemIndex) => {
                  const isImage = typeof content === 'string' && (content.startsWith('http') || content.startsWith('/'));
                  return (
                    <div key={itemIndex} className="relative">
                      <div className="relative w-full h-full overflow-hidden rounded-[6px] bg-[#0a0a0a] flex items-center justify-center text-white text-[0.875rem] shadow-lg">
                        {isImage ? (
                          <div
                            className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                            style={{ backgroundImage: `url(${content})` }}
                          ></div>
                        ) : (
                          <div className="p-3 text-center z-[1] text-sm font-medium">{content}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;

