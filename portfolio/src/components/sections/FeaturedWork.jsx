import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './FeaturedWork.css';

const FeaturedWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedProject, setSelectedProject] = useState(null);

  // Group projects for the asymmetric layout based on our Phase 2 data design
  // We assume: Rathora (featured), Dhanurx (medium), AI Studio (standard), The Lab (standard)
  const featuredProject = PORTFOLIO_DATA.projects[0];
  const mediumProject = PORTFOLIO_DATA.projects[1];
  const standardProjects = PORTFOLIO_DATA.projects.slice(2);

  return (
    <section id="work" className="section work-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          SELECTED WORK
        </motion.h2>
        
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
