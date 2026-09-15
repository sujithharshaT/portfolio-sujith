import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './Experiments.css';

const Experiments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getStatusClass = (status) => {
    switch(status) {
      case 'BUILDING': return 'status-building';
      case 'EXPERIMENT': return 'status-experiment';
      case 'PROTOTYPE': return 'status-prototype';
      case 'EXPLORING': return 'status-exploring';
      default: return '';
    }
  };

  return (
    <section id="experiments" className="section experiments-section">
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          THE LAB
        </motion.h2>

        <div className="experiments-grid">
          {PORTFOLIO_DATA.experiments.map((exp, i) => (
            <motion.div 
              key={i} 
              className="experiment-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="exp-icon">⚗️</div>
              <h4 className="exp-title">{exp.title}</h4>
              <span className={`exp-status ${getStatusClass(exp.status)}`}>
                {exp.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiments;
