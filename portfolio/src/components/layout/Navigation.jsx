import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll cleanly when mobile menu is open without layout shift
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Primary desktop links matching exact specification:
  // WORK, ABOUT, EXPERIMENTS, CREATIVE, CONTACT
  const desktopNavLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIMENTS', href: '#experiments' },
    { name: 'CREDENTIALS', href: '#certificates' },
    { name: 'CONTACT', href: '#contact' },
  ];

  // Complete mobile navigation allowing users to jump to all core destinations
  const mobileNavLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIMENTS', href: '#experiments' },
    { name: 'CREDENTIALS', href: '#certificates' },
    { name: 'JOURNEY', href: '#journey' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header>
      <motion.nav
        className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main Navigation"
      >
        <div className="nav-inner">
          <a href="#top" className="nav-logo" onClick={handleLogoClick} aria-label="Sujith Harsha - Back to top">
            SH
          </a>
          
          <div className="nav-links desktop-only" role="menubar">
            {desktopNavLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                className="nav-link"
                role="menuitem"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <button 
            className="mobile-menu-btn mobile-only"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="mobile-menu-header">
              <a href="#top" className="nav-logo" onClick={handleLogoClick} aria-label="Sujith Harsha - Back to top">
                SH
              </a>
              <button 
                className="mobile-menu-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="mobile-menu-links">
              {mobileNavLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="mobile-nav-link"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              <a 
                href="mailto:sujitharshat@gmail.com" 
                className="mobile-menu-email"
                onClick={() => setMobileMenuOpen(false)}
              >
                sujitharshat@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
