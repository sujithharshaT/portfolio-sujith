import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './PersonalPhilosophy.css';

const PersonalPhilosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const textLines = PORTFOLIO_DATA.personal.philosophy.headline.split('\n');

  return (
    <section id="philosophy" className="section philosophy-section" ref={ref}>
      <div className="container">
        <div className="philosophy-content">
          <div className="philosophy-eyebrow">
            <span>CORE PHILOSOPHY</span>
          </div>
          
          <div className="philosophy-headline">
            {textLines.map((line, i) => (
              <div key={i} className="line-wrapper">
                <motion.span 
                  className="headline-word"
                  initial={{ opacity: 0, y: '80%' }}
                  animate={isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '80%' }}
                  transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </div>
          
          <motion.div 
            className="philosophy-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {PORTFOLIO_DATA.personal.philosophy.subtext.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PersonalPhilosophy;
