import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (hover: hover)').matches;

  const handleMouseMove = (e) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const getPlaceholderStyle = (id) => {
    const gradients = {
      rathora: 'linear-gradient(135deg, #18181f 0%, #0a0a0d 100%)',
      dhanurx: 'linear-gradient(135deg, #0e1726 0%, #060911 100%)',
      'ai-video': 'linear-gradient(135deg, #1c1524 0%, #0a060f 100%)',
      'the-lab': 'linear-gradient(135deg, #0a1f1c 0%, #040d0c 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #16161b 0%, #08080a 100%)';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <motion.div 
      className={`project-card layout-${project.layoutType}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open details for project ${project.name}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-image-container">
        {/* Cursor tracking light overlay (desktop only) */}
        {canHover && (
          <div 
            className="card-light"
            style={{
              background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 75%)`,
              opacity: isHovered ? 1 : 0
            }}
          />
        )}
        
        {/* Visual Artwork */}
        <motion.div 
          className="project-image"
          style={{ background: getPlaceholderStyle(project.id) }}
          animate={{ scale: isHovered && canHover ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="card-noise"></div>
          <div className="card-grid-pattern"></div>
          
          <div className="card-ambient-spec">
            <span className="spec-tech">{project.technologies?.[0] || 'TECH'}</span>
          </div>
        </motion.div>
        
        {project.label && (
          <div className="project-label">
            {project.label}
          </div>
        )}
      </div>

      <motion.div 
        className="project-info"
        animate={{ x: isHovered && canHover ? 6 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-header">
          <h3 className="project-title">{project.name}</h3>
          <div className="project-arrow" aria-hidden="true">
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </div>
        </div>
        <p className="project-category">{project.category}</p>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
