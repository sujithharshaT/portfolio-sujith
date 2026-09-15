import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import './CurrentlyExploring.css';

const CurrentlyExploring = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-300, 0]);

  const halfway = Math.floor(PORTFOLIO_DATA.currentlyExploring.length / 2);
  const row1 = PORTFOLIO_DATA.currentlyExploring.slice(0, halfway);
  const row2 = PORTFOLIO_DATA.currentlyExploring.slice(halfway);

  return (
    <section className="section exploring-section" ref={ref}>
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="exploring-title">CURRENTLY EXPLORING</h3>
        
        <div className="exploring-marquee-wrapper">
          <motion.div className="exploring-row" style={{ x: x1 }}>
            {row1.map((item, i) => (
              <span key={i} className="exploring-item">{item}</span>
            ))}
            {/* Duplicate for endless feel if needed, simplified here */}
            {row1.map((item, i) => (
              <span key={`dup-${i}`} className="exploring-item" aria-hidden="true">{item}</span>
            ))}
          </motion.div>
          
          <motion.div className="exploring-row" style={{ x: x2 }}>
            {row2.map((item, i) => (
              <span key={i} className="exploring-item outline">{item}</span>
            ))}
            {row2.map((item, i) => (
              <span key={`dup-${i}`} className="exploring-item outline" aria-hidden="true">{item}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CurrentlyExploring;
