import React, { useEffect, useRef, useState } from 'react';
import './Process.css';
import SpaceScene from './SpaceScene';

const Process = () => {
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update the visibility ratio continuously (0 to 1)
          setVisibilityRatio(entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Check every 1%
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate animation progress for each element based on visibility ratio
  const getElementStyle = (baseDelay = 0) => {
    // Scale visibility so 100% is reached at 5% visibility instead of 100%
    const scaledRatio = Math.min(1, visibilityRatio / 0.05);
    // Adjust progress based on element's delay to create staggered effect
    const progress = Math.max(0, Math.min(1, (scaledRatio - baseDelay) / (1 - baseDelay)));
    const opacity = progress;
    const translateY = (1 - progress) * 40; // Start 40px down
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
    };
  };

  const getDiagramStyle = () => {
    // Scale visibility so 100% is reached at 70% visibility instead of 100%
    const scaledRatio = Math.min(1, visibilityRatio / 0.7);
    const progress = Math.max(0, Math.min(1, scaledRatio));
    const opacity = progress;
    const translateX = (1 - progress) * 40; // Start 40px right
    
    return {
      opacity,
      transform: `translateX(${translateX}px)`,
      transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
    };
  };

  return (
    <div className="process-section" id="process" ref={sectionRef}>
      <div className="process-container">
        <div className="process-content">
          <div className="process-diagram" style={getDiagramStyle()}>
            <SpaceScene />
          </div>
          <div className="process-text" id="process-text">
            <h2 className="process-heading" style={getElementStyle(0.1)}>Our Process</h2>
            <p className="process-description" style={getElementStyle(0.15)}>
              We break our method into 3 main pillars
            </p>
            <ul className="process-pillars">
              <li style={getElementStyle(0.2)}>
                <strong>Isolationism</strong>
                <p className="pillar-detail">From the beginning of our engagements we design isolated environments for both hardware and software integrations.
                  Every software component runs on its own isolated system. 
                  We specialize in configuring hardware to run on air-gapped networks, without direct internet access.
                </p>
              </li>
              <li style={getElementStyle(0.25)}>
                <strong>Customization</strong>
                <p className="pillar-detail">
                  We train and configure AI models to understand your business and your data. 
                  Documents are processed and ingested into the AI system on scheduled intervals and stored as non-human readable encrypted formats. 
                </p>
              </li>
              <li style={getElementStyle(0.3)}>
                <strong>Monitoring and Optimization</strong>
                <p className="pillar-detail">
                  We offer monitoring services to ensure the AI system is performing at its best. 
                  We offer device-lifetime maintenance support so there are no extra billing of maintenance hours. 
                  Our monitoring software is built in-house and is designed to be highly efficient and secure for ease-of-use for any IT department.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
