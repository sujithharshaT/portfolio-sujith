import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './CertificateModal.css';

const CertificateModal = ({ certificate, onClose }) => {
  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [certificate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="cert-modal-overlay">
        <motion.div 
          className="cert-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div 
          className="cert-modal-container"
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        >
          <button className="cert-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* Certificate Document Paper */}
          <div className={`cert-paper cert-theme-${certificate.theme || 'gold'}`}>
            <div className="cert-paper-texture"></div>

            {/* Certificate Border & Corner Accents */}
            <div className="cert-inner-frame">
              <div className="cert-corner corner-tl"></div>
              <div className="cert-corner corner-tr"></div>
              <div className="cert-corner corner-bl"></div>
              <div className="cert-corner corner-br"></div>

              {/* Header Info */}
              <div className="cert-header">
                <div className="cert-seal-icon-wrap">
                  <Award size={36} className="cert-seal-icon" />
                </div>
                <span className="cert-super-title">CERTIFICATE OF RECOGNITION</span>
                <span className="cert-domain">{certificate.domain}</span>
              </div>

              {/* Presented to */}
              <div className="cert-body">
                <p className="cert-intro">THIS CREDENTIAL IS PROUDLY CONFERRED UPON</p>
                <h2 className="cert-recipient">SUJITH HARSHA</h2>
                <div className="cert-divider-line"></div>

                {/* Distinction Callout */}
                <div className="cert-distinction-badge">
                  <ShieldCheck size={18} style={{ marginRight: 8 }} />
                  <span>{certificate.distinction}</span>
                </div>

                <h3 className="cert-program-title">{certificate.title}</h3>

                <p className="cert-description">{certificate.description}</p>

                {/* Skills tags */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="cert-skills-wrap">
                    {certificate.skills.map((skill, idx) => (
                      <span key={idx} className="cert-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Signatures & Seal */}
              <div className="cert-footer">
                <div className="cert-footer-col cert-issuer-col">
                  <div className="cert-sig-line"></div>
                  <span className="cert-footer-label">ISSUING ENTITY</span>
                  <span className="cert-footer-val">{certificate.issuer}</span>
                </div>

                <div className="cert-footer-seal-emblem">
                  <div className="emblem-outer-ring">
                    <div className="emblem-inner-ring">
                      <CheckCircle2 size={24} />
                      <span className="emblem-text">VERIFIED</span>
                    </div>
                  </div>
                </div>

                <div className="cert-footer-col cert-id-col">
                  <div className="cert-sig-line"></div>
                  <span className="cert-footer-label">CREDENTIAL ID</span>
                  <span className="cert-footer-val">{certificate.credentialId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Bar */}
          <div className="cert-modal-actions">
            <div className="cert-verification-status">
              <span className="status-indicator-dot"></span>
              <span>Off-chain Verified Record</span>
            </div>
            <div className="cert-modal-buttons">
              <a 
                href={certificate.verificationUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary cert-verify-btn"
              >
                VIEW ORIGINAL ON GOOGLE SITES <ExternalLink size={15} style={{ marginLeft: 6 }} />
              </a>
              <button 
                type="button" 
                className="btn-primary cert-dismiss-btn"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CertificateModal;
