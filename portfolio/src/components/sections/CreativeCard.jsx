import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import './CreativeCard.css';

const CreativeCard = ({ item, onClick }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (hover: hover)').matches;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  const handleMouseMove = (e) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const getPlaceholderStyle = (id) => {
    const gradients = {
      'featured-reel': 'linear-gradient(135deg, #1c1c22 0%, #08080a 100%)',
      'tokyo-drift': 'linear-gradient(135deg, #24112c 0%, #0c0410 100%)',
      'ai-landscapes': 'linear-gradient(135deg, #0e2329 0%, #030d0f 100%)',
      'monochrome': 'linear-gradient(135deg, #252528 0%, #09090b 100%)',
      'motion-lab': 'linear-gradient(135deg, #2a1b12 0%, #0e0703 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #18181c 0%, #070709 100%)';
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
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="creative-media-container">
        {/* Interactive Lighting (desktop fine pointer only) */}
        {canHover && (
          <div 
            className="creative-light"
            style={{
              background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 80%)`,
              opacity: isHovered ? 1 : 0
            }}
          />
        )}

        {/* Media Frame */}
        <motion.div 
          className="creative-media"
          style={{ 
            y: canHover ? yParallax : 0, 
            background: getPlaceholderStyle(item.id) 
          }}
          animate={{ scale: isHovered && canHover ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="creative-noise"></div>
          <div className="creative-grid-overlay"></div>
          
          {item.type === 'video' ? (
            <div className="creative-media-badge">
              <Play size={11} className="badge-play-icon" />
              <span>CINEMATIC REEL</span>
            </div>
          ) : (
            <div className="creative-media-badge image-badge">
              <span className="badge-dot"></span>
              <span>VISUAL ARCHIVE</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Metadata Reveal */}
      <div className="creative-info">
        <div className="creative-header">
          <h3 className="creative-title">{item.title}</h3>
        </div>
        
        <div className="creative-meta">
          <span className="creative-category">{item.category}</span>
        </div>

        <div className="creative-description-wrap">
          <p className="creative-description">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CreativeCard;
