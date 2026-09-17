import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="section about-section">
      <div className="container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="about-grid"
        >
          <motion.div variants={itemVariants} className="about-header">
            <span className="about-eyebrow">BACKGROUND & FOCUS</span>
            <h2>I LIKE BUILDING THINGS.</h2>
          </motion.div>
          
          <div className="about-content">
            {PORTFOLIO_DATA.personal.aboutText.map((text, i) => (
              <motion.p key={i} variants={itemVariants} className="about-text">
                {text}
              </motion.p>
            ))}
            
            <motion.div variants={itemVariants} className="about-keywords">
              {PORTFOLIO_DATA.personal.aboutKeywords.map((keyword, i) => (
                <span key={i} className="keyword-pill">
                  {keyword}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
