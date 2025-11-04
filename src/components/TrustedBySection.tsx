import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TrustedBySectionProps {
  activeIndex: number;
}

const TrustedBySection = ({ activeIndex }: TrustedBySectionProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  const logos = [
    { name: 'Clay', url: 'https://clay.earth' },
    { name: 'ContactOut', url: 'https://contactout.com' },
    { name: 'Skrapp', url: 'https://skrapp.io' },
    { name: 'MillionVerifier', url: 'https://millionverifier.com' },
    { name: 'ZeroBounce', url: 'https://zerobounce.net' },
    { name: 'Apollo', url: 'https://apollo.io' },
    { name: 'ZoomInfo', url: 'https://zoominfo.com' },
    { name: 'Clearout', url: 'https://clearout.io' },
  ];

  const brandGradients: Record<string, string> = {
    Clay: 'from-emerald-400 to-teal-300',
    ContactOut: 'from-sky-400 to-cyan-300',
    Skrapp: 'from-fuchsia-400 to-violet-400',
    MillionVerifier: 'from-amber-300 to-orange-400',
    ZeroBounce: 'from-rose-400 to-red-400',
    Apollo: 'from-indigo-400 to-blue-400',
    ZoomInfo: 'from-lime-300 to-emerald-400',
    Clearout: 'from-purple-400 to-pink-400',
  };

  return (
    <section className="relative px-6 md:px-12 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center uppercase tracking-wide text-white/70 text-xs mb-3"
        >
          Trusted by
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-4 justify-center items-center whitespace-nowrap pb-2 flex-wrap">
            {logos.map((logo, index) => {
              const gradient = brandGradients[logo.name] ?? 'from-white to-white';
              return (
                <motion.div
                  key={logo.name}
                  animate={{
                    scale: activeIndex === index ? 1.08 : 1,
                    opacity: activeIndex === index ? 1 : 0.85,
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className={`inline-flex items-center justify-center px-5 py-2 rounded-lg whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${!shouldReduceMotion ? 'animate-rainbow' : ''}`}
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    willChange: shouldReduceMotion ? 'transform, opacity' : 'transform, opacity, background-position',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  <span className="text-lg font-bold tracking-tight">
                    {logo.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
