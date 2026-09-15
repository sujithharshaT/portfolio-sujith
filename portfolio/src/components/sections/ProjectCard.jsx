import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Generate a placeholder gradient based on the project ID if no actual image is loaded
  const getPlaceholderStyle = (id) => {
    const gradients = {
      rathora: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
      dhanurx: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
      'ai-video': 'linear-gradient(135deg, #171717 0%, #0a0a0a 100%)',
      'the-lab': 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #262626 0%, #171717 100%)';
  };

  return (
    <motion.div 
      className={`project-card layout-${project.layoutType}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-image-container">
        {/* Cursor tracking light overlay */}
        <div 
          className="card-light"
          style={{
            background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 80%)`,
            opacity: isHovered ? 1 : 0
          }}
        />
        
        {/* Placeholder or actual image */}
        <motion.div 
          className="project-image"
          style={{ background: getPlaceholderStyle(project.id) }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle noise over placeholder */}
          <div className="card-noise"></div>
        </motion.div>
        
        {project.label && (
          <div className="project-label">
            {project.label}
          </div>
        )}
      </div>

      <motion.div 
        className="project-info"
        animate={{ x: isHovered ? 10 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-header">
          <h3 className="project-title">{project.name}</h3>
          <motion.div 
            className="project-arrow"
            animate={{ 
              x: isHovered ? 5 : 0,
              y: isHovered ? -5 : 0,
              color: isHovered ? 'var(--text-white)' : 'var(--text-muted)'
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
        <p className="project-category">{project.category}</p>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
