import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { contacts } from '../data/mockContacts';

const ContactDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<'locked' | 'unlocking' | 'revealed'>('locked');
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-10, 10], [5, -5]);
  const rotateY = useTransform(x, [-10, 10], [-5, 5]);

  const currentContact = contacts[currentIndex];

  // Detect scroll to disable 3D effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      x.set(0);
      y.set(0);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [x, y]);

  useEffect(() => {
    const cycle = async () => {
      setStage('locked');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStage('unlocking');
      setProgress(0);
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 5;
        });
      }, 40);
      await new Promise((resolve) => setTimeout(resolve, 1600));
      
      setStage('revealed');
      await new Promise((resolve) => setTimeout(resolve, 1600));
      
      setCurrentIndex((prev) => (prev + 1) % contacts.length);
    };
    cycle();
  }, [currentIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !isHovering || isScrolling) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX / 20);
    y.set(offsetY / 20);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  const upcomingContacts = contacts
    .slice(currentIndex + 1, currentIndex + 6)
    .concat(contacts.slice(0, Math.max(0, currentIndex + 6 - contacts.length)));

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX: shouldReduceMotion || isScrolling ? 0 : rotateX, 
          rotateY: shouldReduceMotion || isScrolling ? 0 : rotateY,
        }}
        className="relative overflow-visible"
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-[60]">
          <motion.div
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className="relative flex items-center justify-center"
          >
            <div className="p-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full ring-2 ring-white overflow-hidden">
                <img
                  src={currentContact.avatar}
                  alt="Contact avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        <div 
          className="relative bg-white/5 backdrop-blur-xl rounded-2xl ring-1 ring-white/10 overflow-hidden pt-12 pb-6 px-6 space-y-4"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            transform: 'translate3d(0, 0, 0)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(255,107,53,0.03) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle at top right, rgba(255, 107, 53, 0.15), transparent 60%)',
            }}
          />
          
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold text-lg">
              {currentContact.name}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70 border border-white/20">
              {stage === 'locked' ? 'Locked' : stage === 'unlocking' ? 'Unlocking' : 'Unlocked'}
            </span>
          </div>
          
          {stage !== 'revealed' && (
            <p className="text-white/70 text-sm">
              {currentContact.company}
            </p>
          )}
          
          {stage === 'locked' && (
            <motion.button
              className="w-full py-3 bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] text-black rounded-full font-medium"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Unlock details
            </motion.button>
          )}
          
          {stage === 'unlocking' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 relative"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="absolute inset-0 shimmer" />
                </motion.div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs border border-emerald-500/30">
                  Pattern
                </div>
                <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30">
                  SMTP
                </div>
                <div className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-full text-xs border border-fuchsia-500/30">
                  Sources
                </div>
              </div>
            </motion.div>
          )}
          
          {stage === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Title</span>
                <span className="text-white">{currentContact.role}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Email</span>
                <span className="text-emerald-300 font-mono sparkle-effect flex items-center gap-1">
                  {currentContact.email}
                  <Copy className="w-4 h-4 text-white/60" />
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">LinkedIn</span>
                <a
                  href={currentContact.linkedin}
                  className="text-cyan-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Location</span>
                <span className="text-white">{currentContact.location}</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex gap-2 justify-center overflow-hidden"
      >
        {upcomingContacts.map((contact, idx) => (
          <motion.div
            key={`${contact.name}-${idx}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="px-3 py-1 bg-white/8 backdrop-blur-sm rounded-full text-white/70 text-sm border border-white/15 whitespace-nowrap"
          >
            {contact.name.split(' ')[0]}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContactDemo;
