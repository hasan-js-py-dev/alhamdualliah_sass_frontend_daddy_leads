import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated background with twinkling stars and 3D metallic orange ribbons.
 * Creates a modern, tech-focused atmosphere behind the hero content.
 */
const AnimatedBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  // Generate random stars - reduced count for better performance
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <>
      {/* Animated stars layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              transform: 'translate3d(0, 0, 0)',
            }}
            animate={shouldReduceMotion || isScrolling ? {} : {
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* 3D Metallic Orange Ribbons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
        {/* Main ribbon 1 */}
        <motion.div
          className="absolute top-1/4 right-[-10%] w-[600px] h-[400px]"
          animate={shouldReduceMotion || isScrolling ? {} : {
            y: [0, -20, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff8c42 100%)',
            borderRadius: '50% 40% 60% 50% / 60% 50% 40% 50%',
            transform: 'perspective(1000px) rotateY(-20deg) rotateX(10deg) translate3d(0, 0, 0)',
            boxShadow: '0 20px 60px rgba(255, 107, 53, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.2)',
            filter: 'blur(1px)',
            opacity: 0.6,
          }}
        />

        {/* Ribbon 2 */}
        <motion.div
          className="absolute top-1/3 right-[5%] w-[450px] h-[350px]"
          animate={shouldReduceMotion || isScrolling ? {} : {
            y: [0, 15, 0],
            rotateZ: [0, -3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            background: 'linear-gradient(165deg, #ff8c42 0%, #ff6b35 50%, #f7931e 100%)',
            borderRadius: '60% 50% 40% 60% / 50% 60% 50% 40%',
            transform: 'perspective(1000px) rotateY(15deg) rotateX(-5deg) translate3d(0, 0, 0)',
            boxShadow: '0 15px 50px rgba(247, 147, 30, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.15)',
            filter: 'blur(0.5px)',
            opacity: 0.5,
          }}
        />

        {/* Ribbon 3 - smaller accent */}
        <motion.div
          className="absolute top-[45%] right-[20%] w-[300px] h-[250px]"
          animate={shouldReduceMotion || isScrolling ? {} : {
            y: [0, -10, 0],
            rotateZ: [0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            background: 'linear-gradient(145deg, #f7931e 0%, #ff6b35 50%, #ff8c42 100%)',
            borderRadius: '40% 60% 50% 40% / 60% 40% 60% 50%',
            transform: 'perspective(1000px) rotateY(-10deg) rotateX(15deg) translate3d(0, 0, 0)',
            boxShadow: '0 10px 40px rgba(255, 140, 66, 0.35), inset 0 0 25px rgba(255, 255, 255, 0.2)',
            filter: 'blur(0.8px)',
            opacity: 0.55,
          }}
        />

        {/* Additional geometric accent circles */}
        <motion.div
          className="absolute top-[20%] right-[15%] w-[150px] h-[150px] rounded-full"
          animate={shouldReduceMotion || isScrolling ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
            filter: 'blur(20px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <motion.div
          className="absolute top-[60%] right-[8%] w-[120px] h-[120px] rounded-full"
          animate={shouldReduceMotion || isScrolling ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          style={{
            background: 'radial-gradient(circle, #f7931e 0%, transparent 70%)',
            filter: 'blur(25px)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>
    </>
  );
};

export default AnimatedBackground;
