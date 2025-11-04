import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface FeaturePillsProps {
  features: Feature[];
  activeIndex: number;
}

const FeaturePills = ({ features, activeIndex }: FeaturePillsProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  const pillGradients = [
    'from-[#14F195] via-[#00D4FF] to-[#0EA5E9]',
    'from-[#FF6B9D] via-[#FFA500] to-[#FBBF24]',
    'from-[#9945FF] via-[#C026D3] to-[#EC4899]',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="overflow-x-auto scrollbar-hide"
    >
      <div className="flex gap-3 justify-center items-center whitespace-nowrap pb-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const gradient = pillGradients[index % pillGradients.length];
          return (
            <motion.div
              key={index}
              animate={{
                scale: activeIndex === index ? 1.05 : 1,
                opacity: activeIndex === index ? 1 : 0.85,
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
              style={{
                transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                willChange: 'transform, opacity',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <Icon 
                className={`w-5 h-5 bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${!shouldReduceMotion ? 'animate-rainbow' : ''}`}
                style={{ 
                  willChange: shouldReduceMotion ? 'auto' : 'background-position',
                  transform: 'translate3d(0, 0, 0)',
                }}
              />
              <span 
                className={`text-[20px] font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${!shouldReduceMotion ? 'animate-rainbow' : ''}`}
                style={{ 
                  willChange: shouldReduceMotion ? 'auto' : 'background-position',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {feature.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FeaturePills;
