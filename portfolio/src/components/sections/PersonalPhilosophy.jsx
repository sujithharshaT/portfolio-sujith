import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './PersonalPhilosophy.css';

const PersonalPhilosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textLines = PORTFOLIO_DATA.personal.philosophy.headline.split('\n');

  return (
    <section className="section philosophy-section" ref={ref}>
      <div className="container">
        <div className="philosophy-content">
          <div className="philosophy-headline">
            {textLines.map((line, i) => (
              <motion.div 
                key={i}
                className="line-wrapper"
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="philosophy-subtext"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
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
