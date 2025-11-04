import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { LOGIN_URL, SIGNUP_URL, MARKETING_DOMAIN } from '@/config/domains';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoColorIndex, setLogoColorIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  // Check if we're on app subdomain pages (access or dashboard)
  const isAppDomain = location.pathname.startsWith('/access') || location.pathname.startsWith('/dashboard');

  // Ref used to throttle scroll callbacks with requestAnimationFrame
  const scrollTickRef = useRef(false);

  const logoGradients = [
    'from-[#6713e1] via-[#8b5cf6] to-[#a78bfa]',
    'from-[#FF6B35] via-[#FF8C42] to-[#FFA07A]',
    'from-[#ec4899] via-[#f472b6] to-[#fb7185]',
    'from-[#3b82f6] via-[#60a5fa] to-[#93c5fd]',
    'from-[#10b981] via-[#34d399] to-[#6ee7b7]',
  ];

  useEffect(() => {
  // Throttle scroll updates using requestAnimationFrame to avoid flooding React renders

    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 100;
      if (scrollTickRef.current) return;
      scrollTickRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(shouldBeScrolled);
        scrollTickRef.current = false;
      });
    };

    // Use passive listener for better scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true } as EventListenerOptions);
  }, []);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setLogoColorIndex((prev) => (prev + 1) % logoGradients.length);
    }, 2500);
    return () => clearInterval(logoInterval);
  }, [logoGradients.length]);

  const navLinks = [
    { name: 'LEADS SCRAPER', path: '/product' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'DOWNLOAD EXTENSION', path: 'https://cookie-editor.com/', external: true },
    { name: 'CONNECT', path: '/connect' },
  ];

  const handleAuthClick = (e: React.MouseEvent<HTMLAnchorElement>, type: 'login' | 'signup') => {
    e.preventDefault();
    
    // If user is already logged in, redirect to dashboard
    if (!authLoading && user) {
      navigate('/dashboard');
    } else {
      // Otherwise, go to login/signup page
      window.location.href = type === 'login' ? LOGIN_URL : SIGNUP_URL;
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-6 right-6 z-50"
      style={{ backgroundColor: '#411c78', borderRadius: '16px' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {isAppDomain ? (
          <a href={MARKETING_DOMAIN || '/'} className="flex items-center">
            <motion.div
              className={`animate-shake font-bold text-[26px] tracking-tight transition-all duration-1000 bg-gradient-to-r ${logoGradients[logoColorIndex]} bg-clip-text text-transparent`}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
              }}
              style={{ willChange: 'transform, background-position' }}
            >
              DL
            </motion.div>
          </a>
        ) : (
          <Link to="/" className="flex items-center">
            <motion.div
              className={`animate-shake font-bold text-[26px] tracking-tight transition-all duration-1000 bg-gradient-to-r ${logoGradients[logoColorIndex]} bg-clip-text text-transparent`}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
              }}
              style={{ willChange: 'transform, background-position' }}
            >
              DL
            </motion.div>
          </Link>
        )}

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-bold hover:scale-105 transition-all duration-500 text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    willChange: 'transform',
                  }}
                >
                  {link.name}
                </a>
              ) : isAppDomain ? (
                <a
                  key={link.path}
                  href={`${MARKETING_DOMAIN}${link.path}`}
                  className="text-[15px] font-bold hover:scale-105 transition-all duration-500 text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    willChange: 'transform',
                  }}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[15px] font-bold hover:scale-105 transition-all duration-500 text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    willChange: 'transform',
                  }}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={LOGIN_URL} onClick={(e) => handleAuthClick(e, 'login')}>
              <Button
                variant="outline"
                className="inline-flex items-center justify-center text-[16px] px-4 md:px-5 py-2 md:py-2.5 rounded-xl min-h-[40px] transition-all duration-500 font-semibold border-white/40 text-white hover:bg-white/15 hover:border-white/60"
              >
                LOGIN
              </Button>
            </a>
            <a href={SIGNUP_URL} onClick={(e) => handleAuthClick(e, 'signup')}>
              <Button className="inline-flex items-center justify-center text-[16px] px-4 md:px-5 py-2 md:py-2.5 rounded-xl min-h-[40px] hover:shadow-lg hover:scale-[1.03] transition-all duration-500 ease-in-out font-semibold bg-white text-[#411c78] hover:bg-white/90">
                SIGNUP
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
