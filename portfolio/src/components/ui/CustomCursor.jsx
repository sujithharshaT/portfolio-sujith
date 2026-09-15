import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [clicked, setClicked] = useState(false);
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('input') || e.target.closest('textarea')) {
        setCursorVariant('hidden');
        setCursorText('');
      } else if (e.target.closest('a') || e.target.closest('button')) {
        setCursorVariant('hover');
        setCursorText('');
      } else if (e.target.closest('.project-card') || e.target.closest('.creative-card') || e.target.closest('.gallery-item') || e.target.closest('.certificate-card')) {
        setCursorVariant('project');
        setCursorText('VIEW');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Dot variants
  const dotVariants = {
    default: { x: mousePosition.x - 3, y: mousePosition.y - 3, scale: 1, opacity: 1 },
    hover: { x: mousePosition.x - 3, y: mousePosition.y - 3, scale: 0, opacity: 0 },
    project: { x: mousePosition.x - 3, y: mousePosition.y - 3, scale: 0, opacity: 0 },
    hidden: { x: mousePosition.x - 3, y: mousePosition.y - 3, scale: 0, opacity: 0 }
  };

  // Ring variants
  const ringVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      scale: clicked ? 0.8 : 1,
      opacity: 1,
      transition: { type: 'spring', mass: 0.15, stiffness: 600, damping: 40 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid var(--accent-cyan-solid)',
      scale: clicked ? 0.9 : 1,
      opacity: 1,
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 50 }
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'var(--text-white)',
      border: 'none',
      scale: clicked ? 0.9 : 1,
      opacity: 1,
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 50 }
    },
    hidden: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 0,
      width: 0,
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={dotVariants}
        animate={cursorVariant}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: 'var(--text-white)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <motion.div
        className="cursor-ring"
        variants={ringVariants}
        animate={cursorVariant}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--bg-deep-black)',
          fontSize: '0.8rem',
          fontWeight: '700',
          letterSpacing: '0.05em'
        }}
      >
        {cursorVariant === 'project' && cursorText}
      </motion.div>
    </>
  );
};

export default CustomCursor;
