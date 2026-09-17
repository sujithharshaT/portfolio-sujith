import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    
    const updateEnabledState = () => {
      setIsEnabled(mediaQuery.matches);
    };

    updateEnabledState();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabledState);
    } else {
      mediaQuery.addListener(updateEnabledState);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateEnabledState);
      } else {
        mediaQuery.removeListener(updateEnabledState);
      }
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('input') || target.closest('textarea')) {
        setCursorVariant('hidden');
        setCursorText('');
      } else if (
        target.closest('.project-card') || 
        target.closest('.creative-card') || 
        target.closest('.certificate-card') ||
        target.closest('.experiment-card')
      ) {
        setCursorVariant('project');
        setCursorText('VIEW');
      } else if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', mouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

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
      x: mousePosition.x - 36,
      y: mousePosition.y - 36,
      height: 72,
      width: 72,
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
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.08em'
        }}
      >
        {cursorVariant === 'project' && cursorText}
      </motion.div>
    </>
  );
};

export default CustomCursor;
