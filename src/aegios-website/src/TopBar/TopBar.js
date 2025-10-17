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

      // No restrictions - topbar can appear anywhere on the page
      // The mouse movement will control visibility
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

      // Show topbar when mouse is in top 30% of screen, regardless of scroll position
      const threshold = window.innerHeight * 0.3; // 30% of viewport height from top
      setShow(e.clientY < threshold);
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
