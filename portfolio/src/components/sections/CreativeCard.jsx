import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CreativeCard.css';

const CreativeCard = ({ item, onClick }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax effect for the image inside the card container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Very subtle image shifting on scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const getPlaceholderStyle = (id) => {
    const gradients = {
      'featured-reel': 'linear-gradient(135deg, #1f1f1f 0%, #000000 100%)',
      'tokyo-drift': 'linear-gradient(135deg, #2d1033 0%, #0f0514 100%)',
      'ai-landscapes': 'linear-gradient(135deg, #102e33 0%, #041214 100%)',
      'monochrome': 'linear-gradient(135deg, #333333 0%, #000000 100%)',
      'motion-lab': 'linear-gradient(135deg, #332010 0%, #140b04 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)';
  };

  const handleClick = () => {
    if (onClick) onClick(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(item);
    }
  };

  return (
    <motion.div 
      className={`creative-card ${item.isFeatured ? 'is-featured' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="creative-media-container">
        
        {/* Interactive Lighting */}
        <div 
          className="creative-light"
          style={{
            background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 80%)`,
            opacity: isHovered ? 1 : 0
          }}
        />

        {/* The Media / Placeholder */}
        <motion.div 
          className="creative-media"
          style={{ 
            y: yParallax, 
            background: getPlaceholderStyle(item.id) 
          }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dynamic noise layer that intensifies on hover */}
          <div 
            className="creative-noise"
            style={{ opacity: isHovered ? 0.15 : 0.05 }}
          ></div>
          
          {item.type === 'video' && (
            <div className="video-badge">[ VIDEO PLACEHOLDER ]</div>
          )}
        </motion.div>
      </div>

      {/* Metadata Reveal */}
      <div className="creative-info">
        <div className="creative-header">
          <h3 className="creative-title">{item.title}</h3>
          <span className="creative-year">{item.year}</span>
        </div>
        
        <div className="creative-meta">
          <span className="creative-category">{item.category}</span>
        </div>

        <motion.div 
          className="creative-description-wrap"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="creative-description">{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreativeCard;
