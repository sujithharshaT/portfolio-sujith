import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import './CreativeModal.css';

const CreativeModal = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
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
      'featured-reel': 'linear-gradient(135deg, #1c1c22 0%, #08080a 100%)',
      'tokyo-drift': 'linear-gradient(135deg, #24112c 0%, #0c0410 100%)',
      'ai-landscapes': 'linear-gradient(135deg, #0e2329 0%, #030d0f 100%)',
      'monochrome': 'linear-gradient(135deg, #252528 0%, #09090b 100%)',
      'motion-lab': 'linear-gradient(135deg, #2a1b12 0%, #0e0703 100%)'
    };
    return gradients[id] || 'linear-gradient(135deg, #18181c 0%, #070709 100%)';
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="creative-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="creative-modal-title">
          <motion.div 
            className="creative-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div 
            className="creative-modal-container"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          >
            <button className="creative-modal-close" onClick={onClose} aria-label="Close creative modal">
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="creative-modal-media-area" style={{ background: getPlaceholderStyle(item.id) }}>
              <div className="creative-modal-noise"></div>
              {item.type === 'video' ? (
                <div className="creative-modal-play-indicator">
                  <div className="play-icon-ring">
                    <Play size={32} className="play-icon" />
                  </div>
                  <span>CINEMATIC ARCHIVE</span>
                </div>
              ) : (
                <div className="creative-modal-image-indicator">
                  <span>HIGH RESOLUTION VISUAL</span>
                </div>
              )}
            </div>

            <div className="creative-modal-info">
              <div className="creative-modal-meta-row">
                <span className="creative-modal-category">{item.category}</span>
              </div>
              <h2 id="creative-modal-title" className="creative-modal-title">{item.title}</h2>
              <p className="creative-modal-desc">{item.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreativeModal;
