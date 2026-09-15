import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/data';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    const recipient = PORTFOLIO_DATA.contact.emailRaw || 'sujitharshat@gmail.com';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Sujith,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from Sujith Harsha Portfolio Website`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Trigger user's mail client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus('success');
    }, 400);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <div className="contact-wrapper">
          <motion.div 
            className="contact-header"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h2>HAVE AN IDEA?</h2>
            <p>Let's build something interesting.</p>
          </motion.div>

          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    className="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="success-icon-wrap">
                      <Check size={32} className="success-icon" />
                    </div>
                    <h3>Email client launched.</h3>
                    <p>
                      Your message has been addressed directly to <strong>{PORTFOLIO_DATA.contact.emailRaw || 'sujitharshat@gmail.com'}</strong>.
                    </p>
                    <button 
                      type="button" 
                      className="btn-secondary send-another-btn"
                      onClick={resetForm}
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    className="contact-form" 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="form-group">
                      <label htmlFor="contact-name">NAME</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        placeholder="Your Name" 
                        autoComplete="name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email">EMAIL</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        placeholder="your.email@example.com" 
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">MESSAGE</label>
                      <textarea 
                        id="contact-message"
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        required 
                        rows={4} 
                        placeholder="Tell me about your idea, project, or vision..."
                      />
                    </div>

                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="btn-primary form-submit-btn"
                        disabled={status === 'submitting'}
                      >
                        {status === 'submitting' ? 'SENDING...' : (
                          <>
                            SEND MESSAGE <Send size={15} style={{ marginLeft: 8 }} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Direct Connect & Social Links */}
            <motion.div 
              className="contact-direct-container"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="direct-card">
                <h4>DIRECT EMAIL</h4>
                <a href={PORTFOLIO_DATA.contact.email} className="direct-email-link">
                  {PORTFOLIO_DATA.contact.emailRaw || 'sujitharshat@gmail.com'}
                </a>

                <div className="direct-divider"></div>

                <h4>SOCIAL / PLATFORMS</h4>
                <div className="social-links-list">
                  <a href={PORTFOLIO_DATA.contact.instagram} className="social-pill" target="_blank" rel="noopener noreferrer">
                    <span>INSTAGRAM</span>
                    <span className="social-handle">{PORTFOLIO_DATA.contact.instagramHandle}</span>
                  </a>
                  <a href={PORTFOLIO_DATA.contact.github} className="social-pill" target="_blank" rel="noopener noreferrer">
                    <span>GITHUB</span>
                    <span className="social-handle">{PORTFOLIO_DATA.contact.githubHandle}</span>
                  </a>
                  <a href={PORTFOLIO_DATA.contact.linkedin} className="social-pill" target="_blank" rel="noopener noreferrer">
                    <span>LINKEDIN</span>
                    <span className="social-handle">{PORTFOLIO_DATA.contact.linkedinHandle}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
