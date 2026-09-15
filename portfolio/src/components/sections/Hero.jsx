import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import MagneticButton from '../ui/MagneticButton';
import Hero3D from '../ui/Hero3D';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 40; // max 20px movement
      const y = (clientY / innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="top" ref={containerRef}>
      {/* 3D Metallic Centerpiece */}
      <Hero3D />

      {/* Content */}
      <motion.div 
        className="hero-content container"
        style={{ y: y1, opacity }}
      >
        <motion.div
          className="parallax-layer-1"
          style={{ x: mousePos.x * -1, y: mousePos.y * -1 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">{PORTFOLIO_DATA.personal.name}</h1>
        </motion.div>
        
        <motion.div
          className="parallax-layer-2"
          style={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="hero-role">{PORTFOLIO_DATA.personal.role}</h2>
        </motion.div>

        <motion.div
          className="hero-statements parallax-layer-3"
          style={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="hero-statement-main">{PORTFOLIO_DATA.personal.shortStatement}</p>
          <p className="hero-statement-sub">{PORTFOLIO_DATA.personal.secondaryStatement}</p>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
