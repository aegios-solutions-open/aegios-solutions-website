import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import sideProfileImage from '../assets/images/side-profile.png';

const About = () => {
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
    // Scale visibility so 100% is reached at 70% visibility instead of 100%
    const scaledRatio = Math.min(1, visibilityRatio / 0.7);
    // Adjust progress based on element's delay to create staggered effect
    const progress = Math.max(0, Math.min(1, (scaledRatio - baseDelay) / (1 - baseDelay)));
    const opacity = progress;
    const translateY = (1 - progress) * 40; // Start 40px down
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  const getImageStyle = () => {
    // Scale visibility so 100% is reached at 70% visibility instead of 100%
    const scaledRatio = Math.min(1, visibilityRatio / 0.7);
    const progress = Math.max(0, Math.min(1, scaledRatio));
    const opacity = progress;
    const translateX = (1 - progress) * 40; // Start 40px right
    
    return {
      opacity,
      transform: `translateX(${translateX}px)`,
      transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  const handleProcessClick = () => {
    const processSection = document.getElementById('process-text');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-heading" style={getElementStyle(0.1)}>
              Who We Are
            </h2>
            <h3 className="about-subheading" style={getElementStyle(0.15)}>
              AI DEVELOPERS
            </h3>
            <p className="about-description" style={getElementStyle(0.2)}>
              We are AI Inference Engineers with over a decade of experience serving banks across Canada, the US, and the EU. 
              Our expertise lies in private LLM deployments and local infrastructure solutions. If you are a corporate services
              provider, law firm, or a specialized-service organization requiring on-premises AI capabilities, we can help.
            </p>
            <button className="about-button" style={getElementStyle(0.25)} onClick={handleProcessClick}>
              OUR PROCESS
            </button>
          </div>
          <div className="about-image" style={getImageStyle()}>
            <div className="image-placeholder">
              <img
                src={sideProfileImage}
                alt="Professional headshot"
                className="profile-image"
              />
            </div>
            <div className="textured-background">
              <div className="texture-pattern"></div>
            </div>
            <div className="bg-rectangle bg-rect-1"></div>
            <div className="bg-rectangle bg-rect-2"></div>
            <div className="bg-rectangle bg-rect-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
