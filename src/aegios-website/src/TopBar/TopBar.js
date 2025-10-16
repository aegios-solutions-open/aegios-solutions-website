import React, { useEffect, useState } from 'react';
import './TopBar.css';

const TopBar = () => {
  const [show, setShow] = useState(false); // Initially hidden
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Check if About section is in view
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        // Only allow showing topbar if scrolled past About section
        if (aboutRect.top > 0) {
          setShow(false);
        }
      }
    };

    const handleScrollEnd = () => {
      setIsScrolling(false);
    };

    const handleScrollListener = () => {
      setIsScrolling(true);
      handleScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    window.addEventListener('scroll', handleScrollListener);

    const handleMouseMove = (e) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const aboutSection = document.getElementById('about');
      
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        // Only show topbar if scrolled past About section AND mouse is near top
        if (aboutRect.top <= 0) {
          const threshold = 400; // pixels from top
          setShow(e.clientY < threshold);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScrollListener);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    // Special handling for process section to scroll to text center
    const targetId = sectionId === 'process' ? 'process-text' : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(sectionId); // Set active section when clicked
    }
  };

  return (
    <div className={`topbar ${show ? 'show' : ''} ${isScrolling ? 'scrolling' : ''}`}>
      <div className="topbar-content">
        <div className="title" onClick={() => scrollToSection('about')}>
          AEGIOS
        </div>
        <nav className="nav-container">
          <ul className="navList">
            <li className={`navItem ${activeSection === 'about' ? 'active' : ''}`}>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                About
              </a>
            </li>
            <li className={`navItem ${activeSection === 'process' ? 'active' : ''}`}>
              <a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>
                Process
              </a>
            </li>
            <li className={`navItem ${activeSection === 'contact' ? 'active' : ''}`}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
