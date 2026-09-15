import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './Skills.css';

const SkillCategory = ({ title, skills, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getLabel = (i) => {
    const labels = ["WORKING WITH", "BUILDING", "EXPLORING"];
    return labels[i % labels.length];
  };

  return (
    <motion.div 
      className="skill-category"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <h3 className="skill-title">{title}</h3>
      <div className="skill-list">
        {skills.map((skill, i) => (
          <div key={i} className="skill-item">
            <span className="skill-name">{skill}</span>
            <span className="skill-status">{getLabel(i)}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="section skills-section">
      <div className="container">
        <h2 className="section-title">THE TOOLKIT</h2>
        
        <div className="skills-grid">
          <SkillCategory title="DEVELOPMENT" skills={PORTFOLIO_DATA.skills.development} index={0} />
          <SkillCategory title="AI" skills={PORTFOLIO_DATA.skills.ai} index={1} />
          <SkillCategory title="CREATIVE" skills={PORTFOLIO_DATA.skills.creative} index={2} />
          <SkillCategory title="TECHNOLOGY" skills={PORTFOLIO_DATA.skills.technology} index={3} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
