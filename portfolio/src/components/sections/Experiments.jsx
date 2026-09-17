import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, Bot, Boxes, Globe, Gamepad2, Zap, Atom, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/data';
import './Experiments.css';

const Experiments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const getStatusClass = (status) => {
    switch(status) {
      case 'BUILDING': return 'status-building';
      case 'EXPERIMENT': return 'status-experiment';
      case 'PROTOTYPE': return 'status-prototype';
      case 'EXPLORING': return 'status-exploring';
      default: return '';
    }
  };

  const getExpIcon = (index) => {
    const icons = [
      <Bot key={0} size={22} className="exp-svg-icon" />,
      <Boxes key={1} size={22} className="exp-svg-icon" />,
      <Layers key={2} size={22} className="exp-svg-icon" />,
      <Globe key={3} size={22} className="exp-svg-icon" />,
      <Gamepad2 key={4} size={22} className="exp-svg-icon" />,
      <Zap key={5} size={22} className="exp-svg-icon" />,
      <Atom key={6} size={22} className="exp-svg-icon" />,
      <FlaskConical key={7} size={22} className="exp-svg-icon" />
    ];
    return icons[index % icons.length];
  };

  return (
    <section id="experiments" className="section experiments-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="experiments-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="experiments-eyebrow">
            <span>R&D & PROTOTYPES</span>
          </div>
          <h2 className="section-title">THE LAB</h2>
          <p className="experiments-subtitle">
            Ongoing technical experiments in artificial intelligence, shaders, motion UX, and future technology.
          </p>
        </motion.div>

        <div className="experiments-grid">
          {PORTFOLIO_DATA.experiments.map((exp, i) => (
            <motion.div 
              key={i} 
              className="experiment-card"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              tabIndex={0}
              role="article"
              aria-label={`${exp.title} - ${exp.status}`}
            >
              <div className="exp-icon-wrap">
                {getExpIcon(i)}
              </div>
              <h3 className="exp-title">{exp.title}</h3>
              <span className={`exp-status ${getStatusClass(exp.status)}`}>
                <span className="status-dot"></span>
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
