import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
      rathora: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
      dhanurx: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
      'ai-video': 'linear-gradient(135deg, #171717 0%, #0a0a0a 100%)',
      'the-lab': 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #262626 0%, #171717 100%)';
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-overlay">
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={32} strokeWidth={1} />
            </button>

            <div className="modal-content">
              <div 
                className="modal-hero"
                style={{ background: getPlaceholderStyle(project.id) }}
              >
                <div className="modal-noise"></div>
              </div>

              <div className="modal-details">
                <div className="modal-header">
                  <p className="modal-category">{project.category}</p>
                  <h2 className="modal-title">{project.name}</h2>
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
