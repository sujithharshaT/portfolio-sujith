import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import './CreativeModal.css';

const CreativeModal = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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

  return (
    <AnimatePresence>
      {item && (
        <div className="creative-modal-overlay">
          <motion.div 
            className="creative-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div 
            className="creative-modal-container"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          >
            <button className="creative-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={28} strokeWidth={1.5} />
            </button>

            <div className="creative-modal-media-area" style={{ background: getPlaceholderStyle(item.id) }}>
              <div className="creative-modal-noise"></div>
              {item.type === 'video' ? (
                <div className="creative-modal-play-indicator">
                  <div className="play-icon-ring">
                    <Play size={36} className="play-icon" />
                  </div>
                  <span>CINEMATIC PREVIEW</span>
                </div>
              ) : (
                <div className="creative-modal-image-indicator">
                  <span>HIGH RESOLUTION ARCHIVE</span>
                </div>
              )}
            </div>

            <div className="creative-modal-info">
              <div className="creative-modal-meta-row">
                <span className="creative-modal-category">{item.category}</span>
                <span className="creative-modal-year">{item.year}</span>
              </div>
              <h2 className="creative-modal-title">{item.title}</h2>
              <p className="creative-modal-desc">{item.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreativeModal;
