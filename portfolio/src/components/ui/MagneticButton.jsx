import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const getCanHover = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
};

const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canHover, setCanHover] = useState(getCanHover);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    
    const handler = (e) => setCanHover(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  const handleMouse = (e) => {
    if (!canHover || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.18, y: middleY * 0.18 });
  };

  const reset = () => {
    if (canHover) {
      setPosition({ x: 0, y: 0 });
    }
  };

  if (!canHover) {
    return (
      <button
        ref={ref}
        className={`magnetic-btn ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.1 }}
      className={`magnetic-btn ${className || ''}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
