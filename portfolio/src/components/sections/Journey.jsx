import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './Journey.css';

const Journey = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" className="section journey-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="journey-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="journey-eyebrow">
            <span>TRAJECTORY & EVOLUTION</span>
          </div>
          <h2 className="section-title">MY JOURNEY</h2>
          <p className="journey-subtitle">The progression of a builder, thinker, and creative director.</p>
        </motion.div>

        <div className="journey-grid">
          {PORTFOLIO_DATA.journey.map((item, i) => (
            <motion.div 
              key={item.number}
              className="journey-card"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              tabIndex={0}
              role="article"
              aria-label={`Stage ${item.number}: ${item.stage}`}
            >
              <div className="journey-card-top">
                <span className="journey-num">{item.number}</span>
                <span className="journey-indicator" aria-hidden="true"></span>
              </div>
              <h3 className="journey-stage">{item.stage}</h3>
              <p className="journey-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
