import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle = ({ text, className = '' }: AnimatedTitleProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  const gradients = [
    'from-[#14F195] via-[#00D4FF] to-[#9945FF]',
    'from-[#FF6B9D] via-[#FFA500] to-[#FFD700]',
    'from-[#9945FF] via-[#FF6B9D] to-[#00D4FF]',
    'from-[#00D4FF] via-[#14F195] to-[#9945FF]',
  ];

  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [gradients.length, shouldReduceMotion]);

  return (
    <motion.span
      animate={shouldReduceMotion ? {} : {
        rotate: [0, -0.3, 0.3, -0.3, 0],
        y: [0, -1, 0, -1, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: [0.4, 0.0, 0.2, 1],
        repeatType: "loop",
      }}
      className={`inline-block bg-gradient-to-r ${gradients[currentGradient]} bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: shouldReduceMotion ? 'none' : 'gradient-shift 4s ease-in-out infinite',
        transition: 'all 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        willChange: shouldReduceMotion ? 'auto' : 'transform, background-position',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedTitle;
