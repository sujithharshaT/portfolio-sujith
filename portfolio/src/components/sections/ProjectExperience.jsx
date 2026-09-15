import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './ProjectExperience.css';

const ProjectExperience = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // For a horizontal line progression effect
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section className="section experience-section" ref={containerRef}>
      <div className="container">
        <div className="experience-wrapper">
          <div className="experience-line-bg"></div>
          <motion.div className="experience-line-progress" style={{ width: lineWidth }}></motion.div>
          
          <div className="experience-steps">
            {PORTFOLIO_DATA.experienceTimeline.map((step, i) => (
              <motion.div 
                key={i} 
                className="experience-step"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-dot"></div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectExperience;
