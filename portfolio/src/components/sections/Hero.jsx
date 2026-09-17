import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import MagneticButton from '../ui/MagneticButton';
import Hero3D from '../ui/Hero3D';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 140]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDesktop = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!isDesktop) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 30;
        setMousePos({ x, y });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="top" ref={containerRef}>
      {/* 3D Metallic Centerpiece with graceful fallbacks */}
      <Hero3D />

      {/* Content */}
      <motion.div 
        className="hero-content container"
        style={{ y: y1, opacity }}
      >
        <motion.div
          className="parallax-layer-1"
          style={{ x: mousePos.x * -0.8, y: mousePos.y * -0.8 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">{PORTFOLIO_DATA.personal.name}</h1>
        </motion.div>
        
        <motion.div
          className="parallax-layer-2"
          style={{ x: mousePos.x * -0.4, y: mousePos.y * -0.4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="hero-role">{PORTFOLIO_DATA.personal.role}</h2>
        </motion.div>

        <motion.div
          className="hero-statements parallax-layer-3"
          style={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-statement-main">{PORTFOLIO_DATA.personal.shortStatement}</p>
          <p className="hero-statement-sub">{PORTFOLIO_DATA.personal.secondaryStatement}</p>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton className="btn-primary" onClick={() => scrollToSection('work')}>
            EXPLORE MY WORK
          </MagneticButton>
          <MagneticButton className="btn-secondary" onClick={() => scrollToSection('contact')}>
            LET'S CONNECT
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
