import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './FeaturedWork.css';

const FeaturedWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProject = PORTFOLIO_DATA.projects[0];
  const mediumProject = PORTFOLIO_DATA.projects[1];
  const standardProjects = PORTFOLIO_DATA.projects.slice(2);

  return (
    <section id="work" className="section work-section">
      <div className="container" ref={ref}>
        <motion.div 
          className="work-section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="work-eyebrow">
            <span>PORTFOLIO & VENTURES</span>
          </div>
          <h2 className="section-title">SELECTED WORK</h2>
          <p className="work-subtitle">
            Exploring AI interfaces, automotive experiences, and interactive web architecture.
          </p>
        </motion.div>
        
        <div className="editorial-layout">
          {/* Row 1: Massive Feature */}
          <div className="layout-row row-featured">
            <ProjectCard project={featuredProject} onClick={setSelectedProject} />
          </div>

          {/* Row 2: Medium Offset */}
          <div className="layout-row row-medium">
            <div className="spacer"></div>
            <div className="medium-wrapper">
              <ProjectCard project={mediumProject} onClick={setSelectedProject} />
            </div>
          </div>

          {/* Row 3: Split Standards */}
          <div className="layout-row row-split">
            {standardProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default FeaturedWork;
