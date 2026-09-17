import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll cleanly when modal is open without jitter
  useEffect(() => {
    if (project) {
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
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const getPlaceholderStyle = (id) => {
    const gradients = {
      rathora: 'linear-gradient(135deg, #18181f 0%, #0a0a0d 100%)',
      dhanurx: 'linear-gradient(135deg, #0e1726 0%, #060911 100%)',
      'ai-video': 'linear-gradient(135deg, #1c1524 0%, #0a060f 100%)',
      'the-lab': 'linear-gradient(135deg, #0a1f1c 0%, #040d0c 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #16161b 0%, #08080a 100%)';
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-project-title">
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="modal-container"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            <button 
              className="modal-close" 
              onClick={onClose} 
              aria-label="Close project modal"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="modal-content">
              <div 
                className="modal-hero"
                style={{ background: getPlaceholderStyle(project.id) }}
              >
                <div className="modal-noise"></div>
                <div className="modal-grid-lines"></div>
                {project.label && (
                  <span className="modal-hero-badge">{project.label}</span>
                )}
              </div>

              <div className="modal-details">
                <div className="modal-header">
                  <p className="modal-category">{project.category}</p>
                  <h2 id="modal-project-title" className="modal-title">{project.name}</h2>
                </div>

                <div className="modal-body">
                  <div className="modal-description">
                    <p>{project.description}</p>
                  </div>
                  
                  <div className="modal-meta">
                    <div className="meta-group">
                      <h4>STATUS</h4>
                      <p>{project.status}</p>
                    </div>
                    <div className="meta-group">
                      <h4>YEAR</h4>
                      <p>{project.year}</p>
                    </div>
                    <div className="meta-group">
                      <h4>TECHNOLOGIES</h4>
                      <div className="tech-tags">
                        {project.technologies?.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
