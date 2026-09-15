import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './Journey.css';

const Journey = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section journey-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="journey-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">MY JOURNEY</h2>
          <p className="journey-subtitle">The evolution of a builder, thinker, and creator.</p>
        </motion.div>

        <div className="journey-grid">
          {PORTFOLIO_DATA.journey.map((item, i) => (
            <motion.div 
              key={item.number}
              className="journey-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="journey-card-top">
                <span className="journey-num">{item.number}</span>
                <span className="journey-indicator"></span>
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
