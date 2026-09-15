import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../config/data';
import CreativeCard from './CreativeCard';
import CreativeModal from './CreativeModal';
import './Creative.css';

const Creative = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCreative, setSelectedCreative] = useState(null);
  
  // Separate featured film from grid items
  const featuredItem = PORTFOLIO_DATA.creativeWork.find(item => item.isFeatured);
  const gridItems = PORTFOLIO_DATA.creativeWork.filter(item => !item.isFeatured);

  return (
    <section id="creative" className="section creative-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="creative-section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">BEYOND CODE.</h2>
          <p className="creative-subtitle">Technology is only one way I create.</p>
        </motion.div>

        <div className="creative-archive-layout">
          {/* Featured Film Slot */}
          {featuredItem && (
            <div className="archive-featured-row">
              <CreativeCard item={featuredItem} onClick={setSelectedCreative} />
            </div>
          )}

          {/* Asymmetric Media Grid */}
          <div className="archive-grid-row">
            <div className="archive-column archive-col-left">
              {gridItems.slice(0, 2).map(item => (
                <CreativeCard key={item.id} item={item} onClick={setSelectedCreative} />
              ))}
            </div>
            
            <div className="archive-column archive-col-right">
              {gridItems.slice(2, 4).map(item => (
                <CreativeCard key={item.id} item={item} onClick={setSelectedCreative} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreativeModal 
        item={selectedCreative} 
        onClose={() => setSelectedCreative(null)} 
      />
    </section>
  );
};

export default Creative;

