import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck, Sparkles, CheckCircle, ArrowUpRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/data';
import CertificateModal from './CertificateModal';
import './Certificates.css';

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = PORTFOLIO_DATA.certificates || [];

  const getThemeIcon = (theme) => {
    switch (theme) {
      case 'gold':
        return <Award className="cert-card-icon gold-icon" size={24} />;
      case 'amber':
        return <Sparkles className="cert-card-icon amber-icon" size={24} />;
      case 'cyan':
        return <ShieldCheck className="cert-card-icon cyan-icon" size={24} />;
      case 'emerald':
      default:
        return <CheckCircle className="cert-card-icon emerald-icon" size={24} />;
    }
  };

  return (
    <section id="certificates" className="section certificates-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="certificates-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-eyebrow">
            <span className="eyebrow-line"></span>
            <span>CREDENTIALS & RECOGNITION</span>
          </div>
          <h2>HONORS & CERTIFICATES</h2>
          <p className="certificates-subtitle">
            Formal qualifications across Artificial Intelligence, Venture Incubation, and Software Engineering.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className={`certificate-card cert-card-theme-${cert.theme}`}
              data-cursor="view"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              aria-label={`View ${cert.title} certificate`}
            >
              {/* Card Ambient Glow */}
              <div className="cert-card-glow"></div>

              {/* Card Header Top */}
              <div className="cert-card-top">
                <div className="cert-card-icon-wrap">
                  {getThemeIcon(cert.theme)}
                </div>

                <div className="cert-card-badges">
                  <span className="cert-domain-badge">{cert.domain}</span>
                  <span className="cert-year-badge">{cert.year}</span>
                </div>
              </div>

              {/* Card Distinction Banner */}
              <div className="cert-card-distinction">
                <span className="distinction-dot"></span>
                <span className="distinction-text">{cert.distinction}</span>
              </div>

              {/* Title & Issuer */}
              <h3 className="cert-card-title">{cert.title}</h3>
              <p className="cert-card-issuer">{cert.issuer}</p>

              {/* Summary Description */}
              <p className="cert-card-desc">{cert.description}</p>

              {/* Skills Tags */}
              <div className="cert-card-skills">
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="cert-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Card Footer / Action */}
              <div className="cert-card-footer">
                <span className="cert-card-view-btn">
                  VIEW CREDENTIAL <ArrowUpRight size={16} className="arrow-icon" />
                </span>
                <span className="cert-id-tag">{cert.credentialId}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* External Sites Verification Banner */}
        <motion.div 
          className="certificates-source-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="source-banner-content">
            <span className="source-badge">OFFICIAL ARCHIVE</span>
            <p>
              View the complete original certificates collection on{' '}
              <a 
                href="https://sites.google.com/view/sujithharshas-t/certificates-of-sujith-harsha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="source-banner-link"
              >
                Sujith Harsha's Google Sites Archive <ExternalLink size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Interactive Lightbox Modal */}
      <CertificateModal 
        certificate={selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </section>
  );
};

export default Certificates;
